import './App.css'
import { Context } from '.'
import { IUser } from './models/IUser'
import { observer } from 'mobx-react-lite'
import LoginForm from './components/LoginForm'
import UserService from './services/UserService'
import { useContext, useEffect, useState } from 'react'

function App() {
	const { store } = useContext(Context)
	const [users, setUsers] = useState<IUser[]>([])

	const getUsers = async () => {
		const res = await UserService.fetchUsers()
		setUsers(res.data)
		try {
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [])

	if (store.isLoading) {
		return (
			<div>
				<p>Загрузка...</p>
			</div>
		)
	}

	if (!store.isAuth) {
		return (
			<div>
				<LoginForm />
				<button onClick={() => getUsers()} style={{ marginRight: '20px' }}>
					Get users
				</button>
			</div>
		)
	}

	return (
		<div className='App'>
			<div>
				<p>id: {store.user.id}</p>
				<p>Email: {store.user.email}</p>
				<p>isActivated: {store.user.isActivated ? 'yes' : 'no'}</p>
				<button onClick={() => store.logout()} style={{ marginBottom: '50px' }}>
					logout
				</button>
				<div>
					<button onClick={() => getUsers()} style={{ marginRight: '20px' }}>
						Get users
					</button>
					<button onClick={() => setUsers([])}>Clear users</button>
					{users.map(user => (
						<div key={user.email}>
							<p>{user.id}</p>
							<p>{user.email}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default observer(App)
