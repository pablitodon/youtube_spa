import { Navigate, Outlet } from "react-router";


const PrivateRoute = () => {
    const isAuth = localStorage.getItem('myToken');
    return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;