import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import dot from 'dot-object';

import { GridOptions } from "../node_modules/ag-grid-community/dist/lib/entities/gridOptions"
import { ColDef } from "../node_modules/ag-grid-community/dist/lib/entities/colDef"


import players from './players.json'
import playersMeta from './players-meta.json';
import locale from './locale_PL.json';

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

const redefineKeys = () =>{

}

const parseLocale = (locale) => {
    let parsedLocale = {};
    let counter = 0;
    Object.keys(locale).forEach((element, index, array) => {
        // if (index > 1500 && index < 2000) {
            let parsedKey = atob(element);
            const nextIndex = index + 1;
            if (nextIndex < array.length) {
                let parsedNextKey = atob(array[nextIndex]);
                const subCheck = `${parsedKey}.`
                // console.log(`check: ${parsedNextKey} / ${subCheck}`);
                if (parsedNextKey.indexOf(subCheck) !== -1) {
                    // console.log(`changed: ${parsedNextKey} / ${subCheck}`);
                    parsedKey += '.defaultLabel';
                }
                // if (parsedLocale.parsedKey) {
                //     console.log(`has property: ${parsedKey}`);
                //     parsedKey += '.next';
                // }
            }
            // const replaceDown = parsedKey.replaceAll("_", ".");
            parsedLocale[parsedKey] = atob(locale[element]);
        // }
    });
    // console.log(parsedLocale);
    dot.object(parsedLocale);
    console.log(parsedLocale);
    return parsedLocale;
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
    parseLocale(locale);
    return (
        <AgGridReact
            gridOptions={gridOptions}
            rowData={parsdPlayers}
        />
    );
}