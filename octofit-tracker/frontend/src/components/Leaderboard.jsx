import CollectionPage from './CollectionPage.jsx'

function Leaderboard() {
  return (
    <CollectionPage
      title="Leaderboard"
      description="See how members and teams rank by points."
      endpoint="/api/leaderboard/"
      emptyMessage="The leaderboard is empty."
      renderItem={(entry, _index, display) => (
        <article className="card h-100 shadow-sm">
          <div className="card-body d-flex align-items-start gap-3">
            <span className="badge text-bg-primary fs-5">#{entry.rank ?? '—'}</span>
            <div>
              <h2 className="h5 card-title">{display(entry.user)}</h2>
              <p className="card-text mb-1"><strong>Team:</strong> {display(entry.team)}</p>
              <p className="card-text mb-1"><strong>Points:</strong> {entry.points ?? 0}</p>
              <p className="card-text mb-0 text-capitalize">
                <strong>Period:</strong> {display(entry.period)}
              </p>
            </div>
          </div>
        </article>
      )}
    />
  )
}

export default Leaderboard
