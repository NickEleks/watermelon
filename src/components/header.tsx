import { FC } from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { getAuth, signOut } from 'firebase/auth';

const Header: FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/login')
      })
      .catch((error: any) => {
        alert(`we got an error ${error}`)
      });
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={Logo} alt="wm" width={50}/>
          <Typography variant="h4"  align='center'  sx={{ flexGrow: 1 }}>
            Watermelon
          </Typography>
          <Box sx={{gap: 2, display: 'flex'}}>
            <Button color="success" variant="contained" onClick={() => navigate('/login')}>Login</Button>
            <Button color="error" variant="contained" onClick={logOut}>Log out</Button>
          </Box>
        </Toolbar>
    </AppBar>
    </Box>
  )
}

export default Header