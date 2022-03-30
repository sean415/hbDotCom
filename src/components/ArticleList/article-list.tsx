import styles from './article-list.module.sass'

export const ArticleList:React.FC = (props: { children }) => {
  return <ul className={styles.articleList}>
    {props.children}
  </ul>
}