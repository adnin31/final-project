import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  View,
  NativeModules
} from 'react-vr'
import CylindricalPanel from 'CylindricalPanel'
import Button from './button'

const Location = NativeModules.Location
const MAX_TEXTURE_WIDTH = 4096
const MAX_TEXTURE_HEIGHT = 720
const PPM = 1 / (2 * Math.PI * 3) * MAX_TEXTURE_WIDTH
const translateX = degrees => -(degrees / 360) * MAX_TEXTURE_WIDTH
const translateY = degress => -(degress / 360) * MAX_TEXTURE_HEIGHT

export default class vrClient extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null,
      seatId: null,
      userToken: null
    }
  }

  static defaultProps = {
    dataSource: 'data.json'
  }

  componentDidMount() {
    fetch(asset(this.props.dataSource).uri)
      .then(response => response.json())
      .then(responseData => {
        this.init(responseData)
      })
      .done()
  }

  init(dataConfig) {
    const url = Location.href
    if(url.indexOf('?') != -1) {
      const queryURL = Location.href.split('?')[1].split('/')
      this.setState({
        data: dataConfig,
        seatId: queryURL[0],
        userToken: queryURL[1]
      })
    }
  }

  render() {
    if(!this.state.data) return null

    const { pano } = this.state.data
    const seatId = this.state.seatId
    const seatTooltips = pano[seatId].tooltips
    return (
      <View>
        <View style={{transform: [{rotateY: pano[seatId].rotationOffset}]}}>
          <Pano
            source={asset(pano[seatId].uri)}
          />
          <CylindricalPanel
            layer={{
              width: MAX_TEXTURE_WIDTH,
              height: MAX_TEXTURE_HEIGHT,
              density: MAX_TEXTURE_WIDTH
            }}
            position='absolute'
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: MAX_TEXTURE_WIDTH,
                height: MAX_TEXTURE_HEIGHT
              }}
            >
              <View>
                { seatTooltips &&
                  seatTooltips.map((tooltip, index) => {
                    return (
                      <Button
                        key={index}
                        pixelsPerMeter={PPM}
                        source={asset(this.getBtnImage(tooltip.type))}
                        tooltip={tooltip}
                        translateX={translateX(tooltip.rotationX)}
                        translateY={translateY(tooltip.rotationY)}
                      />
                    )
                  })
                }
              </View>
            </View>
          </CylindricalPanel>
        </View>
      </View>
    )
  }

  getBtnImage(type) {
    switch(type) {
      case 'buttonBook':
        return 'check.png'
      case 'buttonClose':
        return 'close.png'
      case 'trailer':
        return 'trailer.png'
      default:
        return 'info.png'
    }
  }

}

AppRegistry.registerComponent('vrClient', () => vrClient)
