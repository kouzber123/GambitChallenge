import { Outlet, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./features/components/Header";
import { Container } from "@mui/material";
import { useAppDispatch } from "./store/configureStore";
import { useCallback, useEffect, useState } from "react";
import { FetchCurrentUser } from "./features/account/accountSlice";
import LoadingComponent from "./features/components/LoadingComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./features/LandingPage";
function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  /**
   * useCallback is to prevent a component from re-rendering unless its props have changed.
   */
  const initApp = useCallback(async () => {
    try {
      await dispatch(FetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  return (
    <>
      <ToastContainer
        position={"bottom-right"}
        hideProgressBar={true}
        theme={"colored"}
      />
      <CssBaseline />

      <Header />
      {loading ? (
        <LoadingComponent message="Loading application..." />
      ) : location.pathname === "/" ? (
        <LandingPage />
      ) : (
        <Container sx={{ mt: 4 }}>
          <Outlet />
        </Container>
      )}
    </>
  );
}

export default App;
