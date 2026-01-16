"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import OneStarIcon from "@/_Icons/OneStarIcon";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
export default function MovieDetailPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        const headers = {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        };

        const [movieRes, videoRes, creditRes, similarRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?language=en-US`, { headers }),
          fetch(`${BASE_URL}/movie/${id}/videos?language=en-US`, { headers }),
          fetch(`${BASE_URL}/movie/${id}/credits?language=en-US`, {
            headers,
          }),
          fetch(`${BASE_URL}/movie/${id}/similar?language=en-US&page=1`, {
            headers,
          }),
        ]);

        const movieData = await movieRes.json();
        const videoData = await videoRes.json();
        const creditData = await creditRes.json();
        const similarData = await similarRes.json();

        setMovie(movieData);
        setVideos(videoData.results || []);
        setCredits(creditData);
        setSimilar(similarData.results || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!movie) return <div>Movie not found</div>;

  const trailer = videos.find((v) => v.type === "Trailer");

  const director = credits?.crew?.find((c) => c.job === "Director");

  const writers = credits?.crew
    ?.filter((c) => c.department === "Writing")
    .slice(0, 3);

  const stars = credits?.cast?.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="rounded-xl shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <p className="text-gray-500 mt-1">
            {movie.release_date} • PG • {movie.runtime}m
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="px-3 py-1 text-sm rounded-full bg-gray-200"
              >
                {g.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <OneStarIcon />
            <span className="font-semibold">
              {movie.vote_average.toFixed(1)}/10
            </span>
            <span className="text-sm text-gray-500">
              ({movie.vote_count} votes)
            </span>
          </div>

          {trailer && (
            <button
              onClick={() => setShowTrailer(true)}
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg cursor-pointer"
            >
              ▶ Play trailer
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-gray-700">{movie.overview}</p>

      <div className="mt-6 space-y-2 text-sm">
        {director && (
          <p>
            <span className="font-semibold">Director:</span> {director.name}
          </p>
        )}

        {writers?.length > 0 && (
          <p>
            <span className="font-semibold">Writers:</span>{" "}
            {writers.map((w) => w.name).join(" • ")}
          </p>
        )}

        {stars?.length > 0 && (
          <p>
            <span className="font-semibold">Stars:</span>{" "}
            {stars.map((s) => s.name).join(" • ")}
          </p>
        )}
      </div>

      {similar.length > 0 && (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">More like this</h2>

            <button
              onClick={() => setShowAllSimilar(!showAllSimilar)}
              className="text-sm font-medium text-blue-600 hover:underline cursor-pointer"
            >
              {showAllSimilar ? "See less ↑" : "See more →"}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {similar.slice(0, showAllSimilar ? 20 : 5).map((m) => (
              <div key={m.id} className="space-y-2">
                <img
                  src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                  className="rounded-lg"
                />
                <h3 className="text-sm font-semibold">{m.title}</h3>
                <div className="flex items-center gap-1 text-xs">
                  <OneStarIcon />
                  {m.vote_average.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 text-white text-xl z-10 cursor-pointer"
            >
              ✕
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Trailer"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
