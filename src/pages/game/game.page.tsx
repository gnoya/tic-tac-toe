import Text from '../../components/text/text.component'
import Title from '../../components/title/title.component'
import styles from './game.page.module.css'

export default function GamePage() {
  return (
    <div className={styles.container}>
      <Title>Game Page Demo!</Title>
      <Text>Hola prueba</Text>
    </div>
  )
}
