import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import EndCallButton from './Buttons/EndCallButton/EndCallButton';
import FlipCameraButton from './FlipCameraButton/FlipCameraButton';
import Menu from './Menu/Menu';

import useRoomState from '../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Typography, Grid } from '@material-ui/core';
import ToggleAudioButton from './Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from './Buttons/ToggleVideoButton/ToggleVideoButton';
import ToggleScreenShareButton from './Buttons/ToogleScreenShareButton/ToggleScreenShareButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.background.default,
      bottom: 0,
      left: 0,
      right: 0,
      height: `${theme.footerHeight}px`,
      position: 'fixed',
      display: 'flex',
      padding: '0 1em',
      zIndex: 1,
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
    },
    screenShareBanner: {
      position: 'fixed',
      zIndex: 1,
      bottom: `${theme.footerHeight}px`,
      left: 0,
      right: 0,
      height: '104px',
      background: 'rgba(0, 0, 0, 0.5)',
      '& h6': {
        color: 'white',
      },
      '& button': {
        background: 'white',
        color: theme.brand,
        border: `2px solid ${theme.brand}`,
        margin: '0 2em',
      },
    },
    hideMobile: {
      display: 'initial',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  })
);

export default function MenuBar() {
  const classes = useStyles();
  const { isSharingScreen, toggleScreenShare } = useVideoContext();
  const roomState = useRoomState();
  const isReconnecting = roomState === 'reconnecting';
  const { room } = useVideoContext();

  return (
    <>
      {isSharingScreen && (
        <Grid container justify="center" alignItems="center" className={classes.screenShareBanner}>
          <Typography variant="h6">You are sharing your screen</Typography>
          <Button onClick={() => toggleScreenShare()}>Stop Sharing</Button>
        </Grid>
      )}
      <footer className={classes.container}>
        <Grid container justify="space-around" alignItems="center">
          <Grid style={{ flex: 1 }} className={classes.hideMobile}>
            <Typography variant="body1">{room.name}</Typography>
          </Grid>
          <Grid item>
            <Grid container justify="center">
              <ToggleAudioButton disabled={isReconnecting} />
              <ToggleVideoButton disabled={isReconnecting} />
              {!isSharingScreen && <ToggleScreenShareButton disabled={isReconnecting} />}
              <FlipCameraButton />
            </Grid>
          </Grid>
          <Grid style={{ flex: 1 }} className={classes.hideMobile}>
            <Grid container justify="flex-end">
              <Menu />
              <EndCallButton />
            </Grid>
          </Grid>
        </Grid>
      </footer>
    </>
  );
}
