import main_page_reduser from "./Main_Page_Reducer"
import massage_page_reduser from "./Massage_Page_Reduser"



const store = {
  _state: {
    massagePage: {
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
      newMassageText: ''
    },
    mainPage: {
      postsData: [
        {
          name: "name",
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
        { name: 'Jhon', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg' },
        { name: 'Bill', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg' },
        { name: 'Jake', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg' },
        { name: 'Elis', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg' },
        { name: 'Jesika', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg' },
        { name: 'Katy', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg' },
        { name: 'Maria', src: 'https://skidka02.ru/wp-content/uploads/instagram-avatarka-razmer_31.jpg' }
      ]
    }
  },
  _callSubscriber() {
    console.log('state is changed');
  },


  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },



  dispatch(action) {

    this._state.mainPage = main_page_reduser(this._state.mainPage, action)
    
    this._state.massagePage = massage_page_reduser(this._state.massagePage, action)

    this._callSubscriber(this._state)


  }
}







export default store;