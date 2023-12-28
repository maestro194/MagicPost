import React, { useState } from 'react'
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
  createPackagesStart, createPackagesSuccess, createPackagesFailure,
} from "../../../redux/slice/oeSlice";

import { useDispatch } from "react-redux";  

export default function Packages(
  {packages}
) {
  const [state, setState] = useState("Create Package");
  const [sendData, setSendData] = useState({});
  const [packageData, setPackageData] = useState({});
  const [openCreate, setOpenCreate] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCreateChange = (name, value) => {
    setPackageData({
      ...packageData,
      [name]: value,
    });
  }

  const handleOpenCreateForm = () => {
    setOpenCreate(true);
  }

  const handleCloseCreateForm = () => {
    setPackageData({});
    setOpenCreate(false);
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    try {
      dispatch(createPackagesStart());
			const res = await fetch('/api/oe/createpackage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(packageData),
			}
			);
			const data = await res.json();
			console.log(data)
			if(data.success === false) {
				dispatch(createPackagesFailure(data.message));
				return;
			}
			setLoading(false);
			setError(null);
      handleCloseForm();
      dispatch(createPackagesSuccess(data));
    } catch (error) {
      setError(error.message);
    }
  }

  const handleSendChange = (name, value) => {
    setSendData({
      ...sendData,
      [name]: value,
    });
  }

  const handleOpenSendForm = () => {
    setOpenSend(true);
  }

  const handleCloseSendForm = () => {
    setOpenSend(false);
  }

  const handleSubmitSend = async (e) => {

  }

  return (
    <div>
      <h1 className="font-bold text-3xl py-6">Packages</h1>

      <div className="pb-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded"
          onClick={handleOpenCreateForm}
        >
          Create Package
        </button>
        <Dialog open={openCreate} onClose={handleCloseCreateForm}>
          <DialogTitle>Create a new package</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a package, please fill out the form below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="sender"
              label="Sender"
              type="text"
              fullWidth
              onChange={(event) => handleCreateChange("sender", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="fromLocation"
              label="From"
              type="text"
              fullWidth
              onChange={(event) => handleCreateChange("fromLocation", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="receiver"
              label="Receiver"
              type="text"
              fullWidth
              onChange={(event) => handleCreateChange("receiver", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="toLocation"
              label="To"
              type="text"
              fullWidth
              onChange={(event) => handleCreateChange("toLocation", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="packageType"
              label="Type of Package"
              type="text"
              fullWidth
              onChange={(event) => handleCreateChange("packageType", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="totalValue"
              label="Total Value"
              type="text"
              fullWidth
              onChange={(event) => handleCreateChange("totalValue", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="weight"
              label="Weight"
              type="text"
              fullWidth
              onChange={(event) => handleCreateChange("weight", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="shippingCost"
              label="Shipping Cost"
              type="text"
              fullWidth
              onChange={(event) => handleCreateChange("shippingCost", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="cashOnDelivery"
              label="COD"
              type="text"
              fullWidth
              onChange={(event) => handleCreateChange("cashOnDelivery", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="notes"
              label="Notes"
              type="text"
              fullWidth
              onChange={(event) => handleCreateChange("notes", event.target.value)}
            />
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreateForm}>Cancel</Button>
            <Button onClick={handleSubmitCreate}>Create</Button>
          </DialogActions>
        </Dialog>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleOpenSendForm}
        >
          Send Package
        </button>
        <Dialog open={openSend} onClose={handleCloseSendForm}>
          <DialogTitle>Send Package</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the ID of the package you want to send.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="packageId"
              label="ID"
              type="text"
              fullWidth
              onChange={(event) => handleSendChange("sender", event.target.value)}
            />
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSendForm}>Cancel</Button>
            <Button onClick={handleSubmitSend}>Send</Button>
          </DialogActions>
        </Dialog>

      </div>

      <div className="bg-white border rounded-lg h-[46.05rem]">
        <Box className="h-full">
          <DataGrid
            getRowId={(packages) => packages.packageId}
            columns={[
              { field: "packageId", headerName: "ID", flex: 1 },
              { field: "packageType", headerName: "TYPE", flex: 1 },
              { field: "totalValue", headerName: "VALUE", flex: 2 },
              { field: "weight", headerName: "WEIGHT", flex: 2},
              { field: "deliveryStatus", headerName: "STATUS", flex: 2 },
            ]}
            rows={packages || []}
            initialState={{
              pagination: { paginationModel: { pageSize: 12 } },
            }}
            pageSizeOptions={[12, 25, 50, 100]}
            checkboxSelection
            // onRowSelectionModelChange={(e) => handleSelectUser(e)}
          ></DataGrid>
        </Box>
      </div>
    </div>
  )
}
