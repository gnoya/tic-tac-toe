import { useState } from 'react'
import styles from './toggle-switch.component.module.css'

interface ToggleSwitchProps {
  onToggle?: (value: boolean) => void
}

export default function ToggleSwitch({ onToggle }: ToggleSwitchProps) {
  const [value, setValue] = useState<boolean>(false)

  const handleChange = () => {
    setValue((prevState) => {
      onToggle && onToggle(!prevState)
      return !prevState
    })
  }

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={value} onChange={handleChange} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  )
}
