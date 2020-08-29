import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { GridOptions } from "../node_modules/ag-grid-community/dist/lib/entities/gridOptions"
import { ColDef } from "../node_modules/ag-grid-community/dist/lib/entities/colDef"

import players from './players.json'
import playersMeta from './players-meta.json';

const getPlayersNames = (players) => {
    const pNames = {};
    players.LegendsPlayers.forEach(item => {
        pNames[item.id] = item.c !== undefined ? item.c : `${item.f} ${item.l}`;
    });
    players.Players.forEach(item => {
        pNames[item.id] = item.c !== undefined ? item.c : `${item.f} ${item.l}`;
    });
    return pNames;
};

const parsePlayersNames = (players, playersMeta) => players.itemData.map(i => {
    const newItem = i;
    newItem.assetId = playersMeta[i.assetId]
    return newItem;
});

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
    const pMeta = getPlayersNames(playersMeta);
    const parsdPlayers = parsePlayersNames(players, pMeta);

    return (
        <AgGridReact
            gridOptions={gridOptions}
            rowData={parsdPlayers}
        />
    );
}