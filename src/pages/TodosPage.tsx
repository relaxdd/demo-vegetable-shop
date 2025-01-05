import { Helmet } from 'react-helmet'
import { Link } from 'react-router'
import { SSRPage } from '../@types/server.ts'
import { ITodo, todoSchema } from '../schemes/todo.schema.ts'
import PageHeader from '../templates/PageHeader.tsx'

type TodosPageData = { todos: ITodo[] }

const TodosPage: SSRPage<TodosPageData> = ({ pageData }) => {
  return (
    <>
      <Helmet>
        <title>VegetableShop | Test ssr todos</title>
      </Helmet>

      <PageHeader title="Todos">
        <span className="page-subtitle">List of todos</span>
      </PageHeader>

      <div>
        <ul style={{ paddingLeft: '20px' }}>
          {pageData?.todos?.map?.(({ title, id }) => (
            <li key={id}><Link to={`/todos/${id}`}>{title}</Link></li>
          ))}
        </ul>
      </div>
    </>
  )
}

TodosPage.loadData = async () => {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${15}`)
  const data = await resp.json()

  return {
    todos: todoSchema.array().parse(data),
  }
}

export type { TodosPageData }
export default TodosPage