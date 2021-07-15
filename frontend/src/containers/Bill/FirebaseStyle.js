import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import KanbanCardDemo from '../../components/MUI-Components/kanbam-card';
import ShowcaseCardDemo from '../../components/MUI-Components/firebase-style-card';

import cx from 'clsx';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(({ spacing, palette }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            display: 'flex'
        },
        card: {
            display: 'flex',
            padding: spacing(2),
            minWidth: 180,
            borderRadius: 12,
            boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
            '& > *:nth-child(1)': {
                marginRight: spacing(2),
            },
            '& > *:nth-child(2)': {
                flex: 'auto',
            },
        },
        avatar: {},
        heading: {
            fontFamily: family,
            fontSize: 16,
            marginBottom: 0,
        },
        subheader: {
            fontFamily: family,
            fontSize: 14,
            color: palette.grey[600],
            letterSpacing: '1px',
            marginBottom: 4,
        },
        value: {
            marginLeft: 8,
            fontSize: 14,
            color: palette.grey[500],
        },
    };
});

const BillFirebaseStyleGrid = () => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid
                spacing={3}
                direction="column"
                className={classes.root}
                container
            >
                <Grid item xs={12}>
                    <Card className={cx(classes.card)} elevation={0}>
                        <hi>This is a title that needs to be padded better</hi>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={8} className={classes.root} >
                        <Grid item xs={3}>
                            <Grid
                                spacing={3}
                                direction="column"
                                className={classes.root}
                                container
                            >
                                <Grid item xs={12}>
                                    <KanbanCardDemo />
                                </Grid>
                                <Grid item xs={12}>
                                    <KanbanCardDemo />
                                </Grid>
                                <Grid item xs={12}>
                                    <KanbanCardDemo />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid
                                spacing={3}
                                direction="column"
                                className={classes.root}
                                container
                            >
                                <Grid item xs={12}>
                                    <KanbanCardDemo />
                                </Grid>
                                <Grid item xs={12}>
                                    <KanbanCardDemo />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid
                                spacing={3}
                                direction="column"
                                className={classes.root}
                                container
                            >
                                <Grid item xs={12}>
                                    <KanbanCardDemo />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <ShowcaseCardDemo />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default BillFirebaseStyleGrid;