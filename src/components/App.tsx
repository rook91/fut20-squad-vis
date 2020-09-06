import React from 'react';
import Table from "./Table";

import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

function App() {
  return (
    <div className="App ag-theme-alpine-dark">
      <Table />
    </div>
  );
}

export default App;
