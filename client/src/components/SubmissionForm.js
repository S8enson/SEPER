import React, { useState, Component } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from 'axios';

class SubmissionForm extends Component {
  constructor(onSubmit) {
    super(onSubmit);
    this.state = {
      title: '',
      authors:'',
      source:'',
      pubyear:'',
      doi:'',
      sepractice:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      authors: this.state.authors,
      source: this.state.source,
      pubyear: this.state.pubyear,
      doi: this.state.doi,
      sepractice: this.state.sepractice
    };

    axios
      .post('https://ense-4.herokuapp.com/api/articles', data)
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
  };

  render() {
    return (
      
      <form noValidate onSubmit={this.onSubmit}>
    
      <input                     
      type='text'
                    placeholder='Title'
                    name='title'
                    className='form-control'
                    value={this.state.title}
                    onChange={this.onChange} 
                    />
      <p><input       type='text'
                    placeholder='Authors'
                    name='authors'
                    className='form-control'
                    value={this.state.authors}
                    onChange={this.onChange}  /></p>
      <p><input       type='text'
                    placeholder='Source'
                    name='source'
                    className='form-control'
                    value={this.state.source}
                    onChange={this.onChange}  /></p> 
      <p><input       type='number'
                    placeholder='Publication Year'
                    name='pubyear'
                    className='form-control'
                    value={this.state.pubyear}
                    onChange={this.onChange}  /></p>
      <p><input       type='text'
                    placeholder='DOI'
                    name='doi'
                    className='form-control'
                    value={this.state.doi}
                    onChange={this.onChange}  /></p>
     
      <select       type='text'
                    placeholder='Select SE practice...'
                    value={this.state.sepractice}
                    onChange={this.onChange} >
        <option value="TDD">TDD</option>
        <option value="Mob Programming">Mob Programmin</option>
      </select>

      <input type="submit" />
    </form>
  );
    }
}

export default SubmissionForm;
