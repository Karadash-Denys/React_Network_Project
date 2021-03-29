import React from "react";

import { sendMsg} from "../../../redux/Massage_Page_Reduser";
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

export default compose(
  connect(mapStateToProps,{sendMsg,}),
  withAuthRedirect
) (Massage)


