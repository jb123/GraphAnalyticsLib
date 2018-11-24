/*
 * GraphAnalyticsLib Copyright (c)  2018 - 2019 Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Utility Class for processing Javascript Maps
 */

module.exports = class MapUtils {

    static getValues(map)
    {
        let tmpArray = [];

        for (const [key,value] of map) {
            tmpArray.push(value);
        }
    
        return tmpArray;
    }

    static getKeys(map)
    {
        let tmpArray = [];

        for (const [key,value] of map) {
            tmpArray.push(key);
        }
    
        return tmpArray;
    }
}