import { useQuery, useMutation, useQueryClient } from 'react-query'

const API_BASE_URL = 'https://64caac8f700d50e3c7052da2.mockapi.io/api/v1'
interface Data {
  id: number
  title: string
}

interface Params {}

const buildUrlWithParams = (endpoint: string, params: any | Params | null): string => {
  if (!params) return `${API_BASE_URL}/${endpoint}`
  const searchParams = new URLSearchParams(params).toString()
  return `${API_BASE_URL}/${endpoint}?${searchParams}`
}

const fetchData = async (url: string): Promise<Data[]> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

// Create data in the API using POST method
const createData = async (url: string, data: Data): Promise<Data> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const updateData = async (url: string, data: Data): Promise<Data> => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const deleteData = async (url: string): Promise<void> => {
  const response = await fetch(url, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const useFetch = (endpoint: string, params: Params | null = null) => {
  const url = buildUrlWithParams(endpoint, params)
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery<Data[]>(endpoint, () => fetchData(url))

  const createMutation = useMutation((newData: Data) => createData(url, newData), {
    onSettled: () => {
      queryClient.invalidateQueries(endpoint)
    },
  })

  const updateMutation = useMutation((updatedData: Data) => updateData(url, updatedData), {
    onSettled: () => {
      queryClient.invalidateQueries(endpoint)
    },
  })

  const deleteMutation = useMutation(() => deleteData(url), {
    onSettled: () => {
      queryClient.invalidateQueries(endpoint)
    },
  })

  return {
    data,
    isLoading,
    isError,
    createData: createMutation.mutate,
    updateData: updateMutation.mutate,
    deleteData: deleteMutation.mutate,
  }
}

export default useFetch
