import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import WeatherScreen from "./screens/WeatherScreens";
import SettingsScreen from "./screens/SettingsScreen";
import { SettingsProvider } from "./context/SettingsContext";

export type RootStackParamList = {
  Home: undefined;
  Weather: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Weather" component={WeatherScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}
