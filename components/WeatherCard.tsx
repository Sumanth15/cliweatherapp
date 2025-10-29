// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// type RootStackParamList = {
//   Home: undefined;
//   Weather: undefined;
//   Settings: undefined;
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// // 🌤️ Map each weather condition to a background gradient
// const weatherBackgrounds: Record<string, string[]> = {
//   Clear: ['#fbc2eb', '#a6c1ee'],
//   Clouds: ['#bdc3c7', '#2c3e50'],
//   Rain: ['#4e54c8', '#8f94fb'],
//   Thunderstorm: ['#283e51', '#485563'],
//   Drizzle: ['#89f7fe', '#66a6ff'],
//   Snow: ['#e0eafc', '#cfdef3'],
//   Mist: ['#606c88', '#3f4c6b'],
//   Haze: ['#b8c6db', '#f5f7fa'],
//   Smoke: ['#757f9a', '#d7dde8'],
//   Dust: ['#ba8b02', '#181818'],
//   Fog: ['#757f9a', '#d7dde8'],
//   Sand: ['#c79081', '#dfa579'],
//   Default: ['#6a8cff', '#8ec5fc'],
// };

// interface WeatherCardProps {
//   weather: any;
//   setShowForecast: (show: boolean) => void;
//    aqi: number | null;
//    unit: "metric" | "imperial";
// }

// export default function WeatherCard({ weather, setShowForecast, aqi }: WeatherCardProps) {
//   const navigation = useNavigation<NavigationProp>();

//   if (!weather) return null;

//   const temperature = Math.round(weather.main?.temp);
//   const condition = weather.weather?.[0]?.main;
//   const description = weather.weather?.[0]?.description;
//   const city = weather.name;

//   const gradientColors =
//     weatherBackgrounds[condition as keyof typeof weatherBackgrounds] ||
//     weatherBackgrounds.Default;

//     const aqiDescriptions: Record<number, string> = {
//   1: "Good",
//   2: "Fair",
//   3: "Moderate",
//   4: "Poor",
//   5: "Very Poor",
// };


//   return (
//     <LinearGradient colors={gradientColors} style={styles.container}>
//       {/* 🌆 Header Row */}
//       <View style={styles.header}>

//         <TouchableOpacity
//           style={styles.iconBtn}
//           onPress={() => navigation.navigate('Settings')}
//         >
//           <Icon name="ellipsis-vertical" size={22} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       {/* 🌡️ Center Weather Info */}
//     <View style={styles.center}>
//          <Text style={styles.city}>{city}</Text>
//   <Text style={styles.temp}>
//     {temperature}°{weather?.unit === "imperial" ? "F" : "C"}
//   </Text>
//   <Text style={styles.condition}>{description}</Text>

//   <View style={styles.aqiBadge}>
//     <Text style={styles.aqiText}>
//       AQI {aqi ? aqiDescriptions[aqi] : ""}
//     </Text>
//   </View>
// </View>


//       {/* 📅 Bottom Forecast Button */}
//       <View style={styles.bottom}>
//         <TouchableOpacity style={styles.button} onPress={() => setShowForecast(true)}>
//           <Text style={styles.buttonText}>5-day forecast</Text>
//         </TouchableOpacity>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//     padding: 24,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     marginTop: 40,
//   },
//   city: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   iconBtn: {
//     padding: 8,
//   },
//   center: {
//     alignItems: 'center',
//   },
//   temp: {
//     fontSize: 90,
//     fontWeight: '200',
//     color: '#fff',
//   },
//   condition: {
//     fontSize: 20,
//     color: '#fff',
//     textTransform: 'capitalize',
//   },
//   aqiBadge: {
//     backgroundColor: 'rgba(255,255,255,0.3)',
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     marginTop: 8,
//   },
//   aqiText: {
//     color: '#fff',
//     fontWeight: '500',
//   },
//   bottom: {
//     alignItems: 'center',
//     marginBottom: 200,
//   },
//   button: {
//     backgroundColor: 'rgba(255,255,255,0.3)',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });




import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Weather: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const weatherBackgrounds: Record<string, string[]> = {
  Clear: ["#fbc2eb", "#a6c1ee"],
  Clouds: ["#bdc3c7", "#2c3e50"],
  Rain: ["#4e54c8", "#8f94fb"],
  Thunderstorm: ["#283e51", "#485563"],
  Drizzle: ["#89f7fe", "#66a6ff"],
  Snow: ["#e0eafc", "#cfdef3"],
  Mist: ["#606c88", "#3f4c6b"],
  Haze: ["#b8c6db", "#f5f7fa"],
  Smoke: ["#757f9a", "#d7dde8"],
  Dust: ["#ba8b02", "#181818"],
  Fog: ["#757f9a", "#d7dde8"],
  Sand: ["#c79081", "#dfa579"],
  Default: ["#6a8cff", "#8ec5fc"],
};

interface WeatherCardProps {
  weather: any;
  setShowForecast: (show: boolean) => void;
  aqi: number | null;
  unit: "metric" | "imperial";
}

export default function WeatherCard({
  weather,
  setShowForecast,
  aqi,
  unit,
}: WeatherCardProps) {
  const navigation = useNavigation<NavigationProp>();
  if (!weather) return null;

  const temperature = Math.round(weather.main?.temp);
  const condition = weather.weather?.[0]?.main;
  const description = weather.weather?.[0]?.description;
  const city = weather.name;

  const gradientColors =
    weatherBackgrounds[condition as keyof typeof weatherBackgrounds] ||
    weatherBackgrounds.Default;

  const aqiDescriptions: Record<number, string> = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
  };

  return (
    <LinearGradient colors={gradientColors} className="flex-1 justify-between p-6">
      {/* 🌆 Header Row */}
      <View className="flex-row items-center justify-end mt-10">
        <TouchableOpacity
          className="p-2"
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="ellipsis-vertical" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 🌡️ Center Weather Info */}
      <View className="items-center">
        <Text className="text-2xl font-semibold text-white">{city}</Text>
        <Text className="text-[90px] font-extralight text-white">
          {temperature}°{unit === "imperial" ? "F" : "C"}
        </Text>
        <Text className="text-lg text-white capitalize">{description}</Text>

        <View className="bg-white/30 rounded-full px-4 py-2 mt-2">
          <Text className="text-white font-medium">
            AQI {aqi ? aqiDescriptions[aqi] : ""}
          </Text>
        </View>
      </View>

      {/* 📅 Bottom Forecast Button */}
      <View className="items-center mb-48">
        <TouchableOpacity
          className="bg-white/30 py-3 px-10 rounded-full"
          onPress={() => setShowForecast(true)}
        >
          <Text className="text-white text-base font-medium">5-day forecast</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
