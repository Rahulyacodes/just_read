const BASE_URL = 'https://gutendex.com/books'

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
}

export const fetchBooksByTopic = async (topic) => {
  try {
    const searchTerm = TOPIC_MAP[topic] || topic
    const response = await fetch(
      `${BASE_URL}?topic=${searchTerm}&languages=en`
    )
    if (!response.ok) throw new Error('Failed to fetch books')
    const data = await response.json()

    return data.results.map((book) => ({
      id: `gutenberg-${book.id}`,
      title: book.title,
      // Gutenberg stores "Austen, Jane" → we reverse to "Jane Austen"
      author: book.authors[0]?.name
        ?.split(',').reverse().join(' ').trim() || 'Unknown',
      topic: topic,
      source: 'Project Gutenberg',
      difficulty: 'intermediate',
      contentUrl: book.formats['text/html; charset=utf-8']
        || book.formats['text/html']
        || null,
      // ← description is null here
      // useLibrary fetches it from Wikipedia and attaches it
      description: null,
    }))
  } catch (error) {
    console.error('Gutenberg fetch error:', error)
    return []
  }
}