import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Button,
    Box
} from '@material-ui/core';

const useStyles = makeStyles(({ spacing, palette }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            display: 'flex'
        },
    }
})


export const PaymentKambamModal = React.memo(function PaymentKambamModal(props) {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Grid container >
                <Grid item xs={12}>
                    <Box>
                        <Typography>Header</Typography>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box>
                        <Typography>SubHeader</Typography>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box>
                        <Typography>Probably a date</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={() => console.log("clicked")}>Cerrar</Button>
                </Grid>
            </Grid>
        </div>
    );
});