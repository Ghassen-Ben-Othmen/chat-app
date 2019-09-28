import React from "react";

// MUI Staff
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Skeleton from "@material-ui/lab/Skeleton";
import Divider from "@material-ui/core/Divider";

const SkeletonSend = () => {
  // className
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Skeleton
        className={classes.input}
        variant="rect"
        width={210}
        height={30}
      />

      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <Skeleton variant="rect" width={30} height={30} />
      </IconButton>
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    height: "10vh",
    bottom: 0,
    right: 0,
    left: 0
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  }
}));

export default SkeletonSend;
