import React from 'react';

import {
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    card: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        border: 'none',
        position: 'relative',
        marginBottom: '30px',
        boxShadow: '0 0.46875rem 2.1875rem rgb(90 97 105 / 10%), 0 0.9375rem 1.40625rem rgb(90 97 105 / 10%), 0 0.25rem 0.53125rem rgb(90 97 105 / 12%), 0 0.125rem 0.1875rem rgb(90 97 105 / 10%)',
        background: 'linear-gradient( 135deg, #23bdb8 0%, #43e794 100%) !important',
        color: '#fff',
    }
}));

// .card {
//     background-color: #fff;
//     border-radius: 10px;
//     border: none;
//     position: relative;
//     margin-bottom: 30px;
//     box-shadow: 0 0.46875rem 2.1875rem rgb(90 97 105 / 10%), 0 0.9375rem 1.40625rem rgb(90 97 105 / 10%), 0 0.25rem 0.53125rem rgb(90 97 105 / 12%), 0 0.125rem 0.1875rem rgb(90 97 105 / 10%);
//     background: linear-gradient( 135deg, #23bdb8 0%, #43e794 100%) !important;
//     color: #fff;
// }

export const testCard = React.memo(function TestCard() {
    const styles = useStyles();

    return (
        <div className={styles.card} class="card l-bg-green">
            <div className="card-statistic-3">
                <div className="card-icon card-icon-large">
                    <i className="fa fa-award"></i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">Certificados</h4>
                    <Typography className="mb-0 text-sm">
                        <div className="text-nowrap"><br>Podrás visualizar los certificados</br>
                            obtenidos en los cursos que has<br> realizado.
                            </br>
                        </div>
                    </Typography>
                </div>
            </div>
        </div>
    )
});
