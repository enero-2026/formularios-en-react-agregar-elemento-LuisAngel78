import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="alumnos" options={{
        tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={40} color={color} />
      }} />
      <Tabs.Screen name="perfil" options={{
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />
      }} />
      <Tabs.Screen name="Agregar" options={{ href: null }} />
    </Tabs>
  );
}