import { useSelector } from 'react-redux'
import { RootState } from '../features/store'

const NavBar = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <nav className='flex justify-between items-center
                    h-16 p-4 
                    bg-gray-800 text-white'>

      <div>Yap Chat</div>

      <div>{user ? user.email : 'Not logged in'}</div>
    </nav>
  )
}

export default NavBar
