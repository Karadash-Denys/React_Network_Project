
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts'
import { connect } from "react-redux"
import { actions } from '../../../../redux/Profile_Page_Reducer'
import { AppStateType } from '../../../../redux/Redux_store'






const mapStateToProps = (state:AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}


const MyPostsContainer = connect<MapPropsType,DispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost:actions.addPost})(MyPosts)

export default MyPostsContainer











































