import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Lightbox from 'react-image-lightbox';

import {makeStyles} from '@material-ui/core/styles';
import {
    Button,
    CardActionArea,
    CardMedia,
    Grid,
} from '@material-ui/core';
import CloudDoneIcon from '@material-ui/icons/CloudDone';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles(({ spacing, palette }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            paddingTop: '10px'
        },
        header: {
            color: '#4f5d73',
            fontFamily: family,
            textAlign: 'right'
        },
        subHeader: {
            color: '#4f5d73',
            fontFamily: family
        },
        content: {
            color: '#828894',
            fontFamily: family
        },
        button: {
            textTransform: 'none',
            margin: spacing(1),
            backgroundColor: '#4f5d73'
        },
        grid: {
            alignSelf: 'flex-end'
        },
        cardActionArea: {
            maxWidth: 500,
            maxHeight: 500,
        },
        cardMedia: {
            height: '500px'
        },
    }
});

const UserProfileUploadRIF = () => {
    const styles = useStyles();
    const dispatch = useDispatch();

    const [rifImage, setRifImage] = useState(null);
    const [rifSet, setRifSet] = useState(true);
    const [imageList, setImageList] = useState([]);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const rifImageURL = useSelector(state => state.userProfile.userProfileRIFImage)

    const onUploadUserProfileRif = useCallback((rif) => dispatch(actions.uploadUserProfileRif(rif)), [dispatch]);

    const rifUploadingHandler = () => {
        const fd = new FormData();
            // formData.append(
            //     "data",
            //     values
            // );
            fd.append(
                "rif",
                rifImage
                // payment_receipt_image.name,
            );
        onUploadUserProfileRif(fd);
    };

    const handleFile = (e) => {
        setRifImage(e.target.files[0]);
    };

    const userProfileRIFImageHandler = () => {
            setImageList(prevArray => [rifImageURL]);
    };

    const openHandler = () => {
        userProfileRIFImageHandler();
        setIsOpen(true);
    };

    useEffect(() => {
        if (rifImage) {
            setRifSet(false);
        }
    }, [rifImage]);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    { rifImageURL
                        ?
                        <CardActionArea className={styles.cardActionArea} onClick={openHandler}>
                            <CardMedia
                                className={styles.cardMedia}
                                image={rifImageURL}
                                title="RIF del Usuario"
                            />
                        </CardActionArea>
                        :
                        null
                    }
                    {
                        rifImage ? rifImage.name : null
                    }
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        component='label'
                    >
                        Seleccionar Archivo
                        <input
                            type='file'
                            name='rif'
                            onChange={(e) => handleFile(e)}
                            hidden
                        />
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={rifSet}
                        className={styles.button}
                        startIcon={<CloudDoneIcon />}
                        onClick={rifUploadingHandler}
                    >
                        Subir
                    </Button>
                </Grid>
            </Grid>
            {isOpen && (
                <Lightbox
                    mainSrc={imageList[photoIndex]}
                    nextSrc={imageList[(photoIndex + 1) % imageList.length]}
                    prevSrc={imageList[(photoIndex + imageList.length - 1) % imageList.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + imageList.length - 1) % imageList.length,)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % imageList.length,)
                    }
                />
            )}
        </div>
    );
};

export default UserProfileUploadRIF;