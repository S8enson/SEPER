import React from "react";
import SubmissionForm from "../components/SubmissionForm.js";
import Styles from "../components/TableStyle";
import Table from "../components/ModerationTable.js";
import TableColumns from "../components/ModerationTableColumns.js";

const SubmitArticle = () => {
  return (
    <div>
      <h2>Submit Article</h2>
      <p>Upload a BibTex file</p>
      <SubmissionForm />
    </div>
  );
};

export default SubmitArticle;
