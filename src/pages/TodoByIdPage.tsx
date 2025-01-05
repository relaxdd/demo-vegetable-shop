import { Helmet } from 'react-helmet'
import { useParams } from 'react-router'
import { SSRPage } from '../@types/server.ts'
import PageHeader from '../templates/PageHeader.tsx'

interface TodoByIdPageData {

}

const TodoByIdPage: SSRPage<TodoByIdPageData> = ({ pageData: _ }) => {
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <Helmet>
        <title>VegetableShop | Todo with id {id}</title>
      </Helmet>

      <PageHeader title="Todo">
        <span className="page-subtitle">with id {id}</span>
      </PageHeader>

      <div>
      </div>
    </>
  )
}

TodoByIdPage.loadData = async () => {
  return {}
}

export type { TodoByIdPageData }
export default TodoByIdPage