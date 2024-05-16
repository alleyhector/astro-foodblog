import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { gql, useQuery } from '@apollo/client'
import Loader from '@/components/Loader'
import Markdown from 'react-native-markdown-display'

const QUERY_POST = gql`
  query blogPost($slug: String) {
    blogPostCollection(where: { slug: $slug }) {
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

const PostDetails = () => {
  const { slug } = useLocalSearchParams()

  const { data, loading, refetch } = useQuery(QUERY_POST, {
    fetchPolicy: 'no-cache',
    variables: { slug },
  })
  let post
  if (!loading) {
    post = data?.blogPostCollection?.items[0]
  }

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          {post.heroImage && (
            <Image
              style={{ width: 300, height: 300 }}
              source={{ uri: post.heroImage.url }}
            />
          )}
          <Markdown style={styles}>
            {post?.description ? post.description : ''}
          </Markdown>
          <Markdown>{post?.body ? post.body : ''}</Markdown>
        </View>
      )}
    </ScrollView>
  )
}

export default PostDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
