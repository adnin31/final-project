import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  CylindricalPanel
} from 'react-vr'

import NavButton from './NavButton'
import LoadingSpinner from './LoadingSpinner'

const MAX_TEXTURE_WIDTH = 4096
const MAX_TEXTURE_HEIGHT = 720
const degreesToPixels = degrees => -(degrees / 360) * MAX_TEXTURE_WIDTH
const PPM = 1 / (2 * Math.PI * 3) * MAX_TEXTURE_WIDTH

export default class clientVR extends React.Component {
  static defaultProps = {
    dataSource: 'data.json'
  }

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      locationId: null,
      nextLocationId: null,
      rotation: null
    }
  }

  componentDidMount() {
    fetch(asset(this.props.dataSource).uri)
      .then(response => response.json())
      .then(responseData => {
        // debugger
        this.init(responseData)
      })
      .done()
  }

  init(dataConfig) {
    this.setState({
      data: dataConfig,
      locationId: null,
      nextLocationId: dataConfig.firstPhotoId,
      rotation: dataConfig.firstPhotoRotation + (dataConfig.photos[dataConfig.firstPhotoId].rotationOffset || 0)
    })
  }

  render() {
    if(!this.state.data) {
      return null
    }

    const data = this.state.data
    const locationId = this.state.locationId
    const nextLocationId = this.state.nextLocationId
    const photoData = (locationId && data.photos[locationId]) || null
    const tooltips = (photoData && photoData.tooltips) || null
    const rotation = data.firstPhotoRotation + ((photoData && photoData.rotationOffset) || 0)
    const isLoading = nextLocationId !== locationId
    // debugger
    return (
      <View>
        <View style={{transform: [{rotateY: rotation}]}}>
          <Pano
            style={{
              position: 'absolute',
              tintColor: isLoading ? 'grey' : 'white'
            }}
            onLoad={() => {
              const data = this.state.data;
              this.setState({
                locationId: this.state.nextLocationId,
              })
            }}
            source={asset(data.photos[nextLocationId].uri)}
          />
          <CylindricalPanel
            layer={{
              width: MAX_TEXTURE_WIDTH,
              height: MAX_TEXTURE_HEIGHT,
              density: MAX_TEXTURE_WIDTH
            }}
            style={{position: 'absolute'}}
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
                {
                  tooltips &&
                  tooltips.map((tooltip, index) => {
                    return (
                      <NavButton
                        key={tooltip.linkedPhotoId}
                        isLoading={isLoading}
                        onInput={() => this.setState({nextLocationId: tooltip.linkedPhotoId})}
                        pixelsPerMeter={PPM}
                        source={asset(data.nav_icon)}
                        textLabel={tooltip.text}
                        translateX={degreesToPixels(tooltip.rotationY)}
                      />
                    )
                  })
                }
                {
                  locationId == null &&
                    <LoadingSpinner
                      style={{layoutOrigin: [0.5, 0.5]}}
                      pixelsPerMeter={PPM}
                      translateX={degreesToPixels(rotation) * -1}
                    />
                }
              </View>
            </View>
          </CylindricalPanel>
        </View>
      </View>
    )
  }
}

AppRegistry.registerComponent('clientVR', () => clientVR)
