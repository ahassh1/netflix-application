import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { style } from 'theme';
const ios = Platform.OS === 'ios';

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-neutral-800">
      {/* searchbar and logo */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar style="light" />
        <View className="mx-4 flex-row items-center justify-between">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text
            className="text-3xl font-bold
           text-white">
            <Text style={style.text}>Net</Text>Flim
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size="30" color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
