import type { Metadata } from 'next'
import he from 'he'
import { fetchPublishedStories } from '../../lib/wp-api'
import { ArticleLink, ArticleLinkModel } from '../../components/ArticleLink/article-link'
import { ArticleList } from '../../components/ArticleList/article-list'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Holly Burns - Freelance Journalist - Published Writing',
}

interface ArticleSection {
  title: string
  links: Array<ArticleLinkModel>
}

function mapStories(stories: any[]): Array<ArticleSection> {
  const publications: Record<string, ArticleLinkModel[]> = {}
  let sections: Array<ArticleSection> = []

  stories.forEach((story: any) => {
    const articleLinkModel: ArticleLinkModel = {
      title: he.decode(story.title.rendered),
      url: story.url || null,
    }
    if (publications[story.publication]) {
      publications[story.publication].push(articleLinkModel)
    } else {
      publications[story.publication] = [articleLinkModel]
    }
  })

  for (const [key, value] of Object.entries(publications)) {
    sections.push({ title: key, links: value })
  }

  sections = sections.sort((a, b) => b.links.length - a.links.length)

  return sections
}

export default async function WritingPage() {
  const sectionTitlePrefix = 'For'
  const content = await fetchPublishedStories()
  const sections = mapStories(content)

  return (
    <>
      {sections.map((section, index) => (
        <section key={index}>
          <h3>
            {sectionTitlePrefix} <em>{section.title}</em>
          </h3>
          <ArticleList>
            {section.links.map((link, i) => (
              <ArticleLink key={i} {...link} />
            ))}
          </ArticleList>
        </section>
      ))}
    </>
  )
}
