import articles from "../dummydata/articles.js";
import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import tablecolumns from "../components/tablecolumns.js";
import Dropdown from "../components/Dropdown.js";
import { useEffect, useState } from "react";

const SEPractice = () => {
const [articles, setArticles] = useState([{
  title: '',
  authors: "",
  source: "",
  pubyear: "",
  doi: "",
  claim: "", 
  evidence: "",
}])

useEffect(() =>{
  fetch("http://localhost:5000/api/v1/Test&Driven&Development").then(async res => {
    if(res.ok) {
      return res.json()
    }
  }).then(jsonRes => setArticles(jsonRes));
},[])

    return (
      <div>
        <h2>Select SE Practice to get evidence for the claimed benefits</h2>
              <Dropdown/>
               <Styles>
                 <Table
                  data={articles}
                  columns={tablecolumns}
                 />
              </Styles>
      </div>
    );
}
 
export default SEPractice;  

