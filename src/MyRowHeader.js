import React, { useState, setState } from "react";
import { Menu } from "react-data-grid-addons";
import { MyMenu } from "./MyMenu"
import { ExampleContextMenu } from "./ExampleContextMenu"
import "./styles.css";

const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;

export class MyRowHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            x: 0,
            y: 0,
            menu: [
                { label: "Item 1", callback: (event) => { console.log(event) } },
                { label: "Menu item 2", callback: () => { } },
                { label: "Apple", callback: () => { } }
            ]
        };
    }

    handleContextMenu = (event) => {
        var self = this
        event.preventDefault();
        const clickX = event.clientX;
        const clickY = event.clientY;
        self.setState({ 'visible': true, 'x': clickX, 'y': clickY });
        console.log(
            "Contextmenu : " + JSON.stringify(this.state)
        );
    };

    onClick = (event) => {

    }
    componentDidMount() {
        var self = this;
        // document.addEventListener(‘contextmenu’, function (event) {
        //     event.preventDefault();
        //     const clickX = event.clientX;
        //     const clickY = event.clientY;
        //     self.setState({ visible: true, x: clickX, y: clickY });

        // });

        // document.addEventListener('click', function (event) {
        //     var self = this;
        //     console.log(self);
        //     if(self.contextRef.current.id=='customcontext'){
        //         self.click(event.target.getAttribute('index'));
        //     }
        //     event.preventDefault();
        //     self.setState({ visible: false, x: 0, y: 0 });
        // });
    }

    render() {
        const value = this.props;
        return (
            <div>
                <ContextMenuTrigger id={`HEADER_MENU_${value.column.name}`}>
                    <div>
                        {/* onClick={this.onClick} */}
                        {/* onContextMenu={this.handleContextMenu} */}
                        {value.column.name}
                        {/* {this.state.visible ? <MyMenu items={this.state.menu} x={this.state.x} y={this.state.y} /> : null} */}
                        {/* {this.state.visible ? <ExampleContextMenu /> : null} */}
                    </div>
                </ContextMenuTrigger>
                <ContextMenu id={`HEADER_MENU_${value.column.name}`}>
                    <MenuItem data={value.column} onClick={(e, data, trigger) => {e.preventDefault(); e.stopPropagation(); console.log(data);}}>
                        Sort Ascending
                </MenuItem>
                    <MenuItem >
                        Save Columns
                </MenuItem>
                    <MenuItem >
                        Demo
                </MenuItem>
                </ContextMenu>
            </div>
        );
    }
}