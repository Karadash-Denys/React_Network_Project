



export const updateObjectInArray = (items:any, itemId:any, objectPropName:any, newObjProps:any) => {
    return items.map((u:any) => {
        if (u[objectPropName] === itemId) {
            return {...u,...newObjProps }
        }
        return u
    })

}