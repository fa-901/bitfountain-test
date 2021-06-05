
import * as React from 'react';
import { Fragment } from 'react';
import Login from './components/Login';

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
		return (
			<div className='container'>
				<Login onLogin={(e) => { this.setState({ isLogin: e }) }} />
			</div>
		);
	}
}

export default App;
