// import React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import CircularProgress from '@mui/material/CircularProgress';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'lightblue',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// const Forecasts = ({ hourly, daily }) => {
//   if (!hourly || !daily) {
//     return <CircularProgress />;
//   }

//   return (
//     <Box sx={{ flexGrow: 1, padding: 4 }}>
//       <Typography variant="h6">Hourly Forecast</Typography>
//       <Grid container spacing={2} sx={{ marginBottom: 4 }}>
//         {hourly.slice(0, 5).map((hour, index) => (
//           <Grid item xs={2} key={index}>
//             <Item>
//               <Typography variant="body2">{new Date(hour.dt * 1000).getHours()}:00</Typography>
//               <img
//                 src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
//                 alt={hour.weather[0].description}
//               />
//               <Typography variant="body2">{Math.round(hour.temp)}°C</Typography>
//             </Item>
//           </Grid>
//         ))}
//       </Grid>

//       <Typography variant="h6">Daily Forecast</Typography>
//       <Grid container spacing={2}>
//         {daily.slice(0, 5).map((day, index) => (
//           <Grid item xs={2} key={index}>
//             <Item>
//               <Typography variant="body2">{new Date(day.dt * 1000).toLocaleDateString()}</Typography>
//               <img
//                 src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
//                 alt={day.weather[0].description}
//               />
//               <Typography variant="body2">
//                 {Math.round(day.temp.day)}°C
//                 <br />
//                 {Math.round(day.temp.night)}°C
//               </Typography>
//             </Item>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Forecasts;


// Forecasts.jsx
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'lightblue',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Forecasts = ({ hourly, daily }) => {
  if (!hourly.length || !daily.length) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h6">Hourly Forecast</Typography>
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        {hourly.slice(0, 5).map((hour, index) => (
          <Grid item xs={2} key={index}>
            <Item>
              <Typography variant="body2">{new Date(hour.dt * 1000).getHours()}:00</Typography>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
              />
              <Typography variant="body2">{Math.round(hour.temp)}°C</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6">Daily Forecast</Typography>
      <Grid container spacing={2}>
        {daily.slice(0, 5).map((day, index) => (
          <Grid item xs={2} key={index}>
            <Item>
              <Typography variant="body2">{new Date(day.dt * 1000).toLocaleDateString()}</Typography>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
              <Typography variant="body2">
                {Math.round(day.temp.day)}°C
                <br />
                {Math.round(day.temp.night)}°C
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Forecasts;
