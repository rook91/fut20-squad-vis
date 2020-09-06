import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { GridOptions } from "ag-grid-community/dist/lib/entities/gridOptions"
import { ColDef } from "ag-grid-community/dist/lib/entities/colDef"
import { getPlayersNames, parsePlayersNames, parseLocale } from '../const';

const defaultColDef: ColDef = {
    editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true
};

const columnDefs: ColDef[] = [
    {
        headerName: "Name",
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
    // const pMeta = getPlayersNames(playersMeta);
    // const parsdPlayers = parsePlayersNames(players, pMeta);
    // parseLocale(locale);

    
    // rowData={parsdPlayers}
    return (
        <AgGridReact
            gridOptions={gridOptions}
            rowData={[]}
        />
    );
}