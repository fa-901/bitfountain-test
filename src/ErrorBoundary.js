import React, { Component, Fragment } from 'react';

/**Error boundary is coded in JS as it is only a wrapper and not pertaining to the main application */
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        const { hasError } = this.state;
        var errMsg = (
            <h2>
                Something went wrong 😭
            </h2>
        );
        var display = hasError ? errMsg : this.props.children;
        return display;
    }
}