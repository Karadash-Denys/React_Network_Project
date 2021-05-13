import React from 'react'
import style from './Forms.Control.module.css'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from '../../components/utils/validators/validators';


type FormControlParamsType = {
    meta: WrappedFieldMetaProps
}



const FormControl:React.FC<FormControlParamsType>= ({ meta:{touched,error}, children }) => {
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



export const Textarea:React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControl {...props} ><textarea {...input} {...restProps} /></FormControl>
}

export const Input:React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControl {...props} ><input {...input} {...restProps} /></FormControl>
}




export function createField<FormKeysType extends string>(placeholder: string | undefined,
    name: FormKeysType,
    validate: Array<FieldValidatorType>,
    component: React.FC<WrappedFieldProps>,
    props = {}, text = '') {
    return <div>
        <Field
            placeholder={placeholder}
            name={name}
            validate={validate}
            component={component}
            {...props}
        />{text}
    </div>
}

































































