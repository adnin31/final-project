import React from 'react'

import TextImage from './textImage'
import TextBlock from './textBlock'
import Trailer from './trailer'

export default (props) => {
  const tooltip = props.tooltip
  const PPM = props.pixelsPerMeter

  return tooltip.type == 'textImage' ?
    <TextImage
      tooltip={tooltip}
      pixelsPerMeter={PPM}
    /> :
    tooltip.type == 'trailer' ?
      <Trailer
        tooltip={tooltip}
        pixelsPerMeter={PPM}
        translate={props.translate}
      /> :
      <TextBlock tooltip={tooltip} pixelsPerMeter={PPM} />
}
