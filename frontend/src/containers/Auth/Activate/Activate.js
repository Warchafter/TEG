import React, { useState } from 'react';
import {
    Avatar,
    Paper,
    Grid,
    Typography,
    Button
} from '@material-ui/core';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
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

const Activate = props => {
    const classes = useStyles();

    const { onAuthUserActivation, match } = props;
    const [verified, setVerified] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        const uid = match.params.uid;
        const token = match.params.token;

        onAuthUserActivation(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Redirect to='/auth' />
    }

    return (
        <React.Fragment>
            <Notifier />
            <Grid container component='main' className={classes.rootLogin}>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <VerifiedUserOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Verifique su cuenta
                        </Typography>
                        <form className={classes.form} onSubmit={submitHandler}>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                            >
                                Activar
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
        onAuthUserActivation: (uid, token) =>
            dispatch(actions.authUserActivation(uid, token)),
    };
};

export default connect(null, mapDispatchToProps)(Activate);