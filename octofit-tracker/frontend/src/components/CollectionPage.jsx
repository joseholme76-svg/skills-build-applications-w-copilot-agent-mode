import { useApiCollection, displayRelation } from '../api.js'

function CollectionPage({ title, description, endpoint, emptyMessage, renderItem }) {
  const { items, loading, error } = useApiCollection(endpoint)

  return (
    <section aria-labelledby="page-title">
      <div className="mb-4">
        <h1 className="h2 mb-1" id="page-title">{title}</h1>
        {description && <p className="text-secondary mb-0">{description}</p>}
      </div>

      {loading && (
        <div className="d-flex align-items-center gap-2 text-secondary" role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          Loading {title.toLowerCase()}…
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="alert alert-info" role="status">{emptyMessage}</div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="row g-3">
          {items.map((item, index) => (
            <div className="col-12 col-md-6 col-xl-4" key={item?._id || item?.id || index}>
              {renderItem(item, index, displayRelation)}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default CollectionPage
