import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pre: {
            padding: theme.spacing(2),
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        }
    })
)

const ApiExampleModel: React.FunctionComponent<any> = props => {
    const classes = useStyles({})
    const { example } = props;
    if (example) {
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
    } else {
        return null;
    }
}

export default ApiExampleModel;