import React, { useState } from "react";

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
  fetchUsersStart,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../../../redux/slice/gmSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const accountTypes = [
  {
    value: "Warehouse Employee",
    label: "Warehouse Employee",
  },
];

export default function Users({ users }) {
  const { currentUser } = useSelector((state) => state.user);
  console.log(users);

  const [formData, setFormData] = useState({officeCode: currentUser.officeCode});
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleOpenForm = () => {
    setOpen(true);
  }

  const handleCloseForm = () => {
    setFormData({});
    setOpen(false);
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
		try {
			setLoading(true);
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			}
			);
			const data = await res.json();
			console.log(data)
			if(data.success === false) {
				setError(data.message);
				setLoading(false);
				return;
			}
			setLoading(false);
			setError(null);
            handleCloseForm();
            dispatch(fetchUsersStart());
			// console.log(data)
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
  };

  const handleSelectUser = (e) => {
    setSelected(e);
  }

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteUserStart());
      console.log(selected);
      const res = await fetch('/api/wm/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selected),
      }
      );
      const data = await res.json();
      console.log(data)
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      handleCloseForm();
      dispatch(fetchUsersStart());
      // console.log(data)
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  return (
    <div>
      <h1 className="font-bold text-3xl py-6">Users</h1>

      <div className="pb-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-2 rounded"
          onClick={handleOpenForm}
        >
          Add User
        </button>
        <Dialog open={open} onClose={handleCloseForm}>
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
        </Dialog>

        <button 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteUser}
        >
          Delete User
        </button>
      </div>

      <div className="bg-white border rounded-lg h-[46.05rem]">
        <Box className="h-full">
          <DataGrid
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
          ></DataGrid>
        </Box>
      </div>
    </div>
  );
}
