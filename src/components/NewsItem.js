import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <div style={{flex:'display', justifyContent:'flex-end', position:'absolute', right:'0'}}>
                        <span className="badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source}</span>
                    </div>
                    {/* If any image is null then this url image will show */}
                    <img src={imageUrl?imageUrl:"https://c.ndtvimg.com/2023-01/jme2bcus_indian-origin-man-drives-tesla-off-cliff-with-family-inside-twitter_625x300_04_January_23.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-dark" style={{fontWeight:'bold'}}>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem