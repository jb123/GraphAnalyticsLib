
/*
 * GraphAnalyticsLib Copyright (c)  2018 - 2019 - Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Class defining the analytical algorithms for the Graph 
 */


module.exports = class GraphAnalyticsLib {
    	  
    /**
     *  This function calculates the shortest path from a source Vertex
     *  to a destination vertex using the djikstra's algorithm
     * @param {Graph} graph 
     * @param {String} sourceVertex label
     * @param {String} destinationVertex label
     * @param {String} relationshipType label
     * @param {String} attribute of the relationship 
     */
    static shortestPathToDestinationNode (graph,sourceVertex,destinationVertex,relationshipType,attribute)
    {
        const shortesPathToAllNodesResponse = GraphAnalyticsLib.shortestPathToAllNodes(graph,sourceVertex,relationshipType,attribute);
        shortesPathToAllNodesResponse.shortestPathToDestinationNode = GraphAnalyticsUtil.parsePathMapToGetPathAsArray(sourceVertex,destinationVertex,shortesPathToAllNodesResponse.PathMap) ;
        return shortesPathToAllNodesResponse;
    }

    /**
     * This function is the djikstra's algorithm to calculate shortest paths from
     * a single source
     * 
     * @param {Graph} graph 
     * @param {String} sourceVertex 
     * @param {String} relationshipType label
     * @param {String} attribute of the relationship
     */
    static shortestPathToAllNodes (graph, sourceVertex,relationshipType, attribute)
    {
       const vertexMap = graph.getVertexMap();
       const shortestPathMap = new Map();
       const sourceNode = graph.getNode(sourceVertex);
       const visitedVertices = new Set();
       const vertexCostMinHeap = new PriorityQueue();

       for (const [label, node] of vertexMap) {
           if (sourceVertex === label)
                vertexCostMinHeap.addNode(label,0);
           else
                vertexCostMinHeap.addNode(label,Number.POSITIVE_INFINITY);                                       
                shortestPathMap.set(label,[]);   
        }

        let minNode = vertexCostMinHeap.removeNode();
        while(minNode!=null)
        {
            let graphNode = vertexMap.get(minNode.value);
            visitedVertices.add(minNode);
            let outBoundRelationships = graphNode.getOutBoundRelationships(relationshipType);
            
            for(let rel of outBoundRelationships)
            {
                let destinationVertex = rel.getDestinationVertex();
                if(vertexCostMinHeap.exists(destinationVertex) == false)
                    continue;

                let newCost = minNode.priority + rel.attributes[attribute];

                if(newCost<(vertexCostMinHeap.getNode(destinationVertex)).priority)
                {
                    shortestPathMap.set(destinationVertex,minNode.value);
                    vertexCostMinHeap.decreasePriority(destinationVertex,newCost);
                }
            }
            minNode = vertexCostMinHeap.removeNode();
        }

        return { "node_label":sourceVertex,
                 "DistanceToEachNode": visitedVertices,
                 "PathMap":  shortestPathMap   
        };
    }
    
    /**
     * Prints the Graph object
     * @param {Graph} graph 
     */
    static printGraph (graph)
    {
        for (const [label, node] of graph.getVertexMap()) {
           console.log("label"+ label);
        }
    }

    /**
     * This function calculates the outdegree and indegree centrality measure of all the nodes of a graph
     * @param {Graph} graph 
     * @param {String} relationshipType label
     */
    static degreeCentrality (graph,relationshipType)
    {
        const vertexMap = graph.getVertexMap();
        const degreeCentralityResponse = [];

        for (const [label, node] of vertexMap) {
            let degreeCentralityForANode = {
                "node_label" : label,
                "inDegreeCentrality"  : (node.getInBoundRelationships(relationshipType)).length,
                "outDegreeCentrality" : (node.getOutBoundRelationships(relationshipType)).length                                      
            };

         degreeCentralityResponse.push(degreeCentralityForANode);
        }
    
        return degreeCentralityResponse;
    }

    /**
     * This function calculates closeness Centrality Measure of a vertex in a graph based on the relationship
     * attribute (cost in this case)
     * 
     * @param {String} sourceVertex 
     * @param {Graph} graph 
     * @param {String} relationshipType label
     * @param {String} attribute of the relationship
     */
    static closenessCentralityMeasure (sourceVertex, graph, relationshipType, attribute)
    {
        const shortestPathToAllNodesResponse = GraphAnalyticsLib.shortestPathToAllNodes(graph, sourceVertex, relationshipType, attribute);
        let rawDistanceFromAllNodes = 0;
        const vertexMap = graph.getVertexMap();
        
        for (const [label, node] of vertexMap) {
            if(sourceVertex != label)
            {
                rawDistanceFromAllNodes = rawDistanceFromAllNodes + GraphAnalyticsUtil.parsePathMapToGetGeodesicDistance(sourceVertex,label,shortestPathToAllNodesResponse.PathMap)
            }
        }

        const closenessCentralityMeasure = 1/rawDistanceFromAllNodes;

        return {
            "node_label" : sourceVertex,
            "rawDistanceFromAllNodes" : rawDistanceFromAllNodes,
            "closenessCentralityMeasure" : closenessCentralityMeasure
        };

    }

    /**This function calculates the In-Between Centrality measure of a vertex in a graph based on the relationship
     * attribute (cost in this case)
     * 
     * @param {String} sourceVertex 
     * @param {Graph} graph 
     * @param {String} relationshipType label
     * @param {String} attribute of the relationship 
     */
    static inBetweenCentrality(sourceVertex, graph, relationshipType, attribute)
    {
        const vertexMap = graph.getVertexMap();
        const inBetweenCentralitySetArray =  [];
        for (const [label, node] of vertexMap) {
           
           let shortestPathToAllNodesResponse = GraphAnalyticsLib.shortestPathToAllNodes(graph,label,relationshipType, attribute);            
           let verticesPathSetArray = GraphAnalyticsUtil.parsePathMapToGetAllPathsAsArrayOfVertexSets(label,shortestPathToAllNodesResponse.PathMap);
           inBetweenCentralitySetArray.push(verticesPathSetArray);
        }
        let sourceVertexPathScore = 0; 
        let totalNoOfPaths = 0;
        for(var i=0;i<inBetweenCentralitySetArray.length;++i)
        {
            let vertexSetArray = inBetweenCentralitySetArray[i];
            totalNoOfPaths = totalNoOfPaths+vertexSetArray.length;

            for(var j=0;j<vertexSetArray.length;++j)
            {
                let verticesSet = vertexSetArray[j];
                if(verticesSet.has(sourceVertex))
                {
                    ++sourceVertexPathScore;
                }

            }
        }
        
        return {
            "node_label" : sourceVertex,
            "inBetweenCentrality":inBetweenCentralitySetArray,
            "inBetweenCentralityScore":sourceVertexPathScore/totalNoOfPaths,
            "totalPaths":totalNoOfPaths
        };
    }

    /**
     * This function calculates the eccentricity measure of a vertex in a graph
     * based on the relationship attribute (cost in this case)
     * 
     * @param {String} sourceVertex 
     * @param {Graph} graph 
     * @param {String} relationshipType label
     * @param {String} attribute of the relationship
     */
    static eccentricityMeasure(sourceVertex,graph,relationshipType, attribute)
    {
        const shortestPathToAllNodesResponse = GraphAnalyticsLib.shortestPathToAllNodes(graph,sourceVertex,relationshipType, attribute);
        let maxDistanceFromAllNodes = 0;
        const vertexMap = graph.getVertexMap();
        
        for (const [label, node] of vertexMap) {
            if(sourceVertex != label)
            {
                maxDistanceFromAllNodes = Math.max(maxDistanceFromAllNodes, GraphAnalyticsUtil.parsePathMapToGetGeodesicDistance(sourceVertex,label,shortestPathToAllNodesResponse.PathMap));
            }
        }


        return {
            "node_label" : sourceVertex,
            "eccentricityMeasure" : maxDistanceFromAllNodes
        };
    }

    /**
     * 
     * @param {String} nodeLabel 
     * @param {Graph} graph 
     * @param {String} relationshipType 
     * @param {Integer} convergenceIterationValue 
     * @param {Float} dampFactor 
     */
    static pageRankForANode(nodeLabel, graph, relationshipType, convergenceIterationValue, dampFactor)
    {
        const pageRankResponse = GraphAnalyticsLib.pageRank(graph, relationshipType, convergenceIterationValue, dampFactor);
        return pageRankResponse.pageRankMeasure.get(nodeLabel);
    }

    /**
     * 
     * @param {Graph} graph 
     * @param {String} relationshipType 
     * @param {Integer} convergenceIterationValue 
     * @param {Float} dampFactor 
     */
    static pageRank(graph, relationshipType, convergenceIterationValue, dampFactor)
    {
        const vertexMap = graph.getVertexMap();
        let nodeToPageRankMap = new Map();
        const initialSeedRank = 1.0/graph.noOfVertices;

        for (const [label, node] of vertexMap) {
            nodeToPageRankMap.set(label, initialSeedRank);
         }

        for(var i=0 ; i < convergenceIterationValue ;++i)
        { 
            let tempNodeToRankMap = new Map();
            for (const [label, node] of vertexMap) {
                let inBoundRelationships = node.getInBoundRelationships(relationshipType);
                let contributionComponentSummation = 0.0;
                for(let rel of inBoundRelationships)
                {
                    let neighborNode = vertexMap.get(rel.getSourceVertex());
                    let neighborNodeTotalOutboundRelationships = (neighborNode.getOutBoundRelationships(relationshipType)).length;
                    contributionComponentSummation = contributionComponentSummation +  (dampFactor * 1.0) * (parseFloat(nodeToPageRankMap.get(rel.getSourceVertex()) / neighborNodeTotalOutboundRelationships));
                }
                let calculatedPageRank = ((1.0 - dampFactor) / graph.noOfVertices) + contributionComponentSummation;
                tempNodeToRankMap.set(label, calculatedPageRank.toFixed(6));
            }
            nodeToPageRankMap = tempNodeToRankMap;
        }
        
        return {
            "pageRankMeasure" : nodeToPageRankMap
        };
       
    }


}