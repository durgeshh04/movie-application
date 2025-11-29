// ...existing code...
import { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(true);

  const API_URL =
    "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies";

  const getData = async () => {
    if (!API_URL) {
      console.warn("API_URL is not defined");
      setData([]);
      return;
    }

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      setData(data);
      setLoader(false);
    } catch (error) {
      console.error("Failed to load movies:", error);
      setLoader(false);
      setErrorMessage("Something went wrong while fetching the data.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const movies = Array.isArray(data) ? data : [];
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassel
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="all-movies">
          <h2>All Movies</h2>
          <ul className="text-white">
            {movies.length ? (
              movies.map((m) => <li key={m.Title}>{m.Title ?? "Unknown"}</li>)
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
        </div>
      </div>
    </main>
  );
};

export default App;
