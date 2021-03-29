





export const required = value => {
    if (value) return undefined
    return 'field is required'
}


export const maxLengthCreator=maxLength => value => {
    if ( value.length >maxLength) return `error max length ${maxLength} symbols`
    return undefined
}






































































