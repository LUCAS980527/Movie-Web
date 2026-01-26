"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${BASE_URL}/search/movie?query=${query}&language=en-US`,
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          },
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (e) {
        console.error("Search error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">
        Search results for: {query}
      </h1>

      {movies.length === 0 && <p>No results found.</p>}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies.map((m) => (
          <div key={m.id} className="space-y-2">
            <Image
              src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
              alt={m.title || "Movie poster"}
              width={300}
              height={450}
              className="rounded-lg"
            />

            <p className="text-sm font-medium">{m.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
