import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, role = "*" }) {
    const { user } = useSelector((state) => state.user);
    const location = useLocation();

    if (!user) {
        return <Navigate to="/Connexion" replace state={{ from: location }} />;
    }

    if (role !== "*" && !user[role]) {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
}
