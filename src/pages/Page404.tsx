import { Helmet } from 'react-helmet'

const Page404 = () => {
  return (
    <>
      <Helmet>
        <title>VegetableShop | Not found</title>
      </Helmet>

      <main>
        <div className="container">
          <h1 style={{ margin: '40px auto', width: 'fit-content' }}>
            Ошибка 404<br />Такой страницы больше нет на сайте :(
          </h1>
        </div>
      </main>
    </>
  )
}

export default Page404