import React from "react";
import InputData from "./DataForm/InputData";
import { columns } from "@/payments/columns";
import { DataTable } from "@/payments/data-table";
const MainContent = () => {
  const tempData = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "a1b2c3d4",
      amount: 50,
      status: "success",
      email: "test@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "a1b2c3d4",
      amount: 50,
      status: "success",
      email: "test@example.com",
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={tempData} />
      <InputData />
    </>
  );
};
export default MainContent;
