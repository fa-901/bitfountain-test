import * as React from 'react';
import { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {
    onLogin: (e: string) => void
}

interface State {
    user: string,
    pass: string,
    isErr: boolean,
    loading: boolean,
}

export default class Login extends React.Component<Props> {
    state: State = {
        user: '',
        pass: '',
        isErr: false,
        loading: false,
    };

    inputChange = (e: any) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    validate = () => {
        const { user, pass } = this.state;
        const url: string = `https://163.47.115.230:30000/api/login`;
        const data: object = {
            "email": user,
            "password": pass
        }
        this.setState({ loading: true })

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
                    this.setState({ isErr: true, loading: false })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        const { user, pass, isErr, loading } = this.state;

        return (
            <div className="form-group">
                <h3 className="text-center mb-3 my font-weight-normal">Please sign in</h3>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={user} onChange={this.inputChange} name='user' />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={pass} onChange={this.inputChange} name='pass' />
                    </div>
                </div>
                <button className="btn btn-primary" onClick={this.validate}>Sign in</button>
                <Spinner animation={loading ? "border" : ''} variant="primary" className='ml-2 align-middle' />
                {isErr && <div className='text-danger'>User/pass is wrong</div>}
            </div>
        )
    }

}