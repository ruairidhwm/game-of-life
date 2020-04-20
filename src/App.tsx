import React, { useState } from "react";

const numberOfRows: number = 50;
const numberOfColumns: number = 50;

const [grid, setGrid] = useState(() => {
  const rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    rows.push(Array.from(Array(numberOfColumns), () => 0));
  }
});

const App: React.FC = () => {
  return <div>Hi</div>;
};

export default App;
