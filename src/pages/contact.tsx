import Head from 'next/head';
import styles from '../styles/contact.module.sass';
import ContactForm from '../components/ContactForm/contact-form';
import { BodyContent } from '../components/BodyContent/body-content';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Holly Burns - Contact</title>
      </Head>
      <div className={styles.contactPage}>
        <BodyContent>
          <h1>Contact Me</h1>
          <p>You can email me at hollyburnswritesATgmail.com or find me on LinkedIn. I am also on Twitter, though it just kind of feels like a lot of people shouting at once.</p>
        </BodyContent>
        <div className={styles.contactForm}>
          <ContactForm />
        </div>
      </div>
    </>
  );
}