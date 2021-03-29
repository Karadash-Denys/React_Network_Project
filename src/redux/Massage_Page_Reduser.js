const ADD_MASSAGE = 'ADD_MASSAGE'

let initialMassagePage = {
    dialogsData: [
      { id: 1, name: "Rayan" },
      { id: 2, name: "Ellise" },
      { id: 3, name: "Jesica" },
      { id: 4, name: "John" },
      { id: 5, name: "Katy" },
    ],
    massageData: [
      { id: 2, massage: "Hi" },
      { id: 1, massage: "How are you" },
      { id: 3, massage: "I got you bro" },
      { id: 4, massage: "you are the best" },
      { id: 5, massage: "Happy hplidays" },
    ],
  }


const massage_page_reduser = (state = initialMassagePage, action) => {


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

export const sendMsg = (text) => ({ type: ADD_MASSAGE,text })

export default massage_page_reduser