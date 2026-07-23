import { ReactNode } from 'react'
import styles from './article-list.module.sass'

export const ArticleList = ({ children }: { children: ReactNode }) => {
  return <ul className={styles.articleList}>
    {children}
  </ul>
}
