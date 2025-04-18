import { FC, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '..'

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { store } = useContext(Context)

	return (
		<div>
			<input
				onChange={e => setEmail(e.target.value)}
				value={email}
				placeholder='Email...'
				type='text'
			/>
			<input
				onChange={e => setPassword(e.target.value)}
				value={password}
				placeholder='Password...'
				type='password'
			/>
			<button onClick={() => store.login(email, password)}>Login</button>
			<button onClick={() => store.registration(email, password)}>
				Registration
			</button>
		</div>
	)
}

export default observer(LoginForm)
