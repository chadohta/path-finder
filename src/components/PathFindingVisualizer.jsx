import React, { Component } from 'react';
import '../styles/PathFindingVisualizer.css';
import GridNode from './GridNode'
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/Dijkstras';
import { dfs } from '../algorithms/DepthFirstSearch';
import { bfs } from '../algorithms/BreadthFirstSearch';
import { greedySearch } from '../algorithms/GreedySearch';
import { aStarSearch } from '../algorithms/AStarSearch';

const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const END_NODE_ROW = 15;
const END_NODE_COL = 35;

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
    };

    createNode(col, row) {
        return {
            col: col,
            row: row,
            distance: Infinity,
            previousNode: null,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === END_NODE_ROW && col === END_NODE_COL,
            isWall: false,
            isVisited: false,
        };
    };

    handleMouseDown(row, col) {
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
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
    };
    
    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        console.log(visitedNodesInOrder);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateExploration(visitedNodesInOrder, nodesInShortestPathOrder, 30);
    }

    visualizeBFS() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = bfs(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateExploration(visitedNodesInOrder, nodesInShortestPathOrder, 30);
    }

    visualizeDFS() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[END_NODE_ROW][END_NODE_COL];
        const nodesInPathOrder = dfs(grid, startNode, finishNode);
        this.animateExploration(nodesInPathOrder, nodesInPathOrder, 10);
    }

    visualizeGreedy() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = greedySearch(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateExploration(visitedNodesInOrder, nodesInShortestPathOrder, 30);
    }

    visualizeAStar() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder = aStarSearch(grid, startNode, finishNode);
        console.log(visitedNodesInOrder);
        // const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        // console.log(nodesInShortestPathOrder);
        // this.animateExploration(visitedNodesInOrder, nodesInShortestPathOrder, 30);
    }

    animateExploration(visitedNodesInOrder, nodesInShortestPathOrder, speed) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animatePath(nodesInShortestPathOrder, speed);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }

    animatePath(nodesInPathOrder, speed) {
        for (let i = 0; i < nodesInPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-path';
            }, speed * i);
        }
    }

    resetGrid() { 
        this.createGrid();
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
                        'node node-start';
                } else if (node.isFinish) { 
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-finish';
                } else { 
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node';
                }
            }, 1 * i);
        }
    }

    render() { 
        const { grid,  mouseIsPressed } = this.state;

        return ( 
            <div>
                <button onClick={() => this.visualizeDijkstra()}>
                    Dijkstra's Algorithm
                </button>
                <button onClick={() => this.visualizeGreedy()}>
                    Greedy Search
                </button>
                <button onClick={() => this.visualizeAStar()}>
                    A-Star Search
                </button>
                <button onClick={() => this.visualizeDFS()}>
                    Depth-First Search
                </button>
                <button onClick={() => this.visualizeBFS()}>
                    Breadth-First Search
                </button>
                <button className="resetBtn" onClick={() => this.resetGrid()}>
                    Reset Grid
                </button>
                <div className="grid">
                    {grid.map((row, rIndex) => {
                        return (
                            <div key={rIndex}>
                                {row.map((node, nIndex) => { 
                                    const {row, col, isStart, isFinish, isWall} = node;
                                    return (
                                        <GridNode
                                            key={nIndex}
                                            col={col}
                                            row={row}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}>
                                        </GridNode>
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
 
export default PathFindingVisualizer;