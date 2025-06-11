import { useEffect } from "react";
import useFetchUser from "../hooks/useFetchUser";
import useUserStore from "../stores/useUserStore";
import { useLocation, useNavigate } from "react-router-dom";

function useAuth() {
  const { data: response, isError } = useFetchUser();
  const { setUser, isLoggedIn } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (response && !isLoggedIn) {
      setUser({isLoggedIn: true, ...response.data});
    }
    if (isError && location.pathname !== '/') {
      navigate('/');
    }
  }, [response, isError]);
}

export default useAuth;
