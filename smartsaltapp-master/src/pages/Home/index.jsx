import React from 'react';
import { withRouter } from "react-router-dom";

import { Grid, makeStyles } from '@material-ui/core';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Map from '../../components/Map';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Sidebar></Sidebar>
        </Grid>
        <Grid item sm={10} xs={10}>
          <Map />
           
        </Grid>
      </Grid>
    </div>);
};
//<Map lat={saltern.latitude} lng={saltern.longitude} />        
export default withRouter(Home);