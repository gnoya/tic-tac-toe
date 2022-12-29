import Board from '../../components/board/board.component'
import Text from '../../components/text/text.component'
import Title from '../../components/title/title.component'
import styles from './game.page.module.css'

export default function GamePage() {
  return (
    <div className={styles.container}>
      <Title>Tic Tac Toe</Title>
      <Text>This is Tic Tac Toe against a powerful AI! Can you beat it?</Text>
      <Board />
    </div>
  )
}
