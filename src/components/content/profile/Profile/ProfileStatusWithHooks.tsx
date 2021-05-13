import React, { ChangeEvent, useEffect, useState } from "react"




type PropsType = {
  status: string 
  updateStatus:(text:string)=>void
}

const ProfileStatusWithHooks:React.FC<PropsType> = (props) => {
  const [editMode, setEditmode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditmode(true);
  };
  const disactivateEditMode = () => {
    setEditmode(false);
    props.updateStatus(status);
  };
  const onChangeStatus = (e:ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };
  useEffect(()=> {
    setStatus(props.status)
  },[props.status])

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>{status || "----"}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            autoFocus={true}
            onChange={onChangeStatus}
            onBlur={disactivateEditMode}
            value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
