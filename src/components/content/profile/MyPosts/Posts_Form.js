import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validators/validators'
import {Textarea} from '../../../../common/FormsControl/FormsControl'

const maxLength10= maxLengthCreator(10)

const AddNewPostsForm = props => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field placeholder='New post' name='newPostText' component={Textarea}
                    validate={[required,maxLength10]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}


const  AddNewPostsFormRedux =reduxForm({form:'profileAddNewPostsForm'})(AddNewPostsForm)


export default AddNewPostsFormRedux