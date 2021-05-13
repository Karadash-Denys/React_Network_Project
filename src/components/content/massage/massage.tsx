import React from "react";
import MassageUser from "./massage-user/massage-user";
import s from "./massage.module.css";
import Dialogs from "./dialogs/dialogs";
import AddMessageReduxForm, { FormDataType } from './Massage_Form'
import { DialogsDataType, MassageDataType } from "../../../redux/Massage_Page_Reduser";

type PropsType = {
  dialogsData: Array<DialogsDataType>
  massageData: Array<MassageDataType>
  sendMsg:(message:string)=>void
}



const Massage: React.FC<PropsType> = (props) => {
  
 
  let dialogElements = props.dialogsData.map((dialog) => (
    <Dialogs name={dialog.name} key={dialog.id} id={dialog.id} />
  ));
  let massageElements = props.massageData.map((massage) => (
    <MassageUser key={massage.id} massage={massage.massage} />
  ));


  let send_Msg = (formData:FormDataType) => {
    props.sendMsg(formData.newMessageBody);

  };

 


  return (
    <div className={s.massage}>
      <div className={s.dialogs}>{dialogElements}</div>
      <div className={s.massageItem}>
        {massageElements}
        <AddMessageReduxForm onSubmit={send_Msg} />
      </div>
    </div>
  );
};



export default Massage;
