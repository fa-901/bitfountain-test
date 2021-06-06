
import * as React from 'react';
import { Fragment } from 'react';
import Login from './components/Login';
import Devices from './components/Devices';

interface Props {

}

interface State {
	isLogin: boolean,
	token: string,
}

class App extends React.Component<Props> {
	state: State = {
		isLogin: false,
		token: '',
	};

	/**check for session storage initially */
	componentDidMount() {
		var data: any = sessionStorage.getItem("login");
		if (!data) {
			return
		}
		data = data ? JSON.parse(data) : {}
		const now: number = new Date().getTime();
		const sessionTime: number = new Date(data.date).getTime();
		if (sessionTime > now) {
			this.setState({
				isLogin: true,
				token: data.token,
			})
		}
	}

	/**on login create new session with 24 hours validity */
	onLogin = (e: string) => {
		this.setState({ isLogin: true, token: e })
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		let data: object = {
			token: e,
			date: tomorrow.toISOString(),
		}
		sessionStorage.setItem("login", JSON.stringify(data));
	}

	/**on logout clear session storage */
	onLogout =()=>{
		this.setState({ isLogin: false, token: '' });
		sessionStorage.removeItem("login");
	}

	render() {
		const { isLogin, token } = this.state;

		const display = isLogin ?
			(
				<Devices token={token} onLogout={this.onLogout} />
			)
			:
			(
				<Login onLogin={(e) => { this.onLogin(e) }} />
			)

		return (
			<div className='container'>
				{display}
			</div>
		);
	}
}

export default App;
