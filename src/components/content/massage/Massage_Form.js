import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Textarea} from '../../../common/FormsControl/FormsControl' 
import {required,maxLengthCreator} from '../../utils/validators/validators'

const maxLength50 =maxLengthCreator(50)

const AddMassageForm = props => {

    
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field placeholder='New message' name='newMessageBody' component={Textarea}
                validate={[required,maxLength50]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}


export default reduxForm({form:'AddMessageForm'})(AddMassageForm)

