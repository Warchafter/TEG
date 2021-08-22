import React from 'react';

import Image from 'react-image-resizer';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    Typography
} from '@material-ui/core';

import backgroundEmptySelectionImage from '../../../assets/reshot-illustration-team-work-NT3MW2K6VA.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        fontWeight: 'bold',
        color: '#313c54'
    },
    content: {
        color: '#666666'
    },
    card: {
        padding: '10px'
    },
    emptySelectionWrapper: {
        position: 'relative',
        width: '393px',
        height: '263px'
    },
    emptySelectionImage: {
        position: 'absolute',
        display: 'block',
        left: '50%',
        top: '0px',
        // width: '393px',
        // height: '263px',
    },
    contentText: {
        textAlign: 'center'
    },
    DescImageCard: {
        minHeight: '394px'
    }
}))


const BillClientSubmissionDescriptionEmpty = (props) => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Card className={styles.DescImageCard}>
                <Image
                    src={`${backgroundEmptySelectionImage}`}
                    width={393}
                    height={293}
                ></Image>
                <Typography className={styles.contentText}>¡Escoge una opción!</Typography>
            </Card>
        </div>
    );
};

export default BillClientSubmissionDescriptionEmpty;