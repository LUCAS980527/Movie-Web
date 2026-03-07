"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import OneStarIcon from "@/_Icons/OneStarIcon";
import ArrowIcon from "@/_Icons/ArrowIcon";
import LeftArrowIcon from "@/_Icons/LeftArrowIcon";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const pageParam = Number(searchParams.get("page") || "1");
  const page = Number.isFinite(pageParam) ? clamp(pageParam, 1, 500) : 1;

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchGenres() {
      try {
        const res = await fetch(`${BASE_URL}/genre/movie/list?language=en-US`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        });
        const data = await res.json();
        if (!cancelled) setGenres(data.genres || []);
      } catch {
        // genres fetch fail => sidebar empty ok
      }
    }

    fetchGenres();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchSearch() {
      if (!query.trim()) {
        setMovies([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      try {
        setError("");
        setLoading(true);

        const encoded = encodeURIComponent(query.trim());
        const res = await fetch(
          `${BASE_URL}/search/movie?query=${encoded}&language=en-US&page=${page}&include_adult=false`,
          { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } },
        );

        if (!res.ok) throw new Error(`TMDB error ${res.status}`);

        const data = await res.json();

        if (!cancelled) {
          setMovies(data.results || []);
          setTotalPages(clamp(Number(data.total_pages || 1), 1, 500));
        }
      } catch (e) {
        if (!cancelled) {
          setError("Search error. Please try again.");
          setMovies([]);
          setTotalPages(1);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSearch();
    return () => {
      cancelled = true;
    };
  }, [query, page]);

  function goToPage(p) {
    const next = clamp(p, 1, totalPages);
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("page", String(next));
    router.push(`/search?${sp.toString()}`);
  }

  function handleMovieClick(id) {
    router.push(`/movie/${id}`);
  }

  function handleGenreClick(id) {
    router.push(`/genre/${id}`);
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="mx-auto w-full max-w-[1320px] px-6 py-10">
      <h1 className="text-5xl font-semibold leading-tight">Search results</h1>
      {query.trim() ? (
        <p className="mt-8 text-4xl font-semibold tracking-tight">
          {movies.length} results for &ldquo;{query}&rdquo;
        </p>
      ) : (
        <p className="mt-8 text-lg text-zinc-500">
          Search input empty байна. Дээрх хайлтаар утга оруулна уу.
        </p>
      )}

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <section className="lg:border-r lg:border-zinc-200 lg:pr-10">
          {error && <p className="mb-4 text-red-600">{error}</p>}
          {!error && query.trim() && movies.length === 0 && (
            <p className="mt-2 text-zinc-500">No results found.</p>
          )}

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-4">
            {movies.map((movie) => {
              const hasPoster = Boolean(movie.poster_path);
              const posterUrl = hasPoster
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "";
              const rating =
                typeof movie.vote_average === "number"
                  ? movie.vote_average.toFixed(1)
                  : "0.0";

              return (
                <button
                  key={movie.id}
                  onClick={() => handleMovieClick(movie.id)}
                  className="overflow-hidden rounded-xl bg-zinc-100 text-left transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-[320px] w-full bg-zinc-200">
                    {hasPoster ? (
                      <Image
                        src={posterUrl}
                        alt={movie.title || "Movie poster"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                        No poster
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 px-3 py-3">
                    <div className="flex items-center gap-1 text-base">
                      <OneStarIcon />
                      <span className="font-medium">{rating}</span>
                      <span className="text-zinc-500">/10</span>
                    </div>
                    <p className="line-clamp-2 text-3xl font-normal tracking-tight">
                      {movie.title || "Untitled"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {query.trim() && totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-5 text-zinc-500">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="flex items-center gap-1 disabled:opacity-40"
              >
                <LeftArrowIcon />
                Previous
              </button>
              <button className="h-10 w-10 rounded-md border border-zinc-300 text-zinc-900">
                {page}
              </button>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="flex items-center gap-1 disabled:opacity-40"
              >
                Next
                <ArrowIcon />
              </button>
            </div>
          )}
        </section>

        <aside className="pt-2">
          <h2 className="text-5xl font-semibold leading-tight">Search by genre</h2>
          <p className="mt-2 text-lg text-zinc-600">See lists of movies by genre</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-sm font-medium transition-colors hover:bg-zinc-100"
              >
                {genre.name}
                <ArrowIcon className="h-3 w-3" />
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
