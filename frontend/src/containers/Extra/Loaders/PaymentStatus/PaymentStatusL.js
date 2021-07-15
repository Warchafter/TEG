import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Grid,
    Button,
    Container
} from '@material-ui/core';
import {
    paymentStatusButtonOptions,
} from '../../../../components/Bill/Testing/HeaderOptions/HeaderButtonOptions';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    mainContentContainer: {
        paddingTop: "15px",
        paddingBottom: "15px",
        width: "100%"
    },
    innerContainer: {
        height: "100%",
        width: "100%"
    },
}));

const PaymentStatusL = () => {
    // This component will have 2 main pieces:
    // 1.- A paper component with the main components: (Bank, BillDetail, etc)
    // 2.- Another paper component (larger) that has an array of buttons above
    // with the options to render the different requests.


    const [mainOption, setMainOption] = useState(paymentStatusButtonOptions);
    const [mainContent, setMainContent] = useState(null);
    const classes = useStyles();

    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Grid
                    spacing={3}
                    direction="column"
                    className={classes.container}
                    container
                >
                    <Grid className={classes.item} item>
                        <Paper variant="outlined" elevation={3}>
                            <Paper>Header Options</Paper>
                            <Container >
                                {mainOption.map((index) => (
                                    <Button variant="outlined" color="secondary" key={index.id} onClick={() => { setMainContent(index.component) }}>{index.name}</Button>
                                ))}
                            </Container>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper style={{ backgroundColor: '#FFFFFF' }} variant="outlined" elevation={3}>
                            <Paper>Main Content</Paper>
                            <Container className={classes.mainContentContainer}>
                                {mainContent}
                            </Container>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
};

export default PaymentStatusL;
