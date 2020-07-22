import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const User = () => {
  return(
    <Box component="span" m={1}>
      <Grid container>
           <Grid item xs={1}>
                 <Avatar>H</Avatar>
           </Grid>
           <Grid item xs={4}>
               <div>Name</div>
           </Grid>
      </Grid>
    </Box>
  )};

export default User;
