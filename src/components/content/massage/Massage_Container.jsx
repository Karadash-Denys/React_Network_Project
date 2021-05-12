

import { actions } from "../../../redux/Massage_Page_Reduser";
import Massage from "./massage";
import { connect } from "react-redux";
import {withAuthRedirect} from '../../../HOC/withAuthRedirect'
import { compose } from "redux";





const mapStateToProps = (state) => {
  return {
    newMassageText: state.massagePage.newMassageText,
    dialogsData: state.massagePage.dialogsData,
    massageData: state.massagePage.massageData,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: (text) => {
      dispatch(actions.sendMsg(text))
    }
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  withAuthRedirect
) (Massage)


