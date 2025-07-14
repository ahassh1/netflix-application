import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb';
import Loading from '../components/Loading';
import { debounce } from 'lodash';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies({
        query: search,
        include_adult: false,
        language: 'en-US',
        page: '1',
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  useEffect(() => {
    return () => {
      handleTextDebounce.cancel();
    };
  }, []);

  const onChangeText = (text) => {
    setQuery(text);
    handleTextDebounce(text);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      {/* Search input */}
      <View className="mx-4 mb-3 flex-row items-center justify-between rounded-full border border-neutral-500">
        <TextInput
          value={query}
          onChangeText={onChangeText}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          className="flex-1 pb-1 pl-6 text-base font-semibold tracking-wider text-white"
        />
        <TouchableOpacity
          onPress={() => {
            setQuery('');
            setResults([]);
            navigation.navigate('Home');
          }}
          className="m-1 rounded-full bg-neutral-500 p-3">
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3">
          <Text className="ml-1 font-semibold text-white">Results ({results.length})</Text>
          <View className="flex-row flex-wrap justify-between">
            {results.map((item, index) => (
              <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
                <View className="mb-4 space-y-2">
                  <Image
                    source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                    className="rounded-3xl"
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className="ml-1 text-gray-300">
                    {item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        query.length > 2 && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-white">No results found.</Text>
          </View>
        )
      )}

      {/* Show placeholder image when no query */}
      {!loading && results.length === 0 && query.length <= 2 && (
        <View className="flex-row justify-center">
          <Image source={require('../assets/images/movieTime.png')} className="h-96 w-96" />
        </View>
      )}
    </SafeAreaView>
  );
}
