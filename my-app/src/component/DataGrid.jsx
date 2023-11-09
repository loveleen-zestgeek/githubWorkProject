import { Axios } from "axios";
import React, { useState } from "react";
import DataCard from "./DataCard";
import MyPagination from "./MyPagination";

export default function DataGrid({ fetchedData }) {
  return (
    <>
      <MyPagination itemsPerPage={10} fetchedData={fetchedData} />
    </>
  );
}
