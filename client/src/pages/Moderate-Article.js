import React, { useState, useEffect } from "react";
import Table from "../components/ModerationTable.js";
import TableColumns from "../components/ModerationTableColumns.js";

const ModerateArticle = () => {
  const [articles, setArticles] = useState([
    {
      title: "",
      authors: "",
      source: "",
      pubyear: "",
      doi: "",
      email: "",
      practice: "",
    },
  ]);

  useEffect(() => {
    fetch("/api/v1/moderation")
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {
        console.log(jsonRes);
        setArticles(jsonRes);
      });
  }, []);

  return (
    <div>
      <h2>Moderation</h2>
      <Table data={articles} columns={TableColumns} />
    </div>
  );
};

export default ModerateArticle;
