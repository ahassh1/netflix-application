import { View, Text, Image } from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View className="relative flex-1">
      <Image
        className="absolute h-full w-full"
        source={require('../assets/images/night.jpg')}
        resizeMode="cover"
      />
      <Text className="h-24 w-32 bg-red-600 pt-4 text-center font-bold text-white">HomeScreen</Text>
      <Text className="mt-2 text-white">Polash</Text>
    </View>
  );
};

export default HomeScreen;
