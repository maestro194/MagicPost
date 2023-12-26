import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
} from "@mui/material";

export default function Offices(
    { offices }
) {
  return (
    <div>
      <h1 className="font-bold text-3xl py-6">Offices</h1>

      <div className="bg-white border rounded-lg h-[46.05rem]">
        <Box className="h-full">
          <DataGrid
            getRowId={(offices) => offices.officeCode}
            columns={[
              { field: "officeCode", headerName: "CODE", flex: 1 },
              { field: "officeName", headerName: "NAME", flex: 1 },
              { field: "location", headerName: "LOCATION", flex: 2 },
              { field: "phone", headerName: "PHONE NUMBER", flex: 2 },
              { field: "type", headerName: "TYPE", flex: 1 },
            ]}
            rows={offices || []}
            initialState={{
              pagination: { paginationModel: { pageSize: 12 } },
            }}
            pageSizeOptions={[12, 25, 50, 100]}
            checkboxSelection
            onRowSelectionModelChange={(e) => handleSelectUser(e)}
          ></DataGrid>
        </Box>
      </div>
    </div>
  )
}
