import React from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useSettings } from "../context/SettingsContext";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Weather: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SettingsScreen = () => {
  const { state, dispatch } = useSettings();
  const navigation = useNavigation<NavigationProp>();

  const toggleUnit = () => {
    dispatch({
      type: "SET_UNITS",
      payload: state.units === "metric" ? "imperial" : "metric",
    });
  };

  const toggleCategory = (category: string) => {
    dispatch({ type: "TOGGLE_CATEGORY", payload: category });
  };

  return (
    <View className="flex-1 bg-black">
      {/* 🔙 Header */}
      <View className="flex-row items-center px-4 py-5 bg-white/10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Settings</Text>
      </View>

      <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
        {/* 🌡️ Temperature Unit */}
        <Text className="text-sky-400 text-lg font-bold mb-3">
          Temperature Unit
        </Text>

        <View className="flex-row justify-between items-center bg-white/10 p-3 rounded-xl mb-3">
          <Text className="text-white text-base">
            {state.units === "metric" ? "Celsius (°C)" : "Fahrenheit (°F)"}
          </Text>
          <Switch
            value={state.units === "imperial"}
            onValueChange={toggleUnit}
            thumbColor="#fff"
            trackColor={{ false: "#555", true: "#00BFFF" }}
          />
        </View>

        {/* 📰 News Categories */}
        <Text className="text-sky-400 text-lg font-bold mt-8 mb-3">
          News Categories
        </Text>

        {(Object.keys(state.categories) as Array<
          keyof typeof state.categories
        >).map((cat) => (
          <View
            key={cat}
            className="flex-row justify-between items-center bg-white/10 p-3 rounded-xl mb-3"
          >
            <Text className="text-white text-base">{cat.toUpperCase()}</Text>
            <Switch
              value={state.categories[cat]}
              onValueChange={() => toggleCategory(cat)}
              thumbColor="#fff"
              trackColor={{ false: "#555", true: "#00BFFF" }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
