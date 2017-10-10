import React from 'react'
import {Animated, Image, VrButton, View, Text} from 'react-vr'

// import Tooltip from './Tooltip'

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
    }).start();
  }

  fadeOut() {
    Animated.timing(this.state.opacityAnim, {
      toValue: 0,
      duration: 500,
    }).start();
  }

  render() {
    const PPM = this.props.pixelsPerMeter
    const tooltip = this.props.tooltip
    return (
      <VrButton
        style={{
          layoutOrigin: [0.5, 0.5, 0],
          position: 'absolute',
          transform: [
            {rotateY: 0},
            {translateX: this.props.translateX},
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
              paddingLeft: 0.4 * PPM
            }}
            billboarding={'on'}
          >
            <View>
              <Text>{tooltip.text}</Text>
            </View>
          </Animated.View>
        </Image>
      </VrButton>
    )
  }

}