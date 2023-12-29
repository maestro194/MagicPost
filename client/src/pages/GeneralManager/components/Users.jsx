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
    label: "An Giang",
    value: "1",
    },
    {
    label: "Bac Giang",
    value: "2",
    },
    {
    label: "Bac Kan",
    value: "3",
    },
    {
    label: "Bac Lieu",
    value: "4",
    },
    {
    label: "Bac Ninh",
    value: "5",
    },
    {
    label: "Ben Tre",
    value: "6",
    },
    {
    label: "Binh Dinh",
    value: "7",
    },
    {
    label: "Binh Duong",
    value: "8",
    },
    {
    label: "Binh Phuoc",
    value: "9",
    },
    {
    label: "Binh Thuan",
    value: "10",
    },
    {
    label: "Ca Mau",
    value: "11",
    },
    {
    label: "Can Tho",
    value: "12",
    },
    {
    label: "Cao Bang",
    value: "13",
    },
    {
    label: "Da Nang",
    value: "14",
    },
    {
    label: "Dak Lak",
    value: "15",
    },
    {
    label: "Dak Nong",
    value: "16",
    },
    {
    label: "Dien Bien",
    value: "17",
    },
    {
    label: "Dong Nai",
    value: "18",
    },
    {
    label: "Dong Thap",
    value: "19",
    },
    {
    label: "Gia Lai",
    value: "20",
    },
    {
    label: "Ha Giang",
    value: "21",
    },
    {
    label: "Ha Nam",
    value: "22",
    },
    {
    label: "Ha Tinh",
    value: "23",
    },
    {
    label: "Hai Duong",
    value: "24",
    },
    {
    label: "Hai Phong",
    value: "25",
    },
    {
    label: "Hanoi",
    value: "26",
    },
    {
    label: "Hau Giang",
    value: "27",
    },
    {
    label: "Ho Chi Minh",
    value: "28",
    },
    {
    label: "Hoa Binh",
    value: "29",
    },
    {
    label: "Hung Yen",
    value: "30",
    },
    {
    label: "Khanh Hoa",
    value: "31",
    },
    {
    label: "Kien Giang",
    value: "32",
    },
    {
    label: "Kon Tum",
    value: "33",
    },
    {
    label: "Lai Chau",
    value: "34",
    },
    {
    label: "Lam Dong",
    value: "35",
    },
    {
    label: "Lang Son",
    value: "36",
    },
    {
    label: "Lao Cai",
    value: "37",
    },
    {
    label: "Long An",
    value: "38",
    },
    {
    label: "Nam Dinh",
    value: "39",
    },
    {
    label: "Nghe An",
    value: "40",
    },
    {
    label: "Ninh Binh",
    value: "41",
    },
    {
    label: "Ninh Thuan",
    value: "42",
    },
    {
    label: "Phu Tho",
    value: "43",
    },
    {
    label: "Phu Yen",
    value: "44",
    },
    {
    label: "Quang Binh",
    value: "45",
    },
    {
    label: "Quang Nam",
    value: "46",
    },
    {
    label: "Quang Ngai",
    value: "47",
    },
    {
    label: "Quang Ninh",
    value: "48",
    },
    {
    label: "Quang Tri",
    value: "49",
    },
    {
    label: "Soc Trang",
    value: "50",
    },
    {
    label: "Son La",
    value: "51",
    },
    {
    label: "Tay Ninh",
    value: "52",
    },
    {
    label: "Thai Binh",
    value: "53",
    },
    {
    label: "Thai Nguyen",
    value: "54",
    },
    {
    label: "Thanh Hoa",
    value: "55",
    },
    {
    label: "Thua Thien Hue",
    value: "56",
    },
    {
    label: "Tien Giang",
    value: "57",
    },
    {
    label: "Tra Vinh",
    value: "58",
    },
    {
    label: "Tuyen Quang",
    value: "59",
    },
    {
    label: "Vinh Long",
    value: "60",
    },
    {
    label: "Vinh Phuc",
    value: "61",
    },
    {
    label: "Vung Tau",
    value: "62",
    },
    {
    label: "Yen Bai",
    value: "63",
    },
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
    if(formData.type === "Warehouse Manager") {
      formData.officeCode = parseInt(formData.officeCode) + 63;
    }
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
