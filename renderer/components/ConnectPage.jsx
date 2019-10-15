import React from 'react';
import { ipcRenderer, remote } from 'electron';
import { CONNECTION_LOOK, CONNECTION_CREATED, CONNECTION_RECEIVED } from '../../utils/constants';

const { dialog } = remote;

export default class ConnectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isConnected: false,
            driver: '',
            host: '',
            port: '',
            username: '',
            password: '',
            database: '',
            code: '',
        };

        this.handleDriverChange = this.handleDriverChange.bind(this);
        this.handleHospChange = this.handleHospChange.bind(this);
        this.handlePortChange = this.handlePortChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleDbChange = this.handleDbChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        document.title = 'Connection';
        const con = ipcRenderer.sendSync(CONNECTION_LOOK);
        if (con) {
            this.setState({
                isConnected: true,
                driver: con.driver,
                host: con.host,
                port: con.port,
                username: con.username,
                password: con.password,
                database: con.database,
                code: con.code,
            });
        }
    }

    isCode(val) {
        const encode = encodeURIComponent(JSON.stringify({ partnerid: val }));
        return fetch(`https://2900e5f8-f4cd-42d3-b61f-01b98e426096.mock.pstmn.io?match=${encode}`, {
            /* headers: {
                'X-Api-Key': 'abcd',
            }, */
        })
            .then(response => response.json())
            .then(response => {
                if (response.length) {
                    return true;
                }

                return false;
            })
            .catch(() => {
                return false;
            });
    }

    handleDriverChange(e) {
        this.setState({ driver: e.target.value });
    }

    handleHospChange(e) {
        this.setState({ host: e.target.value });
    }

    handlePortChange(e) {
        this.setState({ port: e.target.value });
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleDbChange(e) {
        this.setState({ database: e.target.value });
    }

    handleCodeChange(e) {
        this.setState({ code: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = this.state;

        if (formData.driver === '') {
            dialog.showErrorBox('Form validator', 'Driver is required');
        } else if (formData.host === '') {
            dialog.showErrorBox('Form validator', 'Host is required');
        } else if (formData.port === '') {
            dialog.showErrorBox('Form validator', 'Port is required');
        } else if (formData.database === '') {
            dialog.showErrorBox('Form validator', 'Database is required');
        } else if (formData.username === '') {
            dialog.showErrorBox('Form validator', 'Username is required');
        } else if (formData.code === '') {
            dialog.showErrorBox('Form validator', 'Code is required');
        } else {
            const isCode = await this.isCode(formData.code);
            if (!isCode) {
                dialog.showErrorBox('Form validator', 'Invalid Code');
                return;
            }

            ipcRenderer.send(CONNECTION_CREATED, formData);
            ipcRenderer.once(CONNECTION_RECEIVED, (event, err) => {
                if (!err) {
                    this.setState({ isConnected: true });
                }
            });
        }
    }

    render() {
        const { isConnected, driver, host, port, username, password, database, code } = this.state;
        return (
            <div className="content-connect">
                <div className="body">
                    <div className="title">
                        <div className="logobox"></div>
                        <h2>Connect to database</h2>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span
                                        className="input-group-text"
                                        id="inputGroup-sizing-default"
                                    >
                                        <i className="fas fa-dice-d6" style={{ width: '30px' }}></i>
                                    </span>
                                </div>
                                <select
                                    className="form-control"
                                    name="driver"
                                    value={driver}
                                    onChange={this.handleDriverChange}
                                >
                                    <option disabled value="">
                                        Select Driver
                                    </option>
                                    <option value="Postgresql">Postgresql</option>
                                    <option value="Mysql">Mysql</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span
                                        className="input-group-text"
                                        id="inputGroup-sizing-default"
                                    >
                                        <i className="fas fa-link" style={{ width: '30px' }}></i>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="host"
                                    placeholder="Host"
                                    value={host}
                                    onChange={this.handleHospChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span
                                        className="input-group-text"
                                        id="inputGroup-sizing-default"
                                    >
                                        <i className="fas fa-anchor" style={{ width: '30px' }}></i>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="port"
                                    placeholder="Port"
                                    value={port}
                                    onChange={this.handlePortChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span
                                        className="input-group-text"
                                        id="inputGroup-sizing-default"
                                    >
                                        <i className="fas fa-user" style={{ width: '30px' }}></i>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={this.handleUsernameChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span
                                        className="input-group-text"
                                        id="inputGroup-sizing-default"
                                    >
                                        <i className="fas fa-key" style={{ width: '30px' }}></i>
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.handlePasswordChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span
                                        className="input-group-text"
                                        id="inputGroup-sizing-default"
                                    >
                                        <i
                                            className="fas fa-database"
                                            style={{ width: '30px' }}
                                        ></i>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="database"
                                    placeholder="Database"
                                    value={database}
                                    onChange={this.handleDbChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span
                                        className="input-group-text"
                                        id="inputGroup-sizing-default"
                                    >
                                        <i className="fas fa-qrcode" style={{ width: '30px' }}></i>
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="code"
                                    placeholder="Code"
                                    value={code}
                                    onChange={this.handleCodeChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit">
                                <i
                                    className="fas fa-circle"
                                    style={{
                                        width: '30px',
                                        color: isConnected ? '#b4dd7f' : '#ff826e',
                                    }}
                                ></i>
                                connect
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
