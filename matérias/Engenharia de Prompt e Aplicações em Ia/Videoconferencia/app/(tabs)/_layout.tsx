/**
 * Layout das Tabs — oculta a tab bar pois o MedVet Connect usa navegação Stack
 * A tab é mantida apenas como ponto de entrada do Expo Router
 */
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
