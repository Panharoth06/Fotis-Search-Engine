import DOMPurify from "dompurify";

import { getUrlDisplay } from "../getUrlDisplay";

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

export default renderImageResult