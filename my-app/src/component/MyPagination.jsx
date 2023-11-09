import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import DataCard from "./DataCard";
function Items({ fetchedData }) {
  return (
    <>
      <div className="py-20 px-4 lg:px-12 lg:px-20 grid sm:grid-cols-2 place-item-center space-y-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6 justify-center items-center  ">
        {fetchedData &&
          fetchedData.map((item) => (
            <div>
              <DataCard fetchedData={item} key={item.login} />
            </div>
          ))}
      </div>
    </>
  );
}

export default function MyPagination({ itemsPerPage, fetchedData }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = fetchedData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(fetchedData.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % fetchedData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="">
          <Items fetchedData={currentItems} />
        </div>
        <div className="mb-12">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </div>
      </div>
    </>
  );
}
