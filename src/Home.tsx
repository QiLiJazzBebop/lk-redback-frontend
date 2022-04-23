import React, {Component}  from "react";
// import { user } from "./layout/DrawerRouterContainer";
import "./styles/_home.scss";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from "react";
// import Qs from 'qs';
import DrawerRouterContainer from "./layout/DrawerRouterContainer";
import { useLocation } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { Link } from "react-router-dom";
import { string } from "prop-types";
import {withRouter} from "react-router-dom";
import CameraIcon from '@material-ui/icons/Camera';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import TelegramIcon from '@material-ui/icons/Telegram';

const apiUrl = process.env.REACT_APP_API_URL;

const Home = (props) => {
    const location = useLocation();
    let username;
    const [redirect, setRediret] = useState<string>();
    const [open, setOpen] = useState(false);
    // let redirect;
    let user;
    
    // let isUser = false;

    // if(user! == null){
    //     isUser = true;
    // }

//   useEffect(() => {
//       if(location.state){
//     console.log(location.state.user);
//     console.log(location.state.username)}
//   }, [location])

    if (location.state){
    username = location.state.username;
    user = location.state.user;
    }

    const handlePermission = () => {
        // console.log(this.state.username)
        setOpen(true);
        let bodyFormData = new FormData();
        bodyFormData.append('username', username);
        axios({
            method: "POST",
            url:`${apiUrl}/auth/requestToken`, 
            headers: {
                // "Access-Control-Allow-Origin": "*",
                "Accept": '*/*',
                // "Content-Type": "application/json",
                // "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
                            },
            data: bodyFormData,
        }).then(function(res){
            // console.log(res.headers)
            console.log('username is', bodyFormData)
            console.log("URL", res)
            console.log("data",res.data.url)
            // redirect = res.data.url
            // redirect.push.apply(redirect, res.data.url)
            setRediret(res.data.url)
            console.log("redirect",redirect)

        })
           .catch(error=>
            console.log("error", error))
    }

    const handleClose = () => {
        setOpen(false);
      }

    const goDashboard = () =>{
        if (username){
            props.history.push({
                pathname:'/dashboard',
                state: {username: username,
		user:user}
            })
        }
    }
    const connectGarmin = ()=>{
        console.log("cmdd",user.userAccessToken)
        
        if (user.userAccessToken) {
            return(<div><h4 >You are already connected. Please visit the dashboard view your activities.</h4> 
            {/* <p className="my-4">If you have given permission to us, you can view your data on dashboard! <TelegramIcon /></p> */}
                <Button 
                    variant="info"
                    className="button-home"
                    onClick={goDashboard}
                    >Go to dashboard
                </Button>

                </div>
            )
        }
        else {
            return (<div>
                <h4 >Would you like to give permission to your Garmin Connect account?</h4>
                <p>If we cannot connect to your Garmin account, this may affect your experience. <SentimentDissatisfiedIcon /></p>
                <div className="row">
                    <div className="col">
                        <Button
                            className="button-home"
                            variant="success"
                            onClick={handlePermission}
                            // href={redirect}
                        >
                            Sure, connect now!
                        </Button>
                    </div>
                    <div className="col">
                        <Button 
                            className="button-home"
                            variant="secondary"
                            href="/">
                            No, will try later!
                        </Button>
                    </div>
                </div>
                </div>)
        }
        
    }


    return (
        <>
        {(username==null) ? (
            <a href="/">
                <h2>Please log in first! :)</h2>
            </a>) : (
           
        <DrawerRouterContainer>
            <div className="rounded-lg background-pic"> </div>
            <div
                className="p-md-4 rounded-lg welcome-wrapper"
                style={{
                    backgroundColor: "#F0FFFF",
                    opacity:0.9,
                }}
            >
                <div className="m-4">
                <h2>
                    <DirectionsBikeIcon className="m-2"/>
                    <b>Hello {username}, Welcome to Garmin Dashboard</b>
                </h2>
                <h4> <EventAvailableIcon className="m-2" />Today is {' '}
                {new Date().getDate()}/{new Date().getMonth() + 1}/
                    {new Date().getFullYear()}
                </h4>
                <br></br>

                {/* <h4>Please input your unique username!</h4>
                <input
                    className="button-home"
                    name="username"
                    type="username"
                    onChange={this.handleChange}
                    value={this.state.username}
                /><br></br><br></br> */}
                
                {/* <div>
                <h4 >Would you like to give permission to your Garmin Connect account?</h4>
                <p>If we cannot connect to your Garmin account, this may affect your experience. <SentimentDissatisfiedIcon /></p>
                <div className="row">
                    <div className="col">
                        <Button
                            className="button-home"
                            variant="success"
                            onClick={handlePermission}
                            // href={redirect}
                        >
                            Sure, connect now!
                        </Button>
                    </div>
                    <div className="col">
                        <Button 
                            className="button-home"
                            variant="secondary"
                            href="/">
                            No, will try later!
                        </Button>
                    </div>
                </div>
                </div>
                <p className="my-4">If you have given permission to us, you can view your data on dashboard! <TelegramIcon /></p>
                <Button 
                    variant="info"
                    className="button-home"
                    onClick={goDashboard}
                    >Go to dashboard
                </Button> */}
                <div>{connectGarmin()}</div>
                </div>

                {/* Tilda: the pop up box for permission*/}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirm Permission"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you like to give permission to our site? If so, you will be direct to the Garmin Connect login page.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button variant="secondary" onClick={handleClose}>
                        Disagree
                    </Button>

                    <Button variant="success" href={redirect} autoFocus>Agree
                    </Button>
                    </DialogActions>
                </Dialog>
                
            </div>
        </DrawerRouterContainer>
        )
        }</>
    );

}

