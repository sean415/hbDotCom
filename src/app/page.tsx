import parse from 'html-react-parser'
import he from 'he'
import { fetchAboutPageContent } from '../lib/wp-api'
import { BodyContent } from '../components/BodyContent/body-content'
import Styles from '../styles/index.module.sass'

export const revalidate = 60

export default async function AboutPage() {
  const content = await fetchAboutPageContent()
  const profileImage = content._embedded['wp:featuredmedia']['0'].source_url
  const body = he.decode(content.content.rendered.replace(/\n/, ''))

  return (
    <section className={Styles.grid}>
      <div className={Styles.content}>
        <BodyContent>{parse(body)}</BodyContent>
      </div>
      <div>
        <figure className={Styles.profileImageWrapper}>
          {/* Remote WordPress image; plain <img> keeps parity with the original. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profileImage} alt="Holly Burns" className={Styles.profilePic} />
        </figure>
      </div>
    </section>
  )
}
