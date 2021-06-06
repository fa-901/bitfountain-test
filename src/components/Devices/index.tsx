import * as React from 'react';
import { Fragment } from 'react';
import { Table, Spinner, Pagination } from 'react-bootstrap';
import DataTable, { IDataTableColumn } from 'react-data-table-component';

interface Props {
    token: string,
}

interface Device {
    Id: number,
    BrandId: string,
    Name: string,
    Description: string,
}
interface State {
    deviceData: Device[],
    page: number,
    tableLoading: boolean,
    deviceLoading: boolean,
}

export default class Devices extends React.Component<Props> {
    state: State = {
        deviceData: [],
        page: 1,
        tableLoading: false,
        deviceLoading: false,
    };

    componentDidMount() {
        this.loadDevices();
    }

    loadDevices = () => {
        const url: string = `http://163.47.115.230:30000/api/overview/modeltype`;
        this.setState({ tableLoading: true });

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': this.props.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ deviceData: data, tableLoading: false });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    createTable = () => {
        const { deviceData, tableLoading } = this.state;

        const tableColumns: IDataTableColumn[] = [
            { "selector": 'Id', sortable: true, "name": 'ID' },
            { "selector": 'BrandId', sortable: true, "name": 'Brand' },
            { "selector": 'Name', sortable: true, "name": 'Name' },
            { "selector": 'Description', sortable: true, "name": 'Description' },
        ];

        var table = (
            <DataTable
                pointerOnHover
                noHeader
                data={deviceData}
                columns={tableColumns}
                fixedHeader={false}
                progressPending={tableLoading}
                onRowClicked={(e) => { this.loadDetails(e) }}
                progressComponent={<Spinner animation={'border'} variant="standard" />}
                pagination
                paginationPerPage={10}
                paginationComponentOptions={{ noRowsPerPage: true }}
            />
        )
        return table;
    }

    loadDetails = (e: object) => {
        console.log(e)
    }

    render() {
        const { tableLoading } = this.state;

        return (
            <Fragment>
                <h5>Device list</h5>
                {this.createTable()}
            </Fragment>
        )
    }

}