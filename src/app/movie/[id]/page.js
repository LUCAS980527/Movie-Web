"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MovieCards } from "@/app/_components/Movie-Cards";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const titles = {
  upcoming: "Upcoming",
  popular: "Popular",
  top_rated: "Top Rated",
};

const Page = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchMovies = async () => {
      const res = await fetch(`${BASE_URL}/movie/${id}?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const data = await res.json();
      setMovies(data.results || []);
    };

    fetchMovies();
  }, [id]);

  return (
    <div className="grid grid-cols-5 gap-6 p-6">
      {movies.map((movie, index) => (
        <MovieCards
          key={index}
          id={movie.id}
          title={movie.title}
          imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          rating={movie.vote_average}
        />
      ))}
    </div>
  );
};

export default Page;
