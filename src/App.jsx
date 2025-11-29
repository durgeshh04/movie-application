import { useEffect, useState, useCallback } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(true);

  const BASE_API_URL = "https://api.themoviedb.org/3/discover/movie";
  const SEARCH_API_URL = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const getData = useCallback(async () => {
    if (!API_KEY) {
      setErrorMessage("API key is missing. Check your environment variables.");
      setLoader(false);
      return;
    }

    try {
      setLoader(true);
      setErrorMessage(null);

      const endpoint = searchTerm
        ? `${SEARCH_API_URL}?query=${encodeURIComponent(searchTerm)}&page=1`
        : `${BASE_API_URL}?page=1&sort_by=popularity.desc`;

      const res = await fetch(endpoint, API_OPTIONS);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      console.error("Failed to load movies:", error);
      setErrorMessage("Something went wrong while fetching the data.");
      setData({ results: [] });
    } finally {
      setLoader(false);
    }
  }, [searchTerm, API_KEY]);

  useEffect(() => {
    getData();
  }, [getData]);

  const movies = Array.isArray(data.results) ? data.results : [];

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className="all-movies">
          <h2 className="mt-[40px]">
            {searchTerm ? `Results for "${searchTerm}"` : "All Movies"}
          </h2>
          <ul className="text-white">
            {movies.length ? (
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              <li>
                {loader ? (
                  <Spinner />
                ) : (
                  <span className="text-red-400">
                    {errorMessage || "No movies available"}
                  </span>
                )}
              </li>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default App;
