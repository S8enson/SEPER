import React from "react";

const ColumnCheckbox = ({ allColumns }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: "5px",
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
  );
};

export default ColumnCheckbox;
