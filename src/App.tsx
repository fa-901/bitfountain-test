
import * as React from 'react';
import { Fragment } from 'react';
import Login from './components/Login';

interface Props {
	
}

class App extends React.Component<Props> {
	constructor(props: any) {
		super(props);

		this.state = {
			isLogin: false,
		}
	}

	render() {
		return (
			<Fragment>
				<h1>
					Hello
				</h1>
				<button type="button" className="btn btn-primary">
					This is a bootstrap button
					<Login/>
				</button>
			</Fragment>
		);
	}
}

export default App;
