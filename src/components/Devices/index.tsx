import * as React from 'react';
import { Fragment } from 'react';
import { Modal, Spinner, Button, Accordion } from 'react-bootstrap';
import DataTable, { IDataTableColumn } from 'react-data-table-component';
import AddDevice from './AddDevice';

interface Props {
    token: string,
    onLogout: ()=>void,
}

interface Device {
    Id: number,
    BrandId: string,
    Name: string,
    Description: string,
}
interface State {
    deviceData: Device[],
    modelData: [],
    tableLoading: boolean,
    detailsLoading: boolean,
    showDetails: boolean,
}

export default class Devices extends React.Component<Props> {
    state: State = {
        deviceData: [],
        modelData: [],
        tableLoading: false,
        detailsLoading: false,
        showDetails: false,
    };

    componentDidMount() {
        this.loadDevices();
    }

    /**loads list of model types */
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
            { "selector": 'Name', sortable: true, "name": 'Model' },
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
                paginationPerPage={20}
                paginationComponentOptions={{ noRowsPerPage: true }}
            />
        )
        return table;
    }

    /**creates a table view */
    createModelTable = () => {
        const { modelData, detailsLoading } = this.state;

        const tableColumns: IDataTableColumn[] = [
            { "selector": 'Id', sortable: true, "name": 'ID' },
            { "selector": 'DataType', sortable: true, "name": 'Data Type' },
            { "selector": 'Brand', sortable: true, "name": 'Brand' },
            { "selector": 'Model', sortable: true, "name": 'Model' },
            { "selector": 'DisplayName', sortable: true, "name": 'Name' },
            { "selector": 'Description', sortable: true, "name": 'Description' },
        ];

        var table = (
            <DataTable
                pointerOnHover
                noHeader
                data={modelData}
                columns={tableColumns}
                fixedHeader={false}
                progressPending={detailsLoading}
                progressComponent={<Spinner animation={'border'} variant="standard" />}
                pagination
                paginationPerPage={10}
                paginationComponentOptions={{ noRowsPerPage: true }}
            />
        )
        return table;
    }

    /** loads model data */
    loadDetails = (e: Device) => {
        this.toggleModal();
        this.setState({ detailsLoading: true });
        const url = `http://163.47.115.230:30000/api/overview/modeldata/${e.BrandId}/${e.Name}`;
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
                this.setState({ modelData: data, detailsLoading: false });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    toggleModal = () => {
        this.setState((p: State) => {
            return {
                showDetails: !p.showDetails,
            }
        })
    }

    render() {
        const { tableLoading, showDetails } = this.state;

        return (
            <Fragment>
                <Accordion>
                    <div className="d-flex align-items-center form-group">
                        <h5>Device list</h5>
                        <div className='btn-group ml-auto'>
                            <Accordion.Toggle as={Button} variant="outline-primary" eventKey="0" className=''>
                                Add New Device
                            </Accordion.Toggle>
                            <Button variant="outline-danger" onClick={this.props.onLogout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                    <Accordion.Collapse eventKey="0">
                        <AddDevice token={this.props.token} reload={this.loadDevices} />
                    </Accordion.Collapse>
                </Accordion>
                {this.createTable()}
                <Modal show={showDetails} onHide={this.toggleModal} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>Model Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.createModelTable()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }

}