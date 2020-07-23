import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
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
const SERVER = process.env.DEPLOY
               ? "http://chatbff:8002"
               : "http://localhost:8002"
const ioClient = io.connect(SERVER);
ioClient.on("start", msg => console.info(msg));

console.log("chat..");

ioClient.on("send-rabbit-message-to-client", msg => {
  // const {time, message} = msg;
  console.log(msg);
});
const Chat = props => {
    const location = useLocation();
    const classes = useStyles();

    const [jwtToken, setJwtToken] = useState('');
    const [messages, setMessages] = useState('');
    const [message, setMessage] = useState('');



    useEffect(() => {
      const {token} = location;
      setJwtToken(token);
    }, [location, jwtToken]);

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
