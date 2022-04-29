import { fetchPublishedStories } from "../lib/wp-api";
import Head from 'next/head';
import { ArticleLink, ArticleLinkModel } from "../components/ArticleLink/article-link";
import { ArticleList } from "../components/ArticleList/article-list";
import he from 'he'

export interface WritingPageModel {
  title: string,
  sections: Array<ArticleSection>
}

interface ArticleLink {
  title: string
  url: string
  date: Date
  image: {
    src: string
    alt: string
  }
}

interface ArticleSection {
  title: string,
  links: Array<ArticleLink>
}

const WritingPage = (model: WritingPageModel) => {
  return (
    <>
      <Head>
        <title>{`Holly Burns - Freelance Journalist - ${model.title}`} </title>
      </Head>
      {model.sections.map(((section, index) => {
        return (
          <section key={index}>
            <h3>{section.title}</h3>
            <ArticleList>
              {section.links.map((link, index) => {
                return <ArticleLink {...link} />
              })}
            </ArticleList>
          </section>
        )
      }))}
    </>
  )
}

function mapStories(stories: []): Array<ArticleSection> {
  let publications: any = {};
  let sections: Array<ArticleSection> = [];

  stories.forEach((story: any) => {
    let articleLinkModel: ArticleLinkModel = {
      title: he.decode(story.title.rendered),
      url: story.url
    }
    if(publications[story.publication]) {
      publications[story.publication].push(articleLinkModel);
    } else {
      publications[story.publication] = [articleLinkModel];
    }
  });

  for(const [key, value] of Object.entries(publications)) {
    sections.push({ title: key, links: value} as ArticleSection);
  }

  sections = sections.sort(function(a, b) {
    return b.links.length -  a.links.length;
  });

  return sections;
}

export default WritingPage;

export async function getStaticProps({params}): Promise<{ props: WritingPageModel, revalidate: number}>  {
  let content = await fetchPublishedStories();
  console.log(content)
  return {
    props: {
      title: "Published Writing",
      sections: mapStories(content)
    },
    revalidate: 60
  }
}
