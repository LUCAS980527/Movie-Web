"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = "PUT_YOUR_TOKEN_HERE";

function getYear(date) {
  if (!date) return null;
  const y = Number(String(date).slice(0, 4));
  return Number.isFinite(y) ? y : null;
}

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

  // Filters
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [minRating, setMinRating] = useState("");

  // Genres list fetch
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

  // Search fetch (page-тэй)
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

  // Client-side filter (current page results дээр)
  const filteredMovies = useMemo(() => {
    const yf = yearFrom ? Number(yearFrom) : null;
    const yt = yearTo ? Number(yearTo) : null;
    const mr = minRating ? Number(minRating) : null;

    return movies.filter((m) => {
      // genre
      if (selectedGenreIds.length > 0) {
        const ids = m.genre_ids || [];
        const hasAny = selectedGenreIds.some((g) => ids.includes(g));
        if (!hasAny) return false;
      }

      // year
      const y = getYear(m.release_date);
      if (yf && (!y || y < yf)) return false;
      if (yt && (!y || y > yt)) return false;

      // rating
      const va = typeof m.vote_average === "number" ? m.vote_average : 0;
      if (mr && va < mr) return false;

      return true;
    });
  }, [movies, selectedGenreIds, yearFrom, yearTo, minRating]);

  function goToPage(p) {
    const next = clamp(p, 1, totalPages);
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("page", String(next));
    router.push(`/search?${sp.toString()}`);
  }

  function toggleGenre(id) {
    setSelectedGenreIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function clearFilters() {
    setSelectedGenreIds([]);
    setYearFrom("");
    setYearTo("");
    setMinRating("");
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-start justify-between gap-8">
        {/* LEFT: RESULTS */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold mb-2">
            Search results for: <span className="font-bold">{query}</span>
          </h1>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          {!error && filteredMovies.length === 0 && (
            <p className="mt-6">No results found.</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            {filteredMovies.map((m) => {
              const hasPoster = Boolean(m.poster_path);
              const posterUrl = hasPoster
                ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                : "";

              return (
                <div key={m.id} className="space-y-2">
                  <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-100">
                    {hasPoster ? (
                      <Image
                        src={posterUrl}
                        alt={m.title || "Movie poster"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                        No poster
                      </div>
                    )}
                  </div>

                  <p className="text-sm font-medium line-clamp-2">
                    {m.title || "Untitled"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {m.release_date ? String(m.release_date).slice(0, 4) : "—"}{" "}
                    •{" "}
                    {typeof m.vote_average === "number"
                      ? m.vote_average.toFixed(1)
                      : "—"}
                  </p>
                </div>
              );
            })}
          </div>

          {/* PAGINATION */}
          {query.trim() && totalPages > 1 && (
            <div className="flex items-center gap-2 mt-8">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="px-3 py-2 rounded border disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: 5 }).map((_, i) => {
                const start = clamp(page - 2, 1, Math.max(1, totalPages - 4));
                const p = start + i;
                if (p > totalPages) return null;

                return (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-3 py-2 rounded border ${
                      p === page ? "bg-black text-white" : ""
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-2 rounded border disabled:opacity-50"
              >
                Next
              </button>

              <span className="text-sm text-gray-500 ml-2">
                Page {page} / {totalPages}
              </span>
            </div>
          )}
        </div>

        {/* RIGHT: FILTERS */}
        <aside className="w-[280px] shrink-0">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold">Search by genre</p>
              <button
                onClick={clearFilters}
                className="text-sm underline text-gray-600"
              >
                Clear
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {genres.map((g) => {
                const active = selectedGenreIds.includes(g.id);
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGenre(g.id)}
                    className={`text-xs px-2 py-1 rounded-full border ${
                      active ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {g.name}
                  </button>
                );
              })}

              {genres.length === 0 && (
                <p className="text-xs text-gray-500">Genres unavailable</p>
              )}
            </div>

            <hr className="my-4" />

            <p className="font-semibold mb-2">Year</p>
            <div className="flex gap-2">
              <input
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
                placeholder="From"
                inputMode="numeric"
                className="w-1/2 border rounded px-2 py-1 text-sm"
              />
              <input
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
                placeholder="To"
                inputMode="numeric"
                className="w-1/2 border rounded px-2 py-1 text-sm"
              />
            </div>

            <hr className="my-4" />

            <p className="font-semibold mb-2">Rating</p>
            <input
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              placeholder="Min (e.g. 7)"
              inputMode="decimal"
              className="w-full border rounded px-2 py-1 text-sm"
            />

            <p className="text-xs text-gray-500 mt-3">
              * Filters apply to current page results.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
