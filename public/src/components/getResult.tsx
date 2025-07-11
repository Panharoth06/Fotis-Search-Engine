export const getResults = (filter: string, results: any) => {
    
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