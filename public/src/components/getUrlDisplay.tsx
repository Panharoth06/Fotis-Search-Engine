export const getUrlDisplay = (item: any) => {
  return item.meta_url?.netloc || item.source || 'Unknown source';
};
