import React from "react";
import MassageUser from "./massage-user/massage-user";
import s from "./massage.module.css";
import Dialogs from "./dialogs/dialogs";
import AddMessageReduxForm from './Massage_Form'



const Massage = (props) => {
  
 
  let dialogElements = props.dialogsData.map((dialog) => (
    <Dialogs name={dialog.name} key={dialog.id} id={dialog.id} />
  ));
  let massageElements = props.massageData.map((massage) => (
    <MassageUser key={massage.id} massage={massage.massage} />
  ));


  let send_Msg = (formData) => {
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
