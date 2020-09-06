import dot from 'dot-object';

import players from './data/players.json'
import playersMeta from './data/players-meta.json';
import locale from './data/locale_PL.json';

export const getPlayersNames = (players) => {
    const pNames = {};
    players.LegendsPlayers.forEach(item => {
        pNames[item.id] = item.c !== undefined ? item.c : `${item.f} ${item.l}`;
    });
    players.Players.forEach(item => {
        pNames[item.id] = item.c !== undefined ? item.c : `${item.f} ${item.l}`;
    });
    return pNames;
};


export const redefineKeys = () => {

}

export const parseLocale = (locale) => {
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

interface NationName {
    [key: string]: string,
};

interface Search {
    nationName: NationName,
};

interface Locale {
    search: Search,
};

interface FullNationNames {
    [key: string]: string,
};

export const getFullNationNames = (parsedLocale: Locale): FullNationNames => {
    const { nationName } = parsedLocale.search;
    const fullNationName: FullNationNames = {};
    Object.keys(nationName).map((val: string) => { fullNationName[val.substring(6)] = nationName[val]; });
    return fullNationName;
};

export const parseRawData = (players, playersMeta, fullNationNames: FullNationNames) => players.itemData.map(i => {
    const newItem = i;
    // parsePlayersNames
    newItem.assetId = playersMeta[i.assetId];
    newItem.nation = fullNationNames[i.nation]
    return newItem;
});

export const getMyClubPlayers = () => {
    const pMeta = getPlayersNames(playersMeta);
    const parsed: Locale = parseLocale(locale);
    // console.log(players);
    const fullNationNames = getFullNationNames(parsed);
    return parseRawData(players, pMeta, fullNationNames);
};
