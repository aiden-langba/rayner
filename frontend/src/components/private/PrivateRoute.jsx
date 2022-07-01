import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/User";
import Layout from "../layout/Layout";

const PrivateRoute = ({ redirectPath = "/login", role }) => {
  const { user } = useAuth();
  // if (!user.isAuthenticated && user.role !== role)
  //   return <Navigate to={redirectPath} replace />;

  return role.includes(user?.role) && user.isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : user?.isAuthenticated ? (
    <Navigate to="404" replace />
  ) : (
    <Navigate to={redirectPath} replace />
  );
};

export default PrivateRoute;

// return children ? (
//   children
// ) : (
//   <Layout>
//     <Outlet />
//   </Layout>
// );
