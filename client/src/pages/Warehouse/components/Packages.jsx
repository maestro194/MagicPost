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

import { useDispatch } from "react-redux";  
import { useSelector } from "react-redux";

import {
  fetchPackagesStart, fetchPackagesSuccess, fetchPackagesFailure,
  sendPackageStart, sendPackageSuccess, sendPackageFailure,
  transferPackageStart, transferPackageSuccess, transferPackageFailure,
} from "../../../redux/slice/weSlice";

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

const warehouseCode = [
  {
    value: "31",
    label: "Ba Dinh",
  },
  {
    value: "32",
    label: "Hoan Kiem",
  },
  {
    value: "33",
    label: "Hai Ba Trung",
  },
  {
    value: "34",
    label: "Dong Da",
  },
  {
    value: "35",
    label: "Tay Ho",
  },
  {
    value: "36",
    label: "Cau Giay",
  },
  {
    value: "37",
    label: "Long Bien",
  },
  {
    value: "38",
    label: "Hoang Mai",
  },
  {
    value: "39",
    label: "Thanh Xuan",
  },
  {
    value: "40",
    label: "Ha Dong",
  },
  {
    value: "41",
    label: "Son Tay",
  },
  {
    value: "42",
    label: "Ba Vi",
  },
  {
    value: "43",
    label: "Phuc Tho",
  },
  {
    value: "44",
    label: "Dan Phuong",
  },
  {
    value: "45",
    label: "Hoai Duc",
  },
  {
    value: "46",
    label: "Quoc Oai",
  },
  {
    value: "47",
    label: "Thach That",
  },
  {
    value: "48",
    label: "Chuong My",
  },
  {
    value: "49",
    label: "Thanh Oai",
  },
  {
    value: "50",
    label: "Thuong Tin",
  },
  {
    value: "51",
    label: "Phu Xuyen",
  },
  {
    value: "52",
    label: "Ung Hoa",
  },
  {
    value: "53",
    label: "My Duc",
  },
  {
    value: "54",
    label: "Me Linh",
  },
  {
    value: "55",
    label: "Soc Son",
  },
  {
    value: "56",
    label: "Dong Anh",
  },
  {
    value: "57",
    label: "Gia Lam",
  },
  {
    value: "58",
    label: "Thanh Tri",
  },
  {
    value: "59",
    label: "Nam Tu Liem",
  },
  {
    value: "60",
    label: "Bac Tu Liem",
  }
];


export default function Packages(
  {packages}
) {
  const { currentUser } = useSelector((state) => state.user);
  const [state, setState] = useState("Create Package");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // send package
  const [openSend, setOpenSend] = useState(false);
  const [sendData, setSendData] = useState({});
  // transfer package
  const [openTransfer, setOpenTransfer] = useState(false);
  const [transferData, setTransferData] = useState({
    currentOffice: currentUser.officeCode - 30,
  });

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
    console.log(sendData);
    e.preventDefault();
    try {
      dispatch(sendPackageStart());
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
        dispatch(sendPackageFailure(data.message));
        return;
      }
      setLoading(false);
      setError(null);
      handleCloseSendForm();
      dispatch(sendPackageSuccess(data));
    } catch (error) {
      setError(error.message);
    }
  }

  const handleTransferChange = (name, value) => {
    setTransferData({
      ...transferData,
      [name]: value,
    });
  }

  const handleOpenTransferForm = () => {
    setOpenTransfer(true);
  }

  const handleCloseTransferForm = () => {
    setOpenTransfer(false);
  }

  const handleSubmitTransfer = async (e) => {
    e.preventDefault();
    try {
      dispatch(transferPackageStart());
      const res = await fetch('/api/we/transferpackage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transferData),
      }
      );
      const data = await res.json();
      console.log(data)
      if(data.success === false) {
        dispatch(transferPackageFailure(data.message));
        return;
      }
      setLoading(false);
      setError(null);
      handleCloseTransferForm();
      dispatch(transferPackageSuccess(data));
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
            <TextField
              margin="dense"
              id="currentOffice"
              label="Office"
              select
              fullWidth
              onChange={(event) => handleSendChange("currentOffice", event.target.value)}
            >
              {warehouseCode.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSendForm}>Cancel</Button>
            <Button onClick={handleSubmitSend}>Send</Button>
          </DialogActions>
        </Dialog>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 mb-2 rounded"
          onClick={handleOpenTransferForm}
        >
          Transfer to Office
        </button>
        <Dialog open={openTransfer} onClose={handleCloseTransferForm}>
          <DialogTitle>Transfer Package</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the ID of the package you want to transfer.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="packageId"
              label="ID"
              type="text"
              fullWidth
              onChange={(event) => handleTransferChange("packageId", event.target.value)}
            />
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTransferForm}>Cancel</Button>
            <Button onClick={handleSubmitTransfer}>Transfer</Button>
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
