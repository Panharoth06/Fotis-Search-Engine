"use client";

import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

import { getResults } from "@/components/getResult";

import Loader from "@/components/ui/loader/Loader";
import renderWebResult from "@/components/search/web";
import renderImageResult from "@/components/search/image";
import renderVideoResult from "@/components/search/video";
import renderNewsResult from "@/components/search/news";

import fotisLogo from "../../../public/assets/fotis-logo.png";
import { FilterButton } from "@/components/ui/FilterButton";

const cache = new Map<string, any>(); // Global in-memory cache

function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("web"); // Track active filter
  const [searchInput, setSearchInput] = useState(query); // Track search input
  const hasFetched = useRef(false); // Track first fetch


  // Sync input with URL query
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  // Fetch results when query or filter changes
  useEffect(() => {
    if (!query) return;

    const cacheKey = `${query}:${filter}`;

    // Use cached results if available
    if (cache.has(cacheKey)) {
      setResults(cache.get(cacheKey));
      setLoading(false);
      setError("");
      return;
    }

    const fetchResults = async () => {
      hasFetched.current = true;
      setLoading(true);
      setError("");
      try {
        const apiFilter =
          filter === "image"
            ? "images"
            : filter === "video"
            ? "videos"
            : filter;
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&type=${apiFilter}`
        );
        const data = await res.json();
        if (!res.ok) setError(data.error || "Something went wrong");
        else {
          setResults(data);
          cache.set(cacheKey, data);
        }
      } catch {
        setError("Failed to fetch results");
      } finally {
        setLoading(false);
        hasFetched.current = true;
      }
    };

    fetchResults();
  }, [query, filter]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim() || searchInput.length < 2) {
      setError("Please enter a valid search query (minimum 2 characters).");
      return;
    }
    setError("");
    router.push(`/search?q=${encodeURIComponent(searchInput)}&type=${filter}`);
  };

  const filters = ["web", "image", "video", "news"];

  const filteredResults = getResults(filter, results);
  console.log(
    `Filtered results for ${filter}:`,
    filteredResults.length,
    filteredResults
  );

  return (
    <div className="min-h-screen bg-[#1d1d1d] text-white">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 fixed top-0 left-0 w-full sm:px-8 md:px-20 lg:px-80 bg-[#1d1d1d]/95 z-50">
        <ScrollProgress />
        <a href="/">
          <Image
            src={fotisLogo}
            alt="Fotise logo"
            width={96}
            height={32}
            className="w-24"
          />
        </a>
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-3xl rounded-lg bg-[#2F3035]/85 p-1"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full p-2 rounded-lg bg-[#2F3035]/85 focus:outline-none text-white placeholder-white/60"
            placeholder="Search the web..."
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 rounded-lg font-medium ${
              loading
                ? "bg-orange-500/50 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            Search
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className="pt-24 px-4 sm:px-8 md:px-20 lg:px-80">
        <h1 className="text-3xl mb-6">
          Search Results for: <span className="text-orange-500">{query}</span>
        </h1>

        {/* Filter Buttons */}
        <FilterButton
          filter={filter}
          filters={filters}
          setFilter={setFilter}
          query={query}
        />

        {loading && <Loader />}
        {error && !loading && <p className="text-red-500">⚠️ {error}</p>}
        {!loading && !error && filteredResults.length === 0 && (
          <p className="text-white/80">No results found for {filter}.</p>
        )}

        <div
          className={
            filter === "image"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              : "space-y-4"
          }
        >
          {filteredResults.map((item: any, i: number) => {
            if (filter === "image") return renderImageResult(item, i);
            if (filter === "video") return renderVideoResult(item, i);
            if (filter === "news") return renderNewsResult(item, i);
            return renderWebResult(item, i);
          })}
        </div>
      </div>
    </div>
  );
}

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchPage />
    </Suspense>
  );
}
