import CollectionPage from './CollectionPage.jsx'

function Users() {
  return (
    <CollectionPage
      title="Users"
      description="Octofit member profiles."
      endpoint="/api/users/"
      emptyMessage="No users have joined yet."
      renderItem={(user, _index, display) => (
        <article className="card h-100 shadow-sm">
          <div className="card-body">
            <h2 className="h5 card-title">{display(user.name)}</h2>
            <p className="card-text mb-1"><strong>Email:</strong> {display(user.email)}</p>
            <p className="card-text mb-0"><strong>Team:</strong> {display(user.team)}</p>
          </div>
        </article>
      )}
    />
  )
}

export default Users
