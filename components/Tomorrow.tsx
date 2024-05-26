import React from 'react'
import { Image, StyleSheet, ScrollView } from 'react-native'
import { Text, View, useThemeColor } from '@/components/Themed'
import { gql, useQuery } from '@apollo/client'
import Loader from '@/components/Loader'
import Markdown from 'react-native-markdown-display'
import Transits from '@/components/Transits'

const QUERY_TOMORROW_POST = gql`
  query blogPost($tomorrow: DateTime!) {
    blogPostCollection(
      where: { publishDate_lte: $tomorrow }
      order: publishDate_DESC
      limit: 1
    ) {
      items {
        title
        slug
        publishDate
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

const Tomorrow = () => {
  const today = new Date()
  const tomorrow = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate() + 1,
    8,
    0,
    0
  )

  const { data, loading, refetch } = useQuery(QUERY_TOMORROW_POST, {
    fetchPolicy: 'no-cache',
    variables: { tomorrow: new Date(tomorrow) },
  })

  let post
  let date
  if (!loading) {
    post = data?.blogPostCollection?.items[0]
    date = new Date(post?.publishDate).toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <Text style={styles.menu}>On tomorrow's astrological menu: </Text>
          <Transits transits={post.transitCollection.items} />
        </View>
      )}
    </View>
  )
}

export default Tomorrow

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  menu: {
    fontFamily: 'AngelClub',
    fontSize: 20,
    margin: 10,
  },
})
