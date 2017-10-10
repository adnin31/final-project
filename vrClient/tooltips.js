import React from 'react'
import {
  View,
  VrButton,
  Text,
  Animated
} from 'react-vr'

export default class Tooltips extends React.Component {
  constructor(props) {
    super()
    this.state = {
      tooltips: props.seatTooltips
    }
  }

  fadeIn() {
    Animated.timing(new Animated.Value(0), {
      toValue: 1,
      duration: 500,
    }).start();
  }

  fadeOut() {
    Animated.timing(new Animated.Value(0), {
      toValue: 0,
      duration: 500,
    }).start();
  }

  render() {
    const tooltips = this.state.tooltips
    return (
      <View>
        {
          tooltips && 
          tooltips.map((tooltip, index) => {
            switch(tooltip.type) {
              case 'text':
                return (
                  <View
                    style={{
                      backgroundColor: 'black',
                      padding: 0.1 * PPM
                    }}
                  >
                    <VrButton
                      key={index}
                      style={{
                          layotOrigin: [0.5, 0.5, 0],
                          position: 'absolute',
                          transform: [
                            {rotateY: ''},
                            {translateX: ''},
                            {translateZ: ''}
                          ]
                        }}
                        ignoreLongClick={true}
                        onInput={null}
                        onExit={() => {
                          this.fadeOut()
                        }}
                    >
                      <Text
                      >
                        {tooltip.text}
                      </Text>
                    </VrButton>
                  </View>
                )
              case 'buttonBook':
                return null
              case 'buttonClose':
                return null
              case 'trailer':
                return null
            }
          })
        }
      </View>
    )
  }
}