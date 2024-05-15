import { Link } from 'expo-router'
import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]

const formatDate = isoDate => {
  const date = new Date(isoDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  let dt = date.getDate()
  let Month = ''
  if (dt < 10) {
    dt = Number('0' + dt)
  }
  if (month < 10) {
    Month = MONTH[month]
  }
  return Month + ' ' + dt + ', ' + year
}

const Post = ({ post }) => {
  const date = new Date(post.publishDate).toLocaleDateString()

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Link href={`/${post.slug}`} style={styles.title}>
          {post.title}
        </Link>
        <Text style={styles.text}>{post.author.name}</Text>
        <Text style={styles.text}>{formatDate(post.publishDate)}</Text>
        <Text style={styles.text}>{post.description}</Text>
      </View>
    </View>
  )
}

export default Post

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
