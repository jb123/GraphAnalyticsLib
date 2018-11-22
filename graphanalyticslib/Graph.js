/*
 * GraphAnalyticsLib Copyright (c) 2018 - 2019 Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Class defining a graph
 */

module.exports = class Graph {

	constructor(label) {
		this.label = label;
		this.noOfVertices=0;
	    this.noOfEdges=0;
		this.vertexMap = new Map();	
	}
	
	/**
	 * 
	 * @param {String} label of the node of the graph 
	 */
	addNode(nodeLabel)
	{
		if(this.vertexMap.has(nodeLabel))
		{
			return false;
		}

		let n = new Node(nodeLabel);
		this.vertexMap.set(n.getLabel(),n);
		++this.noOfVertices;

		return true;
		
	}
	
	
	/**
	 * This function adds a relationship (edge along with its associated attributes)
	 * to the graph.The pre-requisite to add a relationship to the graph is that both
	 * its source and destination vertex/nodes should be present in the graph.
	 * @param {Relationship} relationship 
	 */
	addRelationship(relationship)
	{
		++this.noOfEdges;
		let sourceVertex = this.vertexMap.get(relationship.getSourceVertex());
		let destinationVertex =  this.vertexMap.get(relationship.getDestinationVertex());
		sourceVertex.addOutBoundRelationship(relationship);
		destinationVertex.addInBoundRelationship(relationship);		
		
	}
	
	/**
	 * 
	 * @param {String} nodeLabel 
	 */
	getNode(nodeLabel)
	{
		return this.vertexMap.get(nodeLabel);
	}

	/**
	 * Get name of the graph
	 */
	getName()
	{
		return this.name;
	}

	/**
	 * get number of edges in the graph
	 */
	getNoOfEdges()
	{
		return this.noOfEdges;
	}

	/**
	 * get number of vertices in the graph
	 */
	getNoOfVertices()
	{
		return this.noOfVertices;
	}

	/**
	 * get graph vertex map
	 */
	getVertexMap()
	{
		return this.vertexMap;
	}


}