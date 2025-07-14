import { View, Text, Image, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { image500, fallbackMoviePoster } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data = [] }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  };

  return (
    <View className="mb-8">
      <Text className="mx-4 mb-5 text-xl text-white">Trending</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {data.map((item, index) => {
          const poster = image500(item?.poster_path) || fallbackMoviePoster;
          const title = item?.title || 'Untitled';

          return (
            <TouchableWithoutFeedback key={index} onPress={() => handleClick(item)}>
              <View className="mr-4 space-y-1">
                <Image
                  source={{ uri: poster }}
                  className="rounded-3xl"
                  style={{ width: width * 0.6, height: height * 0.4 }}
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
