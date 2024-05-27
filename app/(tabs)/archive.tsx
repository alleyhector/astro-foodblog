import React from 'react'
import { Image, StyleSheet, ScrollView, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import Loader from '@/components/Loader'
import Markdown from 'react-native-markdown-display'
import { Text, View } from '@/components/Themed'
import { Link } from 'expo-router'
import Transits from '@/components/Transits'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const QUERY_POSTS = gql`
  query blogPosts($today: DateTime!) {
    blogPostCollection(
      where: { publishDate_lte: $today }
      order: publishDate_DESC
    ) {
      items {
        title
        slug
        author {
          name
        }
        publishDate
        description
        body
        heroImage {
          url
        }
        transitCollection {
          items {
            title
            planet
            sign
            aspect
            transitingPlanet
            transitingSign
          }
        }
      }
    }
  }
`

export default function ArchiveScreen() {
  const insets = useSafeAreaInsets()
  const today = new Date().toString()

  const { data, loading, refetch } = useQuery(QUERY_POSTS, {
    fetchPolicy: 'no-cache',
    variables: { today: new Date(today) },
  })

  let posts = []
  if (!loading) {
    posts = data?.blogPostCollection.items
  }

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: '#fff',
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Link href={`/${item.slug}`} style={styles.title}>
                {item.title}
              </Link>
              <Transits transits={item.transitCollection.items} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Nimbus',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'AngelClub',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
