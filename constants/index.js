// --- API Key ---
export const apiKey = '1a2d31b2225a327997424a18c9ee1c8b';

// --- Base URL ---
const baseUrl = 'https://api.themoviedb.org/3';

// --- Movie API Endpoints ---
export const moviesApi = {
  trending: `${baseUrl}/trending/movie/day?api_key=${apiKey}`,
  movieDetails: (id) => `${baseUrl}/movie/${id}?api_key=${apiKey}`,
  movieCredits: (id) => `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`,
  similarMovies: (id) => `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`,
  searchMovies: (query) =>
    `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`,
  personDetails: (id) => `${baseUrl}/person/${id}?api_key=${apiKey}`,
  personMovies: (id) => `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`,
};

// --- Image Helpers ---
export const image500 = (path) => (path ? `https://image.tmdb.org/t/p/w500${path}` : null);
export const image342 = (path) => (path ? `https://image.tmdb.org/t/p/w342${path}` : null);
export const image185 = (path) => (path ? `https://image.tmdb.org/t/p/w185${path}` : null);

// --- Fallback Images ---
export const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';

export const fallbackPersonImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';
