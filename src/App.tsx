import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const App: React.FC = () => {
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
    setTimeout(runSimulation, 1000);
  }, []);

  return (
    <>
      <button onClick={() => setRunning(!running)}>
        {running ? "Stop Simulation" : "Start Simulation"}
      </button>
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
              onClick={() => {
                /**
                 * Uses immer to clone the grid and then
                 * we push it into state.
                 */
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[rowIndex][columnIndex] = grid[rowIndex][columnIndex]
                    ? 0
                    : 1;
                });
                setGrid(newGrid);
              }}
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
    </>
  );
};

export default App;
