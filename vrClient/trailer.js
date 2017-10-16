import React from 'react'
import {
  asset,
  MediaPlayerState,
  Video,
  VideoControl,
  View
} from 'react-vr'

export default class Trailer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerState: new MediaPlayerState({autoPlay: true}),
    }
  }

  render() {
    const tooltip = this.props.tooltip
    const PPM = this.props.pixelsPerMeter
    const translate = this.props.translate

    return (
      <View
        style={{
          layoutOrigin: [0.5, 0.5, 0],
          position: 'absolute',
          transform: [
            {scale: tooltip.scale}
          ]
        }}
      >
        <Video
          style={{
            height: tooltip.height * PPM,
            width: tooltip.width * PPM
          }}
          source={asset(tooltip.source)}
          playerState={this.state.playerState}
        />
        <VideoControl
          style={{
            height: 0.2 * PPM,
            width: tooltip.width * PPM,
          }}
          fontSize={18}
          playerState={this.state.playerState}
        />
      </View>
    )
  }
}