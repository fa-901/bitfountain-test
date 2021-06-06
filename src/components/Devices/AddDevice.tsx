import * as React from 'react';
import { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {
    token: string,
    reload: ()=>void,
}
interface State {
    brand: string,
    name: string,
    typeId: number,
    comment: string,
    loading: boolean,
    msg: string,
}

export default class AddDevice extends React.Component<Props> {
    state: State = {
        brand: '',
        name: '',
        typeId: 1,
        comment: '',
        loading: false,
        msg: '',
    };

    save = () => {
        const { brand, name, typeId, comment } = this.state;
        const url = `http://163.47.115.230:30000/api/devicemodel`
        const body = {
            "BrandId": brand,
            "Name": name,
            "TypeId": typeId,
            "Comment": comment
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': this.props.token,
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ msg: 'Data saved'})
                this.props.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    inputChange = (e: any) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    render() {
        const { brand, name, typeId, comment, msg } = this.state;

        return (
            <Fragment>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="brand">Brand</label>
                        <input type="text" className="form-control" id="brand" name='brand' value={brand} onChange={this.inputChange} />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name='name' value={name} onChange={this.inputChange} />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="type">State</label>
                        <select id="type" className="form-control">
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="comm">Comment</label>
                        <input type="text" className="form-control" id="comm" name='comment' value={comment} onChange={this.inputChange} />
                    </div>
                </div>
                <div className="form-group">
                    <button className='btn btn-success btn-sm' onClick={this.save}>Save</button>
                    <span className='text-success'>{msg}</span>
                </div>
            </Fragment>
        )
    }
}