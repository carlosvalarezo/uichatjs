import React, { useEffect, useState, useReducer } from 'react';
import User from './User';
import axios from 'axios';

const Users = props => {

  const [messages, setMessages] = useState('');

  const SERVER = process.env.DEPLOY
                 ? 'http://chatserver:8001/message'
                 : 'http://localhost:8001/message'

  useEffect(() => {
    const {jwt}=props;
    const headers={'Access-Control-Allow-Origin':'*', 'x-auth-token': jwt};
      const fetchMessages = async () => {
        const messages = await axios.get(SERVER, {headers})
          .then(response => {
              console.log("data ", response.data);
              return new Promise (resolve => resolve(response.data));
          })
          .catch(function(error) {
            console.warn(error);
          });

          setMessages(messages);
        }
        fetchMessages();
    }, [props]);

  console.log(messages);
  return(<>{messages}</>);
}
export default Users;
