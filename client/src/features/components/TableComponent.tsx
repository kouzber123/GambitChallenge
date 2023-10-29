import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { gambitData } from "../../interface/gambitData";
import { Typography } from "@mui/material";

interface Props {
  gambitData: gambitData[] | null;
}
export default function TableComponent({ gambitData }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead></TableHead>
        <TableBody>
          {gambitData?.map((item, index) => (
            <React.Fragment key={index}>
              <TableRow sx={{ backgroundColor: "#93c5fd" }}>
                <TableCell>
                  <Typography>Date: {item.timeStamp}</Typography>{" "}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: "#bfdbfe" }}>
                <TableCell>
                  {" "}
                  <strong> Registers</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Values</strong>
                </TableCell>
              </TableRow>
              {item.registers.map(x => (
                <TableRow
                  key={x.register}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: "#eff6ff",
                  }}
                >
                  <TableCell
                    key={x.register}
                    sx={{ backgroundColor: "" }}
                    component="th"
                    scope="row"
                  >
                    {x.register}
                  </TableCell>
                  <TableCell
                    key={x.value}
                    align="left"
                  >
                    {" "}
                    {/* And here */}
                    {x.value}
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
