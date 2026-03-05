const BASE_URL = 'https://gutendex.com/books';

// Mapsing our topic ids to Gutenberg topic search terms
// Gutenberg uses different names than we do
const TOPIC_MAP = {
  fiction: 'fiction',
  philosophy: 'philosophy',
  science: 'science',
  history: 'history',
  technology: 'technology',
  sports: 'sport',
  gaming: 'games',
  anime: 'japan',
  news: 'journalism',
  'self-improvement': 'self-help',
};

// Fetch books by topic from Gutenberg
export const fetchBooksByTopic = async (topic) => {
  try {
    const searchTerm = TOPIC_MAP[topic] || topic;
    const response = await fetch(
      `${BASE_URL}?topic=${searchTerm}&languages=en`
    );

    // if response is not ok
    if (!response.ok) throw new Error('Failed to fetch books');

    const data = await response.json();

    // Transform API response into our own clean shape
    // This way if API changes, we only update this file
    return data.results.map((book) => ({
      id: `gutenberg-${book.id}`,
      title: book.title,
      author:
        book.authors[0]?.name?.split(',').reverse().join(' ').trim() ||
        'Unknown',
      topic: topic,
      source: 'Project Gutenberg',
      difficulty: 'intermediate',
      contentUrl:
        book.formats['text/html; charset=utf-8'] ||
        book.formats['text/html'] ||
        null,
    }));
  } catch (error) {
    console.error('Gutenberg fetch error:', error);
    return [];
  }
};
