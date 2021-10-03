import React, { useState, Component } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from 'axios';

const SubmissionForm = ({ onSubmit }) => {
  // constructor() {
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
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [source, setSource] = useState('');
  const [pubyear, setPubyear] = useState('');
  const [doi, setDoi] = useState('');
  const [practice, setPractice] = useState('');
  const [email, setEmail] = useState('');
  const state = '1';
  //state=> 1:awaiting moderation, 2:awaiting analysis, 3:approved&analysed
  


  // const [values, setValues] = useState({});

  // function handleInputChange(event) {
  //   const { name, value } = event.target;
  //   setValues({
  //     ...value,
  //     [name]: value
  //   });
  // }

  function handleSubmit(event) {
    event.preventDefault();
    // onSubmit(values);
    // console.log(values);
    axios
    .post('/api/v1/submit', data)
    .then(res => {
setTitle('');
setAuthors('');
setSource('');
setPubyear('');
setDoi('');
setEmail('');
      this.props.history.push('/');
    })
    .catch(err => {
      console.log("Error in SubmissionForm!");
    })
    //onSubmit(values);
  }
  // onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // onSubmit = e => {
  //   // e.preventDefault();

    const data = {
      title,
      authors,
      source,
      pubyear,
      doi,
      practice,
      state
    };

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
    
    <p><input                     
      type='text'
                    placeholder='Title'
                    name='title'
                    className='form-control'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                    /></p>
      <p><input       type='text'
                    placeholder='Authors'
                    name='authors'
                    className='form-control'
                    onChange={(e) => setAuthors(e.target.value)}
                    value={authors}
                    required
                    /></p>
      <p><input       type='text'
                    placeholder='Source'
                    name='source'
                    className='form-control'
                    onChange={(e) => setSource(e.target.value)}  
                    value={source}
                    required
                    /></p> 
      <p><input       type='number'
                    placeholder='Publication Year'
                    name='pubyear'
                    className='form-control'
                    onChange={(e) => setPubyear(e.target.value)}
                    value={pubyear}
                    min='1900'
                    max={new Date().getFullYear()}
                    required
                    /></p>
      <p><input       type='text'
                    placeholder='DOI'
                    name='doi'
                    className='form-control'
                    onChange={(e) => setDoi(e.target.value)} 
                    value={doi}/></p>
      <p><input       type='text'
                    placeholder='email'
                    name='email'
                    className='form-control'
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}/></p>     
     <p><select       type='text'
                    placeholder='Select SE practice...'
                    onChange={(e) => setPractice(e.target.value)} 
                    value={practice}>
        <option value="TDD">TDD</option>
        <option value="Mob Programming">Mob Programming</option>
      </select></p>

      <p><input type="submit" /></p>
    </form>
  );
    
}

export default SubmissionForm;
