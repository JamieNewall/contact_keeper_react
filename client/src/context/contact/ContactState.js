import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 3,
        name: 'Jamie Newall',
        phone: '333-333-3333',
        type: 'professional'
      },
      {
        id: 2,
        name: 'Bob Smith',
        phone: '444-444-4444',
        type: 'professional'
      }
    ],
    current: null,
    filtered: null


  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({type:ADD_CONTACT, payload: contact})
  }
  // Delete contact
  const deleteContact = id => {
    
    dispatch({type:DELETE_CONTACT, payload: id})
  }
  // Set current contact
  const setCurrent = contact => {
    
    dispatch({type:SET_CURRENT, payload: contact})
  }
  // Clear current contact
  const clearCurrent = () => {
    
    dispatch({type:CLEAR_CURRENT})
  }
  // Update contact
  const updateContact = contact => {
    dispatch({type:UPDATE_CONTACT, payload: contact})
  }
  // Filter contacts
  const filterContacts = text => {
    dispatch({type:FILTER_CONTACTS, payload: text})
  }
  // Clear filter
  const clearFilter = () => {
    dispatch({type:CLEAR_FILTER})
  }
  return (
    <ContactContext.Provider
    value={{
      contacts: state.contacts,
      addContact,
      deleteContact,
      current: state.current, 
      clearCurrent,
      setCurrent,
      updateContact,
      filtered: state.filtered,
      filterContacts, 
      clearFilter
    }}>
      {props.children}
    </ContactContext.Provider>
  )
};

export default ContactState;