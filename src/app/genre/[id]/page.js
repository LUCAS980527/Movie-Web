"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
export default function GenreFilterPage() {
  const { id } = useParams();

  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  // Fetch all genres (зүүн талын жагсаалт)
  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      const data = await res.json();
      setGenres(data.genres || []);
    };
    fetchGenres();
  }, []);

  // Fetch movies by selected genre
  useEffect(() => {
    if (!id) return;
    const fetchMovies = async () => {
      const res = await fetch(`${BASE_URL}/discover/movie?with_genres=${id}`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      const data = await res.json();
      setMovies(data.results || []);
    };
    fetchMovies();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-xl font-semibold mb-6">Search filter</h1>

      <div className="grid grid-cols-[220px_1fr] gap-8">
        {/* LEFT — Genre list */}
        <div>
          <p className="font-semibold mb-3">Genres</p>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <a
                key={g.id}
                href={`/genre/${g.id}`}
                className={`px-3 py-1 text-sm rounded-full border 
                  ${g.id == id ? "bg-black text-white" : "hover:bg-gray-100"}`}
              >
                {g.name}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — Movies grid */}
        <div>
          <p className="font-semibold mb-4">
            {movies.length} titles in selected genre
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((m) => (
              <div key={m.id} className="space-y-2">
                <img
                  src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                  className="rounded-lg"
                />
                <p className="text-sm font-medium">{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
