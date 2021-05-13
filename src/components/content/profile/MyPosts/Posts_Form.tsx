import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validators/validators'
import {createField, Textarea} from '../../../../common/FormsControl/FormsControl'

const maxLength10= maxLengthCreator(10)

export type PostDataType = {
    newPostText: string
}
type PostTypeKeys = keyof PostDataType
type PropsType ={}

const AddNewPostsForm: React.FC< InjectedFormProps<PostDataType,PropsType> & PropsType> = props => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                {createField<PostTypeKeys>("New post", "newPostText", [required,maxLength10], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}


const  AddNewPostsFormRedux =reduxForm<PostDataType,PropsType>({form:'profileAddNewPostsForm'})(AddNewPostsForm)


export default AddNewPostsFormRedux