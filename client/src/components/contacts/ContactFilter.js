import React, {useContext, useRef, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
  const contactContext = useContext(ContactContext)
  // used to hold filter text
  const text = useRef('');
  const {filtered} = contactContext 

  useEffect(() => {
    if(filtered === null) {
      text.current.value = ''
    } else {

    }
  })

  const onChange = e => {
    if(text.current.value !== '') {
      contactContext.filterContacts(e.target.value)

    } else {
      contactContext.clearFilter()
    }
  }
  return (
    <form>
      <input type="text" ref={text} onChange={onChange} placeholder="Filter contacts..."/>
    </form>
  )
}

export default ContactFilter;