export default withRouter(Home);


// const location = useLocation();

// export default class Home extends React.Component <{}, {redirect: string, location: object, username: string}>{
    
//     constructor(props) {
//         super(props);
//         this.state = {
//            location: location,
//            username: location.state.username,
//            redirect:"",
//         };

//         // this.handleChange = this.handleChange.bind(this);
//         this.handlePermission = this.handlePermission.bind(this);
//     }
    
//     handlePermission = () => {
//         // console.log(this.state.username)
//         axios({
//             method: "get",
//             // url: "http://localhost:8080/auth/requestToken",
//             url:"https://coachingmate-backend2020.herokuapp.com/auth/requestToken",

//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Accept": 'application/json',
//                 "Content-Type": "application/json",
//                 "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
//             },
//             data:{
//                 // username: Qs.stringify(this.state.username),
                
//             },
//         }).then((res)=>{
//             // console.log(res.headers)
//             console.log("URL", res)
//             console.log("data",res.data.url)
//             this.setState({redirect: res.data.url })
//         })
//            .catch(error=>
//             console.log("error", error)) 
//     }

//     // handleChange (e) {
//     //     this.setState({username: e.target.value})
//     // }


//     render(){
//         return (
//             <DrawerRouterContainer>
//                  <img className="rounded-lg background-pic" src="/3.jpg" alt="bgPic"/>
//                 <div
//                     className="p-md-4 rounded-lg welcome-wrapper"
//                     style={{
//                         backgroundColor: "#C7EDCC",
//                     }}
//                 >
//                     <div className="m-4">
//                     <h2>
//                         <b>Welcome to Garmin Dashboard</b>
//                     </h2>
//                     <h4>Today is {' '}
//                     {new Date().getDate()}/{new Date().getMonth() + 1}/
//                         {new Date().getFullYear()}
//                     </h4>
//                     <br></br>

//                 <h4>{this.state.username}</h4>
//                     {/* <h4>Please input your unique username!</h4>
//                     <input
//                         className="button-home"
//                         name="username"
//                         type="username"
//                         onChange={this.handleChange}
//                         value={this.state.username}
//                     /><br></br><br></br> */}
                    

//                     <h4 >Would you like to give permission to Garmin Connect?</h4>
//                     <div className="row">
//                         <div className="col">
//                             <Button
//                                 className="button-home"
//                                 variant="success"
//                                 onClick={this.handlePermission}
//                                 href={this.state.redirect}
//                             >
//                                 Sure, connect now!
//                             </Button>
//                         </div>
//                         <div className="col">
//                             <Button 
//                                 className="button-home"
//                                 variant="secondary"
//                                 href="/">
//                                 No, will try later!
//                             </Button>
//                         </div>
//                     </div>

//                     </div>
                    
//                 </div>

//             </DrawerRouterContainer>
//         );
// }}
