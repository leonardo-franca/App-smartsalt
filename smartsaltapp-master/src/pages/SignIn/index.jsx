import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";
import { Grid, Paper, Avatar, TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    right: {
        [theme.breakpoints.down("sm")]: {
            display: 'none',

        },
    },
    paperStyle:{ 
        padding: 20,
        height: '50vh', 
        width: 280, 
        margin: "20px auto" 
    }
}));

class SignIn extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    };

    handleSignIn = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                const response = await api.post("/sessions", { email, password });
                login(response.data.token);
                this.props.history.push("/home");
            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique suas credenciais. T.T"
                });
            }
        }
    };

    render() {
        const paperStyle = { padding: 20, height: '50vh', width: 280, margin: "20px auto" }
        const avatarStyle = { backgroundColor: '#1bbd7e' }
        const btnstyle = { margin: '8px 0' }

        return (
            <Grid>
                <Paper elevation={10} style={paperStyle} >
                    <Grid align='center'>
                        <Avatar style={avatarStyle} ></Avatar>
                        <h1>SmartSalt</h1>
                    </Grid>
                    {this.state.error && <p>{this.state.error}</p>}
                    <TextField
                        type="email"
                        label='E-mail'
                        placeholder='Example@email.com'
                        fullWidth
                        required
                        onChange={e => this.setState({ email: e.target.value })}
                    />

                    <TextField
                        label='Senha'
                        placeholder='Digite Sua Senha'
                        type='password'
                        fullWidth
                        required
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <Button onClick={this.handleSignIn} type='submit' color='primary' variant="contained"  style={btnstyle} fullWidth>Entrar</Button>
                
                </Paper>
            </Grid>
        );
    }
}

export default withRouter(SignIn);