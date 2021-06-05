import * as React from 'react';
import { Fragment } from 'react';

interface Props {

}

export default class Login extends React.Component<Props> {
    constructor(props: any) {
        super(props);

        this.state = {
            user: '',
            pass: '',
        }
    }

    render() {
        return (
            <Fragment>
                fssdf
            </Fragment>
        )
    }

}