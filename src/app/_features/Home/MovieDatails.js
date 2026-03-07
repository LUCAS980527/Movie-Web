"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import OneStarIcon from "@/_Icons/OneStarIcon";
import ArrowIcon from "@/_Icons/ArrowIcon";
import Image from "next/image";
import Link from "next/link";

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
    <div className="mx-auto w-full max-w-[1150px] px-6 py-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{movie.title}</h1>
          <p className="mt-1 text-sm text-zinc-600">
            {movie.release_date} • PG • {movie.runtime}m
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-500">Rating</p>
          <div className="mt-1 flex items-center gap-1">
            <OneStarIcon />
            <p className="font-semibold">{movie.vote_average.toFixed(1)}/10</p>
          </div>
          <p className="text-xs text-zinc-500">{movie.vote_count} votes</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[230px_1fr]">
        <div className="overflow-hidden rounded-md bg-zinc-100">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || "Movie poster"}
            width={230}
            height={500}
            className="h-[500px] w-[230px] object-cover"
          />
        </div>

        <div className="relative overflow-hidden rounded-md border-4 border-blue-500 bg-zinc-100">
          <Image
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                : `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
            }
            alt={movie.title || "Backdrop"}
            width={900}
            height={500}
            className="h-[500px] w-full object-cover"
          />
          {trailer && (
            <button
              onClick={() => setShowTrailer(true)}
              className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800"
            >
              Watch trailer
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {movie.genres.map((g) => (
          <span
            key={g.id}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium"
          >
            {g.name}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-700">{movie.overview}</p>

      <div className="mt-4 space-y-0 text-sm">
        {director && (
          <p className="border-b border-zinc-200 py-3">
            <span className="w-[90px] inline-block font-semibold">Director</span>
            <span>{director.name}</span>
          </p>
        )}

        {writers?.length > 0 && (
          <p className="border-b border-zinc-200 py-3">
            <span className="w-[90px] inline-block font-semibold">Writers</span>
            <span>{writers.map((w) => w.name).join(" • ")}</span>
          </p>
        )}

        {stars?.length > 0 && (
          <p className="border-b border-zinc-200 py-3">
            <span className="w-[90px] inline-block font-semibold">Stars</span>
            <span>{stars.map((s) => s.name).join(" • ")}</span>
          </p>
        )}
      </div>

      {similar.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">More like this</h2>

            <button
              onClick={() => setShowAllSimilar(!showAllSimilar)}
              className="flex items-center gap-1 text-sm font-medium cursor-pointer"
            >
              {showAllSimilar ? "See less" : "See more"}
              <ArrowIcon />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {similar.slice(0, showAllSimilar ? 20 : 5).map((m) => (
              <Link
                key={m.id}
                href={`/movie/${m.id}`}
                className="block overflow-hidden rounded-md bg-zinc-100 hover:opacity-90"
              >
                <Image
                  src={
                    m.poster_path
                      ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={m.title || "Movie poster"}
                  width={230}
                  height={340}
                  className="h-[320px] w-full object-cover"
                />

                <div className="px-2 py-2">
                  <div className="flex items-center gap-1 text-xs">
                    <OneStarIcon />
                    <span>{m.vote_average?.toFixed(1)}</span>
                    <span className="text-zinc-500">/10</span>
                  </div>
                  <h3 className="mt-1 line-clamp-2 text-sm font-medium">
                    {m.title}
                  </h3>
                </div>
              </Link>
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
