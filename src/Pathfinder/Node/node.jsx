import React, { Component } from "react";
import "./node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isWall,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
    } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => {
          onMouseDown(row, col);
        }}
        onMouseEnter={() => {
          onMouseEnter(row, col);
        }
        }
        onMouseUp={() => {
          onMouseUp();
        }
        }
      ></div>
    );
  }
}
