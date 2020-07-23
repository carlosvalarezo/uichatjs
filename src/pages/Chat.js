import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Users from './users/Users';
import io from "socket.io-client";

import { useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Chat = props => {
    const location = useLocation();
    const classes = useStyles();

    const [jwtToken, setJwtToken] = useState('');
    const [messages, setMessages] = useState('');
    const [message, setMessage] = useState('');

    const SERVER = process.env.DEPLOY
                   ? "http://chatbff:8002"
                   : "http://localhost:8002"

    useEffect(() => {
      const {token} = location;
      setJwtToken(token);
    }, [location, jwtToken]);



    const ioClient = io.connect(SERVER);

    ioClient.on("start", msg => console.info(msg));

    console.log("chat..");

    ioClient.on("send-rabbit-message-to-client", msg => {
      const {time, message} = msg;
      console.log({name:"Bot", time, message});
    });
    ioClient.on("send-mongo-message-to-client", msg => {
      const {owner, message, time} = msg.message.owner !== null ? msg.message : {owner:{}};
      const {name, avatar} = owner ? owner : {name:'', avatar:''};
      console.log({name, time, message, avatar});
    });



    return(<>
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <div>
            {messages}
          </div>

          <TextField
            error={false}
            fullWidth
            id="message"
            label="Message"
            placeholder="Message"
            margin="normal"
            helperText=''
            onChange={(e)=>setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={() => {
              ioClient.emit('new-message', jwtToken, message);
            }}
            disabled={false}>
            send
          </Button>
        </form>
      </div>
      </>);


};

export default Chat;
