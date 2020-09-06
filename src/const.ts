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

export const parsePlayersNames = (players, playersMeta) => players.itemData.map(i => {
    const newItem = i;
    newItem.assetId = playersMeta[i.assetId]
    return newItem;
});

export const redefineKeys = () =>{

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
