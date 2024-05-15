import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import Loader from '@/components/Loader'
import Markdown from 'react-native-markdown-display'

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
          {post && <Markdown style={styles}>{post.description}</Markdown>}
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
  bullet_list: {
    color: 'green',
  },
  list_item: {
    fontSize: 20,
    margin: 5,
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
