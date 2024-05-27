import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Loader from '@/components/Loader'
import { useColorScheme } from '@/components/useColorScheme'
import * as SystemUI from 'expo-system-ui'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
  cache,
  credentials: 'same-origin',
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_KEY}`,
  },
})

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Courier: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Nimbus: require('../assets/fonts/Nimbus/NimbusSans-Regular.ttf'),
    NimbusBold: require('../assets/fonts/Nimbus/NimbusSans-Bold.ttf'),
    NimbusItalic: require('../assets/fonts/Nimbus/NimbusSans-Italic.ttf'),
    NimbusBoldItalic: require('../assets/fonts/Nimbus/NimbusSans-BoldItalic.ttf'),
    AngelClub: require('../assets/fonts/AngelClub/AngelClub.otf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return <Loader />
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen
              name='(tabs)'
              options={{ headerShown: false, title: 'Back' }}
            />
            <Stack.Screen name='[slug]' options={{ title: 'Post Details' }} />
          </Stack>
        </SafeAreaProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}
