// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
//   ImageBackground,
//   ScrollView,
//   Animated,
// } from "react-native";
// import Geolocation from "@react-native-community/geolocation";
// import ForecastModal from "../components/ForecastModal";
// import NewsSection from "../components/NewsSection";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

// // Define your navigation types
// type RootStackParamList = {
//   Home: undefined;
//   Weather: undefined;
//   Settings: undefined;
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const WEATHER_API_KEY = "a696b1509789ed0d77fce6787072c188";

// const WeatherScreen = () => {
//   const [weather, setWeather] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [unit, setUnit] = useState<"metric" | "imperial">("metric");
//   const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
//     null
//   );
//   const [showScrollIndicator, setShowScrollIndicator] = useState(true);
//   const bounceAnim = useState(new Animated.Value(0))[0];
  
//   // Type the navigation properly
//   const navigation = useNavigation<NavigationProp>();

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(bounceAnim, {
//           toValue: -10,
//           duration: 600,
//           useNativeDriver: true,
//         }),
//         Animated.timing(bounceAnim, {
//           toValue: 0,
//           duration: 600,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, []);

//   useEffect(() => {
//     Geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setCoords({ lat: latitude, lon: longitude });
//         console.log("📍 Location:", { latitude, longitude });
//       },
//       (err) => console.error("❌ Location error:", err),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   }, []);

//   useEffect(() => {
//     if (coords) fetchWeather(coords.lat, coords.lon);
//   }, [coords, unit]);

//   const fetchWeather = async (lat: number, lon: number) => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${WEATHER_API_KEY}`
//       );
//       const data = await res.json();
//       console.log("🌤️ WEATHER DATA:", JSON.stringify(data, null, 2));
//       setWeather(data);
//     } catch (err) {
//       console.error("❌ Weather fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = (event: any) => {
//     const offsetY = event.nativeEvent.contentOffset.y;
//     if (offsetY > 50 && showScrollIndicator) {
//       setShowScrollIndicator(false);
//     } else if (offsetY <= 50 && !showScrollIndicator) {
//       setShowScrollIndicator(true);
//     }
//   };

//   const background =
//     weather?.weather?.[0]?.main === "Clear"
//       ? require("../assets/clear.png")
//       : weather?.weather?.[0]?.main === "Clouds"
//       ? require("../assets/clouds.png")
//       : weather?.weather?.[0]?.main === "Rain"
//       ? require("../assets/rain.png")
//       : require("../assets/default.png");

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#fff" />
//         <Text style={styles.loadingText}>Loading weather...</Text>
//       </View>
//     );
//   }

//   return (
//     <ImageBackground source={background} style={styles.bg}>
//       <View style={styles.overlay}>
//         <ScrollView
//           contentContainerStyle={styles.scroll}
//           showsVerticalScrollIndicator={false}
//           onScroll={handleScroll}
//           scrollEventThrottle={16}
//         >
      

//           {weather && (
//             <>
//               <Text style={styles.city}>{weather.name}</Text>
//               <Text style={styles.temp}>
//                 {Math.round(weather.main.temp)}°
//                 {unit === "metric" ? "C" : "F"}
//               </Text>
//               <Text style={styles.desc}>{weather.weather[0].description}</Text>

//               <View style={styles.weatherDetails}>
//                 <View style={styles.detailItem}>
//                   <Text style={styles.detailLabel}>Feels Like</Text>
//                   <Text style={styles.detailValue}>
//                     {Math.round(weather.main.feels_like)}°
//                   </Text>
//                 </View>
//                 <View style={styles.detailItem}>
//                   <Text style={styles.detailLabel}>Humidity</Text>
//                   <Text style={styles.detailValue}>
//                     {weather.main.humidity}%
//                   </Text>
//                 </View>
//                 <View style={styles.detailItem}>
//                   <Text style={styles.detailLabel}>Wind</Text>
//                   <Text style={styles.detailValue}>
//                     {Math.round(weather.wind.speed)} m/s
//                   </Text>
//                 </View>
//               </View>


//               {showScrollIndicator && (
//                 <Animated.View
//                   style={[
//                     styles.scrollIndicator,
//                     { transform: [{ translateY: bounceAnim }] },
//                   ]}
//                 >
//                   <Icon name="chevron-down" size={30} color="#fff" />
//                   <Text style={styles.scrollText}>Scroll for News</Text>
//                   <Icon name="chevron-down" size={30} color="#fff" />
//                 </Animated.View>
//               )}

//               {coords && (
//                 <ForecastModal
//                   visible={modalVisible}
//                   onClose={() => setModalVisible(false)}
//                   lat={coords.lat}
//                   lon={coords.lon}
//                 />
//               )}

//               {/* <NewsSection
//                 temperature={weather.main.temp}
//                 unit={unit}
//               /> */}
//                <NewsSection
//                 temperature={weather.main.temp}
//                 condition={weather.weather[0].main}
//                 unit={unit}
//               />
//             </>
//           )}
//         </ScrollView>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   bg: { flex: 1 },
//   overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000",
//   },
//   loadingText: { color: "#fff", marginTop: 10, fontSize: 16 },
// //   topRight: {
// //     position: "absolute",
// //     top: 10,
// //     right: 20,
// //     flexDirection: "row",
// //     gap: 12,
// //     zIndex: 10,
// //   },
// //   iconBtn: { 
// //     backgroundColor: "rgba(255,255,255,0.2)", 
// //     padding: 6, 
// //     borderRadius: 20 
// //   },
//   city: { 
//     fontSize: 32, 
//     color: "#fff", 
//     fontWeight: "bold", 
//     textAlign: "center" 
//   },
//   temp: { 
//     fontSize: 60, 
//     color: "#fff", 
//     fontWeight: "bold", 
//     textAlign: "center" 
//   },
//   desc: {
//     fontSize: 18,
//     color: "#fff",
//     textTransform: "capitalize",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   weatherDetails: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "90%",
//     marginBottom: 20,
//     backgroundColor: "rgba(255,255,255,0.15)",
//     borderRadius: 15,
//     padding: 15,
//   },
//   detailItem: { alignItems: "center" },
//   detailLabel: { fontSize: 12, color: "#fff", opacity: 0.8 },
//   detailValue: { 
//     fontSize: 18, 
//     fontWeight: "bold", 
//     color: "#fff", 
//     marginTop: 5 
//   },
//   forecastBtn: {
//     backgroundColor: "rgba(255,255,255,0.3)",
//     marginTop: 10,
//     marginBottom: 40,
//     paddingVertical: 10,
//     paddingHorizontal: 25,
//     borderRadius: 20,
//   },
//   forecastText: { color: "#fff", fontWeight: "600", fontSize: 16 },
//   scrollIndicator: {
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 20,
//     paddingVertical: 10,
//   },
//   scrollText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//     marginVertical: 5,
//     textShadowColor: "rgba(0, 0, 0, 0.75)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
//   scroll: { 
//     paddingTop: 80, 
//     alignItems: "center", 
//     paddingBottom: 50,
//     minHeight: "100%",
//   },
// });

// export default WeatherScreen;








import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Animated,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import ForecastModal from "../components/ForecastModal";
import NewsSection from "../components/NewsSection";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

// ✅ Navigation types
type RootStackParamList = {
  Home: undefined;
  Weather: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const WEATHER_API_KEY = "a696b1509789ed0d77fce6787072c188";

const WeatherScreen = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const bounceAnim = useState(new Animated.Value(0))[0];

  const navigation = useNavigation<NavigationProp>();

  // 🔁 Bounce animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // 📍 Get current location
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lon: longitude });
        console.log("📍 Location:", { latitude, longitude });
      },
      (err) => console.error("❌ Location error:", err),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  // 🌦️ Fetch weather
  useEffect(() => {
    if (coords) fetchWeather(coords.lat, coords.lon);
  }, [coords, unit]);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${WEATHER_API_KEY}`
      );
      const data = await res.json();
      console.log("🌤️ WEATHER DATA:", JSON.stringify(data, null, 2));
      setWeather(data);
    } catch (err) {
      console.error("❌ Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Handle scroll indicator
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollIndicator(offsetY <= 50);
  };

  const background =
    weather?.weather?.[0]?.main === "Clear"
      ? require("../assets/clear.png")
      : weather?.weather?.[0]?.main === "Clouds"
      ? require("../assets/clouds.png")
      : weather?.weather?.[0]?.main === "Rain"
      ? require("../assets/rain.png")
      : require("../assets/default.png");

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-2 text-base">Loading weather...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={background} className="flex-1">
      <View className="flex-1 bg-black/30">
        <ScrollView
          className="pt-20 pb-12 min-h-full"
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {weather && (
            <>
              <Text className="text-3xl text-white font-bold text-center">
                {weather.name}
              </Text>
              <Text className="text-6xl text-white font-bold text-center">
                {Math.round(weather.main.temp)}°{unit === "metric" ? "C" : "F"}
              </Text>
              <Text className="text-lg text-white capitalize mb-6 text-center">
                {weather.weather[0].description}
              </Text>

              {/* 🌡️ Weather Details */}
              <View className="flex-row justify-around w-11/12 bg-white/15 rounded-2xl p-4 mb-5">
                <View className="items-center">
                  <Text className="text-white/80 text-xs">Feels Like</Text>
                  <Text className="text-white font-bold text-lg mt-1">
                    {Math.round(weather.main.feels_like)}°
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-white/80 text-xs">Humidity</Text>
                  <Text className="text-white font-bold text-lg mt-1">
                    {weather.main.humidity}%
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-white/80 text-xs">Wind</Text>
                  <Text className="text-white font-bold text-lg mt-1">
                    {Math.round(weather.wind.speed)} m/s
                  </Text>
                </View>
              </View>

              {/* ⬇️ Scroll Indicator */}
              {showScrollIndicator && (
                <Animated.View
                  style={{ transform: [{ translateY: bounceAnim }] }}
                  className="items-center mt-3 mb-5 py-2"
                >
                  <Icon name="chevron-down" size={30} color="#fff" />
                  <Text className="text-white text-sm font-semibold my-1">
                    Scroll for News
                  </Text>
                  <Icon name="chevron-down" size={30} color="#fff" />
                </Animated.View>
              )}

              {/* 📅 Forecast Modal */}
              {coords && (
                <ForecastModal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  lat={coords.lat}
                  lon={coords.lon}
                />
              )}

              {/* 📰 News Section */}
              <NewsSection
                temperature={weather.main.temp}
                condition={weather.weather[0].main}
                unit={unit}
              />
            </>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default WeatherScreen;
