import React from "react";
import { mount, shallow, configure } from "enzyme";
import SubmissionForm from "./SubmissionForm";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

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

    const testInput = wrapper.find("input[name='title']");
    testInput.simulate("change", {
      target: { name: "title", value: "TestTitle" },
    });
    const authorsInput = wrapper.find("input[name='authors']");
    testInput.simulate("change", {
      target: { name: "authors", value: "Testauthors" },
    });
    const sourceInput = wrapper.find("input[name='source']");
    testInput.simulate("change", {
      target: { name: "source", value: "Testsource" },
    });
    const pubyearInput = wrapper.find("input[name='pubyear']");
    testInput.simulate("change", {
      target: { name: "pubyear", value: "Testpubyear" },
    });
    const doiInput = wrapper.find("input[name='doi']");
    testInput.simulate("change", {
      target: { name: "doi", value: "" },
    });

    const form = wrapper.find("form");
    form.simulate("submit", {});

    expect(handleSubmitMock).toHaveBeenCalledWith({
      title: "TestTitle",
      authors: "Testauthors",
      source: "Testsource",
      pubyear: "Testpubyear",
      doi: "",
    });
  });

  it("Submission fails if required entries empty", () => {
    const handleSubmitMock = jest.fn();
    const wrapper = setup({ onSubmit: handleSubmitMock });

    const nameInput = wrapper.find("input[name='title']");
    nameInput.simulate("change", {
      target: { name: "title", value: "TEST" },
    });

    const form = wrapper.find("form");
    form.simulate("submit", {});

    expect(handleSubmitMock).toHaveBeenCalledTimes(0);
  });
});
