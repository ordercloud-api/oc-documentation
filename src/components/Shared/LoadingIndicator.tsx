import LoadingOverlay from 'react-loading-overlay'
import BeatLoader from 'react-spinners/BeatLoader'
import React from 'react'

interface LoadingIndicatorProps {
  active: boolean
  children: any
}
export default function LoadingIndicator({
  active,
  children,
}: LoadingIndicatorProps) {
  return (
    <LoadingOverlay active={active} spinner={<BeatLoader />}>
      {children}
    </LoadingOverlay>
  )
}
