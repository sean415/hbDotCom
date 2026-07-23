import { ReactNode } from 'react'
import Styles from './body-content.module.sass'

export const BodyContent = ({ children }: { children: ReactNode }) => {
  return <article className={Styles.bodyContent}>{children}</article>
}
