//import articles from "../dummydata/articles.js";
import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import tablecolumns from "../components/tablecolumns.js";
//import Dropdown from "../components/Dropdown.js";
import { useEffect, useState } from "react";
import SEPractices from "../dummydata/SEPractices";
import DateFilter from "../components/dateFilter";

const optionItems = SEPractices.map((SEPractice) => (
  <option key={SEPractice.practice}>{SEPractice.practice}</option>
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
  const [query, setQuery] = useState("Test Driven Development");
  useEffect(
    (articles) => {
      var value = query;
      value = value.replaceAll(" ", "&");
      value = "http://localhost:5000/api/v1/:" + value;
      console.log(value); // en
      fetch(value)
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((jsonRes) => {
          setArticles(jsonRes);
          setFilteredArticles(jsonRes);
        });
    },
    [query]
  );

  if (articles == null) {
    return (
      <div>
        <label>loading...</label>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: "5px" }}>
        Select SE Practice to get evidence for the claimed benefits
      </h2>
      <select
        id="practiceSelect"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        style={{ marginBottom: "5px" }}>
        <option value="">Select an SE Practice </option>
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
