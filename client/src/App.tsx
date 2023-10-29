import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./features/components/Header";
import { Container } from "@mui/material";
import { useAppDispatch } from "./store/configureStore";
import { useCallback, useEffect, useState } from "react";
import { FetchCurrentUser } from "./features/account/accountSlice";
import LoadingComponent from "./features/components/LoadingComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
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
    setTimeout(() => {
      initApp().then(() => setLoading(false));
    }, 200);
  }, [initApp]);

  if (loading) return <LoadingComponent message="Loading application..." />;
  return (
    <>
      <ToastContainer
        position={"bottom-right"}
        hideProgressBar={true}
        theme={"colored"}
      />
      <CssBaseline />

      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
