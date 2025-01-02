import { FC, useRef, useState } from 'react'
import { IProduct } from '../../@types'
import { extractFileName } from '../../utils'

interface BasketCardProps {
  item: IProduct,
  quantity: number,
  changeQty: (id: number, qty: number) => void,
  removeItem: (id: number) => void
}

const BasketCard: FC<BasketCardProps> = ({ item, quantity, changeQty, removeItem }) => {
  const { current: _prefix } = useRef('lb')
  const [isFocus, setFocus] = useState(false)

  return (
    <article
      className="basket-card rounded-card"
      data-id={item.id}
      data-price={item.price}
    >
      <img
        src={item.images.cart}
        className="basket-card--image"
        alt={extractFileName(item.images.cart)}
      />

      <div className="basket-card--info">
        <h1 className="basket-card--title">{item.title}</h1>
        <span className="basket-card--price">${item.price.toFixed(2)} / {_prefix}</span>

        <div className="basket-card--action">
          <div className="basket-card--qty">
            <input
              type={isFocus ? 'number' : 'text'}
              className="basket-card--qty--input"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              value={isFocus ? quantity : `${quantity} ${_prefix}`}
              onChange={({ target }) => changeQty(item.id, +target.value)}
              {...(isFocus ? { min: 0.25, step: 0.25, max: 15 } : {})}
            />
          </div>

          <button
            className="basket-card--remove"
            onClick={() => removeItem(item.id)}
          >
            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
              <g stroke="#000000" stroke-linecap="round" stroke-width="2">
                <path d="M6 18L18 6" />
                <path d="M18 18L6 6" />
              </g>
            </svg>
          </button>
        </div>

      </div>

      <span className="basket-card--total">
        ${(item.price * quantity).toFixed(2)}
      </span>
    </article>
  )
}

export default BasketCard