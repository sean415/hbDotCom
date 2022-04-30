import { useForm, ValidationError } from '@formspree/react'
import { useState } from 'react'
import styles from './contact-form.module.sass'

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // const [state, setState] = useState('notSubmitted')

  const [state, handleSubmit] = useForm("xbjwpapn");

  // const handleSubmit = async (e) => {
  //   setState('submitting')
  //   e.preventDefault();
  
  //   // let isValidForm = handleValidation();
  //   const res = await fetch("/api/contact", {
  //     body: JSON.stringify({
  //       email: email,
  //       name: name,
  //       // subject: subject,
  //       message: message,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //   });
  
  //   const { error } = await res.json();
  //   if (error) {
  //     console.log(error);
  //     setState('failed')
  //     return;
  //   }
  //   console.log(name, email, /*subject,*/ message);
  //   setState('suceeded')
  // }


  if (state.succeeded) {
    return <p>Thanks for reaching out!</p>
  } else {
    return (
      <form onSubmit={handleSubmit} className={styles.contactForm} method="POST">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder={"Name"}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        
        <input
          id="email"
          type="email"
          name="email"
          placeholder={"Email"}
          onChange={e => setEmail(e.target.value)}
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
        />
        
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          rows={10}
          placeholder={"Message"}
          onChange={e => setMessage(e.target.value)}
        />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
        />
        <button type="submit" disabled={state.submitting}>Send</button>
    </form>
    )
  }

}
export default ContactForm