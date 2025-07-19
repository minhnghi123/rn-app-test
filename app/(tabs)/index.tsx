import { useRouter } from "expo-router";
import { FlatList, Image, Text, View } from "react-native";

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { useFetch } from "@/services/useFetch";
export default function Index() {
  const router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(() => getTrendingMovies());
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );
  return (
    <View className="flex-1 bg-primary">
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListHeaderComponent={
          <>
            <Image source={images.bg} className="absolute w-full z-0" />
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie, series, or actor"
            />
            <Text className="text-white text-lg font-bold mb-3 ml-5 mt-10">
              Trending Movies
            </Text>
            <FlatList
              horizontal
              data={trendingMovies}
              renderItem={({ item, index }) => (
                <TrendingCard movie={item} index={index} />
              )}
              keyExtractor={(item) => item.movie_id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 26 }}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />
            <Text className="text-lg text-white font-bold ml-5 mb-3 mt-10">
              Latest Movies
            </Text>
          </>
        }
        renderItem={({ item }) => <MovieCard {...item} />}
      />
    </View>
  );
}
