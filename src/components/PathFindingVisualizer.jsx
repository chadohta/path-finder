import React, { Component } from "react";
import "../styles/PathFindingVisualizer.css";
import GridNode from "./GridNode";
import { dijkstra } from "../algorithms/Dijkstras";
import { greedySearch } from "../algorithms/GreedySearch";
import { aStarSearch } from "../algorithms/AStarSearch";
import { bfs } from "../algorithms/BreadthFirstSearch";
import { dfs } from "../algorithms/DepthFirstSearch";
import { getNodesInPathOrder } from "../algorithms/helper-functions";
import Instructions from "./Instructions.jsx";

const START_NODE_ROW = 4;
const START_NODE_COL = 4;
const END_NODE_ROW = 15;
const END_NODE_COL = 35;

const algorithms = {
    dfs: dfs,
    bfs: bfs,
    dijkstra: dijkstra,
    greedy: greedySearch,
    aStar: aStarSearch,
};

class PathFindingVisualizer extends Component {
    state = {
        grid: [],
        mouseIsPressed: false,
    };

    componentDidMount() {
        this.createGrid();
    }

    createGrid() {
        const grid = [];
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 40; col++) {
                currentRow.push(this.createNode(col, row));
            }
            grid.push(currentRow);
        }
        this.setState({
            grid: grid,
        });
    }

    createNode(col, row) {
        return {
            col: col,
            row: row,
            distance: Infinity,
            fScore: Infinity,
            previousNode: null,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === END_NODE_ROW && col === END_NODE_COL,
            isWall: false,
            isVisited: false,
        };
    }

    handleMouseDown(row, col) {
        if (
            (row === START_NODE_ROW && col === START_NODE_COL) ||
            (row === END_NODE_ROW && col === END_NODE_COL)
        )
            return;
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (
            (row === START_NODE_ROW && col === START_NODE_COL) ||
            (row === END_NODE_ROW && col === END_NODE_COL)
        )
            return;
        if (!this.state.mouseIsPressed) return;
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    getNewGridWithWallToggled(grid, row, col) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

    lockButtons() {
        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
            button.disabled = true;
        });
    }

    unlockSearchButtons() {
        const buttons = document.querySelectorAll(".searchBtn");
        buttons.forEach((button) => {
            button.disabled = false;
        });
    }

    unlockResetButtons() {
        const buttons = document.querySelectorAll(".resetBtn");
        buttons.forEach((button) => {
            button.disabled = false;
        });
    }

    visualizeAlgorithm = (algorithm) => {
        this.lockButtons();
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = algorithms[algorithm](grid, startNode, finishNode);
        const nodesInPathOrder = getNodesInPathOrder(finishNode);
        this.animateExploration(visitedNodesInOrder, nodesInPathOrder, 30);
    };

    compareAllAlgorithms= () => { 
        const comparison = {}
        for (const [key, algorithm] of Object.entries(algorithms)) {
            const { grid } = this.state;
            const startNode = grid[START_NODE_ROW][START_NODE_COL];
            const finishNode = grid[END_NODE_ROW][END_NODE_COL];
            const visitedNodesInOrder = algorithm(grid, startNode, finishNode);
            const nodesInPathOrder = getNodesInPathOrder(finishNode);
            comparison[key] = [visitedNodesInOrder.length, nodesInPathOrder.length]
            this.resetGridKeepWalls();
        }
        console.log(comparison);
    }

    animateExploration(visitedNodesInOrder, nodesInShortestPathOrder, speed) {
        for (let i = 1; i <= visitedNodesInOrder.length - 1; i++) {
            if (i === visitedNodesInOrder.length - 1) {
                setTimeout(() => {
                    this.animatePath(nodesInShortestPathOrder, speed);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    "node node-visited";
            }, 10 * i);
        }
    }

    animatePath(nodesInPathOrder, speed) {
        for (let i = 1; i < nodesInPathOrder.length - 1; i++) {
            setTimeout(() => {
                const node = nodesInPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    "node node-path";
            }, speed * i);
        }
        setTimeout(() => {
            this.unlockResetButtons();
        }, speed * nodesInPathOrder.length);
    }

    resetGrid() {
        this.createGrid();
        // need a delay for the new grid to be set in state
        setTimeout(() => {
            this.resetNodeColor();
        }, 250);
    }

    resetGridKeepWalls() {
        const { grid } = this.state;
        const newGrid = grid.slice();
        for (let row = 0; row < newGrid.length; row++) {
            for (let col = 0; col < newGrid[0].length; col++) {
                const node = newGrid[row][col];
                const newNode = {
                    ...node,
                    distance: Infinity,
                    fScore: Infinity,
                    previousNode: null,
                    isVisited: false,
                };
                newGrid[row][col] = newNode;
            }
        }
        this.setState({ grid: newGrid });
        this.resetNodeColor();
    }

    resetNodeColor() {
        const allNodes = [];
        for (const row of this.state.grid) {
            for (const node of row) {
                allNodes.push(node);
            }
        }
        for (let i = 0; i < allNodes.length; i++) {
            setTimeout(() => {
                const node = allNodes[i];
                if (node.isStart) {
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        "node node-start";
                } else if (node.isFinish) {
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        "node node-finish";
                } else if (node.isWall) {
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        "node node-wall";
                } else {
                    document.getElementById(`node-${node.row}-${node.col}`).className = "node";
                }
            }, 1 * i);
        }
        setTimeout(() => {
            this.unlockSearchButtons();
        }, allNodes.length);
    }

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <div>
                <h1> Pathfinding Visualizer </h1>
                <button className="searchBtn" onClick={() => this.visualizeAlgorithm("dfs")}>
                    Depth-First Search
                </button>
                <button className="searchBtn" onClick={() => this.visualizeAlgorithm("bfs")}>
                    Breadth-First Search
                </button>
                <button className="searchBtn" onClick={() => this.visualizeAlgorithm("dijkstra")}>
                    Dijkstra's Algorithm
                </button>
                <button className="searchBtn" onClick={() => this.visualizeAlgorithm("greedy")}>
                    Greedy Search
                </button>
                <button
                    id="aStarBtn"
                    className="searchBtn"
                    onClick={() => this.visualizeAlgorithm("aStar")}
                >
                    A-Star Search
                </button>
                <div>
                    <button
                        className="searchBtn"
                        style={{ margin: 10 }}
                        onClick={() => this.compareAllAlgorithms()}
                    >
                        Compare All
                    </button>
                </div>
                <div className="grid">
                    {grid.map((row, rIndex) => {
                        return (
                            <div key={rIndex}>
                                {row.map((node, nIndex) => {
                                    const { row, col, isStart, isFinish, isWall } = node;
                                    return (
                                        <GridNode
                                            key={nIndex}
                                            col={col}
                                            row={row}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) =>
                                                this.handleMouseDown(row, col)
                                            }
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp()}
                                        ></GridNode>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                <button className="resetBtn" onClick={() => this.resetGrid()}>
                    Reset Grid
                </button>
                <button
                    id="resetBtnTwo"
                    className="resetBtn"
                    onClick={() => this.resetGridKeepWalls()}
                >
                    Reset Grid Keep Walls
                </button>

                <p style={{ fontStyle: "italic" }}>
                    Add walls by left-click and dragging over squares in the grid. Remove walls by left-clicking on them again.
                </p>

                <div className="instruction-wrapper">
                    <Instructions />
                </div>
            </div>
        );
    }
}

export default PathFindingVisualizer;
