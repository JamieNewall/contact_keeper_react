import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,contacts:[action.payload, ...state.contacts],
        loading: false
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts:state.contacts.filter((contact)=>{
          return contact._id !== action.payload
        })
      }
    case GET_CONTACTS:
      return {
        ...state, 
        contacts: action.payload,
        loading: false
      }
    case SET_CURRENT:
      return{
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case CLEAR_CONTACTS: 
    return {
      ...state,
      contacts: null,
      filtered: null,
      error: null, 
      current: null
    }
    case UPDATE_CONTACT:
      return {
        ...state, 
        contacts: state.contacts.map((contact)=>{
          if(contact._id === action.payload._id) {
            return action.payload
          } else{
            return contact
          }
           
          
        }),
        loading: false
      }
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`,'gi')
          return contact.name.match(regex) || contact.email.match(regex)
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered:null
      }
    case CONTACT_ERROR:
      return {
        ...state, 
        error: action.payload
      }
      
  
    default:
      return state;
  }
}