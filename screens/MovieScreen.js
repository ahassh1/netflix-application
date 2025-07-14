import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
  fetchMovieVideos,
} from '../api/moviedb';
import Loading from '../components/Loading';
import YoutubePlayer from 'react-native-youtube-iframe';

const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : ' mt-3';
const { width, height } = Dimensions.get('window');

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const id = item?.id;
      if (!id) return;
      await Promise.all([
        getMovieDetails(id),
        getMovieCredits(id),
        getSimilarMovies(id),
        getMovieVideos(id),
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, [item?.id]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) {
      setMovie(data);
    }
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data?.cast) {
      setCast(data.cast);
    }
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data?.results) {
      setSimilarMovies(data.results);
    }
  };

  const getMovieVideos = async (id) => {
    const data = await fetchMovieVideos(id);
    if (data?.results) {
      const trailer = data.results.find((vid) => vid.type === 'Trailer');
      setTrailer(trailer?.key);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className={`flex-1 bg-neutral-900${topMargin}`}>
      {/* Back button and movie poster */}
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row items-center justify-between px-4">
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size={35} color={isFavourite ? theme.background : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <>
            <Image
              source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </>
        )}
      </View>

      {/* Movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3 px-4">
        {/* Title */}
        <Text className="text-center text-3xl font-bold tracking-widest text-white">
          {movie?.title || 'Untitled'}
        </Text>

        {/* Status, release year, runtime */}
        {movie?.id && (
          <Text className="text-center text-base font-semibold text-neutral-400">
            {movie.status || 'N/A'} • {movie.release_date?.split('-')[0] || 'N/A'} •{' '}
            {movie.runtime ? `${movie.runtime} min` : 'N/A'}
          </Text>
        )}

        {/* Genres */}
        <View className="mt-1 flex-row justify-center space-x-2">
          {movie.genres?.map((genre, index) => {
            const showDot = index + 1 !== movie.genres.length;
            return (
              <Text key={index} className="text-center text-base font-semibold text-neutral-400">
                {genre?.name}
                {showDot ? ' • ' : ''}
              </Text>
            );
          })}
        </View>

        {/* Description */}
        <Text className="mt-2 tracking-wide text-neutral-400">
          {movie.overview || 'No description available.'}
        </Text>

        {/* Trailer */}
        {trailer && (
          <View className="my-4">
            <Text className="mb-4 text-2xl font-bold text-white">Trailer</Text>
            <YoutubePlayer height={height * 0.3} videoId={trailer} />
          </View>
        )}
      </View>

      {/* Cast */}
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* Similar movies */}
      {similarMovies.length > 0 && (
        <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />
      )}
    </ScrollView>
  );
}
