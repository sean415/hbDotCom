import type { Metadata } from 'next'
import he from 'he'
import parse from 'html-react-parser'
import styles from '../../styles/contact.module.sass'
import ContactForm from '../../components/ContactForm/contact-form'
import { BodyContent } from '../../components/BodyContent/body-content'
import { fetchContactPageContent } from '../../lib/wp-api'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Holly Burns - Contact',
}

export default async function ContactPage() {
  const content = await fetchContactPageContent()
  const body = he.decode(content.content.rendered.replace(/\n/, ''))

  return (
    <div className={styles.contactPage}>
      <BodyContent>
        <p>{parse(body)}</p>
      </BodyContent>
      <div className={styles.contactForm}>
        <ContactForm />
      </div>
    </div>
  )
}
