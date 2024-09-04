import { Link, NavLink, Outlet} from 'react-router-dom'
import './MainCSS.css'
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { clearSearchResults } from '../redux/slices/searchYoutubeSlice';
import { setResultText } from '../redux/slices/resultTextSlice';


const MainComponent = () => {
    const dispatch = useDispatch();

    const handleExitAccount =() => {   
            dispatch(setResultText(''))
            dispatch(clearSearchResults())
            localStorage.removeItem('myToken')
            localStorage.removeItem('user')
    }
    return (
        <div>
            <nav className='navbar'>
                <div>
                    <img style={{ marginRight: '50px',width:'30px' }} src='../../../public/s.png' alt='HEllo' />
                    <NavLink  to='/main/search' >Поиск </NavLink>
                    <NavLink to='/main/favorite'>Избранное</NavLink>
                </div>
                <Button >
                    <Link onClick={() => handleExitAccount()} to= '/'>Выйти</Link>
                </Button>
            </nav>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default MainComponent;