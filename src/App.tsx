
import * as React from 'react';
import { Fragment } from 'react';
import Login from './components/Login';
import Devices from './components/Devices';

interface Props {

}

interface State {
	isLogin: boolean,
}

class App extends React.Component<Props> {
	state: State = {
		isLogin: false,
	};

	render() {
		const { isLogin } = this.state;

		const display = isLogin ?
			(
				<Devices />
			)
			:
			(
				<Login onLogin={(e) => { this.setState({ isLogin: e }) }} />
			)

		return (
			<div className='container'>
				{display}
			</div>
		);
	}
}

export default App;
