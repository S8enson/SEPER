//import articles from "../dummydata/articles.js";
import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import tablecolumns from "../components/tablecolumns.js";
//import Dropdown from "../components/Dropdown.js";
import { useEffect, useState } from "react";
import SEPractices from "../dummydata/SEPractices";

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
  //const handleChange = event => setArticles(event.target.value);
  const [query, setQuery] = useState("Test Driven Development");
  useEffect(() => {
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
      .then((jsonRes) => setArticles(jsonRes));
  }, [query]);

  return (
    <div>
      <h2 style={{ marginBottom: "5px" }}>
        Select SE Practice to get evidence for the claimed benefits
      </h2>
      {/* <Dropdown value={query} onChange={event => setQuery(event.target.value)}/> */}
      <select
        id="practiceSelect"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        style={{ marginBottom: "5px" }}>
        <option value="">Select an SE Practice </option>
        {optionItems}
      </select>
      <Styles>
        <Table data={articles} columns={tablecolumns} />
      </Styles>
    </div>
  );
};

export default SEPractice;
