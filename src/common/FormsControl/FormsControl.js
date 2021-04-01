import React from 'react'
import style from './Forms.Control.module.css'
import { Field } from "redux-form";




const FormControl = ({ input, meta:{touched,error}, children }) => {
    const hasError = touched && error
    return (
        <div className={style.formControl + ' ' + (hasError ? style.error : '')} >
            <div >
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}



export const Textarea = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControl {...props} ><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControl {...props} ><input {...input} {...restProps} /></FormControl>
}


export const createField = (placeholder, name, validate, component,props={},text='') => (
    <div>
        <Field
            placeholder={placeholder}
            name={name}
            validate={validate}
            component={component}
            {...props}
        />{text}
    </div>
)

































































