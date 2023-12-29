import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
export default function SearchQuery(
    { transactions }
) {
  return (
    <div>
      <div className="bg-white border rounded-lg h-[40rem]">
        <Box className="h-full">
          <DataGrid
            getRowId={(transactions) => transactions.id}
            columns={[
              { field: "id", headerName: "ID", flex: 1 },
              { field: "packageId", headerName: "PACKAGEID", flex: 1 },
              { field: "fromLocation", headerName: "FROM", flex: 2 },
              { field: "toLocation", headerName: "TO", flex: 2},
              { field: "status", headerName: "STATUS", flex: 2 },
            ]}
            rows={transactions || []}
            initialState={{
              pagination: { paginationModel: { pageSize: 12 } },
            }}
            pageSizeOptions={[12, 25, 50, 100]}
            // checkboxSelection
            onRowSelectionModelChange={(e) => handleSelectUser(e)}
          >

          </DataGrid>
        </Box>
      </div>
    </div>
  )
}
