import React, {Component} from "react";
import { useState } from 'react';
import axios from "axios";
import { Button } from 'react-bootstrap';
// import "./styles/_home.scss";
import "./Login.css"
import DrawerRouterContainer from "./layout/DrawerRouterContainer";
import {withRouter} from "react-router-dom";
import {Alert, AlertTitle} from '@material-ui/lab';
import EcoRoundedIcon from '@material-ui/icons/EcoRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import HttpsRoundedIcon from '@material-ui/icons/HttpsRounded';
import { rgbToHex } from "@material-ui/core";

const apiUrl = process.env.REACT_APP_API_URL;
class Login extends Component {
    constructor(props){
        super(props);

        this.state={
            username: "",
            password: "",
            isShow: false,
            // user:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange (e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleClose = (e) => {
        this.setState({isShow : false})
    }
    
    handleSubmit(){
        console.log("handle submission", this.state.password);
        // let bodyFormData = new FormData();
        // bodyFormData.set('username',this.state.username);
        // bodyFormData.set('password', this.state.password);

        axios({
                method: "post",
                url: `${apiUrl}/login`,
                // url: "http://localhost:8080/login",
                //https://coaching-mate0121.herokuapp.com/login
                headers: {
                    "Accept": '*/*',
                    // "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "*",
                    // "Access-Control-Allow-Credentials": "true", 
                },
                params:{
                    username: this.state.username,
                    password: this.state.password
                }
                //data: bodyFormData
                //mode: "no-cors",
            }
        )
        .then((res)=>{
            console.log("response",res)
            // this.setState({user: res.data})
            // console.log('user is ',this.state.user)
            // redirect to home page
            this.props.history.push({
                pathname:'/home',
                state: {user: res.data,
                        username: res.data.username}
            })

        })
        .catch((error)=> {
            this.setState({isShow : true})
            console.log("error", error)
            
        })
    }

render(){
    return(
        <div className="Login">
            <a href='/register'>Register</a>
            <div>
                <h4 className="d-register"> Login</h4>{' '}
            </div>
            <div className="form-group">
            
            <div>
            <div className="pt-md-3">
                <h4 className="d-inline"> Username:</h4>{' '}
                <input
                    className="d-inline"
                    name="username"
                    type="username"
                    onChange={this.handleChange}
                    //placeholder="please input your username"
                    value={this.state.username}
                    required
                />
            </div>
            <div className="py-md-3">
                <h4 className="d-inline"> Password:</h4>{' '}
                <input
                    className="d-inline"
                    name="password"
                    type="password"
                    //placeholder="please input your password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                 />
            </div>
            <Button 
                type="submit"
                variant="success"
                className="button-home"
                onClick={this.handleSubmit}> 
                Log in 
            </Button>
            </div>
                {this.state.isShow? <Alert severity="warning">
                Oops! Invalid username or password! Please try again:) </Alert> : null}
            </div>
        </div>     
        );
    }
}
export default withRouter(Login);
