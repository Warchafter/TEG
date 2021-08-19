import React from 'react';

import {
    Grid,
} from '@material-ui/core';

import Chart from "react-apexcharts";

const options = {
    chart: {
        id: 'basic-bar'
    },
    xaxis: {
        categories: [1991,1992,1993,1994,1995,1996,1997,1998,1999]
    }
};

const series = [
    {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
];

const ApexCharts = () => {

    return (
        <div>
            <Grid container spacing={5}>
                <Grid item xs={4}>
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                        options={options}
                        series={series}
                        type="bar"
                        width="500"
                        />
                    </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                </Grid>
            </Grid>
        </div>
    );
};

export default ApexCharts;