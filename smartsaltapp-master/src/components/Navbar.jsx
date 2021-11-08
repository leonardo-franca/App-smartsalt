import { AppBar, Avatar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  logolg: {
    display: "none",
    [theme.breakpoints.up('sm')]: {
      display: "block",
    },
  },
  logosm: {
    display: "block",
    [theme.breakpoints.up('md')]: {
      display: "none",
    },
  },
  icons: {
    display: 'flex',
    alignItems: 'center',

  }

}));

const Navbar = () => {
  const classes = useStyles();
    const saltern = useSelector((state) => state.saltern.saltern);
   
  
  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.logolg}>
          SmartSalt
        </Typography>

        <Typography variant="h6" className={classes.logosm}>
          SmartApp
        </Typography>
        <div className={classes.icons}>
          <Typography variant="h6" className={classes.logolg}>
            {saltern.name} 
        </Typography>

          <Avatar alt="remy sharp"></Avatar>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;