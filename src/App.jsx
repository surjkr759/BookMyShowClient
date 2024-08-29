import { Routes, Route, useParams } from 'react-router-dom'
import SignInScreen from './screens/signin'
import SignUpScreen from './screens/signup'
import AdminPage from './screens/admin'
import HomePage from './screens/common/HomePage'
import MovieById from './screens/common/MovieById'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<SignUpScreen />} />
      <Route path='/signin' element={<SignUpScreen />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/movie/:id' element={<MovieById />} />
      <Route path='/movie/:id/schedule' element={<MovieById />} />
    </Routes>
  )
}

export default App
