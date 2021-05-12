
import MyPosts from './MyPosts'
import { connect } from "react-redux"
import { actions } from '../../../../redux/Profile_Page_Reducer'






const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostBody:state.profilePage.newPostBody
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (text) => {
        dispatch(actions.addPost(text))
      }
    }
  }

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer











































