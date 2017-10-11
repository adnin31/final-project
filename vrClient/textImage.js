import React from 'react'
import {
  asset,
  Image,
  Text,
  View
} from 'react-vr'

const TextImage = (props) => {
  const tooltip = props.tooltip
  const PPM = props.pixelsPerMeter
  const fontSize = {
    attrib: 0.05 * PPM,
    text: 0.1 * PPM,
    title: 0.15 * PPM,
  }
  const margin = 0.05 * PPM
  const titleOpacity = 0.60
  return (
    <View
      style={{
        borderColor: '#777879',
        borderWidth: 0.01 * PPM,
      }}>
      <Image
        style={{
          height: tooltip.height * PPM,
          width: tooltip.width * PPM,
          justifyContent: 'flex-end',
        }}
        source={asset(tooltip.source)}>

        {tooltip.title &&
          <View>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                bottom: -fontSize.title - margin,
                height: fontSize.title + margin,
                opacity: titleOpacity,
                position: 'relative',
              }}
            />
            <Text
              style={{
                color: 'white',
                fontSize: fontSize.title,
                flex: 1,
                height: fontSize.title + margin,
                marginLeft: margin,
                marginRight: margin,
                textAlignVertical: 'bottom',
              }}>
              {tooltip.title}
            </Text>
          </View>}
      </Image>

      <View
        style={{
          backgroundColor: 'black',
          paddingBottom: margin,
          paddingLeft: margin,
          paddingRight: margin,
          paddingTop: 0,
          width: tooltip.width * PPM,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: fontSize.text,
            textAlignVertical: 'center',
          }}>
          {tooltip.text}
        </Text>
      </View>
    </View>
  )
}

export default TextImage
