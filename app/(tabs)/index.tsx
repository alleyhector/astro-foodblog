import { ImageBackground, ScrollView, StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import Today from '@/components/Today'
import Tomorrow from '@/components/Tomorrow'

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>WITH A SIDE OF ASTRO: </Text>
        <Text style={styles.text}>FOOD FOR CELESTIAL THOUGHT</Text>

        <Today />
        <Tomorrow />
        {/* <ImageBackground
          source={require('../../assets/images/icon.png')}
          style={styles.bgimage}
        ></ImageBackground> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'Nimbus',
  },
  bgimage: {
    justifyContent: 'flex-end',
    paddingBottom: 100,
    margin: 0,
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    fontFamily: 'AngelClub',
    margin: 10,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
