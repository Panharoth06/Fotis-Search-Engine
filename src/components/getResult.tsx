export const getResults = (filter: string, results: any) => {
  if (!results) return [];

  switch (filter) {
    case 'web':
      console.log('Accessing web results:', results?.web?.results);
      return results?.web?.results || [];

    case 'video':
      console.log('Accessing video results:', results?.results);
      return results?.results || [];

    case 'news':
      console.log('Accessing news results:', results?.results);
      return results?.results || [];

    case 'image':
      console.log('Accessing image results:', results?.results);
      return results?.results || [];

    default:
      return [];
  }
};
