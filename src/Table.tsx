import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { GridOptions } from "../node_modules/ag-grid-community/dist/lib/entities/gridOptions"
import { ColDef } from "../node_modules/ag-grid-community/dist/lib/entities/colDef"
import players from './players.json'

const columnDefs: ColDef[] = [
    {
        headerName: "Asset ID",
        field: "assetId",
    },
    {
        headerName: "Raiting",
        field: "rating",
    },
    {
        headerName: "Nation",
        field: "nation",
    },
    {
        headerName: "League",
        field: "leagueId",
    },
    {
        headerName: "Team",
        field: "teamid",
    },
    {
        headerName: "Position",
        field: "preferredPosition",
    },
];

const defaultColDef: ColDef = {
    editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true
};

const gridOptions: GridOptions = {
    columnDefs,
    defaultColDef,
    rowSelection: "multiple",
    rowGroupPanelShow: "always",
    pivotPanelShow: "always",
    suppressRowClickSelection: true,
    groupSelectsChildren: true,
    debug: true,
    enableRangeSelection: true,
    paginationAutoPageSize: true,
    pagination: true,
}

export default function Table() {
    return (
        <AgGridReact
            gridOptions={gridOptions}
            rowData={players.itemData}
        />
    );
}