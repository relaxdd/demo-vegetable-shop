import { Helmet } from 'react-helmet'
import PageHeader from '../templates/PageHeader.tsx'

const CheckoutPage = () => {
  return (
    <>
      <Helmet>
        <title>VegetableShop | Checkout page</title>
      </Helmet>

      <PageHeader title="Checkout">
        <p className="page-subtitle">Fill in all the details</p>
      </PageHeader>
    </>
  )
}

export default CheckoutPage