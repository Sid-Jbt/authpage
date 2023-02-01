import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

const Countdown = () => {
  const [countdownDate, setCountdownDate] = useState(new Date('').getTime());
  const [state, setState] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = setCountdownDate;

      const distanceToDate = countdownDate - currentTime;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distanceToDate % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      days = `${days}`;
      if (numbersToAddZeroTo.includes(hours)) {
        console.log(hours);
        hours = `${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `${seconds}`;
      }
      console.log(days, hours, minutes, seconds);
      setState({ days, hours, minutes, seconds });
    }
  };
  // console.log(state);
  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);

  return (
    <Grid display="flex">
      <Grid>{state.hours || '00'}</Grid>
      <div>:</div>
      <Grid>{state.minutes || '00'}</Grid>
      <Grid>:</Grid>
      <Grid>{state.seconds || '00'}</Grid>
    </Grid>
  );
};

export default Countdown;
