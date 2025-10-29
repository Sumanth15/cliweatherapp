import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const GEO_API_KEY = "a696b1509789ed0d77fce6787072c188";

export default function FindCities() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const recommendedCities = [
    "London",
    "New York",
    "Tokyo",
    "Sydney",
    "Paris",
    "Berlin",
    "Dubai",
    "Singapore",
  ];

  const fetchCities = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${GEO_API_KEY}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("❌ City Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const useCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("📍 Current Location:", latitude, longitude);
        navigation.navigate("Home", { lat: latitude, lon: longitude });
      },
      (err) => console.error("❌ Location Error:", err),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const selectCity = (city) => {
    navigation.navigate("Home", { city });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find a City</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Search for a city..."
          placeholderTextColor="#ccc"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => fetchCities(search)}
        />
        <TouchableOpacity onPress={() => fetchCities(search)}>
          <Icon name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Current Location Button */}
      <TouchableOpacity style={styles.locationBtn} onPress={useCurrentLocation}>
        <Icon name="navigate" size={20} color="#fff" />
        <Text style={styles.locationText}>Use Current Location</Text>
      </TouchableOpacity>

      {/* Recommended Cities */}
      <Text style={styles.subTitle}>Recommended Cities</Text>
      <View style={styles.recommendContainer}>
        {recommendedCities.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cityChip}
            onPress={() => selectCity(city)}
          >
            <Text style={styles.cityText}>{city}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Results */}
      {loading ? (
        <ActivityIndicator size="large" color="#00BFFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => selectCity(item.name)}
            >
              <Text style={styles.resultText}>
                {item.name}, {item.country}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 12,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  locationBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00BFFF",
    borderRadius: 10,
    padding: 12,
    marginTop: 15,
  },
  locationText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  subTitle: {
    color: "#00BFFF",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  recommendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  cityChip: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  cityText: { color: "#fff" },
  resultItem: {
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    marginBottom: 8,
  },
  resultText: {
    color: "#fff",
    fontSize: 16,
  },
});
