import React from "react";

import { Box } from "@mui/material";

export default function Transactions() {
  return (
    <div>
      <h1 className="font-bold text-3xl py-6">Transactions</h1>

			<div className="pb-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded"
          // onClick={handleOpenForm}
        >
          Add Transaction
        </button>
        {/* <Dialog open={open} onClose={handleCloseForm}>
          <DialogTitle>Create an account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create an account, please fill out the form below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => handleChange("username", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={(event) => handleChange("email", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={(event) => handleChange("password", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="fullname"
              label="Full Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => handleChange("fullname", event.target.value)}
            />
            <TextField
              margin="dense"
              id="type"
              label="Account Type"
              select
              fullWidth
              variant="standard"
              onChange={(event) => handleChange("type", event.target.value)}
            >
              {accountTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button onClick={handleSubmitForm}>Create</Button>
          </DialogActions>
        </Dialog> */}
      </div>

      <div className="bg-white border rounded-lg h-[46.05rem]">
        <Box className="h-full">
          {/* <DataGrid
            getRowId={(users) => users._id}
            columns={[
              { field: "id", headerName: "ID", flex: 1 },
              { field: "username", headerName: "USERNAME", flex: 1 },
              { field: "fullname", headerName: "NAME", flex: 2 },
              { field: "email", headerName: "EMAIL", flex: 2},
              { field: "type", headerName: "TYPE", flex: 2 },
            ]}
            rows={users || []}
            initialState={{
              pagination: { paginationModel: { pageSize: 12 } },
            }}
            pageSizeOptions={[12, 25, 50, 100]}
            checkboxSelection
            onRowSelectionModelChange={(e) => handleSelectUser(e)}
          ></DataGrid> */}
        </Box>
      </div>
    </div>
  );
}
