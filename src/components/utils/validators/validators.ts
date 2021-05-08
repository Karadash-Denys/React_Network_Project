


export type FieldValidatorType = (value:string)=> string | undefined


export const required:FieldValidatorType = (value)=> {
    if (value) return undefined
    return 'field is required'
}


export const maxLengthCreator = (maxLength:number ):FieldValidatorType => value => {
    if ( value.length >maxLength) return `error max length ${maxLength} symbols`
    return undefined
}






































































