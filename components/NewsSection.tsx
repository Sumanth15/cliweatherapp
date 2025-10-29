import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  ScrollView,
  Dimensions,
} from "react-native";
import { useSettings } from "../context/SettingsContext";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const NEWS_API_KEY = "d306fc72a8dd430485095116c4147aa8";

interface NewsSectionProps {
  temperature: number;
  unit: "metric" | "imperial";
  condition: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ temperature, unit }) => {
  const { state } = useSettings(); // 🧠 Access categories from global context
  const [news, setNews] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);

  useEffect(() => {
    if (temperature) {
      const weatherQuery = getNewsCategoryByWeather(temperature, unit);

      // ✅ Gather active user categories
      const activeCategories = Object.keys(state.categories).filter(
        (cat) => state.categories[cat]
      );
      const categoryQuery = activeCategories.join(" OR ");

      // ✅ Combine both into a single query
      const finalQuery =
        categoryQuery.length > 0
          ? `${weatherQuery} OR ${categoryQuery}`
          : weatherQuery;

      console.log("📰 Weather Query:", weatherQuery);
      console.log("🗞️ Active Categories:", activeCategories);
      console.log("🔍 Final News Query:", finalQuery);

      fetchNews(finalQuery);
    }
  }, [temperature, unit, state.categories]); // 👈 re-run when toggled

  const getNewsCategoryByWeather = (temp: number, unit: string) => {
    if (unit === "metric") {
      if (temp < 15) return "crisis OR tragedy OR disaster";
      if (temp > 30) return "heatwave OR warning OR danger";
      return "celebration OR success OR victory";
    } else {
      if (temp < 59) return "crisis OR tragedy OR disaster";
      if (temp > 86) return "heatwave OR warning OR danger";
      return "celebration OR success OR victory";
    }
  };

  const fetchNews = async (query: string) => {
    try {
      setNewsLoading(true);
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&language=en&pageSize=10&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

      console.log("🗞️ Fetching from:", url);

      const res = await fetch(url);
      const json = await res.json();

      if (json.status === "error") {
        console.error("❌ API ERROR:", json.message);
        return;
      }

      if (json.articles && json.articles.length > 0) {
        console.log("✅ Loaded", json.articles.length, "articles");
        setNews(json.articles);
      } else {
        console.log("⚠️ No articles found");
        setNews([]);
      }
    } catch (err) {
      console.error("❌ FETCH ERROR:", err);
    } finally {
      setNewsLoading(false);
    }
  };

  const getNewsMood = () => {
    if (unit === "metric") {
      if (temperature < 15) return "(Serious News)";
      if (temperature > 30) return "(Alert News)";
      return "(Positive News)";
    } else {
      if (temperature < 59) return "(Serious News)";
      if (temperature > 86) return "(Alert News)";
      return "(Positive News)";
    }
  };

  return (
    <View className="mt-5 w-full flex-1">
      <Text className="text-2xl font-bold text-white text-center mb-4">
        Latest Headlines {getNewsMood()}
      </Text>

      {newsLoading ? (
        <View className="p-8 items-center">
          <ActivityIndicator color="#fff" size="large" />
          <Text className="text-white mt-3 text-base">Loading news...</Text>
        </View>
      ) : news.length === 0 ? (
        <View className="p-5 items-center bg-white/10 rounded-xl">
          <Text className="text-white text-base">No news available</Text>
        </View>
      ) : (
        <ScrollView
          style={{ height: SCREEN_HEIGHT * 0.75 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {news.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white/25 rounded-xl p-4 mb-3"
              onPress={() => Linking.openURL(item.url)}
            >
              <Text className="text-white text-lg font-semibold mb-1 leading-6">
                {item.title}
              </Text>
              <Text className="text-gray-200 text-sm mt-1 leading-5">
                {item.description
                  ? item.description.slice(0, 100) + "..."
                  : "No description available"}
              </Text>
              <Text className="text-gray-300 text-xs mt-2 opacity-80">
                {item.source?.name || "Unknown"} •{" "}
                {new Date(item.publishedAt).toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default NewsSection;
