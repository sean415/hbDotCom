import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/contact.module.sass';
import { useForm, ValidationError } from '@formspree/react'
import ContactForm from '../components/ContactForm/contact-form';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Holly Burns - Contact</title>
      </Head>
      <div className={styles.contactPage}>
        <section>
          <h2>Contact Me</h2>
          <p>You can email me at hollyburnswritesATgmail.com or find me on LinkedIn. I am also on Twitter, though it just kind of feels like a lot of people shouting at once.</p>
        </section>
        <div className={styles.contactForm}>
          <ContactForm />
        </div>
      </div>
    </>
  );
}