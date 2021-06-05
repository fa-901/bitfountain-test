import * as React from 'react';
import { Fragment } from 'react';

interface Props {
    token: string,
}

interface State {
    user: string,
    pass: string,
    isErr: boolean
}

export default class Devices extends React.Component<Props> {
    state: State = {
        user: '',
        pass: '',
        isErr: false,
    };

    render() {
        const { user, pass, isErr } = this.state;

        return (
            <div className="">
                test
            </div>
        )
    }

}