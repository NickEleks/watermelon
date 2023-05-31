import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Box } from '@mui/material';
import { Add, Delete, Edit  } from '@mui/icons-material';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { getSeverityColor } from '../utils/helpers';
import { db } from '../firebase';

interface Activity {
  activity_date: string
  activity_label: string
  activity_severity: number
  activity_id_path: number
}
const ActivityTable: FC = () => {
  const navigate = useNavigate();
  const [allActivities, setAllActivities] = useState<Activity[]>([])

  useEffect(() => {
    getActivities()
      .then()
      .catch((error) => alert(`we got an error ${error}`))
  }, [])
  
  async function getActivities() {
    const activitiesCol = collection(db, 'actions');
    const activitySnapshot = await getDocs(activitiesCol);
    const activityList = activitySnapshot.docs.map(doc => doc.data());
    console.log('gg =',activitySnapshot, activityList);
    setAllActivities(activityList as Activity[]);
    return activityList;
  }

  const onEdit = (activity: Activity) => {
    navigate('/calendar-planner', { state: activity });
  }

  const onRemove = async (activity: Activity) => {
    await deleteDoc(doc(db, '/actions/', activity.activity_id_path.toString()));
    await getActivities();
  }

  return (
    <>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Typography align='left' component="h3" sx={{margin: '5px 0', fontSize: 26}}>Activity Table</Typography>
          <Button variant="contained" color="primary" endIcon={<Add />} onClick={() =>  navigate('/calendar-planner')}>Add new Activity</Button>
        </Box>
        <br/>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Activity</TableCell>
                <TableCell align="center">Importance</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allActivities.map((activity, index) => (
                <TableRow
                  key={`row_${activity.activity_label}_${activity.activity_date}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">{++index}</TableCell>
                  <TableCell align="center">{activity.activity_label}</TableCell>
                  <TableCell align="center" style={{backgroundColor: getSeverityColor(activity.activity_severity)}}>
                    {activity.activity_severity}
                  </TableCell>
                  <TableCell align="center">{activity.activity_date}</TableCell> 
                  <TableCell align="center"><IconButton onClick={() => onEdit(activity)}><Edit/></IconButton></TableCell>
                  <TableCell align="center"><IconButton onClick={() => onRemove(activity)}><Delete/></IconButton></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Grid>
    </>
  );
}

export default ActivityTable