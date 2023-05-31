import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Stack, TextField, Button, Grid, Typography } from '@mui/material'
import { auth } from '../firebase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate("/calendar-planner")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    }); 
  }

  return (
    <Grid item xs={3}>
      <Typography align='center' component="h3" sx={{margin: '10px auto', fontSize: 26}}>Login Page</Typography>
      <Stack
        component="form"
        sx={{
          width: '30ch',
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField 
          id="email"
          label="Enter your email"
          variant="outlined"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Enter your password"
          variant="outlined"
          type='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <Button variant="contained" color="success" onClick={onLogin}>Login</Button>
      </Stack>
    </Grid>
  );
}
