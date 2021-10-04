import React, { useState, Component, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { parseBibFile, normalizeFieldValue } from "bibtex";

const SubmissionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [source, setSource] = useState("");
  const [pubyear, setPubyear] = useState("");
  const [doi, setDoi] = useState("");
  const [practice, setPractice] = useState("");
  const [email, setEmail] = useState("");
  const state = "1";
  const [bib, setBib] = useState("");
  const [file, setFile] = useState("");
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("/api/v1/submit", data)
      .then((res) => {
        setTitle("");
        setAuthors("");
        setSource("");
        setPubyear("");
        setDoi("");
        setEmail("");
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("Error in SubmissionForm!");
      });
  }

  const data = {
    title,
    authors,
    source,
    pubyear,
    doi,
    practice,
    state,
  };

  // const initialRender = useRef(true);
  // useEffect(() => {
  //   if(initialRender.current){
  //     initialRender.current = false;
  //   }else{
  //   const entry = bib.getEntry(
  //     text.substring(text.indexOf("{") + 1, text.indexOf(","))
  //   );
  //   setTitle(normalizeFieldValue(entry.getField("title")));
  //   setAuthors(normalizeFieldValue(entry.getField("author")));
  //   setSource(normalizeFieldValue(entry.getField("journal")));
  //   setPubyear(normalizeFieldValue(entry.getField("year")));
  //   setDoi(normalizeFieldValue(entry.getField("DOI")));
  // }}, [bib]);

  async function readFile(e) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      setText(e.target.result);
      setBib(parseBibFile(text));
      const entry = bib.getEntry(
        text.substring(text.indexOf("{") + 1, text.indexOf(","))
      );
      setTitle(normalizeFieldValue(entry.getField("title")));
      setAuthors(normalizeFieldValue(entry.getField("author")));
      setSource(normalizeFieldValue(entry.getField("journal")));
      setPubyear(normalizeFieldValue(entry.getField("year")));
      setDoi(normalizeFieldValue(entry.getField("DOI")));
    };
    reader.readAsText(e.target.files[0]);
    //setFile("");
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <p>
        <input
          type="file"
          placeholder="bibtex"
          name="bibtex"
          className="form-control"
          onChange={(e) => readFile(e)}
          value={file}
          style={{ width: "200px" }}
          accept=".bib"
        />
      </p>
      <p>or</p>
      <p>
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          style={{ width: "200px" }}
          required
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Authors"
          name="authors"
          className="form-control"
          onChange={(e) => setAuthors(e.target.value)}
          value={authors}
          style={{ width: "200px" }}
          required
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Source"
          name="source"
          className="form-control"
          onChange={(e) => setSource(e.target.value)}
          value={source}
          style={{ width: "200px" }}
          required
        />
      </p>
      <p>
        <input
          type="number"
          placeholder="Publication Year"
          name="pubyear"
          className="form-control"
          onChange={(e) => setPubyear(e.target.value)}
          value={pubyear}
          min="1900"
          max={new Date().getFullYear()}
          style={{ width: "200px" }}
          required
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="DOI"
          name="doi"
          className="form-control"
          onChange={(e) => setDoi(e.target.value)}
          value={doi}
          style={{ width: "200px" }}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="email"
          name="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          style={{ width: "200px" }}
        />
      </p>
      <p>
        <select
          type="text"
          placeholder="Select SE practice..."
          onChange={(e) => setPractice(e.target.value)}
          value={practice}
          style={{ width: "200px" }}
        >
          <option value="TDD">TDD</option>
          <option value="Mob Programming">Mob Programming</option>
        </select>
      </p>

      <p>
        <input type="submit" />
      </p>
    </form>
  );
};

export default SubmissionForm;
