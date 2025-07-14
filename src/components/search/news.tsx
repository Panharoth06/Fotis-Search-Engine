import DOMPurify from "dompurify";
import Link from "next/link";

const renderNewsResult = (item: any, index: number) => (
    <div key={index} className="result-card mt-[20px] sm:mt-[55px]">
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
            <Link href={item.url} target="_blank" rel="noopener noreferrer">
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.title || 'No title available', {
                    ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'u'],
                    ALLOWED_ATTR: [],
                  }),
                }}
              />
            </Link>
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
          <Link
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
          </Link>
        </div>
      </div>
    </div>
  );


export default renderNewsResult;