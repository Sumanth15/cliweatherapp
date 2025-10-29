// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
//   Linking,
//   ScrollView,
//    Dimensions,
// } from 'react-native';
// const SCREEN_HEIGHT = Dimensions.get('window').height;

// const NEWS_API_KEY = 'd306fc72a8dd430485095116c4147aa8';

// interface NewsSectionProps {
//   temperature: number;
//   unit: 'metric' | 'imperial';
//   condition: string;
// }

// const NewsSection: React.FC<NewsSectionProps> = ({ temperature, unit }) => {
//   const [news, setNews] = useState<any[]>([]);
//   const [newsLoading, setNewsLoading] = useState(false);

//   useEffect(() => {
//     if (temperature) {
//       const category = getNewsCategoryByWeather(temperature, unit);
//       console.log('📰 Selected news category based on weather:', category);
//       fetchNews(category);
//     }
//   }, [temperature, unit]);

//   const getNewsCategoryByWeather = (temp: number, unit: string) => {
//     if (unit === 'metric') {
//       if (temp < 15) return 'crisis OR tragedy OR disaster';
//       if (temp > 30) return 'heatwave OR warning OR danger';
//       return 'celebration OR success OR victory';
//     } else {
//       if (temp < 59) return 'crisis OR tragedy OR disaster';
//       if (temp > 86) return 'heatwave OR warning OR danger';
//       return 'celebration OR success OR victory';
//     }
//   };

//   const fetchNews = async (category: string) => {
//     try {
//       setNewsLoading(true);
//       const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
//         category
//       )}&language=en&pageSize=10&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

//       console.log('🗞️ NEWS FETCH STARTED:', url);

//       const res = await fetch(url);
//       const json = await res.json();

//       if (json.status === 'error') {
//         console.error('❌ API ERROR:', json.message);
//         return;
//       }

//       if (json.articles && json.articles.length > 0) {
//         console.log('✅ SUCCESS! Loaded', json.articles.length, 'articles');
//         setNews(json.articles);
//       } else {
//         console.log('⚠️ No articles found');
//         setNews([]);
//       }
//     } catch (err) {
//       console.error('❌ FETCH ERROR:', err);
//     } finally {
//       setNewsLoading(false);
//     }
//   };

//   const getNewsMood = () => {
//     const temp = unit === 'metric' ? temperature : temperature;
//     if (unit === 'metric') {
//       if (temp < 15) return '(Serious News)';
//       if (temp > 30) return '(Alert News)';
//       return '(Positive News)';
//     } else {
//       if (temp < 59) return '(Serious News)';
//       if (temp > 86) return '(Alert News)';
//       return '(Positive News)';
//     }
//   };

//   return (
//     <View style={styles.newsSection}>
//       <Text style={styles.newsHeader}>Latest Headlines {getNewsMood()}</Text>

//       {newsLoading ? (
//         <View style={styles.newsLoadingContainer}>
//           <ActivityIndicator color="#fff" size="large" />
//           <Text style={styles.loadingText}>Loading news...</Text>
//         </View>
//       ) : news.length === 0 ? (
//         <View style={styles.noNewsContainer}>
//           <Text style={styles.noNewsText}>No news available</Text>
//         </View>
//       ) : (
//         // 🔽 Add ScrollView for the list of articles
//         <ScrollView
//           style={styles.scrollArea}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         >
//           {news.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.newsCard}
//               onPress={() => {
//                 console.log('Opening article:', item.url);
//                 Linking.openURL(item.url);
//               }}
//             >
//               <Text style={styles.newsTitle}>{item.title}</Text>
//               <Text style={styles.newsDesc}>
//                 {item.description
//                   ? item.description.slice(0, 100) + '...'
//                   : 'No description available'}
//               </Text>
//               <Text style={styles.newsSource}>
//                 {item.source?.name || 'Unknown'} •{' '}
//                 {new Date(item.publishedAt).toLocaleDateString()}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   newsSection: {
//     marginTop: 20,
//     width: '100%',
//     flex: 1,
//   },
//   newsHeader: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   newsLoadingContainer: {
//     padding: 30,
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#fff',
//     marginTop: 10,
//     fontSize: 16,
//   },
//   noNewsContainer: {
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderRadius: 12,
//   },
//   noNewsText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   scrollArea: {
//     height: SCREEN_HEIGHT * 0.100, // 👈 dynamically covers 75% of screen
//   },
//   newsCard: {
//     backgroundColor: 'rgba(255,255,255,0.25)',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 12,
//   },
//   newsTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#fff',
//     marginBottom: 6,
//     lineHeight: 22,
//   },
//   newsDesc: {
//     fontSize: 14,
//     color: '#eee',
//     marginTop: 4,
//     lineHeight: 20,
//   },
//   newsSource: {
//     fontSize: 12,
//     color: '#ddd',
//     marginTop: 8,
//     opacity: 0.8,
//   },
// });


// export default NewsSection;









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

const SCREEN_HEIGHT = Dimensions.get("window").height;
const NEWS_API_KEY = "d306fc72a8dd430485095116c4147aa8";

interface NewsSectionProps {
  temperature: number;
  unit: "metric" | "imperial";
  condition: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ temperature, unit }) => {
  const [news, setNews] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);

  useEffect(() => {
    if (temperature) {
      const category = getNewsCategoryByWeather(temperature, unit);
      console.log("📰 Selected news category based on weather:", category);
      fetchNews(category);
    }
  }, [temperature, unit]);

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

  const fetchNews = async (category: string) => {
    try {
      setNewsLoading(true);
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        category
      )}&language=en&pageSize=10&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

      const res = await fetch(url);
      const json = await res.json();

      if (json.status === "error") {
        console.error("❌ API ERROR:", json.message);
        return;
      }

      if (json.articles && json.articles.length > 0) {
        setNews(json.articles);
      } else {
        setNews([]);
      }
    } catch (err) {
      console.error("❌ FETCH ERROR:", err);
    } finally {
      setNewsLoading(false);
    }
  };

  const getNewsMood = () => {
    const temp = unit === "metric" ? temperature : temperature;
    if (unit === "metric") {
      if (temp < 15) return "(Serious News)";
      if (temp > 30) return "(Alert News)";
      return "(Positive News)";
    } else {
      if (temp < 59) return "(Serious News)";
      if (temp > 86) return "(Alert News)";
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
