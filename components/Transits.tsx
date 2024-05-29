import { Image, ImageSourcePropType, StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
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
                <Text
                  style={styles.transitText}
                >{`${transit.planet} enters ${transit.sign}`}</Text>
              ) : (
                <Text style={styles.transitText}>
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
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transitText: {
    marginTop: 5,
    marginBottom: 15,
    fontFamily: 'NimbusBold',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    flex: 1,
    backgroundColor: 'transparent',
  },
})
