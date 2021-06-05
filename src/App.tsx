
import * as React from 'react';
import { Fragment } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
	
}

class App extends React.Component<Props> {
	render() {
		return (
			<Fragment>
				<h1>
					Hello
				</h1>
				<button type="button" className="btn btn-primary">
					This is a bootstrap button
				</button>
			</Fragment>
		);
	}
}

export default App;
