import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import WeatherCard from "../components/WeatherCard";
import ForecastModal from "../components/ForecastModal";
import NewsSection from "../components/NewsSection";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSettings } from "../context/SettingsContext";

const WEATHER_API_KEY = "a696b1509789ed0d77fce6787072c188";
const SCREEN_HEIGHT = Dimensions.get("window").height;

type RootStackParamList = {
  Home: undefined;
  Weather: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [aqi, setAqi] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);
  const [showNews, setShowNews] = useState(false);

  const { state } = useSettings();
  const unit = state.units as "metric" | "imperial";
  const slideAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp>();


  useEffect(() => {
    let isMounted = true;
    Geolocation.getCurrentPosition(
      (position) => {
        if (!isMounted) return;
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        fetchWeather(latitude, longitude);
      },
      (error) => console.error(" Location Error:", error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    return () => {
      isMounted = false;
    };
  }, []);


  useEffect(() => {
    if (coords) fetchWeather(coords.lat, coords.lon);
  }, [coords, unit]);

  const fetchAQI = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
      );
      const data = await res.json();
      setAqi(data?.list?.[0]?.main?.aqi ?? null);
    } catch (err) {
      console.error(" AQI Fetch Error:", err);
    }
  };

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${WEATHER_API_KEY}`
      );
      const data = await res.json();
      setWeather(data);
      fetchAQI(lat, lon);
    } catch (e) {
      console.error(" Error fetching weather:", e);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    const anim = Animated.timing(slideAnim, {
      toValue: showNews ? -SCREEN_HEIGHT * 0.65 : 0,
      duration: 500,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [showNews]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-3 text-base">Loading weather...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
     
      <WeatherCard weather={weather} setShowForecast={setShowForecast} aqi={aqi} unit={unit} />


      {coords && (
        <ForecastModal
          visible={showForecast}
          onClose={() => setShowForecast(false)}
          lat={coords.lat}
          lon={coords.lon}
        />
      )}

  
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          height: SCREEN_HEIGHT * 0.72,
        }}
        className="absolute bottom-[-65%] w-full bg-black/90 rounded-t-2xl p-4 shadow-lg"
      >

        <TouchableOpacity onPress={() => setShowNews(!showNews)} className="items-center py-3 mb-2">
          <View className="w-10 h-1 bg-white/30 rounded-full mb-2" />
          <Icon
            name={showNews ? "chevron-down-outline" : "chevron-up-outline"}
            size={30}
            color="#fff"
          />
          <Text className="text-white text-xs opacity-80 mt-1">
            {showNews ? "Hide News" : "Show News"}
          </Text>
        </TouchableOpacity>

        {weather && (
          <NewsSection
            temperature={weather.main.temp}
            condition={weather.weather[0].main}
            unit={unit}
          />
        )}
      </Animated.View>
    </View>
  );
}
