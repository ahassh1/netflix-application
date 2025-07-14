import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { fallbackPersonImage, image185 } from '../api/moviedb';

export default function Cast({ cast, navigation }) {
  return (
    <View className="my-6">
      <Text className="mx-4 mb-5 text-lg text-white">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {cast &&
          cast.map((person, index) => {
            const imageUrl = image185(person?.profile_path) || fallbackPersonImage;
            const character = person?.character || 'Unknown';
            const name = person?.original_name || 'N/A';

            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Person', person)}
                className="mr-4 items-center">
                <View className="h-20 w-20 items-center overflow-hidden rounded-full border border-neutral-500">
                  <Image className="h-20 w-20 rounded-full" source={{ uri: imageUrl }} />
                </View>

                <Text className="mt-1 text-xs text-white">
                  {character.length > 10 ? character.slice(0, 10) + '...' : character}
                </Text>
                <Text className="text-xs text-neutral-400">
                  {name.length > 10 ? name.slice(0, 10) + '...' : name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
