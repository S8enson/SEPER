import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import DateRanges from "../dummydata/DateRanges";
import moment from "moment";

const optionItems = DateRanges.map((DateRange) => (
  <option key={DateRange.range}>{DateRange.range}</option>
));

function valid(current) {
  var cur = moment().year(currentYear);
  var old = moment().year(1900);
  return current.isBefore(cur) && current.isAfter(old);
}

const currentYear = new Date().getFullYear()
const DateFilter = ({ articles, setArticles }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [query, setQuery] = useState('All');

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

  useEffect(() => {
    const getDate = () => {
      setToDate(currentYear)
      if(query == 'Current Year'){
        setFromDate(currentYear)
      } else if(query == 'Last 5 Years'){
        setFromDate(currentYear-5)
      } else if(query == 'Last 10 Years'){
        setFromDate(currentYear-10)
      } else if(query == 'All'){
        setFromDate(1900)
      }
    };
    getDate();
  }, [query]);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "row",
        marginBottom: "5px",
      }}>
      <label style={{ marginLeft: "5px", marginRight: "5px" }}> Pub. Year From: </label>
      <Datetime
        isValidDate={ valid }
        dateFormat="YYYY"
        timeFormat={false}
        onChange={(date) => setFromDate(date.year())}
      />
      <label style={{ marginLeft: "5px", marginRight: "5px" }}> To: </label>
      <Datetime
        isValidDate={ valid }
        dateFormat="YYYY"
        timeFormat={false}
        onChange={(date) => setToDate(date.year())}
      />
      <select
        id="dateSelect"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        style={{ marginLeft: "5px"}}>>
        <option value="">Select a Date Range </option>
        {optionItems}
      </select>
    </div>
  );
};

export default DateFilter;
