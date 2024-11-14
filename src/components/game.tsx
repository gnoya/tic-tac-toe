import { Role } from '@/types/role'
import { Board } from './board'
import { RoleSwapper } from './role-swapper'
import { useState } from 'react'
import { makeEmptyTiles } from '@/lib/make-empty-tiles'
import { Tile } from '@/types/tile'

export function Game() {
  const [role, setRole] = useState<Role>('X')
  const [tiles, setTiles] = useState<Tile[]>(makeEmptyTiles())
  const [playerTurn, setPlayerTurn] = useState<Role>('X')

  return (
    <div className="grid gap-8 justify-self-center">
      <Board
        tiles={tiles}
        onTileClick={(index: number) =>
          setTiles((prevTiles) => {
            const newTiles = [...prevTiles]
            newTiles[index].filledBy = playerTurn
            setPlayerTurn(playerTurn === 'X' ? 'O' : 'X')
            return newTiles
          })
        }
      />
      <RoleSwapper role={role} setRole={setRole} />
    </div>
  )
}
