import React, { useState } from "react";

const numberOfRows: number = 50;
const numberOfColumns: number = 50;

/**
 * @description
 * Creates the array we need to store our
 * grid in. We set 0 as being dead, and will
 * set 1 as being alive.
 *
 * By default we start everything as dead.
 */
const [grid, setGrid] = useState(() => {
  const rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    rows.push(Array.from(Array(numberOfColumns), () => 0));
  }

  return rows;
});

const App: React.FC = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfColumns}, 20px)`,
      }}
    >
      {grid.map((rows, rowIndex) =>
        rows.map((col, columnIndex) => (
          <div
            key={`${rowIndex}-${columnIndex}`}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[rowIndex][columnIndex]
                ? "green"
                : undefined,
              border: "solid 1px black",
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default App;
