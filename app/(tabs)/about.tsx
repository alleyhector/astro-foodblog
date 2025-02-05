import { Image, StyleSheet, ScrollView } from 'react-native'
import { Text, View, useThemeColor } from '@/components/Themed'
import { gql, useQuery } from '@apollo/client'
import Loader from '@/components/Loader'
import Markdown from 'react-native-markdown-display'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { dropShadow } from '@/constants/Styles'

const QUERY_ABOUT = gql`
  {
    aboutCollection {
      items {
        name
        description
        aboutMe
        profile {
          url
        }
      }
    }
  }
`

export default function AboutScreen() {
  const insets = useSafeAreaInsets()
  const { data, loading, refetch } = useQuery(QUERY_ABOUT, {
    fetchPolicy: 'no-cache',
  })

  let about
  if (!loading) {
    about = data?.aboutCollection?.items[0]
  }

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: '#fff',
      }}
    >
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            {about && (
              <>
                {about.profile && (
                  <Image
                    style={styles.hero}
                    source={{ uri: about.profile.url }}
                  />
                )}
                <Text style={styles.title}>{about.title}</Text>
                <Markdown style={styles}>{about.aboutMe}</Markdown>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Nimbus',
    padding: 20,
  },
  hero: {
    marginTop: 20,
    width: 260,
    height: 387,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
