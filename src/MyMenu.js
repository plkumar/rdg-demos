import React, { useState, setState } from "react";
import "./styles.css";

export class MyMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var self = this;
        var myStyle = {
            position: "absolute",
            top: `${self.props.y}px`,
            left: `${self.props.x + 5}px`
        };
        var items = self.props.items;
        //console.log(myStyle);
        return (
            <div className="custom-context" id='customcontext' style={myStyle} ref={this.contextRef}>
                {items.map((item, index, arr) => {
                    if (arr.length - 1 === index) {
                        return (
                            <div key={index} className="custom-context-item-last" index={index}>
                                {item.label}
                            </div>
                        );
                    } else {
                        return (
                            <div key={index} className="custom-context-item" index={index}>
                                {item.label}
                            </div>
                        );
                    }
                })}
            </div>
        );
    }
}