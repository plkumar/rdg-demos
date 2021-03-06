import React, { useState, setState } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { Menu, DraggableHeader, DraggableContainer } from "react-data-grid-addons";
import createRowData, { createFakeRow } from "./createRowData";
import { MyRowHeader } from "./MyRowHeader"
import { ExampleContextMenu } from "./ExampleContextMenu"
import "./styles.css";

const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;
const defaultColumnProperties = {
  sortable: true,
  resizable: true,
  filterable: true,
  width: 120
};

function MyDraggableCell ()
{
  return(
    <div>
      Test
    </div>
  )
}

function RowSelectFormatter ({ value }) {
  return <input type="checkbox" id="isSelected" checked={value} />;
};

function FirstRowHeader({value}){
  let onHeaderClick = (e)=>{
    e.stopPropagation();
    console.log(e);
  };

  return (
    <div>
                <ContextMenuTrigger id="HEADER_SELECTOR">
                <div ><input type="checkbox" onClick={onHeaderClick} /></div>
                </ContextMenuTrigger>
                <ContextMenu id={`HEADER_SELECTOR`}>
                    <MenuItem  >
                        Sort Ascending
                    </MenuItem>
                    <MenuItem  >
                        Sort Descending
                    </MenuItem>
                </ContextMenu>
            </div>
    
  );
}

const columns = [
  {
    key: "selected",
    name: "Select",
    sortDescendingFirst: true,
    formatter: RowSelectFormatter,
    headerRenderer: <FirstRowHeader />, 
  },
  {
    key: "id",
    name: "ID",
    sortDescendingFirst: true,
  },
  {
    key: "title",
    name: "Title",
    headerRenderer: <MyRowHeader />,
    draggableHeaderCell: <MyDraggableCell />
  },
  {
    key: "firstName",
    name: "First Name",
    headerRenderer: <MyRowHeader />
  },
  {
    key: "lastName",
    name: "Last Name"
  },
  {
    key: "email",
    name: "Email"
  },
  {
    key: "street",
    name: "Street"
  },
  {
    key: "zipCode",
    name: "ZipCode"
  },
  {
    key: "date",
    name: "Date"
  },
  {
    key: "jobTitle",
    name: "Job Title"
  },
  {
    key: "catchPhrase",
    name: "Catch Phrase"
  },
  {
    key: "jobArea",
    name: "Job Area"
  },
  {
    key: "jobType",
    name: "Job Type"
  }
].map((c) => ({ ...c, ...defaultColumnProperties }));

const ROW_COUNT = 50;

const deleteRow = (rowIdx) => (rows) => {
  const nextRows = [...rows];
  nextRows.splice(rowIdx, 1);
  return nextRows;
};

const insertRow = (rowIdx) => (rows) => {
  const newRow = createFakeRow("-");
  const nextRows = [...rows];
  nextRows.splice(rowIdx, 0, newRow);
  return nextRows;
};

const sortRows = (initialRows, sortColumn, sortDirection) => (rows) => {
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

function onHeaderDrop(source, target) {
  // const stateCopy = Object.assign({}, this.state);
  // const columnSourceIndex = this.state.columns.findIndex(
  //   i => i.key === source
  // );
  // const columnTargetIndex = this.state.columns.findIndex(
  //   i => i.key === target
  // );

  // stateCopy.columns.splice(
  //   columnTargetIndex,
  //   0,
  //   stateCopy.columns.splice(columnSourceIndex, 1)[0]
  // );

  // const emptyColumns = Object.assign({}, this.state, { columns: [] });
  // this.setState(emptyColumns);

  // const reorderedColumns = Object.assign({}, this.state, {
  //   columns: stateCopy.columns
  // });
  // this.setState(reorderedColumns);
};

function Example({ initialRows }) {
  const [rows, setRows] = useState(initialRows);

  return (
    //<DraggableContainer onHeaderDrop={onHeaderDrop}>
      <ReactDataGrid
        columns={columns}
        rowGetter={(i) => rows[i]}
        rowsCount={ROW_COUNT}
        minHeight={500}
        onGridSort={(sortColumn, sortDirection) =>
          setRows(sortRows(initialRows, sortColumn, sortDirection))
        }
        contextMenu={
          <ExampleContextMenu
            onRowDelete={(e, { rowIdx }) => setRows(deleteRow(rowIdx))}
            onRowInsertAbove={(e, { rowIdx }) => setRows(insertRow(rowIdx))}
            onRowInsertBelow={(e, { rowIdx }) => setRows(insertRow(rowIdx + 1))}
          />
        }
        onColumnResize={(idx, width) =>
          console.log(`Column ${idx} has been resized to ${width}`)
        }
        RowsContainer={ContextMenuTrigger}
      />
    //</DraggableContainer>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Example initialRows={createRowData(50)} />, rootElement);
