
const ADD_MASSAGE = 'ADD_MASSAGE'

type DialogsDataType = {
  id: number
  name: string
} 
type MassageDataType = {
  id: number
  massage: string
} 

let initialMassagePage = {
    dialogsData: [
      { id: 1, name: "Rayan" },
      { id: 2, name: "Ellise" },
      { id: 3, name: "Jesica" },
      { id: 4, name: "John" },
      { id: 5, name: "Katy" },
    ] as Array<DialogsDataType> ,
    massageData: [
      { id: 2, massage: "Hi" },
      { id: 1, massage: "How are you" },
      { id: 3, massage: "I got you bro" },
      { id: 4, massage: "you are the best" },
      { id: 5, massage: "Happy hplidays" },
    ]  as Array<MassageDataType> ,
  }


export type InitialStateType = typeof initialMassagePage

const massage_page_reduser = (state = initialMassagePage, action:any): InitialStateType => {


    switch (action.type) {
      case ADD_MASSAGE: 
        
        return {
          ...state,
          massageData: [...state.massageData, { id: 6, massage: action.text }],
        }
        
      
    
        default:
           return state
    }
}

type SendMsgActionType = {
  type: typeof ADD_MASSAGE
  text: string
}
export const sendMsg = (text:string):SendMsgActionType => ({ type: ADD_MASSAGE,text })

export default massage_page_reduser