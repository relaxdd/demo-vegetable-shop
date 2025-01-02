import { FC, useRef } from 'react'
import PageHeader from '../PageHeader.tsx'

interface ShopHeaderProps {
  filter: string,
  changeFilter: (value: string) => void
}

const ShopHeader: FC<ShopHeaderProps> = ({ filter, changeFilter }) => {
  const { current: filterBtns } = useRef(['Default', 'A-Z', 'By price'])

  return (
    <PageHeader title="Produce">
      <div className="shop-header">
        <p className="shop-title">
          <strong>Fresh</strong>{'  '}—{'  '}August 21, 2023
        </p>

        <div className="shop-filter">
          {filterBtns.map((word, i) => (
            <input
              key={i}
              value={word}
              type="button"
              className="shop-filter--btn"
              data-active={+(filter === word)}
              onClick={() => changeFilter(word)}
            />
          ))}
        </div>
      </div>
    </PageHeader>
  )
}

export default ShopHeader