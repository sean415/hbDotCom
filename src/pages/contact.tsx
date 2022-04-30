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
          <p>I’m available for written assignments, interviews, and speaking engagements. If you’d like to work together or you have feedback on a story, I’d love to hear from you. </p>
        </BodyContent>
        <div className={styles.contactForm}>
          <ContactForm />
        </div>
      </div>
    </>
  );
}