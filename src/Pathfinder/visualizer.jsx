import React, { Component } from "react";
import Header from "../component/header";
import Node from "./Node/node";
import "./visualizer.css";

const START_ROW = 8
const START_COL = 20
const FINISH_COL = 30
const FINISH_ROW = 8

function createNode(row, col) {
  return {
    row,
    col,
    isStart: row === START_ROW && col === START_COL,
    isFinish: row === FINISH_ROW && col === FINISH_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
}

function getGrid() {
  const grid = [];
  for (let row = 0; row < 15; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
}

function getNewGridWithWall(grid, row, col) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mousePressed: false,
    };
  }
  componentDidMount() {
    const grid = getGrid();
    this.setState({ grid: grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWall(this.state.grid, row, col);
    this.setState({ mousePressed: true, grid: newGrid });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mousePressed) return;
    const newGrid = getNewGridWithWall(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mousePressed: false });
  }

  render() {
    const { grid, mousePressed } = this.state;
    console.log(grid);
    return (
      <div className="visualizer">
        <Header />
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isStart, isFinish, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      mousePressed={mousePressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
