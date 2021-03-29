
import MyPosts from './MyPosts'
import { connect } from "react-redux"
import { addPost } from '../../../../redux/Profile_Page_Reducer'






const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostBody:state.profilePage.newPostBody
    }
}

const MyPostsContainer = connect(mapStateToProps, { addPost})(MyPosts)

export default MyPostsContainer











































