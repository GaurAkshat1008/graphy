import React, { Component } from "react";
import Header from "../component/header";
import Node from "./Node/node";
import "./visualizer.css";

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }
  componentDidMount() {
    const cells = [];
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push([]);
      }
      cells.push(currentRow);
    }
    this.setState({ nodes: cells });
  }
  render() {
    const { nodes } = this.state;
    console.log(nodes);
    return (
      <div className="visualizer">
        <Header />
        <div className="grid">
          {nodes.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  return <Node key={nodeIdx} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
