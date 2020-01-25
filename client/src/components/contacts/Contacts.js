import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { ContactItem } from './ContactItem';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Spinner from '../layout/Spinner'


export const Contacts = () => {
  // gives access to state
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts()
  },[])

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
        {filtered !== null
          ? filtered.map(contact => {
              return (
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact}>
                  {contact.name}
                </ContactItem>
                </CSSTransition>
              );
            })
          : contacts.map(contact => {
              return (
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem  contact={contact}>
                  {contact.name}
                </ContactItem>
                </CSSTransition>
              );
            })}
            </TransitionGroup>
      ) : <Spinner/>}
      
    </Fragment>
  );
};
