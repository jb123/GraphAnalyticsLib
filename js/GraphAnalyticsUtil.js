/*
 * GraphAnalyticsLib Copyright (c)  2018 - 2019 Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Utility Class for processing analytical algorithms
 */


class GraphAnalyticsUtil {

    static parsePathMapToGetPathAsArray(sourceVertex,destinationVertex,map)
    {
        let path = [];
        let ancestorNode = destinationVertex;
        while(ancestorNode!=sourceVertex)
        {
            path.push(ancestorNode);
            ancestorNode = map.get(ancestorNode);

        } 
        path.push(ancestorNode);
        return path;
    }

    static parsePathMapToGetAllPathsAsArrayOfVertexSets(sourceVertex, map)
    {
        let path = [];
       
        for (const key of map.keys()) {
            let pathSet = new Set();
            let ancestorNode = key;
            while(ancestorNode!=sourceVertex)
            {
                pathSet.add(ancestorNode);
                ancestorNode = map.get(ancestorNode);
    
            }
            pathSet.add(ancestorNode);
            path.push(pathSet); 

        }

        return path;
    }


    static parsePathMapToGetGeodesicDistance(sourceVertex, destinationVertex, map)
    {
        let geodesicDistance = 0;
        let ancestorNode = destinationVertex;
        while(ancestorNode!=sourceVertex)
        {
            ++geodesicDistance;
            ancestorNode = map.get(ancestorNode);

        } 

        return geodesicDistance;
    }
}