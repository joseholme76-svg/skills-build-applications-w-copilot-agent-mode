import CollectionPage from './CollectionPage.jsx'

function Workouts() {
  return (
    <CollectionPage
      title="Workouts"
      description="Find a workout that fits your fitness level."
      endpoint="/api/workouts/"
      emptyMessage="No workout suggestions are available yet."
      renderItem={(workout, _index, display) => (
        <article className="card h-100 shadow-sm">
          <div className="card-body">
            <h2 className="h5 card-title">{display(workout.name)}</h2>
            <p className="card-text">{workout.description || 'No description available.'}</p>
            <p className="card-text mb-1">
              <strong>Activity:</strong> {display(workout.activityType)}
            </p>
            <p className="card-text mb-1">
              <strong>Duration:</strong> {workout.durationMinutes ?? '—'} min
            </p>
            <p className="card-text mb-0">
              <strong>Difficulty:</strong> {display(workout.difficulty)}
            </p>
          </div>
        </article>
      )}
    />
  )
}

export default Workouts
