import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Grid,
    Button,
    Container
} from '@material-ui/core';
import {
    bankButtonOptions,
} from '../../../../components/Bill/Testing/HeaderOptions/HeaderButtonOptions';
import ElevatedHeaderCardDemo from '../../../../components/MUI-Components/miui-card';


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

const BankL = () => {
    // This component will have 2 main pieces:
    // 1.- A paper component with the main components: (Bank, BillDetail, etc)
    // 2.- Another paper component (larger) that has an array of buttons above
    // with the options to render the different requests.


    const [mainOption, setMainOption] = useState(bankButtonOptions);
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
            <p>hi</p>
            <ElevatedHeaderCardDemo />
        </React.Fragment>
    );
};

export default BankL;
