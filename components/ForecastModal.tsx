import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

const API_KEY = "a696b1509789ed0d77fce6787072c188";

interface ForecastModalProps {
  visible: boolean;
  onClose: () => void;
  lat: number;
  lon: number;
}

const ForecastModal: React.FC<ForecastModalProps> = ({
  visible,
  onClose,
  lat,
  lon,
}) => {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible && lat && lon) {
      fetchForecast();
    }
  }, [visible, lat, lon]);

  const fetchForecast = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();

      // Group forecast by date (only 1 entry per day)
      const grouped: Record<string, any> = {};
      data.list.forEach((item: any) => {
        const date = item.dt_txt.split(" ")[0];
        if (!grouped[date]) grouped[date] = item;
      });

      setForecast(Object.values(grouped).slice(0, 5)); // Only next 5 days
    } catch (err) {
      console.error(" Error fetching forecast:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/40 justify-center items-center">
          <TouchableWithoutFeedback>
            <View className="bg-white w-[90%] rounded-xl p-4">
              {loading ? (
                <View className="py-8 items-center">
                  <ActivityIndicator size="small" color="#000" />
                </View>
              ) : (
                <View className="flex-row justify-between">
                  {forecast.map((item, index) => (
                    <View
                      key={index}
                      className="items-center bg-gray-100 rounded-lg py-2 px-1 w-[65px]"
                    >
                      <Text className="text-xs font-semibold text-gray-800 mb-1">
                        {new Date(item.dt_txt).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </Text>

                      <Image
                        source={{
                          uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                        }}
                        className="w-[30px] h-[30px]"
                      />

                      <Text className="text-xs text-gray-700 mt-1">
                        {item.weather[0].main}
                      </Text>
                      <Text className="text-[11px] font-medium text-gray-800 mt-1">
                        {Math.round(item.main.temp_min)}° /{" "}
                        {Math.round(item.main.temp_max)}°
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ForecastModal;
