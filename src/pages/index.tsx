import { fetchAboutPageContent } from "../lib/wp-api";
import parse from 'html-react-parser';
import Head from 'next/head';

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
      <section>
        <figure className={Styles.profileImageWrapper}>
          <img src={model.profileImage} alt="Holly Burns" className={``} />
        </figure>
        <h1>{model.title}</h1>
        {parse(model.body)}
      </section>
    </>
  )
}

export default AboutPage;

export async function getStaticProps({params}): Promise<{ props: AboutPageModel}>  {
  let content = await fetchAboutPageContent();
  return {
    props: {
      profileImage: content._embedded['wp:featuredmedia']['0'].source_url,
      title: content.title.rendered,
      body: content.content.rendered.replace(/\n/, '')
    }
  }
}
