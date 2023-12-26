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

const accountTypes = [
  {
    value: "Warehouse Manager",
    label: "Warehouse Manager",
  },
  {
    value: "Office Manager",
    label: "Office Manager",
  }
];

const officeCode = [
  {
    value: "1",
    label: "Ba Dinh",
  },
  {
    value: "2",
    label: "Hoan Kiem",
  },
  {
    value: "3",
    label: "Hai Ba Trung",
  },
  {
    value: "4",
    label: "Dong Da",
  },
  {
    value: "5",
    label: "Tay Ho",
  },
  {
    value: "6",
    label: "Cau Giay",
  },
  {
    value: "7",
    label: "Long Bien",
  },
  {
    value: "8",
    label: "Hoang Mai",
  },
  {
    value: "9",
    label: "Thanh Xuan",
  },
  {
    value: "10",
    label: "Ha Dong",
  },
  {
    value: "11",
    label: "Son Tay",
  },
  {
    value: "12",
    label: "Ba Vi",
  },
  {
    value: "13",
    label: "Phuc Tho",
  },
  {
    value: "14",
    label: "Dan Phuong",
  },
  {
    value: "15",
    label: "Hoai Duc",
  },
  {
    value: "16",
    label: "Quoc Oai",
  },
  {
    value: "17",
    label: "Thach That",
  },
  {
    value: "18",
    label: "Chuong My",
  },
  {
    value: "19",
    label: "Thanh Oai",
  },
  {
    value: "20",
    label: "Thuong Tin",
  },
  {
    value: "21",
    label: "Phu Xuyen",
  },
  {
    value: "22",
    label: "Ung Hoa",
  },
  {
    value: "23",
    label: "My Duc",
  },
  {
    value: "24",
    label: "Me Linh",
  },
  {
    value: "25",
    label: "Soc Son",
  },
  {
    value: "26",
    label: "Dong Anh",
  },
  {
    value: "27",
    label: "Gia Lam",
  },
  {
    value: "28",
    label: "Thanh Tri",
  },
  {
    value: "29",
    label: "Nam Tu Liem",
  },
  {
    value: "30",
    label: "Bac Tu Liem",
  }
];

export default function Users({ users }) {
  // console.log(users);

  const [formData, setFormData] = useState({});
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
      const res = await fetch('/api/gm/delete', {
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
            <TextField
              margin="dense"
              id="type"
              label="Location"
              select
              fullWidth
              variant="standard"
              onChange={(event) => handleChange("officeCode", event.target.value)}
            >
              {officeCode.map((option) => (
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
              { field: "email", headerName: "EMAIL", flex: 2},
              { field: "type", headerName: "TYPE", flex: 2 },
              { field: "fullname", headerName: "NAME", flex: 2 },
              { field: "officeCode", headerName: "OFFICE", flex: 1 },
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
