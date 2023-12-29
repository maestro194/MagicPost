import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";

import { useDispatch } from "react-redux";
import {
  fetchTransactionsStart, fetchTransactionsSuccess, fetchTransactionsFailure,
} from "../redux/slice/transactionSlice";

export default function Search() {
  const [state, setState] = useState("notSearch");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]); 
  const [transactions, setTransactions] = useState({});
  const handlePackageId = (name, value) => {
    setPackages({ ...packages, [name]: value });
  }
  const dispatch = useDispatch();

  const findPackage = async (e) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      dispatch(fetchTransactionsStart());
      setLoading(true);
      const res = await fetch(`/api/transaction/${packages.packageId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(fetchTransactionsFailure(data.message));
        return;
      }
      
      console.log(data);
      setTransactions(data);
      setState("searched")
      setLoading(false);
      setError(false);
      dispatch(fetchTransactionsSuccess(data));
    } catch (error) {
      dispatch(fetchTransactionsFailure(error.message));
    }
    
  }

  return (
    <div className="flex flex-col items-center">
      <img 
        src="https://r4.wallpaperflare.com/wallpaper/471/74/414/cooma-australia-highway-landscape-wallpaper-f932f1eeea299883b60886f30313cd9c.jpg" 
        alt="" 
        className="w-full h-screen object-cover absolute -z-50"
      />
      <div className="w-3/5">
        <h1 className="font-bold text-3xl lg:text-6xl p-12">Your package is on the way</h1>
        
        <div className="flex flex-row">
          <TextField
            margin="normal"
            fullWidth
            id="packageId"
            label="Enter your package ID"
            className="bg-slate-200 p-3 rounded-lg flex items-center w-full"
            onChange={(event) => handlePackageId("packageId", event.target.value)}
          >
          </TextField>
          <button 
            className="bg-blue-500 mb-2 mt-4 rounded-lg flex justify-center w-16"
            onClick={findPackage}
          >
            <h1 className="my-4 font-bold">Find</h1>
          </button>
        </div>
        
      </div>
      
      { error ? <div className="text-red-500">Package not found</div> : null }

      { loading ? <div className="text-blue-500">Loading...</div> : 
        <div className="bg-white border rounded-lg h-[40.05rem] w-3/5">
          <Box className="h-full">
            <DataGrid
              getRowId={(transactions) => transactions.transactions.id}
              columns={[
                { field: "id", headerName: "ID", flex: 1 },
                { field: "packageId", headerName: "PACKAGEID", flex: 1 },
                { field: "fromLocation", headerName: "FROM", flex: 2 },
                { field: "toLocation", headerName: "TO", flex: 2},
                { field: "status", headerName: "STATUS", flex: 2 },
              ]}
              rows={transactions.transactions || []}
              initialState={{
                pagination: { paginationModel: { pageSize: 12 } },
              }}
              pageSizeOptions={[12, 25, 50, 100]}
              // checkboxSelection
              onRowSelectionModelChange={(e) => handleSelectUser(e)}
            >

            </DataGrid>
          </Box>
        </div>
      } 


    </div>
  );
}
