import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/configureStore";

import TableComponent from "./components/TableComponent";
import { fetchGambitDataAsync, gambitSelectors } from "./gambitSlice";
import LoadingComponent from "./components/LoadingComponent";

/**
 * fetch data via slice, display loading if data is being fetched
 * @returns Table with data
 */
export default function DataPage() {

  const gambitData = useAppSelector(gambitSelectors.selectAll);
  const { GambitLoaded, status } = useAppSelector(state => state.gambitData);
  const dispatch = useAppDispatch();
  useEffect(() => {

    if (!GambitLoaded) dispatch(fetchGambitDataAsync());
  }, [dispatch, GambitLoaded]);

  if (status.includes("pending")) return <LoadingComponent message="Loading gambitdata..." />;
  return (
    <>
      <TableComponent gambitData={gambitData} />
    </>
  );
}
