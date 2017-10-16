import React from 'react'
import {
  Animated,
  Image,
  VrButton,
  View,
  NativeModules
} from 'react-vr'
import Easing from 'Easing'
import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCAndawPNofKLlN9W3EjWGYtqYnH1CneSc",
    authDomain: "movie-trailer-175012.firebaseapp.com",
    databaseURL: "https://movie-trailer-175012.firebaseio.com",
    projectId: "movie-trailer-175012",
    storageBucket: "movie-trailer-175012.appspot.com",
    messagingSenderId: "584104791052"
  }

firebase.initializeApp(config);

import Tooltip from './tooltip'

export default class Button extends React.Component {
  constructor(props) {
    super()
    this.state = {
      hasFocus: false,
      opacityAnim: new Animated.Value(0),
      timeOut: 0
    }
  }

  componentWillUnmount() {
    if (this.state.timeOut) {
      clearTimeout(this.state.timeOut)
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

  btnPress(tooltipType) {
    this.setState({hasFocus: false})
    tooltipType == 'buttonBook' ?
    this.setBook() : NativeModules.History.back()
  }

  setBook() {
    const data = this.props.state
    firebase.database()
    .ref(`${data.movieId}/${data.studioName}/${data.time}/${data.seatIndex}`)
    .set({
      selected: true,
      status: true
    }, function (err) {
      if (err) console.log(err)
      else NativeModules.History.back()
    })
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
        onEnter={() => {
          if(tooltip.type == 'buttonBook' || tooltip.type == 'buttonClose') {
            const timeout = setTimeout(() => {
              this.btnPress(tooltip.type)
            }, 3000)
            this.state.timeOut = timeout
          }
        }}
        onExit={() => {
          if(tooltip.type == 'buttonBook' || 'buttonClose') {
            this.fadeOut()
            clearTimeout(this.state.timeOut)
            this.state.timeOut = 0
          }
        }}
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