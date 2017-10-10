import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  NativeModules
} from 'react-vr'

const Location = NativeModules.Location

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
    const seatTooltips = pano[seatId]

    return (
      <View>
        <Pano
          source={asset(pano[seatId].uri)}
        />
        
      </View>
    )
  }
}

AppRegistry.registerComponent('vrClient', () => vrClient)
