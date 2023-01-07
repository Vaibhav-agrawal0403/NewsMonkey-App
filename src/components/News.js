import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props)=> {  

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // This fn is helpful to write logic of next and previous button in single function and remove the 
    // same content for handlenext,handleprev,componentDidMount.
    const updateNews = async()=> {
      props.setProgress(10)
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
      &page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
      let data = await fetch(url);
      props.setProgress(30)
      let parsedData = await data.json()
      props.setProgress(70)
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      props.setProgress(100)
    }

    useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`  
      updateNews();
        // eslint-disable-next-line
    },[])

    // When infinite scrolller is using so dont need for next and previous button
    // const handlePrevClick = async()=>{
    //   setPage(page - 1)
    //   updateNews();
    // }
    // const handleNextClick = async()=>{
    //   setPage(page + 1)
    //   updateNews();
    // }

    const fetchMoreData = async() => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
      &page=${page + 1}&pageSize=${props.pageSize}`;
      setPage(page + 1)
      let data = await fetch(url);
      let parsedData = await data.json()
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
    };
  
    return (
      <>
          <h1 className="text-center" style={{margin:'35px 0px' , marginTop:'90px'}}>NewsMonkey - Top  {capitalizeFirstLetter(props.category)} Headlines</h1>

          {/* when loading is true then show the spinner */}
          {loading && <Spinner/>} 

          {/* we were using this line with map condition because when we are loading so dont show existing data but now
          we are making infinite scroll so we have to concatenate the data in existing data. */}
          {/* !loading && */}

          <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
          >
              <div className="container">
                <div className="row">
                    {articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                                <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} 
                                          imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} 
                                          date={element.publishedAt} source={element.source.name} />
                              </div>
                    })}
                </div>
              </div>  
          </InfiniteScroll>

          {/* Now we are making infinite scroll so dont need of next and previous button */}
          {/* <div className="container d-flex justify-content-between">
              <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
              <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" 
              onClick={handleNextClick}>Next &rarr;</button>
          </div> */}
      </>
    )
}

News.defaultProps = {
  country : 'in',
  pageSize : 8,
  category : 'general'
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}

export default News