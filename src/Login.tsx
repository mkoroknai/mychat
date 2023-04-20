import React, { Component } from 'react';
import { proxy } from './Proxy';
//import './TextInput.css'
import { TextInput } from './TextInput';
import { Navigate } from 'react-router-dom';


export class Login extends Component {
    state = { email: "", password: "", displayName: "", register: false };
    render() {
        
        //const name = "Rafa";
        return (
            <div className="login">
                <img src="logo512.png" width="256" />
                {this.state.register &&
                    <TextInput type="text" placeholder="Display Name (Agent Smith)" value={this.state.displayName} onChange={e => this.setState({ displayName: e } ) } /> }
                <TextInput type="email" placeholder="Email (someone@example.com)" value={this.state.email} onChange={e => this.onEmailChange(e)} onEnter={ () => this.onClick() } autofocus={ true } />
                <TextInput type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e })} onEnter={ () => this.onClick() } />
                <button type="button" onClick={() => this.onClick()}>
                    {this.state.register ? "Register" : "Login"}
                </button>
                <p>{this.state.register ? "Switch back to " : "Have no account yet? Go and "}
                    <a href="" onClick={e => { e.preventDefault(); this.setState({ register: !this.state.register }); }}>
                        {this.state.register ? "Login" : "Register"}
                    </a>
                </p>
                <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>

            </div>);
    }

    onEmailChange(e_mail: String){
        this.setState({ email: e_mail });
        if (e_mail === "G966H2" || e_mail === "g966h2"){
            this.setState({displayName: "Mate"});
        }
    }

    onClick() {
        if (this.state.register)
            proxy.sendPacket({
                type: "register", email: this.state.email, password: this.state.password,
                displayName: this.state.displayName, staySignedIn: false
            });
        else{
            proxy.sendPacket({
                type: "login", email: this.state.email, password: this.state.password,
                staySignedIn: false
            });
        }
        
        //console.log(this.state);

    }
}