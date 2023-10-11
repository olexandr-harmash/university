import React, { Component } from "react";

import Branch from "./AdaptiveMenu";

import "./Menu.css";

const model = [
  {
    name: "Category",
    children: [
      { name: "Cake & Milk" },
      { name: "Quick Oats" },
      { name: "Red Apple" },
      { name: "Organic Kiwi" },
    ],
  },
  {
    name: "Shop",
    children: [{ name: "Product Type" }, { name: "Shop Pages" }],
  },
  {
    name: "Elements",
  },
  {
    name: "Pages",
  },
  {
    name: "Blog",
  },
  {
    name: "About Us",
  },
  {
    name: "Contact Us",
  },
];

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="navbot-menu">
        <span onClick={this.toggle} className="navbot-menu-text">
          Menu
        </span>
        <svg
          onClick={this.toggle}
          aria-hidden="true"
          fill="currentColor"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <title>Toggle Menu</title>
          <path d="M3 13h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 7h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 19h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
        </svg>
        {this.state.isOpen && (
          <>
            <ul className="navbot-list">
              <div className="navbot-elem-wrap">
                <div onClick={this.toggle} className="navbot-list-close-wrap">
                  <div className="navbot-list-close">Close</div>
                </div>
                {model.map((e) => (
                  <Branch model={e}></Branch>
                ))}
              </div>
            </ul>
            <div className="navbot-list-back"></div>
          </>
        )}
      </div>
    );
  }
}
