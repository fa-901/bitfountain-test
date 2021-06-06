import * as React from 'react';
import { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {
    token: string,
    reload: () => void,
}

interface List {
    Id: number,
    Description: string,
}
interface State {
    brand: string,
    name: string,
    typeId: number,
    comment: string,
    loading: boolean,
    msg: string,
    typeList: List[],
}

export default class AddDevice extends React.Component<Props> {
    state: State = {
        brand: '',
        name: '',
        typeId: 1,
        comment: '',
        loading: false,
        typeList: [],
        msg: '',
    };

    componentDidMount() {
        this.loadOptions();
    }

    loadOptions = () => {
        /**removed limit & page to get all options */
        const url: string = `http://163.47.115.230:30000/api/devicetype`;

        fetch(url, {
            method: 'GET',
            headers: {
                'authorization': this.props.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ typeList: data[0] });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    /**saves data */
    save = () => {
        const { brand, name, typeId, comment } = this.state;
        const url = `http://163.47.115.230:30000/api/devicemodel`
        const body = {
            "BrandId": brand,
            "Name": name,
            "TypeId": typeId,
            "Comment": comment
        }
        this.setState({ loading: true });

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
                let str = 'Data saved';
                if (data.status === 400) {
                    str = 'Data not saved'
                }
                this.setState({ msg: str, loading: false })
                this.hide();
                this.clear();
                this.props.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    /**hides success message after 2s */
    hide = () => {
        setTimeout(() => {
            this.setState({ msg: '' })
        }, 2000);
    }

    inputChange = (e: any) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    selectChange = (e: any) => {
        this.setState({
            typeId: parseInt(e.currentTarget.value, 10)
        })
    }

    clear = () => {
        this.setState({
            brand: '',
            name: '',
            typeId: 1,
            comment: '',
        })
    }

    render() {
        const { brand, name, loading, comment, msg, typeList, typeId } = this.state;

        let options = typeList.map((e) => {
            return (
                <option key={e.Description} value={e.Id}>
                    {e.Description}
                </option>
            )
        })

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
                        <label htmlFor="type">Type</label>
                        <select id="type" className="form-control" onChange={this.selectChange} value={typeId}>
                            {options}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="comm">Comment</label>
                        <input type="text" className="form-control" id="comm" name='comment' value={comment} onChange={this.inputChange} />
                    </div>
                </div>
                <div className="form-group">
                    <button className='btn btn-success btn-sm mr-2' disabled={loading} onClick={this.save}>Save</button>
                    <button className='btn btn-secondary btn-sm mr-2' disabled={loading} onClick={this.clear}>Clear</button>
                    <span className='text-secondary' >{msg}</span>
                </div>
            </Fragment>
        )
    }
}