import { TableProps } from 'antd'
import Read from './components/Read'
import { ColumnsType, RefTable } from 'antd/es/table/interface'
import { FC } from 'react'
import Create from './components/Create'
import { FormInstance, useForm } from 'antd/es/form/Form'
import useFetch from './hooks/useFetch'

export interface ICrudCreate {
  name?: string
  onFinish?: (values: any) => void
  children: React.ReactNode
}

export interface ICrudRead {
  columns?: any
  dataSource?: any
  pagination?: any
}

export interface ICrud {
  read?: ICrudRead
  create?: ICrudCreate
  edit?: any
  destroy?: any
}

const Crud: FC<ICrud> = (params) => {
  const { read, create, edit, destroy } = params

  const { isLoading, isError } = useFetch('/documentation')

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error while fetching data</div>
  }

  return (
    <>
      {read && <Read {...read} {...destroy} />}
      {create && <Create {...create} />}
      {edit && <Create {...edit} />}
    </>
  )
}

export default Crud
