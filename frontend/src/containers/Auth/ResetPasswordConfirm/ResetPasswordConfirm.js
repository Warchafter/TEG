import React, { useState } from 'react';
import {
    Avatar,
    Button,
    TextField,
    Paper,
    Grid,
    Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';
import backgroundActivateIH from '../../../assets/ih_insuhosp_act_background.jpg';
import Notifier from '../../../components/Notifier/Notifier';

const useStyles = makeStyles((theme) => ({
    rootLogin: {
        height: '91vh',
    },
    image: {
        backgroundImage: `url(${backgroundActivateIH})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'left',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    circularProgress: {
        display: 'flex',
        alignItems: 'center',
    }
}));

const ResetPasswordConfirm = props => {
    const classes = useStyles();

    const { onAuthResetPasswordConfirm, match } = props;
    const [requestSent, setRequestSent] = useState(false);

    const [controls, setControls] = useState({
        password: {
            elementConfig: {
                type: 'password',
                placeholder: 'New Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        re_password: {
            elementConfig: {
                type: 'password',
                placeholder: 'Confirm New Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        }
    });

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });
        setControls(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const uid = match.params.uid;
        const token = match.params.token;

        onAuthResetPasswordConfirm(uid, token, controls.password.value, controls.re_password.value);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    const fromElementsArray = [];
    for (let key in controls) {
        fromElementsArray.push({
            id: key,
            config: controls[key]
        });
    };

    let form = fromElementsArray.map(formElement => {
        return (
            <TextField
                key={formElement.id}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name={formElement.id}
                label={formElement.config.elementConfig.placeholder}
                type={formElement.config.elementConfig.type}
                id={formElement.id}
                error={!formElement.config.valid && formElement.config.touched}
                onChange={(event) => inputChangedHandler(event, formElement.id)}
            />
        )
    });

    return (
        <React.Fragment>
            <Notifier />
            <Grid container component='main' className={classes.rootLogin}>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Reinicio de Contraseña
                        </Typography>
                        <form className={classes.form} onSubmit={submitHandler}>
                            {form}
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                            >
                                Reiniciar Contraseña
                            </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthResetPasswordConfirm: (uid, token, new_password, re_new_password) =>
            dispatch(actions.authPasswordResetConfirm(uid, token, new_password, re_new_password)),
    };
};

export default connect(null, mapDispatchToProps)(ResetPasswordConfirm);