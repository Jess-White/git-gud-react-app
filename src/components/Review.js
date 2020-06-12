import React from "react"

function Review(props) {
    console.log(props)
    return (
        <div className="review">
            <img src="{props.img_url}/>
            <h3>{props.review.title}</h3>
            <h3>{props.review.url}</h3>
            <p>{props.review.type}</p>
            <p>{props.review.difficulty}</p>
            <p>{props.review.rating}</p>
        </div>
    )
}

export default Review