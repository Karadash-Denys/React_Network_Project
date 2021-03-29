import React, { useEffect, useState } from "react";
// import s from "../profile.module.css";

const ProfileStatusWithHooks = (props) => {
  const [editMode, setEditmode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditmode(true);
  };
  const disactivateEditMode = () => {
    setEditmode(false);
    props.updateStatus(status);
  };
  const onChangeStatus = (e) => {
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
