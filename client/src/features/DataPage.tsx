import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/configureStore";

import TableComponent from "./components/TableComponent";
import { fetchGambitDataAsync, gambitSelectors } from "./gambitSlice";
import LoadingComponent from "./components/LoadingComponent";


export default function DataPage() {

  const gambitData = useAppSelector(gambitSelectors.selectAll);
  const { GambitLoaded, status } = useAppSelector(state => state.gambitData);
  const dispatch = useAppDispatch();
  useEffect(() => {

    if (!GambitLoaded) dispatch(fetchGambitDataAsync());
  }, [dispatch, GambitLoaded]);
  //   const register = data.map(item => item.registers);
  //WE first lioop over our first array layer amd use that item to get needed data then map over again to get our 2nd array
  if (status.includes("pending")) return <LoadingComponent message="Loading gambitdata..." />;
  return (
    <>
      <TableComponent gambitData={gambitData} />
    </>
  );
}
