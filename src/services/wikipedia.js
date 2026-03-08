const BASE_URL = 'https://en.wikipedia.org/api/rest_v1';

// Maps our topic ids to good Wikipedia search terms
const TOPIC_MAP = {
  philosophy: 'Stoicism',
  science: 'Quantum_mechanics',
  history: 'World_War_II',
  fiction: 'Gothic_fiction',
  technology: 'Artificial_intelligence',
  sports: 'Football',
  gaming: 'Video_game',
  anime: 'Anime',
  news: 'Journalism',
  'self-improvement': 'Personal_development',
};

export const fetchWikiArticle = async (topic) => {
  try {
    const searchTerm = TOPIC_MAP[topic] || topic;
    const response = await fetch(`${BASE_URL}/page/summary/${searchTerm}`);

    if (!response.ok) throw new Error('Failed to fetch wikipedia content');

    const data = await response.json();

    // Transform into our clean shape
    return {
      id: `wiki-${data.pageid}`,
      title: data.title,
      author: 'Wikipedia',
      topic: topic,
      source: 'Wikipedia',
      difficulty: 'beginner',
      description: data.extract,
      // extract is a short summary paragraph — perfect for preview
      contentUrl: data.content_urls?.desktop?.page || null,
    };
  } catch (error) {
    console.error('Wikipedia fetch error:', error);
    return null;
  }
};

// for todays read title summary
export const fetchWikiSummaryForTitle = async (title) => {
    try{
      const searchTerm = title.replace(/\s+/g, '_')
      const response = await fetch(`${BASE_URL}/page/summary/${searchTerm}`)
      if(!response.ok) return null
      const data = await response.json()
      return data.extract() || null

    }catch(err){
      console.log('Wiki summary fetch error', err)
      return null
    }
}