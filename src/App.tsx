import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const App: React.FC = () => {
  const numberOfRows: number = 50;
  const numberOfColumns: number = 50;

  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numberOfRows; i++) {
      rows.push(Array.from(Array(numberOfColumns), () => 0));
    }

    return rows;
  };

  /**
   * An array of coordinates which
   * represents the relative positions
   * of a cell's neighbours.
   */
  const cellOps = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  /**
   * @description
   * Creates the array we need to store our
   * grid in. We set 0 as being dead, and will
   * set 1 as being alive.
   *
   * By default we start everything as dead.
   */
  const [grid, setGrid] = useState(() => generateEmptyGrid());

  const [running, setRunning] = useState(false);

  /**
   * Create a ref here so we can access
   * running in our runSimulation function
   * which uses useCallback.
   */
  const runningRef = useRef(running);
  runningRef.current = running;

  /**
   * Using useCallback so that we don't re-create
   * this function every render. This function will
   * only be created once for efficiency.
   */
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((grid) => {
      return produce(grid, (gridCopy) => {
        for (let i = 0; i < numberOfRows; i++) {
          for (let j = 0; j < numberOfColumns; j++) {
            let neighbours = 0;
            cellOps.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              // Stop our function running outside of the grid boundaries
              if (
                newI >= 0 &&
                newI < numberOfRows &&
                newJ >= 0 &&
                newJ < numberOfColumns
              ) {
                neighbours += grid[newI][newJ];
              }
            });

            if (neighbours < 2 || neighbours > 3) {
              gridCopy[i][j] = 0;
            } else if (grid[i][j] === 0 && neighbours === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, [cellOps]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridGap: "15px",
          justifyContent: "center",
          borderTop: "10px solid #9685Af",
          height: "100vh",
          backgroundColor: "#D5D5D5",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "10px",
            marginTop: "10px",
            marginLeft: "40px",
            marginRight: "40px",
            marginBottom: "-40px",
          }}
        >
          <button
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
            style={{
              backgroundColor: "#9685Af",
              color: "#D5D5D5",
              fontSize: "14px",
            }}
          >
            {running ? "Stop Simulation" : "Start Simulation"}
          </button>
          <button onClick={() => setGrid(generateEmptyGrid())}>Clear</button>
          <button
            onClick={() => {
              const rows = [];
              for (let i = 0; i < numberOfRows; i++) {
                rows.push(
                  Array.from(Array(numberOfColumns), () =>
                    Math.random() > 0.5 ? 1 : 0
                  )
                );
              }

              setGrid(rows);
            }}
          >
            Randomise
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numberOfColumns}, 20px)`,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.18)",
            backgroundColor: "#9099A2",
            margin: "40px",
          }}
        >
          {grid.map((rows, rowIndex) =>
            rows.map((col, columnIndex) => (
              <div
                key={`${rowIndex}-${columnIndex}`}
                onClick={() => {
                  /**
                   * Uses immer to clone the grid and then
                   * we push it into state.
                   */
                  const newGrid = produce(grid, (gridCopy) => {
                    gridCopy[rowIndex][columnIndex] = grid[rowIndex][
                      columnIndex
                    ]
                      ? 0
                      : 1;
                  });
                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[rowIndex][columnIndex]
                    ? "#94618E"
                    : undefined,
                  border: "2px solid #D5D5D5",
                }}
              ></div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default App;
