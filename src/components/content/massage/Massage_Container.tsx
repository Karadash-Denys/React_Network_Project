

import { actions } from "../../../redux/Massage_Page_Reduser";
import Massage from "./massage";
import { connect } from "react-redux";
import {withAuthRedirect} from '../../../HOC/withAuthRedirect'
import { compose } from "redux";
import { AppStateType } from "../../../redux/Redux_store";





const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsData: state.massagePage.dialogsData,
    massageData: state.massagePage.massageData,
  }
}


export default compose<React.ComponentType>(
  connect(mapStateToProps,{sendMsg: actions.sendMsg}),
  withAuthRedirect
) (Massage)


