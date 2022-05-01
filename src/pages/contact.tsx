import Head from 'next/head';
import styles from '../styles/contact.module.sass';
import ContactForm from '../components/ContactForm/contact-form';
import { BodyContent } from '../components/BodyContent/body-content';
import { fetchContactPageContent } from '../lib/wp-api';

import he from 'he';
import parse from 'html-react-parser';

export interface ContactPageModel {
  title: string,
  body: string
}


export default function Contact(model:ContactPageModel ) {
  return (
    <>
      <Head>
        <title>Holly Burns - Contact</title>
      </Head>
      <div className={styles.contactPage}>
        <BodyContent>
          <p>{parse(model.body)}</p>
        </BodyContent>
        <div className={styles.contactForm}>
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({params}) {
  const content = await fetchContactPageContent()
  console.log(content)
  return {
    props: {
      title: he.decode(content.title.rendered),
      body: he.decode(content.content.rendered.replace(/\n/, ''))
    },
    revalidate: 60
  }
}