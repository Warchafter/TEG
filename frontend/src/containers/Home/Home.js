import React from 'react';
import {
    Typography,
    Container,
    Box,
    Grid,
    Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import backgroundHeroIH from '../../assets/cool-intertwined-background.jpg';
import ihLogo from '../../assets/logo.png';
import CharacteristicTypeBuilder from '../../components/Loaders/CharacteristicType/CharacteristicType';


const useStyles = makeStyles((theme) => ({
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${backgroundHeroIH})`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
    },
}));

const Home = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box className={classes.hero}>
                {/* <Grid container spacing={3}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}>
                        <Typography variant="h3">IH Insumos Hospitalarios</Typography>
                        <Typography variant="h5">Somos una empresa con 15 años en el mercado
                        venezolano, dedicada a la distribución y venta de material medico quirúrgico descartable,
                            equipos médicos y mobiliario clínico en todo el territorio nacional.</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={ihLogo} alt="IH_Insumos_Hospitalarios" />
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid> */}
            </Box>
            <CharacteristicTypeBuilder />
        </React.Fragment>
    )
};

export default Home;