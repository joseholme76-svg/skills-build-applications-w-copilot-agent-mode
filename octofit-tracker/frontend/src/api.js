import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function useApiCollection(endpoint) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${apiBaseUrl}${endpoint}`, {
          signal: controller.signal,
        })
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload?.error || `Request failed with status ${response.status}`)
        }

        const collection = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : Array.isArray(payload?.data)
              ? payload.data
              : null

        if (!collection) {
          throw new Error('The API response did not contain a list of records.')
        }

        setItems(collection)
      } catch (requestError) {
        if (!(requestError instanceof Error && requestError.name === 'AbortError')) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'The API request could not be completed.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [endpoint])

  return { items, loading, error }
}

export function displayRelation(value) {
  if (value == null || value === '') return '—'
  if (typeof value === 'object') {
    return value.name || value.email || value._id || value.id || '—'
  }
  return value
}
