import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Typography } from '@material-ui/core';
import { flame, sunset, maroon, sherpablue, seafoam } from '../../../theme/ocPalette.constants';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pre: {
            padding: theme.spacing(2),
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        string: {
            color: flame[600]
        },
        boolean: {
            color: sunset[600]
        },
        array: {
            color: maroon[600]
        },
        object: {
            color: sherpablue[600]
        },
        integer: {
            color: seafoam[600]
        }
    })
)

const ApiExampleModel: React.FunctionComponent<any> = props => {
    const classes = useStyles({})
    const { example } = props;
    return (
        <React.Fragment>
            <Typography variant="h5">Example Request Body</Typography>
            <pre className={classes.pre}>
                <code className="language-json">
                    {JSON.stringify(example, null, 2)}
                </code>
            </pre>
        </React.Fragment>
    )
}

export default ApiExampleModel;