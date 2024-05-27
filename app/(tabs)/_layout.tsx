import React from 'react'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  color: string
}) {
  return (
    <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='zodiac-taurus' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='archive'
        options={{
          title: 'Archive',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='zodiac-virgo' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='about'
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='zodiac-cancer' color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
