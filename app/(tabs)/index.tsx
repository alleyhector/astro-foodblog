import { ImageBackground, ScrollView, StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import Today from '@/components/Today'
import Tomorrow from '@/components/Tomorrow'
import { LinearGradient } from 'expo-linear-gradient'
import { textShadow } from '@/constants/Styles'

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <LinearGradient colors={['#d7dddd', '#fac7b0']}> */}
        {/* 
        <ImageBackground
          source={require('../../assets/images/nebula.jpg')}
          style={styles.bgimage}
        > */}
        <Text style={styles.title}>With a Side of Stars </Text>
        <Text style={styles.subtitle}>Food for celestial thought</Text>
        <Today />
        <Tomorrow />
        {/* </ImageBackground> */}
        {/* </LinearGradient> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Nimbus',
  },
  bgimage: {
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'AngelClub',
    fontSize: 24,
    margin: 10,
    textAlign: 'center',
    ...textShadow,
  },
  subtitle: {
    fontFamily: 'AngelClub',
    fontSize: 22,
    margin: 10,
    textAlign: 'center',
    ...textShadow,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
