import React from 'react'
import { reduxForm } from 'redux-form'
import { Textarea, Input, createField } from '../../../../common/FormsControl/FormsControl'
import s from "../profile.module.css";
// import {required,maxLengthCreator} from '../../../utils/validators/validators'



const ProfileDataForm = ({ profile, status, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button  >SUBMIT</button>
      </div>
      { error && <div className={s.formSummuryError}>
        {error}
      </div>}
      <div>
        <p>Full name: </p> {createField('Full Name', 'fullName', [], Input)}


        <b> About me: </b> {createField('About me', 'aboutMe', [], Textarea)}



        <b> My rofessional skills: </b> {createField('My rofessional skills', 'lookingForAJobDescription', [], Textarea)}

        <b> Looking for a job:</b> {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}

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



const ProfileDataFormReduxForm = reduxForm({ form: 'editProfile' })(ProfileDataForm)


export default ProfileDataFormReduxForm



































