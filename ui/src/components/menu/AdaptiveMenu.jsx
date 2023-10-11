import React, { Component } from 'react';
import './AdaptiveMenu.css'

export default class Branch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isChildsAreShown: false
        };
    };

    haveChilds() {
        return this.props.model.children && this.props.model.children.length;
    };

    showOrCloseChilds = () => {
        this.setState({ isChildsAreShown: !this.state.isChildsAreShown });
    };

    render() {
        return (
            <>
                <li>
                    <div className='field-wrap'>
                        <a className='field-link' href="a">
                            {this.props.model.name}
                        </a>
                        {
                            this.haveChilds() && (
                                <button onClick={this.showOrCloseChilds} className="field-arrow-wrap">
                                    <span className="field-arrow">
                                        <svg
                                            aria-hidden="true"
                                            className={this.state.isChildsAreShown ? "arrow_up" : ""}
                                            fill="currentColor"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <title>Expand</title>
                                            <path d="M5.293 9.707l6 6c0.391 0.391 1.024 0.391 1.414 0l6-6c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
                                        </svg>
                                    </span>
                                </button>
                            )
                        }
                    </div>
                </li>
                {
                    this.haveChilds() && this.state.isChildsAreShown && (
                        <ul className="branch shift">
                            {this.props.model.children.map((c, i) => (
                                <Branch model={c}></Branch>
                            ))}
                        </ul>
                    )
                }
            </>
        )
    }
};

