
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

	render() {
		const { isLogin, token } = this.state;

		const display = isLogin ?
			(
				<Devices token={token} />
			)
			:
			(
				<Login onLogin={(e) => { this.setState({ isLogin: true, token: e }) }} />
			)

		return (
			<div className='container'>
				{display}
			</div>
		);
	}
}

export default App;
