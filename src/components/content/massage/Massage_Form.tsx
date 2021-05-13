
import React from 'react'
import {  InjectedFormProps, reduxForm } from 'redux-form'
import {createField, Textarea} from '../../../common/FormsControl/FormsControl' 
import { required, maxLengthCreator } from '../../utils/validators/validators'


const maxLength50 = maxLengthCreator(50)


export type FormDataType = {
    newMessageBody: string
}
type MessageTypeKeys = keyof FormDataType
type PropsType ={}

const AddMassageForm: React.FC< InjectedFormProps<FormDataType,PropsType> & PropsType> = ({handleSubmit}) => {

    
    return (
        <form onSubmit={handleSubmit}>
            {createField<MessageTypeKeys>("New message", "newMessageBody", [required,maxLength50], Textarea)}
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
const AddMassageReduxForm = reduxForm<FormDataType, PropsType>({ form: "AddMessageForm" })(AddMassageForm);

export default AddMassageReduxForm


