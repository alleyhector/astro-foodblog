import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { gql, useQuery } from '@apollo/client'
import Loader from '@/components/Loader'

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
  console.log('SLUG: ', slug)
  console.log('POST: ', post)

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text style={styles.title}>Postdetails page</Text>
          <Text style={styles.text}>{post.title}</Text>
          <Text style={styles.text}>{slug}</Text>
        </>
      )}
    </View>
  )
}

export default PostDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
