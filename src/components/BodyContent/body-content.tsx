import Styles from './body-content.module.sass'

export const BodyContent: React.FC = ({children}) => {
  return <article className={Styles.bodyContent}>{children}</article>
}