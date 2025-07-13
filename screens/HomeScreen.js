import { View, Text, Image, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-neutral-800">
      {/* searchbar and logo */}
      <SafeAreaView className="-mb-2">
        <StatusBar style="light" />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
