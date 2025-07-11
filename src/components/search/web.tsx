import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";

const renderWebResult = (item: any, index: number) => (
    <div key={index} className="result-card mt-[20px] sm:mt-[55px]">
      <div className="flex gap-4 items-center mb-[10px]">
        <div className="bg-white w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] rounded-[10px] sm:rounded-[20px] overflow-hidden p-1">
          <Image
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
      <Link
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

export default renderWebResult;