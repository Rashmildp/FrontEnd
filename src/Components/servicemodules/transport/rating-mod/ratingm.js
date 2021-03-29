import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}));

export default function HalfRating() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/*<Rating name="size-small" defaultValue={2} size="small" />*/}
            <Rating name="size-medium" defaultValue={2.5} precision={0.5} readOnly />
            {/*<Rating name="size-large" defaultValue={2} size="large" />*/}
        </div>
    );
}
