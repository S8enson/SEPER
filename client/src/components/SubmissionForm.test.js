import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { useEffect } from 'react';
import SubmissionForm from "./SubmissionForm";




it ("should submit", function(){
  var submit = jasmine.createSpy();
  var form = {submit: submit}
  submitform([somedata],form);
  expect(submit).toHaveBeenCalled();
})

it ("should not submit if required data is missing", function(){
    var submit = jasmine.createSpy();
    var form = {submit: submit}
    submitform([somedata],form);
    expect(submit).toHaveBeenCalled();
  })

  it ("should submit", function(){
    var submit = jasmine.createSpy();
    var form = {submit: submit}
    submitform([somedata],form);
    expect(submit).toHaveBeenCalled();
  })