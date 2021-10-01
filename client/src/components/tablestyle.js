import styled from 'styled-components';

const Styles = styled.div `
table {
  border-radius: 5px;
  border-spacing: 0;
  border: 1px solid black;
  font-family: sans-serif;

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    :last-child {
      border-right: 0;
    }
  }
 
  th {
    background: #00AFF5;
    
    fontWeight: bold;
  }
}
`
export default Styles;
