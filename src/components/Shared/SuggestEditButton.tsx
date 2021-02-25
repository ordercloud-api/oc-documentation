import { EditOutlined } from '@material-ui/icons'
import React, { FunctionComponent, useMemo } from 'react'
import ButtonlinkExternal from '../Shared/ButtonlinkExternal'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const isProd = window.location.hostname === 'ordercloud.io'

const repoUrl = `https://github.com/ordercloud-api/oc-documentation/edit/${
  isProd ? 'development' : 'redesign'
}`

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
  const realPath = useMemo(() => {
    return path.replace('knowledge-base', 'documents')
  }, [path])
  return (
    <ButtonlinkExternal
      className={classes.button}
      variant="outlined"
      size="small"
      href={`${repoUrl}/content${realPath}.mdx`}
    >
      <EditOutlined fontSize="inherit" className={classes.icon} />
      Suggest an edit
    </ButtonlinkExternal>
  )
}

export default SuggestAnEdit
