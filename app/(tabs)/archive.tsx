import React from 'react'
import { Image, StyleSheet, ScrollView, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import Loader from '@/components/Loader'
import Markdown from 'react-native-markdown-display'
import { Text, View } from '@/components/Themed'
import { Link } from 'expo-router'

const QUERY_POSTS = gql`
  {
    blogPostCollection(order: publishDate_DESC) {
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
      }
    }
  }
`

export default function ArchiveScreen() {
  const { data, loading, refetch } = useQuery(QUERY_POSTS, {
    fetchPolicy: 'no-cache',
  })

  let posts = []
  if (!loading) {
    posts = data?.blogPostCollection.items
  }

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <Link href={`/${item.slug}`} style={styles.title}>
                {item.title}
              </Link>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
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
