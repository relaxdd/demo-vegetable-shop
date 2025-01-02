import { FC, PropsWithChildren } from 'react'

type PageHeaderProps = PropsWithChildren & { title: string }

const PageHeader: FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      {children}
    </div>
  )
}

export default PageHeader