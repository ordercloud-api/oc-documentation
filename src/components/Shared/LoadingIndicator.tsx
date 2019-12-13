import LoadingOverlay from 'react-loading-overlay'
import BeatLoader from 'react-spinners/BeatLoader'
import React from 'react'

export default function LoadingIndicator({ active, children }) {
  return (
    <LoadingOverlay active={active} spinner={<BeatLoader />}>
      {children}
    </LoadingOverlay>
  )
}
