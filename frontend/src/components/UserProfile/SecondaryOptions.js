import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    gridButtonsSecondaryOptions: {
        textAlign: 'center',
    },
    card: {
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    }
}));

const SecondaryOptions = (props) => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} className={styles.gridButtonsSecondaryOptions}>
                    <button type="button" className="btn btn-ghost-dark" style={{width: '90%', verticalAlign: 'text-top'}}>4th option</button>
                </Grid>
                <Grid item xs={12} className={styles.gridButtonsSecondaryOptions}>
                    <button type="button" className="btn btn-ghost-dark" style={{width: '90%', verticalAlign: 'text-top'}}>5th option</button>
                </Grid>
                <Grid item xs={12} className={styles.gridButtonsSecondaryOptions}>
                    <button type="button" className="btn btn-ghost-dark" style={{width: '90%', verticalAlign: 'text-top'}}>6th option</button>
                </Grid>
            </Grid>
        </div>
    );
};

export default SecondaryOptions;