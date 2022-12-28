import { ReactNode } from 'react'
import styles from './title.component.module.css'

interface TitleProps {
  children: ReactNode
}

export default function Title(props: TitleProps) {
  const { children } = props

  return <h1 className={styles.title}>{children}</h1>
}
