import styles from './article-link.module.sass'

export interface ArticleLinkModel {
  title: string
  url: string
  date?: Date
  image?: {
    src: string
    alt: string
  }
}

export const ArticleLink: React.FC<ArticleLinkModel> = (model: ArticleLinkModel) => {
  return <li className={styles.articleLink}>
    <a href={model.url}>{model.title}</a>
  </li>
}