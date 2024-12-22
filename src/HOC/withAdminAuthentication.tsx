import { userModel } from "../Interfaces";
import jwt_decode from "jwt-decode";
import { SD_Roles } from "../Utility/SD";
const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem("token");
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const decode: {
        role: string;
      } = jwt_decode(localToken);

      if (decode.role !== SD_Roles.ADMIN) {
        window.location.replace("/accessDenied");
        return null;
      }
    } else {
      window.location.replace("/login");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
