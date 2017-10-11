import React from 'react'
import {Animated, Image, VrButton, View} from 'react-vr'

import Tooltip from './tooltip'

export default class Button extends React.Component {
  constructor(props) {
    super()
    this.state = {
      hasFocus: false,
      opacityAnim: new Animated.Value(0)
    }
  }

  fadeIn() {
    Animated.timing(this.state.opacityAnim, {
      toValue: 1,
      duration: 500,
    }).start()
  }

  fadeOut() {
    Animated.timing(this.state.opacityAnim, {
      toValue: 0,
      duration: 500,
    }).start()
  }

  render() {
    const PPM = this.props.pixelsPerMeter
    const tooltip = this.props.tooltip
    const translate = {
      X: this.props.translateX,
      Y: this.props.translateY
    }

    return (
      <VrButton
        style={{
          layoutOrigin: [0.5, 0.5, 0],
          position: 'absolute',
          transform: [
            {rotateY: 0},
            {translateX: translate.X},
            {translateY: translate.Y},
            {translateZ: 0}
          ]
        }}
        ignoreLongClick={true}
        onInput={null}
        onExit={() => this.fadeOut()}
      >
        <Image
          style={{
            height: 0.3 * PPM,
            width: 0.3 * PPM,
            flexDirection: 'row'
          }}
          onEnter={() => this.fadeIn()}
          source={this.props.source}
        >
          <Animated.View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              opacity: this.state.opacityAnim,
              marginTop: tooltip.type == 'trailer' ? 0.55 * PPM : 0,
              marginLeft: tooltip.type == 'trailer' ? 0.25 * PPM : 0,
              paddingLeft: tooltip.type == 'trailer' ? 0 : 0.35 * PPM
            }}
            billboarding={'on'}
          >
            <Tooltip pixelsPerMeter={PPM} tooltip={tooltip} translate={translate} />
          </Animated.View>
        </Image>
      </VrButton>
    )
  }
}