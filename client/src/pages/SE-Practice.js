import Styles from "../components/TableStyle.js";
import Table from "../components/EvidenceTable.js";
import tablecolumns from "../components/TableColumns.js";
import React, { useEffect, useState } from "react";
import SEPractices from "../dummydata/SEPractices.js";
import DateFilter from "../components/DateFilter.js";

const optionItems = SEPractices.map((SEPractice) => (
  <option value={":" + SEPractice.practice} key={SEPractice.practice}>
    {SEPractice.practice}
  </option>
));

const SEPractice = () => {
  const [articles, setArticles] = useState([
    {
      title: "",
      authors: "",
      source: "",
      pubyear: "",
      doi: "",
      claim: "",
      evidence: "",
    },
  ]);
  const [filteredArticles, setFilteredArticles] = useState([
    {
      title: "",
      authors: "",
      source: "",
      pubyear: "",
      doi: "",
      claim: "",
      evidence: "",
    },
  ]);
  //const handleChange = event => setArticles(event.target.value);
  const [query, setQuery] = useState("");
  useEffect(() => {
    var value = query;
    value = value.replaceAll(" ", "&");
    value = "/api/v1/" + value;
    console.log(value); // en
    fetch(value)
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {
        console.log(jsonRes);
        setArticles(jsonRes);
        setFilteredArticles(jsonRes);
      });
  }, [query]);

  if (articles == null) {
    return (
      <div>
        <label>loading...</label>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ marginBottom: "5px" }}>
        Select SE Practice to get evidence for the claimed benefits
      </h3>
      <select
        id="practiceSelect"
        value={query}
        defaultValue=""
        onChange={(event) => setQuery(event.target.value)}
        style={{ marginBottom: "5px" }}>
        <option hidden value="">
          Select an SE Practice
        </option>
        <option value="">All</option>
        {optionItems}
      </select>
      <div>
        <DateFilter articles={articles} setArticles={setFilteredArticles} />
      </div>
      <Styles>
        <Table data={filteredArticles} columns={tablecolumns} />
      </Styles>
    </div>
  );
};

export default SEPractice;
