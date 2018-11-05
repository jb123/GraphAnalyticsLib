
/*
 * GraphAnalyticsLib (C) 2018 - 2019 - Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Class defining the analytical algorithms for the Graph 
 */


class GraphAnalyticsLib {

    /**
     *  This function calculates the shortest path from a source Vertex
     *  to a destination vertex using the djikstra's algorithm
     * @param {Graph} graph 
     * @param {String} sourceVertex label
     * @param {String} destinationVertex label
     * @param {String} cost 
     */
    static shortestPathToDestinationNode (graph,sourceVertex,destinationVertex,cost)
    {
        const shortesPathToAllNodesResponse = GraphAnalyticsLib.shortestPathToAllNodes(graph,sourceVertex,cost);
        shortesPathToAllNodesResponse.shortestPathToDestinationNode = GraphAnalyticsUtil.parsePathMapToGetPathAsArray(sourceVertex,destinationVertex,shortesPathToAllNodesResponse.PathMap) ;
        return shortesPathToAllNodesResponse;
    }

    /**
     * This function is the djikstra's algorithm to calculate shortest paths from
     * a single source
     * 
     * @param {Graph} graph 
     * @param {String} sourceVertex 
     * @param {String} cost 
     */
    static shortestPathToAllNodes (graph, sourceVertex,cost)
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
            let outBoundRelationships = graphNode.getOutBoundRelationships();
            
            for(let rel of outBoundRelationships)
            {
                let destinationVertex = rel.getDestinationVertex();
                if(vertexCostMinHeap.exists(destinationVertex) == false)
                    continue;

                let newCost = minNode.priority + rel.attributes.cost;

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
           console.log("label"+ label+", node outbound "+node.getOutBoundRelationships()[0]+" node inbound"+node.getInBoundRelationships());
        }
    }

    /**
     * This function calculates the outdegree and indegree centrality measure of all the nodes of a graph
     * @param {Graph} graph 
     */
    static degreeCentrality (graph)
    {
        const vertexMap = graph.getVertexMap();
        const degreeCentralityResponse = [];

        for (const [label, node] of vertexMap) {
            let degreeCentralityForANode = {
                "node_label" : label,
                "inDegreeCentrality"  : (node.getInBoundRelationships()).length,
                "outDegreeCentrality" : (node.getOutBoundRelationships()).length                                      
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
     * @param {String} cost 
     */
    static closenessCentralityMeasure (sourceVertex, graph, cost)
    {
        const shortestPathToAllNodesResponse = GraphAnalyticsLib.shortestPathToAllNodes(graph,sourceVertex,cost);
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
     * @param {String} cost 
     */
    static inBetweenCentrality(sourceVertex, graph, cost)
    {
        const vertexMap = graph.getVertexMap();
        const inBetweenCentralitySetArray =  [];
        for (const [label, node] of vertexMap) {
           
           let shortestPathToAllNodesResponse = GraphAnalyticsLib.shortestPathToAllNodes(graph,label,cost);            
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
     * @param {String} cost 
     */
    static eccentricityMeasure(sourceVertex,graph,cost)
    {
        const shortestPathToAllNodesResponse = GraphAnalyticsLib.shortestPathToAllNodes(graph,sourceVertex,cost);
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

}