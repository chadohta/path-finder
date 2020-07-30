import React, { Component } from 'react';
import '../styles/GridNode.css'

class GridNode extends Component {
    render() { 
        const {col, row, isStart, isFinish} = this.props;
        const extraClassName = isFinish ? 'node-finish'
                                : isStart ? 'node-start'
                                : '';
        return ( 
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}>
            </div>
        );
    }
}
 
export default GridNode;