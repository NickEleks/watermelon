import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import { Grid } from '@mui/material';

const App: FC = () => {
  return (
    <div className="App">
      
      <Header />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <Outlet />
      </Grid>
    </div>
  );
}

export default App;
