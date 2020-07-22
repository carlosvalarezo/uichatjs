import React from 'react';
import Users from './users/Users';

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Chat = props => {
    const location = useLocation();

    useEffect(() => {
       console.log(location.pathname);
       console.log(location.search);
       console.log(location.token); 
    }, [location]);

    return(<><Users/></>)

};

export default Chat;
