import * as React from 'react';
import { Fragment } from 'react';

interface Props {
    onLogin: (e: string) => void
}

interface State {
    user: string,
    pass: string,
    isErr: boolean
}

export default class Login extends React.Component<Props> {
    state: State = {
        user: '',
        pass: '',
        isErr: false,
    };

    inputChange = (e: any) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    validate = () => {
        const { user, pass } = this.state;
        const url: string = `http://163.47.115.230:30000/api/login`;
        const data: object = {
            "email": user,
            "password": pass
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.user || data.access_token) {
                    this.props.onLogin(data.access_token);
                }
                else {
                    this.setState({ isErr: true, })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        const { user, pass, isErr } = this.state;

        return (
            <div className="form-signin text-center">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={user} onChange={this.inputChange} name='user' />
                <label htmlFor="inputPassword" className="sr-only" >Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={pass} onChange={this.inputChange} name='pass' />
                <button className="btn btn-lg btn-primary mt-2" onClick={this.validate}>Sign in</button>
                {isErr && <div className='text-danger'>User/pass is wrong</div>}
            </div>
        )
    }

}