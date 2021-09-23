import React from 'react';
import SEPractices from "../dummydata/SEPractices"

  const optionItems = SEPractices.map((SEPractice) =>
                <option key={SEPractice.practice}>{SEPractice.practice}</option>
            );
  class Dropdown extends React.Component{
  //   refresh = () => {
  //     this.setState((state, props) => {
  //         return {
  //           date: new Date()
  //         };
  //     });
  // };
    render(){
      return (
        <div>
             <select id="practiceSelect">
             <option value="">Select an SE Practice </option>
                {optionItems}
             </select>
         </div>
         

    )
      }
  }

  export default Dropdown;