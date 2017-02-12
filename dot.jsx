import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Dot extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({},
      props,
      { r: 5 });
    this.flash = this.flash.bind(this);
  }

  flash() {
    const node = d3.select(this.circle);
    this.setState({ colorize: true });

    node.transition()
      .attr('r', 20)
      .duration(250)
      .ease(d3.easeCubicOut)
      .transition()
      .attr('r', 5)
      .duration(250)
      .ease(d3.easeCubicOut)
      .on('end', () => this.setState({ colorize: false }));
  }

  get color() {
    const { x, y, maxPos } = this.state;
    const t = d3.scaleLinear()
      .domain([0, 0.05 * maxPos ** 2]) // eslint-disable-line
      .range([0, 1]);
    return d3.interpolateWarm(t(x ** 2 + y ** 2)); // eslint-disable-line
  }

  render() {
    const { x, y, r, colorize } = this.state;
    return (<circle
      cx={x} cy={y} r={r}
      ref={(node) => { this.circle = node; }}
      onMouseOver={this.flash}
      style={{ fill: colorize ? this.color : 'black' }}
    />);
  }
}
