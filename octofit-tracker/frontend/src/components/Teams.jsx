import CollectionPage from './CollectionPage.jsx'

function Teams() {
  return (
    <CollectionPage
      title="Teams"
      description="Meet the teams working toward their fitness goals."
      endpoint="/api/teams/"
      emptyMessage="No teams have been created yet."
      renderItem={(team, _index, display) => (
        <article className="card h-100 shadow-sm">
          <div className="card-body">
            <h2 className="h5 card-title">{display(team.name)}</h2>
            <p className="card-text">{team.description || 'No team description yet.'}</p>
            <p className="card-text mb-1">
              <strong>Members:</strong> {Array.isArray(team.members) ? team.members.length : 0}
            </p>
            <p className="card-text mb-0"><strong>Total points:</strong> {team.totalPoints ?? 0}</p>
          </div>
        </article>
      )}
    />
  )
}

export default Teams
