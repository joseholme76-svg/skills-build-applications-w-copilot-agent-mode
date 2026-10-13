import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <header className="navbar navbar-expand bg-dark navbar-dark shadow-sm">
        <div className="container flex-wrap gap-2">
          <NavLink className="navbar-brand fw-semibold" to="/activities">
            Octofit Tracker
          </NavLink>
          <nav className="navbar-nav flex-row flex-wrap gap-1" aria-label="Main navigation">
            {navigation.map(({ label, to }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link rounded px-3${isActive ? ' active bg-secondary' : ''}`
                }
                key={to}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate replace to="/activities" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/activities" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
