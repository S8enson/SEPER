import React, { Component } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { useTable, useSortBy, usePagination } from "react-table";

import articles from "../dummydata/articles.js";
import tablecolumns from "./TableColumns.js";

import ColumnCheckbox from "./ColumnCheckbox.js";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("creates correct amount of checkboxes for supplied table data", async () => {
  const TestTable = async () => {
    const { allColumns } = useTable(
      {
        tablecolumns,
        articles,
        initialState: { pageIndex: 0 },
      },

      useSortBy,
      usePagination
    );

    await act(async () => {
      render(<ColumnCheckbox allColumns={allColumns} />, container);
    });

    let noOfCheckbox = 0;
    Component.find(ColumnCheckbox).forEach((checkbox) => {
      noOfCheckbox++;
    });

    expect(noOfCheckbox).toEqual(8);
  };
});
