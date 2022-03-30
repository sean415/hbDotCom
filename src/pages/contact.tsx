import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/contact.module.sass';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      name,
      email,
      message,
    };
    fetch('/api/contact', {
      method: 'post',
      body: JSON.stringify(data),
    });
  };

  return (
    <div>
      <Head>
        <title>Holly Burns - Contact</title>
      </Head>
      <>

        <form onSubmit={handleSubmit} className={styles.form}>
          <p>You can email me at hollyburnswritesATgmail.com or find me on LinkedIn. I am also on Twitter, though it just kind of feels like a lot of people shouting at once.</p>
          <div>
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
              placeholder={"Email"}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              rows={10}
              placeholder={"Message"}
              onChange={e => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </div>
        </form>
      </>
    </div>
  );
}