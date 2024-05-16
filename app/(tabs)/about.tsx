import React from 'react'
import { Image, StyleSheet, ScrollView } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import Loader from '@/components/Loader'
import Markdown from 'react-native-markdown-display'
import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'

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
  const { data, loading, refetch } = useQuery(QUERY_ABOUT, {
    fetchPolicy: 'no-cache',
  })

  const about = data?.aboutCollection?.items[0]

  return (
    <ScrollView>
      {about && (
        <View style={styles.container}>
          {about.profile && (
            <Image
              style={{ width: 300, height: 300 }}
              source={{ uri: about.profile.url }}
            />
          )}
          <Text style={styles.title}>{about.title}</Text>
          <Markdown style={styles}>{about.aboutMe}</Markdown>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
