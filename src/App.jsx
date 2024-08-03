import { Routes, Route } from 'react-router-dom'
import SignInScreen from './screens/signin'
import { useCurrentUser } from './hooks/query/user'
import AdminPage from './screens/admin'

function App() {

  const {user} = useCurrentUser()
  
  return (
    <Routes>
      <Route path='/' element={<h1>Hey {user?.firstName}</h1>} />
      <Route path='/signup' element={<h1>Signup</h1>} />
      <Route path='/signin' element={<SignInScreen />} />
      <Route path='/admin' element={<AdminPage />} />
    </Routes>
  )
}

export default App
