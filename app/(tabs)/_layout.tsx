import {
  Tabs,
} from 'expo-router';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({
        route,
      }) => ({
        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor:
          '#38BDF8',

        tabBarInactiveTintColor:
          '#64748B',

        tabBarStyle: {
          backgroundColor:
            '#0F172A',

          borderTopWidth: 0,

          height: 80,

          paddingTop: 10,

          paddingBottom: 12,

          position: 'absolute',

          elevation: 0,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        tabBarIcon: ({
          color,
          size,
          focused,
        }) => {
          let iconName:
            | keyof typeof Ionicons.glyphMap =
            'home';

          if (
            route.name ===
            'dashboard'
          ) {
            iconName = focused
              ? 'home'
              : 'home-outline';
          }

          else if (
            route.name ===
            'explorar'
          ) {
            iconName = focused
              ? 'search'
              : 'search-outline';
          }

          else if (
            route.name ===
            'perfil'
          ) {
            iconName = focused
              ? 'person'
              : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },
      })}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
        }}
      />

      <Tabs.Screen
        name="explorar"
        options={{
          title: 'Explorar',
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
        }}
      />
    </Tabs>
  );
}