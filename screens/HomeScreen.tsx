// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   ActivityIndicator,
//   StyleSheet,
//   Animated,
//   TouchableOpacity,
//   Text,
//   Dimensions,
// } from "react-native";
// import Geolocation from "@react-native-community/geolocation";
// import WeatherCard from "../components/WeatherCard";
// import ForecastModal from "../components/ForecastModal";
// import NewsSection from "../components/NewsSection";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { useSettings } from "../context/SettingsContext";

// type RootStackParamList = {
//   Home: undefined;
//   Weather: undefined;
//   Settings: undefined;
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const WEATHER_API_KEY = "a696b1509789ed0d77fce6787072c188";
// const SCREEN_HEIGHT = Dimensions.get("window").height;

// export default function HomeScreen() {
//   const [weather, setWeather] = useState<any>(null);
//   const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
//     null
//   );
//   const [aqi, setAqi] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [showForecast, setShowForecast] = useState(false);
//   const [showNews, setShowNews] = useState(false);

//   const { state } = useSettings();
//   const unit = state.units as "metric" | "imperial"; // ✅ ensures correct typing

//   const slideAnim = useRef(new Animated.Value(0)).current;
//   const navigation = useNavigation<NavigationProp>();


  

//   // ✅ Geolocation with cleanup
//   useEffect(() => {
//     let isMounted = true;

//     Geolocation.getCurrentPosition(
//       (position) => {
//         if (!isMounted) return;
//         const { latitude, longitude } = position.coords;
//         setCoords({ lat: latitude, lon: longitude });
//         console.log("📍 Location:", { latitude, longitude });
//         fetchWeather(latitude, longitude);
//       },
//       (error) => console.error("❌ Location Error:", error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // ✅ Fetch weather whenever coords or unit changes
//   useEffect(() => {
//     if (coords) {
//       fetchWeather(coords.lat, coords.lon);
//     }
//   }, [coords, unit]);

//   const fetchAQI = async (lat: number, lon: number) => {
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
//       );
//       const data = await res.json();
//       const aqiValue = data?.list?.[0]?.main?.aqi ?? null;
//       setAqi(aqiValue);
//       console.log("🌫️ AQI Data:", JSON.stringify(data, null, 2));
//     } catch (err) {
//       console.error("❌ AQI Fetch Error:", err);
//     }
//   };

//   const fetchWeather = async (lat: number, lon: number) => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${WEATHER_API_KEY}`
//       );
//       const data = await res.json();
//       console.log("🌤️ Weather Data:", JSON.stringify(data, null, 2));
//       setWeather(data);
//       fetchAQI(lat, lon);
//     } catch (e) {
//       console.error("❌ Error fetching weather:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Animated slide with cleanup
//   useEffect(() => {
//     const anim = Animated.timing(slideAnim, {
//       toValue: showNews ? -SCREEN_HEIGHT * 0.65 : 0,
//       duration: 500,
//       useNativeDriver: true,
//     });

//     anim.start();

//     return () => {
//       anim.stop(); // prevent "destroy" errors
//     };
//   }, [showNews]);

//   const toggleNews = () => {
//     console.log("🔄 Toggling news panel:", !showNews);
//     setShowNews((prev) => !prev);
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#fff" />
//         <Text style={styles.loadingText}>Loading weather...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* 🌤️ Weather Card */}
//      <WeatherCard 
//   weather={weather}
//   setShowForecast={setShowForecast}
//   aqi={aqi}
//   unit={unit}
// />


//       {/* 📅 Forecast Modal */}
//       {coords && (
//         <ForecastModal
//           visible={showForecast}
//           onClose={() => setShowForecast(false)}
//           lat={coords.lat}
//           lon={coords.lon}
//         />
//       )}

//       {/* 📰 Sliding News Panel */}
//       <Animated.View
//         style={[styles.newsContainer, { transform: [{ translateY: slideAnim }] }]}
//       >
//         <TouchableOpacity onPress={toggleNews} style={styles.dragHandle}>
//           <View style={styles.handleBar} />
//           <Icon
//             name={showNews ? "chevron-down-outline" : "chevron-up-outline"}
//             size={30}
//             color="#fff"
//           />
//           <Text style={styles.dragText}>
//             {showNews ? "Hide News" : "Show News"}
//           </Text>
//         </TouchableOpacity>

//         {weather && (
//           <NewsSection
//             temperature={weather.main.temp}
//             condition={weather.weather[0].main}
//             unit={unit}
//           />
//         )}
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#000" },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000",
//   },
//   loadingText: {
//     color: "#fff",
//     marginTop: 10,
//     fontSize: 16,
//   },
//   newsContainer: {
//     position: "absolute",
//     bottom: -SCREEN_HEIGHT * 0.65,
//     height: SCREEN_HEIGHT * 0.72,
//     width: "100%",
//     backgroundColor: "rgba(0,0,0,0.9)",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 8,
//     elevation: 10,
//   },
//   dragHandle: {
//     alignItems: "center",
//     paddingVertical: 10,
//     marginBottom: 10,
//   },
//   handleBar: {
//     width: 40,
//     height: 4,
//     backgroundColor: "rgba(255,255,255,0.3)",
//     borderRadius: 2,
//     marginBottom: 8,
//   },
//   dragText: {
//     color: "#fff",
//     fontSize: 12,
//     marginTop: 4,
//     opacity: 0.8,
//   },
// });



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

  // Get current location
  useEffect(() => {
    let isMounted = true;
    Geolocation.getCurrentPosition(
      (position) => {
        if (!isMounted) return;
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        fetchWeather(latitude, longitude);
      },
      (error) => console.error("❌ Location Error:", error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch weather again when units or location change
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
      console.error("❌ AQI Fetch Error:", err);
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
      console.error("❌ Error fetching weather:", e);
    } finally {
      setLoading(false);
    }
  };

  // Animated news panel
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
      {/* 🌤️ Weather Card */}
      <WeatherCard weather={weather} setShowForecast={setShowForecast} aqi={aqi} unit={unit} />

      {/* 📅 Forecast Modal */}
      {coords && (
        <ForecastModal
          visible={showForecast}
          onClose={() => setShowForecast(false)}
          lat={coords.lat}
          lon={coords.lon}
        />
      )}

      {/* 📰 News Panel */}
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          height: SCREEN_HEIGHT * 0.72,
        }}
        className="absolute bottom-[-65%] w-full bg-black/90 rounded-t-2xl p-4 shadow-lg"
      >
        {/* Handle */}
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
