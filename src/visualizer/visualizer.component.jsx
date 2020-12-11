import React from "react";

import { getMergeSortAnimations } from "../algorithms/mergesort";
import { getQuickSortAnimations } from "../algorithms/quicksort";
import { getBubbleSortAnimations } from "../algorithms/bubblesort";
import { getInsertionSortAnimations } from "../algorithms/insertionsort";

import "./visualizer.styles.scss";

// Number of bars in the array
const NUMBER_OF_BARS = 400;

// This is the main color of the array bars.
const BACKGROUND_COLOR = "lightblue";

// This is the main color of the array bars.
const PRIMARY_COLOR = "royalblue";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "orangered";

class Visualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      size: 200,
      speed: 4.5,
      running: false,
    };

    this.setArray = this.setArray.bind(this);
    this.regenerate = this.regenerate.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.insertionSort = this.insertionSort.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.display = this.display.bind(this);
  }

  componentDidMount() {
    this.setArray();
  }

  setArray() {
    const array = [];
    for (let i = 0; i < this.state.size; i++) {
      array.push(randomNumberGenerator(10, 400));
    }
    this.setState({ array });
  }

  regenerate() {
    this.setArray();
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < this.state.size; i++) {
      arrayBars[i].style.backgroundColor = BACKGROUND_COLOR;
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.speed);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    this.display(animations);
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    this.display(animations);
  }

  insertionSort() {
    const animations = getInsertionSortAnimations(this.state.array);
    console.log(this.state.array);
    this.display(animations);
  }

  display(animations) {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isSwap = animations[i].swap === -1 ? false : true;
      if (!isSwap) {
        const barOneIdx = animations[i].left;
        const barTwoIdx = animations[i].right;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else {
        setTimeout(() => {
          const barOneIdx = animations[i].swap;
          const newHeight = animations[i].height;
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * this.state.speed);
      }
    }
  }

  async handleChange(event) {
    await this.setState({ size: Math.floor(parseInt(event.target.value)) });
    await this.setState({
      speed: 1100 / Math.floor(parseInt(event.target.value)),
    });
    this.setArray();
  }

  render() {
    const { array } = this.state;

    return (
      <div className="container">
        <div className="header">
          <button
            className="custom-button random-button"
            onClick={this.regenerate}
          >
            random data generator
          </button>
          <button className="custom-button" onClick={this.bubbleSort}>
            bubble sort
          </button>
          <button className="custom-button" onClick={this.quickSort}>
            quick sort
          </button>
          <button className="custom-button" onClick={this.insertionSort}>
            insertion sort
          </button>
          <button className="custom-button" onClick={this.mergeSort}>
            merge sort
          </button>
          <div className="slider-container">
            <p className="slider-label">Array Size & Speed</p>
            <input
              className="slider"
              type="range"
              min="6"
              max={NUMBER_OF_BARS}
              value={this.state.size}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="bars-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                width: `${Math.floor(700 / this.state.size)}px`,
                height: `${value}px`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Visualizer;
