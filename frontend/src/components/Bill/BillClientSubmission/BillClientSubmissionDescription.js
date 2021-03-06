import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    Grid,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        fontWeight: 'bold',
        color: '#313c54'
    },
    card: {
        maxHeight: 394,
    },
    content: {
        color: '#666666',
        whiteSpace: 'pre-wrap',
        paddingLeft: '20px'
    },
    scrollMenu: {
        overflow: 'auto',
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        maxHeight: 577,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#3c4b64',
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    GridHeader: {
        maxWidth: 'none',
    }
}))


const BillClientSubmissionDescription = (props) => {
    const styles = useStyles();

        return (
        <div className={styles.root}>
            <Card className={styles.card}>
                <Grid container spacing={3} className={styles.GridHeader}>
                    <Grid item xs={12}>
                        <TableContainer component={styles.tableContainer}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={styles.tableHeaderCell}>
                                            <Typography>Requerimiento</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={styles.scrollMenu}>
                            <Typography className={styles.content}>
                                {props.selectedOption.product_requirements}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default BillClientSubmissionDescription;