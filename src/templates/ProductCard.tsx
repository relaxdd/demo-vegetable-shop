import { FC } from 'react'
import { IProduct } from '../@types'
import { extractFileName } from '../utils'

interface ProductProps {
  item: IProduct,
  isInBasket: boolean,
  addToBasket: (id: number) => void,
}

const ProductCard: FC<ProductProps> = ({ item, addToBasket, isInBasket }) => {
  return (
    <article data-id={item.id} className="product-card rounded-card">
      <img
        src={item.images.shop}
        className="product-card--image"
        alt={extractFileName(item.images.shop)}
      />

      <div className="product-card--content">
        <h2 className="product-card--title">{item.title}</h2>
        <span className="product-card--price">${item.price} / lb</span>
        <p className="product-card--description">{item.description}</p>

        {item.inStock && (
          <input
            type="button"
            className="product-card--add-cart"
            value={isInBasket ? 'Added to cart' : 'Add to the basket'}
            onClick={() => addToBasket(item.id)}
            disabled={isInBasket}
          />
        )}
      </div>
    </article>
  )
}

export default ProductCard