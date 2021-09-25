import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
//import moment from "moment";

const DateFilter = ({ articles, setArticles }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    const filterDate = () => {
      const data = [];
      if (fromDate != null && toDate != null) {
        articles.forEach((element) => {
          if (element.pubyear >= fromDate && element.pubyear <= toDate) {
            data.push(element);
          }
        });
        setArticles(data);
      }
    };
    filterDate();
  }, [fromDate, toDate, articles, setArticles]);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "row",
        marginBottom: "5px",
      }}>
      <Datetime
        dateFormat="YYYY"
        timeFormat={false}
        onChange={(date) => setFromDate(date.year())}
      />
      <label style={{ marginLeft: "5px", marginRight: "5px" }}> to </label>
      <Datetime
        dateFormat="YYYY"
        timeFormat={false}
        onChange={(date) => setToDate(date.year())}
      />
    </div>
  );
};

export default DateFilter;
