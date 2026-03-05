import { useState, useEffect } from 'react'
import { fetchBooksByTopic } from '../services/gutenberg'
import { fetchWikiArticle } from '../services/wikipedia'

function useLibrary (topics = []) {
    //all content fetched from both apis
    const [content, setContent] = useState([])
    // the single item we show on as today's read on home
    const [todaysRead, setTodaysRead] = useState(null)
    // true while apis are loading
    const [loading, setLoading] = useState(false)
    // error
    const [error, setError] = useState(null)

    useEffect(() => {
        
        if(topics.length === 0) return

        const fetchContent = async ()  => {
            setLoading(true)
            setError(null)

            try{
                // use 1st topics as primary - this drives todays read
                const primaryTopic = topics[0]

                // Fetches both api at same time
                const [books, wikiArticle] = await Promise.all([
                    fetchBooksByTopic(primaryTopic),
                    fetchWikiArticle(primaryTopic),
                ])

                // combine books arrays + book article in one array
                const  allContent = [
                    ...books,
                    ...(wikiArticle ? [wikiArticle] : [])
                ]

                setContent(allContent)

                // first item it combined array becomes todays read
                setTodaysRead(allContent[0] || null)

            }catch(err){
                setError('failed to load content')
                console.log(err)
            }finally{
                setLoading(false)
            }
        }

        fetchContent()
    },[topics.join(',')])

    return{
        content,
        todaysRead,
        error,
        loading,
    }
}

export default useLibrary