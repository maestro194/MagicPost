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
  fetchPackagesStart, fetchPackagesSuccess, fetchPackagesFailure,
  createPackagesStart, createPackagesSuccess, createPackagesFailure,
  sendPackagesStart, sendPackagesSuccess, sendPackagesFailure,
  receivePackageStart, receivePackageSuccess, receivePackageFailure,
} from "../../../redux/slice/oeSlice";

import { useDispatch } from "react-redux";  
import { useSelector } from "react-redux";

export default function Packages(
  {packages},
) {
  const { currentUser } = useSelector((state) => state.user);
  const [state, setState] = useState("Create Package");

  // create package
  const [openCreate, setOpenCreate] = useState(false);
  const [packageData, setPackageData] = useState({
    currentOffice: (currentUser.officeCode),
  });
  // send package
  const [openSend, setOpenSend] = useState(false);
  const [sendData, setSendData] = useState({
    currentOffice: (currentUser.officeCode + 30),
  });
  // receive package
  const [openReceive, setOpenReceive] = useState(false);
  const [receiveData, setReceiveData] = useState({
    currentOffice: (currentUser.officeCode),
  });
  // deliver package
  const [openDeliver, setOpenDeliver] = useState(false);
  const [deliverData, setDeliverData] = useState({});
  const deliveryStatus = [
    {
      value: "Delivered",
      label: "Delivered",
    },
    {
      value: "Out for Delivery",
      label: "Out for Delivery",
    },
    {
      value: "Not Delivered",
      label: "Not Delivered",
    }
  ];

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
    setPackageData({
      currentOffice: currentUser.officeCode.toString(),
    });
    setOpenCreate(false);
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    try {
      dispatch(createPackagesStart());
      // console.log(packageData)
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
      handleCloseCreateForm();
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
    e.preventDefault();
    try {
      dispatch(sendPackagesStart());
      const res = await fetch('/api/oe/sendpackage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      }
      );
      const data = await res.json();
      console.log(data)
      if(data.success === false) {
        dispatch(sendPackagesFailure(data.message));
        return;
      }
      setLoading(false);
      setError(null);
      handleCloseSendForm();
      dispatch(sendPackagesSuccess(data));
    } catch (error) {
      setError(error.message);
    }
  }

  const handleReceiveChange = (name, value) => {
    setReceiveData({
      ...receiveData,
      [name]: value,
    });
  }

  const handleOpenReceiveForm = () => {
    setOpenReceive(true);
  }

  const handleCloseReceiveForm = () => {
    setOpenReceive(false);
  }

  const handleSubmitReceive = async (e) => {
    e.preventDefault();
    try {
      dispatch(receivePackageStart());
      const res = await fetch('/api/oe/receivepackage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receiveData),
      }
      );
      const data = await res.json();
      console.log(data)
      if(data.success === false) {
        dispatch(receivePackageFailure(data.message));
        return;
      }
      setLoading(false);
      setError(null);
      handleCloseReceiveForm();
      dispatch(receivePackageSuccess(data));
    } catch (error) {
      setError(error.message);
    }
  }

  const handleDeliverChange = (name, value) => {
    setDeliverData({
      ...deliverData,
      [name]: value,
    });
  }

  const handleOpenDeliverForm = () => {
    setOpenDeliver(true);
  }

  const handleCloseDeliverForm = () => {
    setOpenDeliver(false);
  }

  const handleSubmitDeliver = async (e) => {
    e.preventDefault();
    try {
      dispatch(receivePackageStart());
      const res = await fetch('/api/oe/deliverpackage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliverData),
      }
      );
      const data = await res.json();
      console.log(data)
      if(data.success === false) {
        dispatch(receivePackageFailure(data.message));
        return;
      }
      setLoading(false);
      setError(null);
      handleCloseDeliverForm();
      dispatch(receivePackageSuccess(data));
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h1 className="font-bold text-3xl py-6">Packages</h1>

      <div className="pb-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 mb-2 rounded"
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
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 mb-2 rounded"
          onClick={handleOpenSendForm}
        >
          Send to Warehouse
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
              onChange={(event) => handleSendChange("packageId", event.target.value)}
            />
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSendForm}>Cancel</Button>
            <Button onClick={handleSubmitSend}>Send</Button>
          </DialogActions>
        </Dialog>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 mb-2 rounded"
          onClick={handleOpenReceiveForm}
        >
          Receive from Warehouse
        </button>
        <Dialog open={openReceive} onClose={handleCloseReceiveForm}>
          <DialogTitle>Receive Package</DialogTitle>
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
              onChange={(event) => handleReceiveChange("packageId", event.target.value)}
            />
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReceiveForm}>Cancel</Button>
            <Button onClick={handleSubmitReceive}>Receive</Button>
          </DialogActions>
        </Dialog>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 mb-2 rounded"
          onClick={handleOpenDeliverForm}
        >
          Deliver Package
        </button>
        <Dialog open={openDeliver} onClose={handleCloseDeliverForm}>
          <DialogTitle>Deliver Package</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the ID of the package you want to deliver.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="packageId"
              label="ID"
              type="text"
              fullWidth
              onChange={(event) => handleDeliverChange("packageId", event.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="deliveryStatus"
              label="Status"
              select
              fullWidth
              onChange={(event) => handleDeliverChange("deliveryStatus", event.target.value)}
            >
              {deliveryStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeliverForm}>Cancel</Button>
            <Button onClick={handleSubmitDeliver}>Send</Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* <div className='flex flex-row'>
        <h1 className='mr-2 text-lg'>
          Filter
        </h1>
        <TextField
          autoFocus
          id="packageId"
          label="ID"
          type="text"
          onChange={(event) => handleFilterChange("packageId", event.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded"
          // onClick={handleOpenCreateForm}
        >
          Create Package
        </button>
      </div> */}

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
              { field: "currentOffice", headerName: "OFFICE", flex: 1}
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
