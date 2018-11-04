
/*
 * GraphAnalyticsLib (C) 2018 - 2019 - Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Class defining the analytical algorithms for the Graph 
 */


class GraphAnalyticsLib {

    static shortestPathToDestinationNode (graph,sourceVertex,destinationVertex,cost)
    {
        let shortesPathToAllNodesResponse = GraphAnalyticsLib.shortestPathToAllNodes(graph,sourceVertex,cost);
        shortesPathToAllNodesResponse.shortestPathToDestinationNode = GraphAnalyticsUtil.parsePathMapToGetPathAsArray(sourceVertex,destinationVertex,shortesPathToAllNodesResponse.PathMap) ;
        return shortesPathToAllNodesResponse;
    }

    static shortestPathToAllNodes (graph, sourceVertex,cost)
    {
       let vertexMap = graph.getVertexMap();
       let shortestPathMap = new Map();

       let sourceNode = graph.getNode(sourceVertex);
       let visitedVertices = new Set();
       let vertexCostMinHeap = new PriorityQueue();
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
                if(vertexCostMinHeap.exists(destinationVertex)==false)
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

        return { "sourceVertex":sourceVertex,
                 "DistanceToEachNode": visitedVertices,
                 "PathMap":  shortestPathMap   
        };
    }
    
    static printGraph (graph)
    {
        for (const [label, node] of graph.getVertexMap()) {
           console.log("label"+ label+", node outbound "+node.getOutBoundRelationships()[0]+" node inbound"+node.getInBoundRelationships());
        }
    }

    static degreeCentrality (graph)
    {
        let vertexMap = graph.getVertexMap();
        let response = [];
        let degreeCentralityForANode = {}
        for (const [label, node] of vertexMap) {
            let degreeCentralityForANode = {
                node_label : label,
                inBound : (node.getInBoundRelationships()).length,
                outBound: (node.getOutBoundRelationships()).length                                      
            };

         response.push(degreeCentralityForANode);
        }
    
        return response;
    }

    static closenessCentralityMeasure (sourceVertex, graph, cost)
    {
        let shortestPathToAllNodesResponse = GraphAnalyticsLib.shortestPathToAllNodes(graph,sourceVertex,cost);
        let rawDistanceFromAllNodes = 0;
        let vertexMap = graph.getVertexMap();
        for (const [label, node] of vertexMap) {
            if(sourceVertex != label)
            {
                rawDistanceFromAllNodes = rawDistanceFromAllNodes + GraphAnalyticsUtil.parsePathMapToGetGeodesicDistance(sourceVertex,label,shortestPathToAllNodesResponse.PathMap)
            }
        }

        let closenessCentralityMeasure = 1/rawDistanceFromAllNodes;

        return {
            "rawDistanceFromAllNodes" : rawDistanceFromAllNodes,
            "closenessCentralityMeasure" : closenessCentralityMeasure
        };

    }

    static inBetweenCentrality(sourceVertex, graph, cost)
    {
        let vertexMap = graph.getVertexMap();
        let inBetweenCentralitySetArray =  [];
        for (const [label, node] of vertexMap) {
           
           let shortestPathToAllNodesResponse = GraphAnalyticsLib.shortestPathToAllNodes(graph,label,cost);            
           let verticesPathSetArray = GraphAnalyticsUtil.parsePathMapToGetAllPathsAsArrayOfVertexSets(label,shortestPathToAllNodesResponse.PathMap);
           inBetweenCentralitySetArray.push(verticesPathSetArray);
        }
        var sourceVertexPathScore = 0; 
        var totalNoOfPaths = 0;
        for(var i=0;i<inBetweenCentralitySetArray.length;++i)
        {
            var vertexSetArray = inBetweenCentralitySetArray[i];
            totalNoOfPaths = totalNoOfPaths+vertexSetArray.length;

            for(var j=0;j<vertexSetArray.length;++j)
            {
                var verticesSet = vertexSetArray[j];
                if(verticesSet.has(sourceVertex))
                {
                    ++sourceVertexPathScore;
                }

            }
        }
        
        return {
            "inBetweenCentrality":inBetweenCentralitySetArray,
            "inBetweenCentralityScore":sourceVertexPathScore/totalNoOfPaths,
            "totalPaths":totalNoOfPaths
        };
    }

    static eccentricityMeasure(sourceVertex,graph,cost)
    {
        let shortestPathToAllNodesResponse = GraphAnalyticsLib.shortestPathToAllNodes(graph,sourceVertex,cost);
        let maxDistanceFromAllNodes = 0;
        let vertexMap = graph.getVertexMap();
        for (const [label, node] of vertexMap) {
            if(sourceVertex != label)
            {
                maxDistanceFromAllNodes = Math.max(maxDistanceFromAllNodes, GraphAnalyticsUtil.parsePathMapToGetGeodesicDistance(sourceVertex,label,shortestPathToAllNodesResponse.PathMap));
            }
        }


        return {
            "eccentricityMeasure" : maxDistanceFromAllNodes
        };
    }

}