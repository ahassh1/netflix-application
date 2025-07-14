import { View, Text, TouchableOpacity, ScrollView, Platform, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import { StatusBar } from 'expo-status-bar';
import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { styles } from '../theme';

const ios = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Parallel fetching for better performance
        const [trendingData, upcomingData, topRatedData] = await Promise.all([
          fetchTrendingMovies(),
          fetchUpcomingMovies(),
          fetchTopRatedMovies(),
        ]);

        if (trendingData?.results) setTrending(trendingData.results);
        if (upcomingData?.results) setUpcoming(upcomingData.results);
        if (topRatedData?.results) setTopRated(topRatedData.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <View className="flex-1 bg-neutral-800">
      {/* Search Bar */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar style="light" />
        <View className="mx-4 flex-row items-center justify-between">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text className="text-3xl font-bold text-white">
            <Text style={styles.text}>M</Text>ovix
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}>
          {trending.length > 0 && <TrendingMovies data={trending} />}
          {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}
          {topRated.length > 0 && <MovieList title="Top Rated" data={topRated} />}
        </ScrollView>
      )}
    </View>
  );
}
