import { Axios } from "axios";
import React, { useState } from "react";
import DataCard from "./DataCard";

export default function DataGrid({ fetchedData }) {
  return (
    <>
      <div className="py-20 px-20 grid grid-cols-6 gap-6 justify-center items-center  ">
        {fetchedData.map((item) => (
          <DataCard fetchedData={item} key={item.login} />
        ))}
      </div>
    </>
  );
}
