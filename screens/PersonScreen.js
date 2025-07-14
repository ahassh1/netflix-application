import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from '../api/moviedb';
import Loading from '../components/Loading';
import { styles } from '../theme';

const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : ' my-3';
const { width, height } = Dimensions.get('window');

export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavourite, toggleFavourite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([getPersonDetails(item.id), getPersonMovies(item.id)]);
      } catch (error) {
        console.error('Error fetching person data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (item?.id) {
      fetchData();
    }
  }, [item?.id]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data?.cast) setPersonMovies(data.cast);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Back Button and Favorite */}
      <SafeAreaView className={`mx-4 flex-row items-center justify-between z-10${verticalMargin}`}>
        <TouchableOpacity
          style={styles.background}
          className="rounded-xl p-1"
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size={35} color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Person Details or Loading */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}>
            <View className="h-72 w-72 items-center overflow-hidden rounded-full border-2 border-neutral-500">
              <Image
                source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-center text-3xl font-bold text-white">
              {person?.name || 'N/A'}
            </Text>
            <Text className="text-center text-base text-neutral-500">
              {person?.place_of_birth || 'Unknown'}
            </Text>
          </View>

          <View className="mx-3 mt-6 flex-row items-center justify-between rounded-full bg-neutral-700 p-4">
            <View className="items-center border-r-2 border-r-neutral-400 px-2">
              <Text className="font-semibold text-white ">Gender</Text>
              <Text className="text-sm text-neutral-300">
                {person?.gender === 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View className="items-center border-r-2 border-r-neutral-400 px-2">
              <Text className="font-semibold text-white">Birthday</Text>
              <Text className="text-sm text-neutral-300">{person?.birthday || 'N/A'}</Text>
            </View>
            <View className="items-center border-r-2 border-r-neutral-400 px-2">
              <Text className="font-semibold text-white">Known For</Text>
              <Text className="text-sm text-neutral-300">
                {person?.known_for_department || 'N/A'}
              </Text>
            </View>
            <View className="items-center px-2">
              <Text className="font-semibold text-white">Popularity</Text>
              <Text className="text-sm text-neutral-300">
                {person?.popularity ? person.popularity.toFixed(2) + '%' : 'N/A'}
              </Text>
            </View>
          </View>

          <View className="mx-4 my-6 space-y-2">
            <Text className="text-lg text-white">Biography</Text>
            <Text className="tracking-wide text-neutral-400">
              {person?.biography ? person.biography : 'N/A'}
            </Text>
          </View>

          {/* Person Movies */}
          {person?.id && personMovies.length > 0 && (
            <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
          )}
        </View>
      )}
    </ScrollView>
  );
}
