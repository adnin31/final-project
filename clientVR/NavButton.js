import React from 'react'
import {Animated, Image, Text, View, VrButton} from 'react-vr'

import LoadingSpinner from './LoadingSpinner'

const Easing = require('Easing')

export default class NavButton extends React.Component {
  static defaultProps = {
    delay: 2000,
    height: 0.3,
    innerWidth: 0.3,
    isLoading: false,
    outerWidth: 0.5,
    onInput: null,
    pixelsPerMeter: 1,
    rotateY: 0,
    scaleFactor: 1.3,
    translateX: 0,
    translateZ: 0,
  }

  constructor(props) {
    super()
    const PPM = props.pixelsPerMeter
    this._ringWidth = 0.025 * PPM
    this._initialBorderWidth =
      (props.outerWidth * PPM - props.innerWidth * PPM) / 2 - this._ringWidth
    this.state = {
      borderWidthAnim: new Animated.Value(this._initialBorderWidth),
      hasFocus: false,
      lastTimeoutId: 0,
    }
  }

  componentWillUnmount() {
    if (this.state.lastTimeoutId) {
      clearTimeout(this.state.lastTimeoutId)
    }
  }

  _startFill() {
    Animated.timing(this.state.borderWidthAnim, {
      toValue: this._ringWidth / 2,
      easing: Easing.linear,
      duration: this.props.delay,
    }).start()
  }

  _removeFill() {
    this.state.borderWidthAnim.stopAnimation()
    this.state.borderWidthAnim.setValue(this._initialBorderWidth)
  }

  _selected() {
    this.setState({hasFocus: false})
    this.props.onInput()
  }

  render() {
    const transparent = 'rgba(255, 255, 255, 0.0)'
    const fillColor = 'rgba(255, 255, 255, 0.8)'

    const PPM = this.props.pixelsPerMeter

    return (
      <VrButton
        style={{
          flexDirection: 'row',
          layoutOrigin: [0.5, 0.5],
          position: 'absolute',
          transform: [
            {rotateY: this.props.rotateY},
            {translateX: this.props.translateX},
            {translateZ: this.props.translateZ},
          ],
        }}
        ignoreLongClick={true}
        onClick={() => this._selected()}
        onEnter={() => {
          if (!this.props.isLoading) {
            this.setState({hasFocus: true})
            const id = setTimeout(() => {
              this._selected()
            }, this.props.delay)
            this.state.lastTimeoutId = id
            this._startFill()
          }
        }}
        onExit={() => {
          this.setState({hasFocus: false})
          clearTimeout(this.state.lastTimeoutId)
          this.state.lastTimeoutId = 0
          this._removeFill()
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: transparent,
            borderColor: this.state.hasFocus ? 'white' : transparent,
            borderRadius: this.props.outerWidth / 2 * PPM,
            borderWidth: this._ringWidth,
            height: this.props.outerWidth * PPM,
            justifyContent: 'center',
            width: this.props.outerWidth * PPM,
          }}>
          {!this.props.isLoading &&
            <View>
              <Animated.View
                style={{
                  backgroundColor: transparent,
                  borderColor: this.state.hasFocus ? fillColor : transparent,
                  borderRadius: this.props.outerWidth / 2 * PPM,
                  borderWidth: this.state.borderWidthAnim,
                  height: this.props.outerWidth * PPM - this._ringWidth * 2,
                  position: 'absolute',
                  transform: [
                    {translateX: -this._initialBorderWidth},
                    {translateY: this._initialBorderWidth},
                  ],
                  width: this.props.outerWidth * PPM - this._ringWidth * 2,
                }}
              />
              <Image
                style={{
                  height: this.props.innerWidth * PPM,
                  width: this.props.innerWidth * PPM,
                }}
                source={this.props.source}
              />
            </View>}
          {this.props.isLoading && <LoadingSpinner pixelsPerMeter={PPM} />}
        </View>
        {this.state.hasFocus &&
          <Text
            style={{
              backgroundColor: 'black',
              color: 'white',
              fontSize: this.props.height * PPM * 0.7,
              height: this.props.height * PPM,
              marginLeft: 0.05 * PPM,
              marginTop: (this.props.outerWidth - this.props.innerWidth) / 2 * PPM,
              padding: 0.1 * this.props.pixelsPerMeter,
              left: this.props.outerWidth * this.props.pixelsPerMeter + 0.05 * PPM,
              textAlign: 'center',
              textAlignVertical: 'auto',
            }}>
            {this.props.textLabel}
          </Text>}
      </VrButton>
    )
  }
}
