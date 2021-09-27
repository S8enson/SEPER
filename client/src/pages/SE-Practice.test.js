import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SEPractice from "./SE-Practice";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("empty table displays loading...", async () => {
  
  const fakeData = {

  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<SEPractice/>, container);
  });


  expect(container.textContent).toContain("loading...");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

it("table displays data", async () => {
  
  const fakeData = {
    title: 'An experimental evaluation of test driven development vs. test-last development with industry professionals',
    authors: "Munir, H., Wnuk, K., Petersen, K., Moayyed, M.",
    source: "EASE",
    pubyear: "2014",
    doi: "https://doi.org/10.1145/2601248.2601267",
    claim: "product quality improvement", 
    evidence: "weak support",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<SEPractice/>, container);
  });


  expect(container.textContent).toContain(fakeData.title);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});