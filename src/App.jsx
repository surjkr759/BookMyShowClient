import { Routes, Route, useParams } from 'react-router-dom'
import SignInScreen from './screens/signin'
import { useCurrentUser } from './hooks/query/user'
import AdminPage from './screens/admin'
import HomePage from './screens/common/HomePage'
import MovieById from './screens/common/MovieById'

function App() {

  const {user} = useCurrentUser()
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<h1>Signup</h1>} />
      <Route path='/signin' element={<SignInScreen />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/movie/:id' element={<MovieById />} />
      <Route path='/movie/:id/schedule' element={<MovieById />} />
    </Routes>
  )
}

export default App
