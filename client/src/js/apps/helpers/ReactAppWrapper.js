import React from "react";
import ReactDOM from "react-dom";

export default class ReactAppWrapper {

    constructor(selector, container) {
        this.root = $(container).children(selector).e();
    }

    init() {
        console.log('should be good to go boss');
    }

    render(props = {}) {
        return new Promise(resolve => {
            ReactDOM.render(<this.App { ...props } />, this.root, resolve);
        });
    }

        
}