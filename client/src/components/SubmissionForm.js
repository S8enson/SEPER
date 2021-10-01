import React, { useState, Component } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from 'axios';

const SubmissionForm = ({ onSubmit }) => {
  // constructor(onSubmit) {
  //   super();
  //   this.state = {
  //     title: '',
  //     authors:'',
  //     source:'',
  //     pubyear:'',
  //     doi:'',
  //     sepractice:''
  //   };
  // }

  const [values, setValues] = useState({});

  function handleInputChange(event) {
    const { name, value } = event.target;
    setValues({
      ...value,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // onSubmit(values);
    axios
    .post('/submit', values)
    .then(res => {
      this.setState({
        title: '',
        authors:'',
        source:'',
        pubyear:'',
        doi:'',
        sepractice:''
      })
      this.props.history.push('/');
    })
    .catch(err => {
      console.log("Error in SubmissionForm!");
    })
    onSubmit(values);
  }
  // onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // onSubmit = e => {
  //   // e.preventDefault();

  //   // const data = {
  //   //   title: this.state.title,
  //   //   authors: this.state.authors,
  //   //   source: this.state.source,
  //   //   pubyear: this.state.pubyear,
  //   //   doi: this.state.doi,
  //   //   sepractice: this.state.sepractice
  //   // };

  //   axios
  //     .post('/submit', values)
  //     .then(res => {
  //       this.setState({
  //         title: '',
  //         authors:'',
  //         source:'',
  //         pubyear:'',
  //         doi:'',
  //         sepractice:''
  //       })
  //       this.props.history.push('/');
  //     })
  //     .catch(err => {
  //       console.log("Error in SubmissionForm!");
  //     })
  // };


    return (
      
      <form noValidate onSubmit={handleSubmit}>
    
      <input                     
      type='text'
                    placeholder='Title'
                    name='title'
                    className='form-control'
                    onChange={handleInputChange} 
                    />
      <p><input       type='text'
                    placeholder='Authors'
                    name='authors'
                    className='form-control'
                    onChange={handleInputChange}  /></p>
      <p><input       type='text'
                    placeholder='Source'
                    name='source'
                    className='form-control'
                    onChange={handleInputChange}  /></p> 
      <p><input       type='number'
                    placeholder='Publication Year'
                    name='pubyear'
                    className='form-control'
                    onChange={handleInputChange}  /></p>
      <p><input       type='text'
                    placeholder='DOI'
                    name='doi'
                    className='form-control'
                    onChange={handleInputChange}  /></p>
     
      <select       type='text'
                    placeholder='Select SE practice...'
                    onChange={handleInputChange} >
        <option value="TDD">TDD</option>
        <option value="Mob Programming">Mob Programming</option>
      </select>

      <input type="submit" />
    </form>
  );
    
}

export default SubmissionForm;
