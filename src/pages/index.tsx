import { fetchAboutPageContent } from "../lib/wp-api";
import parse from 'html-react-parser';
import Head from 'next/head';
import { BodyContent } from "../components/BodyContent/body-content";

import he from 'he'

import Styles from '../styles/index.module.sass'

export interface AboutPageModel {
  profileImage: string,
  title: string,
  body: string
}

const AboutPage = (model: AboutPageModel) => {
  return (
    <>
      <Head>
        <title>Holly Burns - Freelance Journalist - SF Bay Area</title>
      </Head>
      <section className={Styles.grid}>
        <div className={Styles.content}>
          <BodyContent>
            {/* <h1>{model.title}</h1> */}
            {parse(model.body)}
          </BodyContent>
        </div>
        <div>
          <figure className={Styles.profileImageWrapper}>
            <img src={model.profileImage} alt="Holly Burns" className={``} />
          </figure>
        </div>
      </section>
    </>
  )
}

export default AboutPage;

export async function getStaticProps({params}): Promise<{ props: AboutPageModel, revalidate}>  {
  let content = await fetchAboutPageContent();
  return {
    props: {
      profileImage: content._embedded['wp:featuredmedia']['0'].source_url,
      title: he.decode(content.title.rendered),
      body: he.decode(content.content.rendered.replace(/\n/, ''))
    },
    revalidate: 60
  }
}
