import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CallMade from '@material-ui/icons/CallMade';

import { Row, Column, Item } from '@mui-treasury/components/flex';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';

import FullCart from '../SVG-Components/Full-Cart';

const StyledTooltip = withStyles({
    tooltip: {
        marginTop: '0.2rem',
        backgroundColor: 'rgba(0,0,0,0.72)',
        color: '#fff',
    },
})(Tooltip);

const useBasicProfileStyles = makeStyles(({ palette }) => ({
    avatar: {
        borderRadius: 8,
        backgroundColor: '#495869',
    },
    overline: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#8D9CAD',
    },
    name: {
        fontSize: 14,
        fontWeight: 500,
        color: '#495869',
    },
}));

const BasicProfile = props => {
    const styles = useBasicProfileStyles();
    // const user = useSelector(state => state.auth.user);
    return (
        <Row {...props}>
            <Item><Avatar className={styles.avatar}>S</Avatar></Item>
            <Item position={'middle'} pl={{ sm: 0.5, lg: 0.5 }}>
                <Typography className={styles.overline}>USUARIO</Typography>
                <Typography className={styles.name}>siriwatknp</Typography>
            </Item>
        </Row>
    );
};

const useCardHeaderStyles = makeStyles(() => ({
    root: { paddingBottom: 0 },
    title: {
        fontSize: '1.25rem',
        color: '#122740',
    },
    subheader: {
        fontSize: '0.875rem',
        color: '#495869',
    },
}));

const CardHeader = props => {
    const styles = useCardHeaderStyles();
    const iconBtnStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20 });
    return (
        <Row {...props}>
            <Item position={'middle'}>
                <Typography className={styles.title}>
                    <b>Firebase</b>
                </Typography>
                <Typography className={styles.subheader}>
                    Similar to firebase theme
                </Typography>
            </Item>
            <Item position={'right'} mr={-0.5}>
                <StyledTooltip title={'See details'}>
                    <IconButton classes={iconBtnStyles}>
                        <CallMade />
                    </IconButton>
                </StyledTooltip>
            </Item>
        </Row>
    );
};

const useStyles = makeStyles(() => ({
    card: {
        border: '2px solid',
        borderColor: 'rgba(179, 179, 189, 0.3)',
        borderRadius: 16,
        width: '100%',
        transition: '0.4s',
        '&:hover': {
            borderColor: '#5B9FED',
        },
    },
    boxImage: {
        maxHeight: '400',
    },
    box: {
        borderRadius: 3,
        border: 0,
        height: 48,
        padding: '0 30px',
        color: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        '&:hover': {
            color: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            backgroundColor: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
        }
    },
    fullCartSVG: {
        flex: 1,
        maxWidth: 200
    }
}));

export const ShowcaseCardDemo = React.memo(function ShowcaseCard() {
    const styles = useStyles();
    const gap = { xs: 1, sm: 1.5, lg: 2 }
    return (
        <Grid container spacing={4} justify={'center'}>
            <Grid item xs={12}>
                <Row className={styles.card} p={{ xs: 0.5, sm: 0.75, lg: 1 }} gap={gap}>
                    <Item grow>
                        <Box minHeight={200} bgcolor={'#F4F7FA'} borderRadius={8} className={styles.box}><FullCart className={styles.fullCartSVG} /></Box>
                    </Item>
                    <Column>
                        <CardHeader />
                        <BasicProfile position={'bottom'} />
                    </Column>
                </Row>
            </Grid>
        </Grid>
    );
});

export default ShowcaseCardDemo;