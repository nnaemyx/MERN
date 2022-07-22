import {useState, useEffect} from 'react'
import { FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import {login, reset} from '../features/auth/authSlice'


function Login() {
    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: '',
        password2:'',
    })

    const{email,password} = formData


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => 
    state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setformData((prevState) =>({
            ...prevState,
          
            [e.target.name]: e.target.value,
        }))
    }


    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner/>
    }


  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt/> Login
            </h1>
            <p>Login to an account</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className='form-control' id='email' name='email' 
                        value={email} placeholder='Enter your email' onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <input type="password" className='form-control' id='password' name='password' 
                        value={password} placeholder='Enter your password' onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <button type='Submit' className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login