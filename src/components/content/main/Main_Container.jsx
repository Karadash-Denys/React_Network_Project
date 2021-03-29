

import Main from "./main";
import {
  addPost,
  textAreaOnChange,
} from "../../../redux/Main_Page_Reducer";
import { connect } from "react-redux";





const mapStateToProps = (state) => {
  return {
    friendsData:state.mainPage.friendsData,
        postsData:state.mainPage.postsData,
        newPostText:state.mainPage.newPostText,
  }
}




const MainContainer = connect (mapStateToProps,{addPost,textAreaOnChange})(Main)

export default MainContainer;
