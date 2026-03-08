import { useState, useEffect } from 'react';
import { fetchBooksByTopic } from '../services/gutenberg';
import { fetchWikiArticle, fetchWikiSummaryForTitle } from '../services/wikipedia';
import { data } from 'react-router-dom';

function useLibrary(topics = []) {
  //all content fetched from both apis
  const [content, setContent] = useState([]);
  // the single item we show on as today's read on home
  const [todaysRead, setTodaysRead] = useState(null);
  // true while apis are loading
  const [loading, setLoading] = useState(false);
  // error
  const [error, setError] = useState(null);

  useEffect(() => {
    if (topics.length === 0) return;

    const fetchContent = async () => {
      setLoading(true);
      setError(null);

      try {
        // use 1st topics as primary - this drives todays read
        const primaryTopic = topics[0];
        
        // ------------caching------------------
        const catchKey = `jr_content_${primaryTopic}`
        const cached = localStorage.getItem(catchKey)

        if(cached){
            const {data, timeStamp} = JSON.parse(cached)

            const oneDay = 24 * 60 * 60 * 1000
            
            const isStillFresh = Date.now() - timeStamp < oneDay

            if(isStillFresh){
                setContent(data)
                setTodaysRead(data[0] || null)
                setLoading(false)
                return 
            }
        }

        const today = new Date().getDate
        const useGutenberg = today % 2 === 0

        let allContent = []

        if(useGutenberg){
            const books = await fetchBooksByTopic(primaryTopic)
            if(books.length > 0){
                const description = await fetchWikiSummaryForTitle(books[0].title)
                books = {...books[0], description}
            }
            allContent = books

        }else{
            const article = await fetchWikiArticle(primaryTopic)
            allContent = article ? [article] : []
        }   

        // ── Save to cache ─────────────────────────────────
        // saves content + current timestamp
        // next refresh reads this instead of calling APIs
        localStorage.setItem(catchKey, JSON.stringify({
            data : allContent,
            timeStamp : Date.now(),
        }))

        setContent(allContent)
        setTodaysRead(allContent[0] || null)

      } catch (err) {
        setError('failed to load content');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [topics.join(',')]);

  return {
    content,
    todaysRead,
    error,
    loading,
  };
}

export default useLibrary;
