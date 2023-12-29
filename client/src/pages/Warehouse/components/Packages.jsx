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

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  sendPackageStart,
  sendPackageSuccess,
  sendPackageFailure,
  transferPackageStart,
  transferPackageSuccess,
  transferPackageFailure,
} from "../../../redux/slice/weSlice";

import {
  createTransactionStart, createTransactionSuccess, createTransactionFailure,
  fetchTransactionsStart, fetchTransactionsSuccess, fetchTransactionsFailure,
} from "../../../redux/slice/transactionSlice";

const warehouseCode = [
  {
    label: "An Giang",
    value: "64",
  },
  {
    label: "Bac Giang",
    value: "65",
  },
  {
    label: "Bac Kan",
    value: "66",
  },
  {
    label: "Bac Lieu",
    value: "67",
  },
  {
    label: "Bac Ninh",
    value: "68",
  },
  {
    label: "Ben Tre",
    value: "69",
  },
  {
    label: "Binh Dinh",
    value: "70",
  },
  {
    label: "Binh Duong",
    value: "71",
  },
  {
    label: "Binh Phuoc",
    value: "72",
  },
  {
    label: "Binh Thuan",
    value: "73",
  },
  {
    label: "Ca Mau",
    value: "74",
  },
  {
    label: "Can Tho",
    value: "75",
  },
  {
    label: "Cao Bang",
    value: "76",
  },
  {
    label: "Da Nang",
    value: "77",
  },
  {
    label: "Dak Lak",
    value: "78",
  },
  {
    label: "Dak Nong",
    value: "79",
  },
  {
    label: "Dien Bien",
    value: "80",
  },
  {
    label: "Dong Nai",
    value: "81",
  },
  {
    label: "Dong Thap",
    value: "82",
  },
  {
    label: "Gia Lai",
    value: "83",
  },
  {
    label: "Ha Giang",
    value: "84",
  },
  {
    label: "Ha Nam",
    value: "85",
  },
  {
    label: "Ha Tinh",
    value: "86",
  },
  {
    label: "Hai Duong",
    value: "87",
  },
  {
    label: "Hai Phong",
    value: "88",
  },
  {
    label: "Hanoi",
    value: "89",
  },
  {
    label: "Hau Giang",
    value: "90",
  },
  {
    label: "Ho Chi Minh",
    value: "91",
  },
  {
    label: "Hoa Binh",
    value: "92",
  },
  {
    label: "Hung Yen",
    value: "93",
  },
  {
    label: "Khanh Hoa",
    value: "94",
  },
  {
    label: "Kien Giang",
    value: "95",
  },
  {
    label: "Kon Tum",
    value: "96",
  },
  {
    label: "Lai Chau",
    value: "97",
  },
  {
    label: "Lam Dong",
    value: "98",
  },
  {
    label: "Lang Son",
    value: "99",
  },
  {
    label: "Lao Cai",
    value: "100",
  },
  {
    label: "Long An",
    value: "101",
  },
  {
    label: "Nam Dinh",
    value: "102",
  },
  {
    label: "Nghe An",
    value: "103",
  },
  {
    label: "Ninh Binh",
    value: "104",
  },
  {
    label: "Ninh Thuan",
    value: "105",
  },
  {
    label: "Phu Tho",
    value: "106",
  },
  {
    label: "Phu Yen",
    value: "107",
  },
  {
    label: "Quang Binh",
    value: "108",
  },
  {
    label: "Quang Nam",
    value: "109",
  },
  {
    label: "Quang Ngai",
    value: "110",
  },
  {
    label: "Quang Ninh",
    value: "111",
  },
  {
    label: "Quang Tri",
    value: "112",
  },
  {
    label: "Soc Trang",
    value: "113",
  },
  {
    label: "Son La",
    value: "114",
  },
  {
    label: "Tay Ninh",
    value: "115",
  },
  {
    label: "Thai Binh",
    value: "116",
  },
  {
    label: "Thai Nguyen",
    value: "117",
  },
  {
    label: "Thanh Hoa",
    value: "118",
  },
  {
    label: "Thua Thien Hue",
    value: "119",
  },
  {
    label: "Tien Giang",
    value: "120",
  },
  {
    label: "Tra Vinh",
    value: "121",
  },
  {
    label: "Tuyen Quang",
    value: "122",
  },
  {
    label: "Vinh Long",
    value: "123",
  },
  {
    label: "Vinh Phuc",
    value: "124",
  },
  {
    label: "Vung Tau",
    value: "125",
  },
  {
    label: "Yen Bai",
    value: "126",
  },
];

export default function Packages({ packages }) {
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
    currentOffice: currentUser.officeCode - 63,
  });
  // create transaction
  const [transactionData, setTransactionData] = useState({});

  const handleTransactionChange = (name, value) => {
    setTransactionData({
      ...transactionData,
      [name]: value,
    });
  }
  
  const handleCreateTransaction = async (e) => {
    console.log(transactionData);

    try {
      dispatch(createTransactionStart());
      const res = await fetch('/api/transaction/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      }
      );
      const data = await res.json();
      console.log(data)
      if(data.success === false) {
        dispatch(createTransactionFailure(data.message));
        return;
      }
      setLoading(false);
      setError(null);
      dispatch(createTransactionSuccess(data));
    } catch (error) {
      setError(error.message);
    }
  }

  const handleSendChange = (name, value) => {
    setSendData({
      ...sendData,
      [name]: value,
    });
    if(name === "currentOffice") {
      handleTransactionChange("toLocation", value);
    } else 
      handleTransactionChange(name, value);
  };

  const handleOpenSendForm = () => {
    setOpenSend(true);
    transactionData.fromLocation = currentUser.officeCode;
  };

  const handleCloseSendForm = () => {
    setOpenSend(false);
  };

  const handleSubmitSend = async (e) => {
    console.log(sendData);
    e.preventDefault();
    try {
      dispatch(sendPackageStart());
      const res = await fetch("/api/oe/sendpackage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(sendPackageFailure(data.message));
        return;
      }
      setLoading(false);
      setError(null);
      handleCreateTransaction();
      handleCloseSendForm();
      dispatch(sendPackageSuccess(data));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleTransferChange = (name, value) => {
    setTransferData({
      ...transferData,
      [name]: value,
    });
    handleTransactionChange(name, value);
  };

  const handleOpenTransferForm = () => {
    setOpenTransfer(true);
    transactionData.fromLocation = currentUser.officeCode;
    transactionData.toLocation = currentUser.officeCode - 63;
  };

  const handleCloseTransferForm = () => {
    setOpenTransfer(false);
  };

  const handleSubmitTransfer = async (e) => {
    e.preventDefault();
    try {
      dispatch(transferPackageStart());
      const res = await fetch("/api/we/transferpackage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transferData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(transferPackageFailure(data.message));
        return;
      }
      setLoading(false);
      setError(null);
      handleCreateTransaction();
      handleCloseTransferForm();
      dispatch(transferPackageSuccess(data));
    } catch (error) {
      setError(error.message);
    }
  };

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
              onChange={(event) =>
                handleSendChange("packageId", event.target.value)
              }
            />
            <TextField
              margin="dense"
              id="currentOffice"
              label="Office"
              select
              fullWidth
              onChange={(event) =>
                handleSendChange("currentOffice", event.target.value)
              }
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
              onChange={(event) =>
                handleTransferChange("packageId", event.target.value)
              }
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
              { field: "weight", headerName: "WEIGHT", flex: 2 },
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
  );
}
