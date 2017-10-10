import React from 'react'
import {
  asset,
  Image,
  MediaPlayerState,
  Text,
  Video,
  VideoControl,
  View
} from 'react-vr'

export default (props) => {
  const tooltip = props.tooltip
  const PPM = props.pixelsPerMeter
  switch(tooltip.type) {
    case 'text':
      return <TextBlock tooltip={tooltip} pixelsPerMeter={PPM} />
    case 'trailer':
      return null
    default:
      return null
  }
}

class TextBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const tooltip = this.props.tooltip
    console.log(tooltip.text)
    const PPM = this.props.pixelsPerMeter
    console.log(PPM)
    const fontSize = {
      attrib: 0.05 * PPM,
      text: 0.1 * PPM,
      title: 0.15 * PPM,
    }

    return (
      <View
        style={{
          backgroundColor: 'black',
          padding: 0.1 * PPM,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: fontSize.title,
            width: tooltip.width * PPM,
          }}>
          {tooltip.title}
        </Text>
        {tooltip.title &&
          <View
            style={{
              backgroundColor: '#777879',
              height: 0.01 * PPM,
              width: tooltip.width * PPM,
            }}
          />}
        <Text
          style={{
            color: 'white',
            fontSize: fontSize.text,
            width: tooltip.width * PPM,
          }}>
          {tooltip.text}
        </Text>
        {tooltip.attribution &&
          <Text
            style={{
              fontSize: fontSize.attrib,
              right: 0.02 * PPM,
              textAlign: 'right',
            }}>
            {tooltip.attribution}
          </Text>}
      </View>
    )
  }
}