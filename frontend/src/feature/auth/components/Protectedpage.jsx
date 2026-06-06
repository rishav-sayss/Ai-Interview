import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children }) => {
  const user = useSelector(state => state.auth.user)
  console.log(user)
    const loading = useSelector(state => state.auth.loading)

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return children
};

export default ProtectedRoute;
