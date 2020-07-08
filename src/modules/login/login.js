import React, { Component } from 'react';
import Service from '../services/services';
import ErrorMessage from '../error';

export default class Login extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',           
            notification: false,
            error: false
        }
        this.service = new Service();
    }

    authorizeUser = async (event) => {
        event.preventDefault();
        const {login, password} = this.state;
        try {
            const {id} = await this.service.getApprovalLogin(login, password);
            if (id) {
                this.setState({notification: false});
                this.props.defineLogin(id);
            } else {
                this.setState({notification: true, login: '', password: ''})
            }
        } catch {
            this.setState({error: true})
        }
    }

    handleInputChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    render() {
        if (this.state.error) {return <ErrorMessage/>}
        const display = this.state.notification ? 'd-block' : 'd-none';

        return (
            <>
                <form onSubmit = {this.authorizeUser}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Login</label>
                        <input name="login" type="text" className="form-control" placeholder="Enter login" onChange = {this.handleInputChange} value={this.state.login}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input name="password" type="password" className="form-control" placeholder="Password" onChange = {this.handleInputChange} value={this.state.password}></input>
                    </div>
                    <button type="submit" className="btn btn-primary form-group">Submit</button>
                    <div className={`${display} alert alert-primary`} role="alert">
                        <p className="alert-link">Не удаётся войти.</p>
                        <span>Пожалуйста, проверьте правильность написания <span className="alert-link">логина</span> и <span className="alert-link">пароля.</span></span>
                    </div>
                </form>
            </>
        );
    }
};