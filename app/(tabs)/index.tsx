import { ScrollView, StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import Today from '@/components/Today'
import Tomorrow from '@/components/Tomorrow'

export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <EditScreenInfo path='app/(tabs)/index.tsx' />

      <Text style={styles.text}>WITH A SIDE OF ASTRO: </Text>
      <Text style={styles.text}>FOOD FOR CELESTIAL THOUGHT</Text>
      <Text>Tomorrow on the menu: desc menu items only</Text>
      <Text>Past days menu items with link to post</Text>

      <Today />
      <Tomorrow />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
