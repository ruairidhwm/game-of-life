# Conway's Game of Life

This is a simple implementation of (Conway's Game of Life)[https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life] in React and TypeScript.

We must follow these rules:

```
- Any live cell with fewer than two live neighbours dies, as if by underpopulation.

- Any live cell with two or three live neighbours lives on to the next generation.

- Any live cell with more than three live neighbours dies, as if by overpopulation.

- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
```

This was implemented by creating a two-dimensional array to simulate a grid, and then populating it with random values of either `0` to represent a dead cell, or `1` to represent a living cell.

## Example

![Gif of Conway's Game of Life](https://i.imgur.com/LEpU7fp.png)
