const ADD_COMMENT = 'ADD_COMMENT'
const UPPDATE_NEW_POST_TEXT = 'UPPDATE_NEW_POST_TEXT'

let initionalMainPage ={
    postsData: [
      {
        name: "name",
        id:1,
        avaSrc:
          "https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg",
        photoSrc:
          "https://content.presspage.com/uploads/1376/c1920_riocelestewaterfalltenoriovolcanonationalparkguanacastecostarica-990097.jpg?94786",
        comment: [
          { id: 1, commmentNew: 'lorem hhhhhhhhhhhhhhhhhhhhhh', },
          { id: 2, commmentNew: 'Fun вввввввввввввввввв', },
          { id: 3, commmentNew: 'Good gggggggggggggggggggggg', },
        ],
      },
    ],
    newPostText: '',
    friendsData: [
      { name: 'Jhon', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg', id:1 },
      { name: 'Bill', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg', id:2 },
      { name: 'Jake', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg', id:3},
      { name: 'Elis', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg' , id:4},
      { name: 'Jesika', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg' , id:5},
      { name: 'Katy', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg' , id:6},
      { name: 'Maria', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg' , id:7}
    ]
  }


const main_page_reduser = (state = initionalMainPage, action:any) => {

  let stateCopy = {...state,}
  


    switch (action.type) {
      case ADD_COMMENT: 
        stateCopy.postsData[0].comment = [...state.postsData[0].comment,{id: 4,commmentNew: state.newPostText}]
        stateCopy.newPostText = '';
        return stateCopy
      
      case UPPDATE_NEW_POST_TEXT: 
        stateCopy.newPostText = action.text
        return stateCopy
      
    
        default:
            return state
    }

}

export const textAreaOnChange = (text:string) => ({ type: UPPDATE_NEW_POST_TEXT, text: text })
export const addPost = () => ({ type: ADD_COMMENT })


export default main_page_reduser