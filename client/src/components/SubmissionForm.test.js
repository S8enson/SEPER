import React from "react";
import { mount, shallow, configure } from "enzyme";
import SubmissionForm from "./SubmissionForm";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});

const setup = (props = {}) => {
    const wrapper = mount(<SubmissionForm {...props} />);
    return wrapper;
  };
  
  describe("SubmissionForm", () => {
    it("renders without errors", () => {
      const wrapper = setup();
      const component = wrapper.find(SubmissionForm);
  
      expect(component).toHaveLength(1);
    });
  
    it("calls the onSubmit method", () => {
      const handleSubmitMock = jest.fn();
      const wrapper = setup({ onSubmit: handleSubmitMock });
  
      const form = wrapper.find("form");
      form.simulate("submit", {});
  
      expect(handleSubmitMock).toHaveBeenCalledTimes(1);
    });
  
    it("calls the onSubmit method with the expected value", () => {
      const handleSubmitMock = jest.fn();
      const wrapper = setup({ onSubmit: handleSubmitMock });
  
      const nameInput = wrapper.find("input[name='title']");
      nameInput.simulate("change", {
        target: { name: "title", value: "TEST" }
      });
  
      const form = wrapper.find("form");
      form.simulate("submit", {});
  
      expect(handleSubmitMock).toHaveBeenCalledWith({
        name: "TEST"
      });
    });
  });

