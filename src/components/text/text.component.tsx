import { ReactNode } from 'react'
import styles from './text.component.module.css'

interface TextProps {
  children: ReactNode
}

export default function Text(props: TextProps) {
  const { children } = props

  return <p className={styles.text}>{children}</p>
}
