import { FC, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stack, TextField, Button, Grid, Typography, MenuItem, FormControl, InputLabel } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar , LocalizationProvider, enUS} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from '@mui/material/Select';
import { severityRate } from '../utils/constants'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase';

const CalendarPlanner: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [activity, setNewActivity] = useState('');
  const [severity, setSeverity] = useState('');
  const [actionPath, setActionPath] = useState(Math.floor(1000 + Math.random() * 9000));

  useEffect(() => {
    console.log('location.state =', location.state)
    if (location.state){
      // I knew we can use Object state with bulk update here-
      // to not dublicate single setState, sorry (write this only for test purppose) ;)
      setDate(dayjs(location.state?.activity_date));
      setNewActivity(location.state?.activity_label);
      setSeverity(location.state?.activity_severity);
      setActionPath(location.state?.activity_id_path);
    }
  }, [location.state])

  const onSave = async () => {
    if(activity) {
      await setDoc(doc(db, `/actions/${actionPath}`), {
        activity_date: date?.format('MM-DD-YYYY'),
        activity_label: activity,
        activity_severity: severity,
        activity_id_path: actionPath,
      });
      navigate('/activity-table')
    }
  }

  return (
    <>
      <Typography align='center' component="h3" sx={{margin: '10px auto', fontSize: 26}}>Calendar Planner</Typography>
      <Stack component="form" noValidate autoComplete="off" direction="row" sx={{ minWidth: 700 }}>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} localeText={enUS.components.MuiLocalizationProvider.defaultProps.localeText}>
            <DateCalendar value={date} onChange={(newDate) =>  setDate(newDate)} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} justifyContent="center">

          <FormControl fullWidth margin="normal">
            <TextField 
              id="activity"
              label="Enter your activity"
              variant="outlined"
              value={activity}
              onChange={(e)=>setNewActivity(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="rate-label">Severity rate</InputLabel>
            <Select
              labelId="rate-label"
              id="rate"
              value={severity}
              label="severity rate"
              onChange={(e)=>setSeverity(e.target.value)}
            >
              {severityRate?.map((severity) => (
                <MenuItem key={`select_item_${severity.val}`} value={severity.val}>{severity.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button 
            variant="contained" 
            color="success" 
            onClick={onSave}
            sx={{minWidth: 180, display: 'block', margin: '15px auto', alignSelf: 'center'}} 
          >
            Save
          </Button>
        </Grid>
      </Stack>
    </>
  );
}

export default CalendarPlanner