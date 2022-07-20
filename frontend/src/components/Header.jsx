import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
        <Link to="/">
            <div className="logo">GoalSetter</div>
        </Link>
        <ul>
            <li>
                <Link to='/login'>
                    <FaSignInAlt/> Log in
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser/> Register
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header