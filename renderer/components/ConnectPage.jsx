import React from 'react';
import { ipcRenderer } from 'electron';
import { CONNECTION_LOOK, CONNECTION_CREATED, CONNECTION_RECEIVED } from '../../utils/constants';

export default class ConnectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isConnected: false,
            host: '',
            port: '',
            username: '',
            password: '',
            database: '',
            code: '',
        };

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
                host: con.host,
                port: con.port,
                username: con.username,
                password: con.password,
                database: con.database,
                code: con.code,
            });
        }
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

    handleSubmit(e) {
        e.preventDefault();

        const formData = this.state;
        ipcRenderer.send(CONNECTION_CREATED, formData);
        ipcRenderer.once(CONNECTION_RECEIVED, (event, err) => {
            if (!err) {
                this.setState({ isConnected: true });
            }
        });
    }

    render() {
        const { isConnected } = this.state;
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
                                        <i className="fas fa-link" style={{ width: '30px' }}></i>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="host"
                                    placeholder="Host"
                                    value={this.state.host}
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
                                    value={this.state.port}
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
                                    value={this.state.username}
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
                                    value={this.state.password}
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
                                    value={this.state.database}
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
                                        <i
                                            className="fas fa-hospital-alt"
                                            style={{ width: '30px' }}
                                        ></i>
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="code"
                                    placeholder="Code"
                                    value={this.state.code}
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
