// app/_layout.tsx

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  );
}