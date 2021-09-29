import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";

import "react-datetime/css/react-datetime.css";

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
      <label style={{ marginLeft: "5px", marginRight: "5px" }}> Pub. Year From: </label>
      <Datetime
        dateFormat="YYYY"
        timeFormat={false}
        onChange={(date) => setFromDate(date.year())}
      />
      <label style={{ marginLeft: "5px", marginRight: "5px" }}> To: </label>
      <Datetime
        dateFormat="YYYY"
        timeFormat={false}
        onChange={(date) => setToDate(date.year())}
      />
    </div>
  );
};

export default DateFilter;
