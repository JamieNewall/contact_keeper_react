import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext'

// use state gives component level state - as form we need

export const ContactForm = () => {
  const contactContext = useContext(ContactContext)
  const {addContact, current, clearCurrent, updateContact} = contactContext
  useEffect(() => {
    if(current!==null) {
      setContact(current)
    }else{
      setContact({name: '',
      email: '',
      phone: '',
      type: 'personal'})
    }
  },[contactContext,current])
  // seperate state for the form as controlled component
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => setContact({...contact,[e.target.name]:e.target.value})

  const onSubmit = e => {
    e.preventDefault();
    if(current === null) {
      contactContext.addContact(contact)
    } else {
      updateContact(contact)
      clearAll()
    }
    
    setContact({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
    })
  }

  const clearAll = () => {
    clearCurrent()

  }

  return (
    <form onSubmit={onSubmit}>
<h2 className='text-primary'>{current ? 'Update Contact' : 'Add Contact'}</h2>
      <input
        type='text'
        placeholder='name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input type="radio" name="type" value="personal" checked={type==='personal'} onChange={onChange}/>
      Personal{' '}
      <input type="radio" name="type" value="professional" checked={type==='professional'} onChange={onChange}/>
      Professional{' '}
      <div>
        <input type="submit" className="btn btn-primary btn-block" value={current ? 'Update Contact' : 'Add Contact'} />
      </div>
      {current && <div>
        <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
        </div>}
    </form>
  );
};

export default ContactForm;
