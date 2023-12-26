import React, { useState } from 'react'

import { DataGrid } from '@mui/x-data-grid';
import { Box } from "@mui/material";

export default function Users({
    users,
}) {
  console.log(users)

  return (
    <div>
      <Box
        height="75vh"
      >
        <DataGrid
          getRowId={(users) => users._id}
          columns={[
            { field: 'id', headerName: 'ID', flex: 1},
            { field: 'username', headerName: 'Username', flex: 1 },
            { field: 'email', headerName: 'Email', flex: 2 },
            { field: 'type', headerName: 'Type', flex: 1 },
            { field: 'fullname', headerName: 'Name', flex: 2 },
          ]}
          rows={users || []}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        >
        </DataGrid>
      </Box>
    </div>
  )
}
