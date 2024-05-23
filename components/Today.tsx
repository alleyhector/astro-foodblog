import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native'
import { Link } from 'expo-router'
import { gql, useQuery } from '@apollo/client'
import Loader from '@/components/Loader'
import Transits from '@/components/Transits'
import Markdown from 'react-native-markdown-display'
import { card } from '@/constants/Styles'
import FitImage from 'react-native-fit-image'

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
const rules = {
  image: (node, styles) => {
    const { src, alt } = node.attributes

    const imageProps = {
      indicator: true,
      key: node.key,
      style: styles._VIEW_SAFE_image,
      source: {
        uri: `https:${src}`,
        alt,
      },
    }

    return <FitImage {...imageProps} />
  },
}

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
                  style={{ width: 300, height: 300, alignSelf: 'center' }}
                  source={{ uri: post.heroImage.url }}
                />
              )}
              <Link href={`/${post.slug}`} style={styles.title}>
                {post.title}
              </Link>
              {/* <Text style={styles.text}>{date}</Text> */}
              <Transits transits={post.transitCollection.items} />
              <View style={card}>
                <Markdown rules={rules} style={styles}>
                  {post.body}
                </Markdown>
              </View>
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
  text: {
    fontSize: 16,
    margin: 10,
  },
  paragraph: {
    fontFamily: 'Nimbus',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  strong: { fontFamily: 'NimbusBold' },
  bullet_list: { fontFamily: 'NimbusItalic' },
})
