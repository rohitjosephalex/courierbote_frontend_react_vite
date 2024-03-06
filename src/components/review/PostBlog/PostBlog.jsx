import './PostBlogStyles.css'
import './ResponsiveBlogCard.css'

export const PostBlog = (props) => {
    return (
        <div className="PostBlog">
             <div className="botBlog">
                <div className="botProfile">
                <img src={props.profile} alt={props.name} />
                <p>{props.author}</p>
                </div>
            </div>
            <div className="middleBlog">
                <p>{props.review}</p>
              
            </div>
           
        </div>
    )
}