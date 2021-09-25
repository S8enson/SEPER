import React, { useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    allColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },

    useSortBy,
    usePagination
  );

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  // Render Data Table UI and checkboxes
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}>
        {allColumns.map((column) => {
          //Loops through each column to create corresponding checkbox
          let checkboxLabel;
          switch (
            column.id //Switch to create more appropriate labels for each checkbox
          ) {
            case "title":
              checkboxLabel = "Title";
              break;
            case "authors":
              checkboxLabel = "Authors";
              break;
            case "source":
              checkboxLabel = "Source";
              break;
            case "pubyear":
              checkboxLabel = "Pub. Year";
              break;
            case "doi":
              checkboxLabel = "DOI";
              break;
            case "claim":
              checkboxLabel = "Claimed Benefit";
              break;
            case "evidence":
              checkboxLabel = "Level of Evidence";
              break;
            case "practice":
              checkboxLabel = "Practice";
              break;
            default:
              checkboxLabel = "Something is wrong???";
              console.error("Something wrong with your switch Liam");
          }
          return (
            <label
              key={column.id}
              style={{ fontFamily: "sans-serif", marginRight: "20px" }}>
              <input type="checkbox" {...column.getToggleHiddenProps()} />
              {checkboxLabel}
            </label>
          );
        })}
      </div>
      <div
        style={{
          display: "inline-flex",
          flexDirection: "row",
        }}>
        <DatePicker
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
        />
        <label style={{ marginLeft: "5px", marginRight: "5px" }}> to </label>
        <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[3, 7, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;
