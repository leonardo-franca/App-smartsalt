import { Button, ButtonGroup, ClickAwayListener, Container, Grow, makeStyles, MenuItem, MenuList, Paper, Popper, Typography } from '@material-ui/core';
//import {HomeIcon} from '@mui/icons-material';
import { History, Assignment, Home, ArrowDropDown } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from "../services/api";
import  salternselect  from "../actions/salternactions";
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    color: 'white',// mudar a cor da barra
    paddingTop: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: 'white',
      color: "#555",
      border: "1px solid #ece7e7"

    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(2),
      cursor: "pointer",
    }
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: '18px',
    }
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: 'none',

    },
  }

}));
const Sidebar = () => {
  const classes = useStyles();
  const [salterns, setSatterns] = useState([])
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const salternsel = useSelector((state) => state.saltern.saltern);
  const dispatch = useDispatch();
  const handleClick = () => {
    try {
       dispatch(salternselect(salterns[selectedIndex]));

    } catch (error) {
      console.log(error)

    }
   // console.info(salterns[selectedIndex]);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    api.get("/salterns")
      .then((response) => {
        setSatterns(response.data)
      })
      .catch(() => {
        console.log("errrooorr api")
      })

  }, []
  );
  return (
    <Container className={classes.container}>
      <div className={classes.item}>
        <ButtonGroup variant="contained" ref={anchorRef} className={classes.text} aria-label="split button">
          <Link to='/home'><Button onClick={handleClick}>{salternsel.name}</Button></Link>
          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDown />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {salterns.map((saltern, index) => (
                      <MenuItem
                        key={saltern.id}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {saltern.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <div className={classes.item}>
        <Home className={classes.icon} />
        {/* {salterns.map((saltern, id) => {
          return (
            <Typography className={classes.text}> {saltern.name}</Typography>
          )
        })} */}
        <Typography className={classes.text}> Homepage</Typography>
      </div>
      <div className={classes.item}>
        <History className={classes.icon} />
        <Typography className={classes.text}> Historico</Typography>
      </div>
      <div className={classes.item}>
        <Assignment className={classes.icon} />
        <Typography className={classes.text}> Relatorio</Typography>
      </div>
    </Container>
  );
};

export default Sidebar;