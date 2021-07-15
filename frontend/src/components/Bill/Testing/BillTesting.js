import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Grid,
    ButtonGroup,
    Button,
    Container
} from '@material-ui/core';
import {
    bankButtonOptions,
    currencyButtonOptions,
    paymentMethodButtonOptions,
    paymentStatusButtonOptions,
    purchaseStatusButtonOptions,
    purchaseBillButtonOptions,
    billDetailButtonOptions,
    billPaymentDetailButtonOptions,
    billProductCharacteristicButtonOptions
} from './HeaderOptions/HeaderButtonOptions';


const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex',
    //     '& > *': {
    //         margin: theme.spacing(1),
    //     },
    // },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    // box: {
    //     height: "100%",
    //     width: "100%"
    // },
    // container: {
    //     height: "400px"
    // },
    mainContentContainer: {
        paddingTop: "15px",
        paddingBottom: "15px",
        width: "100%"
    },
    innerContainer: {
        height: "100%",
        width: "100%"
    },
    // item: {
    //     flex: 1
    // }
}));

const BillTesting = () => {
    // This component will have 2 main pieces:
    // 1.- A paper component with the main components: (Bank, BillDetail, etc)
    // 2.- Another paper component (larger) that has an array of buttons above
    // with the options to render the different requests.

    // A side option is clicked []
    //
    //
    //
    //
    //

    const [mainOption, setMainOption] = useState(purchaseBillButtonOptions);
    const [mainContent, setMainContent] = useState(null);
    const classes = useStyles();

    const switchButtonFunc = (mainOptionIndicator) => {
        switch (mainOptionIndicator) {
            case "Bank": setMainOption(bankButtonOptions)
                break;
            case "Currency": setMainOption(currencyButtonOptions)
                break;
            case "Payment Method": setMainOption(paymentMethodButtonOptions)
                break;
            case "Payment Status": setMainOption(paymentStatusButtonOptions)
                break;
            case "Purchase Status": setMainOption(purchaseStatusButtonOptions)
                break;
            case "Purchase Bill": setMainOption(purchaseBillButtonOptions)
                break;
            case "Bill Detail": setMainOption(billDetailButtonOptions)
                break;
            case "Bill Payment Detail": setMainOption(billPaymentDetailButtonOptions)
                break;
            case "Bill Product Charac": setMainOption(billProductCharacteristicButtonOptions)
                break;
            default: return setMainOption(bankButtonOptions)
        };
    };

    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Grid spacing={1} className={classes.container} container>
                    <Grid xs={2} item>
                        <Paper variant="outlined" elevation={3}>
                            <Paper>Sidebar Options</Paper>
                            <ButtonGroup
                                orientation="vertical"
                                color="primary"
                                aria-label="vertical contained primary button group"
                                variant="text"
                            >
                                <Button onClick={() => { switchButtonFunc("Bank") }}>Bank</Button>
                                <Button onClick={() => { switchButtonFunc("Currency") }}>Currency</Button>
                                <Button onClick={() => { switchButtonFunc("Payment Method") }}>Payment Method</Button>
                                <Button onClick={() => { switchButtonFunc("Payment Status") }}>Payment Status</Button>
                                <Button onClick={() => { switchButtonFunc("Purchase Status") }}>Purchase Status</Button>
                                <Button onClick={() => { switchButtonFunc("Purchase Bill") }}>Purchase Bill</Button>
                                <Button onClick={() => { switchButtonFunc("Bill Detail") }}>Bill Detail</Button>
                                <Button onClick={() => { switchButtonFunc("Bill Payment Detail") }}>Bill Payment Detail</Button>
                                <Button onClick={() => { switchButtonFunc("Bill Product Charac") }}>Bill Product Characteristic</Button>
                            </ButtonGroup>
                        </Paper>
                    </Grid>
                    <Grid xs={10} item>
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
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
};

export default BillTesting;
