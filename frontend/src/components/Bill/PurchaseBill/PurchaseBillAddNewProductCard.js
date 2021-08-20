import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Card, IconButton } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        padding: '10px'
    },
    card: {
        border: '2px solid',
        borderColor: '#E7EDF3',
        borderRadius: 16,
        transition: '0.4s',
        '&:hover': {
            borderColor: '#5B9FED',
        },
        textAlign: 'center',
        minHeight: '50px'
    },
    // plusIcon: {
    //     paddingTop: '50%',
    // }
}));

const PurchaseBillAddNewProductCard = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Card className={styles.card}>
                <IconButton color="secondary" aria-label="add an alarm">
                    <AddBoxIcon className={styles.plusIcon}/>
                </IconButton>
            </Card>
        </div>
    );
};

export default PurchaseBillAddNewProductCard;