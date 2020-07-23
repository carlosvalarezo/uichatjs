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
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from 'axios';


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

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const SERVER = process.env.DEPLOY
                ? 'http://chatserver:8001/login'
                : 'http://localhost:8001/login'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const routeChange = response =>{
    const pathname = `/chat`;
    const {token} = response.data;
    history.push({pathname, token});
  }

  const handleLogin = () => {
    const headers = {'Access-Control-Allow-Origin':'*'}
    const data = {email, password};
    axios.post(SERVER, data, {headers})
      .then(response =>{
        if(response.status !== 403){
          console.log("login", response);
          routeChange(response);
        }
        //aqui mostrar un mensaje de error
      })
      .catch(function(error) {
        console.warn(error);
      });
  };

  return(<Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          error={error}
          fullWidth
          id="email"
          type="email"
          label="Email"
          placeholder="Email"
          margin="normal"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField
          error={error}
          fullWidth
          id="password"
          type="password"
          label="Password"
          placeholder="Password"
          margin="normal"
          helperText={helperText}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          color="secondary"
          className={classes.loginBtn}
          onClick={()=>handleLogin()}
          disabled={isButtonDisabled}>
          Login
        </Button>
      </form>
    </div>
  </Container>
  );
}

export default Login;
