import React from 'react';
import apiReferenceUtil from '../Shared/apiReferenceUtility';
import Layout from '../Layout/Layout';
import { withStyles, Theme, createStyles, Container, Grid } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    docContainer: {
      marginBlockStart: '2rem',
      marginBlockEnd: '4rem',
    },
  })

const ApiReference = withStyles(styles)(
  class extends React.Component<any> {

    public state = {
      docs: null
    };

    public async componentDidMount() {
      apiReferenceUtil.GetAllDocs().then(docs => {
        this.setState({ docs });
      });
    }

    public render() {
      const { classes } = this.props;
      return (
        <Layout>
          <Container maxWidth="lg">
            <Grid container className={classes.docContainer} spacing={3}>
              <Grid item xs={9}>
                {this.state.docs ? this.state.docs.data.Sections.map(s => <p key={s}>{s}</p>) : <p>hi</p>}
              </Grid>
            </Grid>
          </Container>
        </Layout>
      )
    }

  }
)



export default ApiReference