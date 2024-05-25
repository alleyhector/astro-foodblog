import { Image, ImageSourcePropType, StyleSheet, Text } from 'react-native'
import { View } from './Themed'
import { imagesMap } from '@/assets/glyphs/exports'
import { card } from '@/constants/Styles'

export default function Transits({ transits }) {
  return (
    <>
      {transits &&
        transits.map((transit, index) => {
          return (
            <View style={card} key={index}>
              {transit.aspect === 'ingress' ? (
                <Text>{`${transit.planet} enters ${transit.sign}`}</Text>
              ) : (
                <Text>
                  {`${transit.planet} in ${transit.sign} `}
                  {transit.transitingPlanet &&
                    `${transit?.aspect} ${transit?.transitingPlanet} in ${transit?.transitingSign}`}
                </Text>
              )}

              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={
                    imagesMap[
                      transit?.planet !== 'New Moon' || 'Full Moon'
                        ? transit?.planet
                        : 'Moon'
                    ] as ImageSourcePropType
                  }
                />
                <Image
                  style={styles.image}
                  source={imagesMap[transit?.sign ?? ''] as ImageSourcePropType}
                />
                <Image
                  style={styles.image}
                  source={
                    imagesMap[transit?.aspect ?? ''] as ImageSourcePropType
                  }
                />
                <Image
                  style={styles.image}
                  source={
                    imagesMap[
                      transit?.transitingPlanet ?? ''
                    ] as ImageSourcePropType
                  }
                />
                <Image
                  style={styles.image}
                  source={
                    imagesMap[
                      transit?.transitingSign ?? ''
                    ] as ImageSourcePropType
                  }
                />
              </View>
            </View>
          )
        })}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    margin: -10,
    backgroundColor: 'transparent',
  },
})
