import React from "react";
import { Menu } from "react-data-grid-addons";
import "./styles.css";

const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;

export class MyRowHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    handleContextMenu = (event) => {
        var self = this
        event.preventDefault();
        console.log(
            "Contextmenu : " + JSON.stringify(event)
        );
    };

    onClick = (event) => {

    }

    render() {
        const value = this.props;
        return (
            <div>
                <ContextMenuTrigger id={`HEADER_MENU_${value.column.name}`}>
                    <div>
                        {value.column.name}
                    </div>
                </ContextMenuTrigger>
                <ContextMenu id={`HEADER_MENU_${value.column.name}`}>
                    <MenuItem data={value.column} onClick={(e, data, trigger) => {e.preventDefault(); e.stopPropagation(); console.log(data);}}>
                        Sort Ascending
                    </MenuItem>
                    <MenuItem data={value.column} onClick={(e, data, trigger) => {e.preventDefault(); e.stopPropagation(); console.log(data);}}>
                        Sort Descending
                    </MenuItem>
                    <MenuItem >
                        Save Columns
                    </MenuItem>
                    {/* <MenuItem >
                        Demo
                    </MenuItem> */}
                </ContextMenu>
            </div>
        );
    }
}