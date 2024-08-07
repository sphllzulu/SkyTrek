// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import WeatherApp from './Weather';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'pink',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// export default function BasicGrid() {
//   return (
//     <Box sx={{ flexGrow: 1, padding:4}}>
//       <Grid container spacing={2}>
//         <Grid item xs={4}>
//           <Item> <WeatherApp/> </Item>
//         </Grid>
//         <Grid item xs={4}>
//           <Item>xs=4</Item>
//         </Grid>
//         <Grid item xs={4}>
//           <Item>xs=4</Item>
//         </Grid>
//         <Grid item xs={8}>
//           <Item>xs=8</Item>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import WeatherApp from './Weather';
import Forecasts from './Forecasts';
import HourlyDaily from './HourlyDaily';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'pink',
  ...theme.typography.body2,
  padding: theme.spacing(2), // Increased padding for better spacing
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      {/* <Grid container spacing={2}> */}
        {/* <Grid item xs={12} sm={6} md={8}> */}
          <Item>
            <WeatherApp />
          </Item>
        {/* </Grid> */}
        
        
        
      {/* </Grid> */}
    </Box>
  );
}
