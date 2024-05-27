import { Image, StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import { Link } from 'expo-router'
import { gql, useQuery } from '@apollo/client'
import Loader from '@/components/Loader'
import Transits from '@/components/Transits'
import Markdown from 'react-native-markdown-display'
import FitImage from 'react-native-fit-image'
import { markdownStyles } from '@/constants/Styles'
import { LinearGradient } from 'expo-linear-gradient'

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
                  style={styles.hero}
                  source={{ uri: post.heroImage.url }}
                />
              )}
              <Link href={`/${post.slug}`} style={styles.title}>
                {post.title}
              </Link>
              {/* <Text style={styles.text}>{date}</Text> */}
              <Text style={styles.menu}>On today's astrological menu:</Text>
              <Transits transits={post.transitCollection.items} />
              <Markdown rules={rules} style={markdownStyles}>
                {post.body}
              </Markdown>
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
  },
  hero: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  menu: {
    fontFamily: 'AngelClub',
    fontSize: 20,
    margin: 10,
  },
  title: {
    fontFamily: 'AngelClub',
    alignSelf: 'flex-end',
    fontSize: 24,
    margin: 10,
  },
})
