import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

export default function MovieList({ title, data = [], hideSeeAll }) {
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      {/* Header */}
      <View className="mx-4 flex-row items-center justify-between">
        <Text className="text-lg text-white">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Movie Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {data?.map((item, index) => {
          const poster = image185(item?.poster_path) || fallbackMoviePoster;
          const title = item?.title || 'Untitled';

          return (
            <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
              <View className="mr-4 space-y-1">
                <Image
                  source={{ uri: poster }}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="ml-1 text-neutral-300">
                  {title.length > 14 ? title.slice(0, 14) + '...' : title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
