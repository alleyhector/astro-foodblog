import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { Link } from 'expo-router'
import { gql, useQuery } from '@apollo/client'
import Loader from '@/components/Loader'
import Markdown from 'react-native-markdown-display'

const QUERY_TODAY_POST = gql`
  query blogPost($today: DateTime!) {
    blogPostCollection(
      where: { publishDate_lte: $today }
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

const Today = () => {
  const today = new Date().toString()

  const { data, loading, refetch } = useQuery(QUERY_TODAY_POST, {
    fetchPolicy: 'no-cache',
    variables: { today: new Date(today) },
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
          {post && (
            <View>
              {post.heroImage && (
                <Image
                  style={{ width: 300, height: 300 }}
                  source={{ uri: post.heroImage.url }}
                />
              )}
              <Link href={`/${post.slug}`} style={styles.title}>
                {post.title}
              </Link>
              <Text style={styles.text}>{date}</Text>
              <Markdown style={styles}>{post.description}</Markdown>
              <Markdown>{post.body}</Markdown>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default Today

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
