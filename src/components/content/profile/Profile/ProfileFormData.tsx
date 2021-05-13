import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Textarea, Input, createField } from '../../../../common/FormsControl/FormsControl'
import { ProfileType } from '../../../../types/types';
import s from "../profile.module.css";

type PropsType = {
  profile: ProfileType
  status: string | null
}
type ProfileTypeKeys = keyof ProfileType

const ProfileDataForm: React.FC< InjectedFormProps<ProfileType,PropsType> & PropsType>  = ({ profile, status, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button  >SUBMIT</button>
      </div>
      { error && <div className={s.formSummuryError}>
        {error}
      </div>}
      <div>
        <p>Full name: </p> {createField<ProfileTypeKeys>('Full Name', 'fullName', [], Input)}
        <b> About me: </b> {createField<ProfileTypeKeys>('About me', 'aboutMe', [], Textarea)}
        <b> My rofessional skills: </b> {createField<ProfileTypeKeys>('My rofessional skills', 'lookingForAJobDescription', [], Textarea)}
        <b> Looking for a job:</b> {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
        <div>
          <p>
            <b> Status: </b>
            {status}
          </p>
          <b>Contacts</b>:
            {Object.keys(profile.contacts).map((key) => {
            return (
              <div className={s.contacts} key={key} >
                <b>{key} : {createField(key, 'contacts.' + key, [], Input)} </b>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  )
};



const ProfileDataFormReduxForm = reduxForm<ProfileType,PropsType>({ form: 'editProfile' })(ProfileDataForm)


export default ProfileDataFormReduxForm



































