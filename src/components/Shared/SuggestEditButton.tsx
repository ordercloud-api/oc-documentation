import { EditOutlined } from '@material-ui/icons'
import React, { FunctionComponent } from 'react'
import ButtonlinkExternal from '../Shared/ButtonlinkExternal'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const repoUrl =
  'https://github.com/ordercloud-api/oc-documentation/edit/development'

interface SuggestAnEditButtonProps {
  path: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginBottom: theme.spacing(3),
    },
    icon: {
      marginRight: theme.spacing(0.5),
    },
  })
)

const SuggestAnEdit: FunctionComponent<SuggestAnEditButtonProps> = (
  props: SuggestAnEditButtonProps
) => {
  const { path } = props
  const classes = useStyles()
  return (
    <ButtonlinkExternal
      className={classes.button}
      variant="outlined"
      size="small"
      href={`${repoUrl}/content/docs${path}.mdx`}
    >
      <EditOutlined fontSize="inherit" className={classes.icon} />
      Suggest an edit
    </ButtonlinkExternal>
  )
}

export default SuggestAnEdit
