import React, { Component } from 'react';
import '../styles/instructions.css';

class Instuctions extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <h2> What is Pathfinding? </h2>
                <p>
                    This application visualizes various pathfinding algorithms. 
                    A pathfinding algorithm is essentially trying to find
                    the shortest path between two points. While some algorithms
                    are guaranteed to find the shortest possible path, others are not. 
                    Below are descriptions of each algorithm implemented in this
                    application.
                </p>

                <h2> The Algorithms </h2>

                <div className="alg-description-1">
                    <h4> Depth-First Search (DFS) </h4>
                    <p className="alg-des-italic"> unweighted </p>
                    <p className="alg-des">
                        Explores as far as possible until hitting the end of the grid,
                        a wall, or an already visited node before changing direction.
                    </p>
                    <p>
                        does not guarantee shortest path
                    </p>
                </div>

                <div className="alg-description-1">
                    <h4> Breadth-First Search (BFS) </h4>
                    <p className="alg-des-italic"> unweighted (can be weighted) </p>
                    <p className="alg-des">
                        Explores all neighbors of the start node then continues
                        to explore the neighbors of those nodes and so on until
                        it finds the target node.
                    </p>
                    <p>
                        guarantees shortest path
                    </p>
                </div>

                <div className="alg-description-1">
                    <h4> Dijkstra's Algorithm </h4>
                    <p className="alg-des-italic"> weighted </p>
                    <p className="alg-des">
                        Explores all neighbors of the start node and moves to the neighbor
                        with the lowest cost. In this case, since each neighbor node has
                        an equal cost of 1, it will move to the node explored first.
                        For this implementation that order is up, right, down, left.
                    </p>
                    <p>
                        guarantees shortest path
                    </p>
                </div>

                <div className="alg-description-1">
                    <h4> Greedy Search </h4>
                    <p className="alg-des-italic"> weighted </p>
                    <p className="alg-des">
                        Uses a heuristic function to estimate the cost of the cheapest path
                        from start node to destination node. Essentially, it will explore
                        neighbors and continuously move to the node that is closest to the
                        destination node. This does not always lead to the optimal path.
                    </p>
                    <p>
                        does not guarantee shortest path
                    </p>
                </div>

                <div className="alg-description-1">
                    <h4> A* (A-Star) Search </h4>
                    <p className="alg-des-italic"> weighted </p>
                    <p className="alg-des">
                        When deciding which direction to go, the A-Star algorithm considers both 
                        the cost from the current node any neighbor node (like Dijkstras) 
                        along with the distance from those neighbor nodes to the
                        destination node (like Greedy) to predict which neighbor node would
                        be the best move. This results in an algorithm that is much faster than 
                        Dijkstras but still guarantees the shortest path. This is one of the 
                        best pathfinding algorithms.
                    </p>
                    <p>
                        guarantees shortest path
                    </p>
                </div>

                <h3> Calculating Distance </h3>
                <p>
                    For weighted algorithms this application uses manhattan distance to
                    calculate cost. Each movement from one node to a neighboring node 
                    has a cost or weight of 1. 
                </p>
            </div>
        );
    }
}
 
export default Instuctions;