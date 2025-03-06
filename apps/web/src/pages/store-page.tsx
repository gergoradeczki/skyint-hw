import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { honeysForSale } from "../utils/util";
import { useAppDispatch } from "../hooks/hooks";
import { add } from "../stores/slices/cartSlice";

export function StorePage() {
  const dispatch = useAppDispatch()

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Méz neve</TableCell>
            <TableCell align="right">Művelet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {honeysForSale.map((honey, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography>{honey}</Typography>
              </TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => {
                    dispatch(add(honey))
                  }}
                >
                  <Typography>Kosárhoz adás</Typography>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}