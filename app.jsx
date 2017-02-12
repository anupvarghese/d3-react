import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import Dot from './dot.jsx'; // eslint-disable-line

const App = () => {
  const width = 600;
  const N = 50;
  const pos = d3.scalePoint()
                .domain(d3.range(N))
                .range([0, width])
                .padding(5)
                .round(true);

  return (
    <svg width="600" height="600">
      {d3.range(N).map(x =>
          d3.range(N).map(y =>
            <Dot
              x={pos(x)}
              y={pos(y)}
              key={`${x}-${y}`}
              maxPos={width}
            />,
      ))}
    </svg>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));
