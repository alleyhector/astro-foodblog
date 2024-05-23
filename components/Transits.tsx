import { Image, StyleSheet, Text } from 'react-native'
import { View } from './Themed'
import { imagesMap } from '@/assets/glyphs/exports'

export default function Transits({ transits }) {
  return (
    <>
      {transits &&
        transits.map((transit, index) => {
          return (
            <View key={index}>
              <Text>{`${transit.planet} in ${transit.sign} ${transit.aspect} ${transit.transitingPlanet} in ${transit.transitingSign}`}</Text>
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={imagesMap[transit?.planet ?? '']}
                />
                <Image
                  style={styles.image}
                  source={imagesMap[transit?.sign ?? '']}
                />
                <Image
                  style={styles.image}
                  source={imagesMap[transit?.aspect ?? '']}
                />
                <Image
                  style={styles.image}
                  source={imagesMap[transit?.transitingPlanet ?? '']}
                />
                <Image
                  style={styles.image}
                  source={imagesMap[transit?.transitingSign ?? '']}
                />
              </View>
            </View>
          )
        })}
    </>
  )
}

const styles = StyleSheet.create({
  container: { display: 'flex', flexDirection: 'row' },
  image: {
    flex: 1,
    margin: 1,
    padding: 1,
  },
})
