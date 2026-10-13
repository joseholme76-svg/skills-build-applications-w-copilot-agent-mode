import CollectionPage from './CollectionPage.jsx'

function Activities() {
  return (
    <CollectionPage
      title="Activities"
      description="Recent activity logged by Octofit members."
      endpoint="/api/activities/"
      emptyMessage="No activities have been logged yet."
      renderItem={(activity, _index, display) => (
        <article className="card h-100 shadow-sm">
          <div className="card-body">
            <h2 className="h5 card-title">{display(activity.activityType) || 'Activity'}</h2>
            <p className="card-text mb-1"><strong>Member:</strong> {display(activity.user)}</p>
            <p className="card-text mb-1"><strong>Duration:</strong> {activity.durationMinutes ?? '—'} min</p>
            <p className="card-text mb-1"><strong>Distance:</strong> {activity.distanceKm ?? 0} km</p>
            <p className="card-text mb-0"><strong>Points:</strong> {activity.points ?? 0}</p>
            {activity.date && (
              <small className="text-secondary d-block mt-3">
                {new Date(activity.date).toLocaleDateString()}
              </small>
            )}
          </div>
        </article>
      )}
    />
  )
}

export default Activities
