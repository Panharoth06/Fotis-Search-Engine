'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DOMPurify from 'dompurify';
import Image from 'next/image';

import Loader from '@/components/ui/loader/Loader'

import fotisLogo from '../../../public/assets/fotis-logo.png'

const cache = new Map<string, any>(); // Global in-memory cache

// Helper function to get URL display
const getUrlDisplay = (item: any) => {
  return item.meta_url?.netloc || item.source || 'Unknown source';
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<string>('web'); // Track active filter
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
    hasFetched.current = false;

    if (cache.has(cacheKey)) {
      setResults(cache.get(cacheKey));
      hasFetched.current = true;
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const apiFilter = filter === 'image' ? 'images' : filter;
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${apiFilter}`);
        const data = await res.json();
        console.log(`API response for filter ${filter}:`, data);
        if (!res.ok) setError(data.error || 'Something went wrong');
        else {
          setResults(data);
          cache.set(cacheKey, data);
        }
      } catch (err: any) {
        setError('Failed to fetch results');
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
      setError('Please enter a valid search query (minimum 2 characters).');
      return;
    }
    setError('');
    router.push(`/search?q=${encodeURIComponent(searchInput)}&type=${filter}`);
  };

  // Define available filters
  const filters = ['web', 'image', 'video', 'news'];

  // Render functions
    const renderWebResult = (item: any, index: number) => (
    <div key={index} className="result-card my-[20px] sm:my-[55px]">
      <div className="flex gap-4 items-center mb-[10px]">
        <div className="bg-white w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] rounded-[10px] sm:rounded-[20px] overflow-hidden p-1">
          <img
            src={item.profile?.img || item.thumbnail?.original || ''}
            alt={item.profile?.name || 'website icon'}
            className="w-full h-full object-cover rounded-[10px] sm:rounded-[20px]"
          />
        </div>
        <div>
          <p className="text-[16px] font-semibold">{item.profile?.name || ''}</p>
          <p className="text-sm mt-1 text-white/80" aria-label="URL details">
            {item.url ? new URL(item.url).hostname : ''}
          </p>
        </div>
      </div>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl text-[#7799E5] font-medium no-underline hover:underline hover:cursor-pointer"
        aria-label={`Visit ${item.title}`}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(item.title || '', {
            ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'u'],
            ALLOWED_ATTR: [],
          }),
        }}
      />
      <p
        className="text-[16px] line-clamp-3 text-white/80 mt-[10px]"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(item.description || 'No description available', {
            ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'u'],
            ALLOWED_ATTR: [],
          }),
        }}
      />
    </div>
  );

    const renderImageResult = (item: any, index: number) => {
      const imageUrl = item.properties?.url || item.properties?.thumbnail?.src || item.thumbnail?.src || '';
    return (
      <div key={index} className="rounded-lg overflow-hidden h-full">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${item.title || 'Image'}`}
        >
          <img
            src={imageUrl}
            alt={item.title || 'Image'}
            className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 transition-opacity"
          />
        </a>
        <div className="p-2 bg-[#2F3035] rounded-b-lg">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7799E5] hover:underline text-sm font-medium line-clamp-1"
            aria-label={`Visit ${item.title || 'Image'}`}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.title || 'Image', {
                  ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'u'],
                  ALLOWED_ATTR: [],
                }),
              }}
            />
          </a>
          <p className="text-white/60 text-xs mt-1 line-clamp-1">
            {item.meta_url ? getUrlDisplay(item) : item.source || ''}
          </p>
        </div>
      </div>
    );
  };

  const renderVideoResult = (item: any, index: number) => (
    <div key={index} className="result-card my-[20px] sm:my-[55px]">
      <div className="flex flex-col">
        <p className="text-[16px] text-white/80">{getUrlDisplay(item)}</p>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg md:text-xl text-[#7799E5] font-medium no-underline hover:underline hover:cursor-pointer"
          aria-label={`Visit ${item.title}`}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(item.title, {
                ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'u'],
                ALLOWED_ATTR: [],
              }),
            }}
          />
        </a>
        <div className="flex gap-4">
          <a
            href={item.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${item.title || 'thumbnail link'}`}
          >
            {item.thumbnail?.original ? (
              <img
                src={item.thumbnail.original}
                alt={`Thumbnail of ${item.title}`}
                className="rounded-[10px]"
                style={{ width: '430px', height: 'auto' }}
                loading="lazy"
              />
            ) : (
              <div className="w-[300px] h-32 bg-gray-500 rounded-[10px] flex items-center justify-center text-white/80">
                No thumbnail
              </div>
            )}
          </a>
          <div className="flex flex-col justify-between">
            <p
              className="text-[10px] sm:text-[16px] line-clamp-2 text-white/80"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.description || 'No description available', {
                  ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'u'],
                  ALLOWED_ATTR: [],
                }),
              }}
            />
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <span className="text-sm text-white/80">
                {item.video?.publisher || 'Unknown publisher'}
              </span>
              <span className="text-sm text-white/80">{item.video?.creator || 'Unknown creator'}</span>
              <span className="text-sm text-white/80">{item.age || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewsResult = (item: any, index: number) => (
    <div key={index} className="result-card my-[20px] sm:my-[55px]">
      <div className="w-full flex gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full">
              <img
                className="rounded-full"
                style={{ width: '24px', height: '24px' }}
                src={item.meta_url?.favicon || ''}
                alt="Source favicon"
              />
            </div>
            <span style={{ fontSize: '14px', color: '#ffffff', opacity: 0.5 }}>
              {item.meta_url?.netloc || 'Unknown source'}
            </span>
            <span style={{ fontSize: '14px', color: '#ffffff', opacity: 0.5 }}>•</span>
            <span style={{ fontSize: '14px', color: '#ffffff', opacity: 0.5 }}>
              {item.age || 'N/A'}
            </span>
          </div>
          <h2
            className="text-xl font-semibold mb-2 hover:underline"
            style={{ color: 'oklch(70.7% 0.165 254.624)' }}
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.title || 'No title available', {
                    ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'u'],
                    ALLOWED_ATTR: [],
                  }),
                }}
              />
            </a>
          </h2>
          <p
            className="text-white/80 text-sm mb-4"
            style={{ color: 'white', opacity: 0.7 }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(item.description || 'No description available', {
                ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'u'],
                ALLOWED_ATTR: [],
              }),
            }}
          />
        </div>
        <div className="items-center">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${item.title || 'Image'}`}
          >
            <img
              src={item.thumbnail?.src || 'https://via.placeholder.com/96x96'}
              alt={item.title || 'Image'}
              className="rounded-lg"
              style={{ width: '300px', height: 'auto' }}
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
  );

  // Get results based on filter
  const getResults = () => {
    if (filter === 'web') {
      console.log('Accessing web results:', results?.web?.results);
      return results?.web?.results || [];
    }
    if (filter === 'video') {
      console.log('Accessing video results:', results?.videos?.results);
      return results?.videos?.results || [];
    }
    if (filter === 'news') {
      console.log(`Accessing ${filter} results:`, results?.results);
      return results?.results || [];
    }
    if (filter === 'image') {
        return results?.results || [];
    }
    return [];
  };

  const filteredResults = getResults();
  console.log(`Filtered results for ${filter}:`, filteredResults.length, filteredResults);

  return (
    <div className="min-h-screen bg-[#1d1d1d] text-white">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 fixed top-0 left-0 w-full sm:px-8 md:px-20 lg:px-80 bg-[#1d1d1d]/95 z-50">
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
              loading ? 'bg-orange-500/50 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
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
        <div className="flex gap-4 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                console.log(`Switching to filter: ${f}`);
                setFilter(f);
                router.push(`/search?q=${encodeURIComponent(query)}&type=${f}`);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? 'bg-orange-500 text-white'
                  : 'bg-[#2a2a2a] text-white/80 hover:bg-[#3a3a3a]'
              }`}
              aria-current={filter === f ? 'true' : undefined}
            >
              {f}
            </button>
          ))}
        </div>

        {loading && <Loader/>}
        {error && !loading && <p className="text-red-500">⚠️ {error}</p>}
        {!loading && !error && filteredResults.length === 0 && (
          <p className="text-white/80">No results found for {filter}.</p>
        )}

        <div className={filter === 'image' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4' : 'space-y-4'}>
          {filteredResults.map((item: any, i: number) => {
            console.log(`Rendering item ${i} for filter ${filter}:`, item);
            if (filter === 'image') return renderImageResult(item, i);
            if (filter === 'video') return renderVideoResult(item, i);
            if (filter === 'news') return renderNewsResult(item, i);
            return renderWebResult(item, i);
          })}
        </div>
      </div>
    </div>
  );
}