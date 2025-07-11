import { getUrlDisplay } from "../getUrlDisplay";

import DOMPurify from "dompurify";

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

export default renderVideoResult;