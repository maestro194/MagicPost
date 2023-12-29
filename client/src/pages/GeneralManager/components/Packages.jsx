import React from 'react'
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

import {
  fetchPackagesStart, fetchPackagesSuccess, fetchPackagesFailure,
} from "../../../redux/slice/gmSlice";

import { useDispatch } from "react-redux";  
import { useSelector } from "react-redux";

export default function Packages(
  { packages }
) {
  return (
    <div>
      <h1 className="font-bold text-3xl py-6">Packages</h1>

      <div className="bg-white border rounded-lg h-[46.05rem]">
        <Box className="h-full">
          <DataGrid
            getRowId={(packages) => packages.packageId}
            columns={[
              { field: "packageId", headerName: "ID", flex: 1 },
              { field: "packageType", headerName: "TYPE", flex: 1 },
              { field: "totalValue", headerName: "VALUE", flex: 2 },
              { field: "weight", headerName: "WEIGHT", flex: 2},
              { field: "currentOffice", headerName: "OFFICE", flex: 1 },
              { field: "deliveryStatus", headerName: "STATUS", flex: 2 },
            ]}
            rows={packages || []}
            initialState={{
              pagination: { paginationModel: { pageSize: 12 } },
            }}
            pageSizeOptions={[12, 25, 50, 100]}
            // checkboxSelection
            // onRowSelectionModelChange={(e) => handleSelectUser(e)}
          ></DataGrid>
        </Box>
      </div>
    </div>
  )
}
