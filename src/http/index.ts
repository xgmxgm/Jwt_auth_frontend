import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const API_URL = `http://localhost:4444/api`

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

$api.interceptors.request.use(config => {
	config.headers = config.headers || {}
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

$api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (
			error.response.status == 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const res = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
					withCredentials: true,
				})
				localStorage.setItem('token', res.data.accessToken)
				return $api.request(originalRequest)
			} catch (e) {
				console.log(e)
			}
		}
		throw error
	}
)

export default $api
