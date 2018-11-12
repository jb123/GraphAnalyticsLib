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
	 * @param {Node} n node of the graph 
	 */
	addNode(n)
	{
		this.vertexMap.set(n.getLabel(),n);
		++this.noOfVertices;
		
	}
	
	/**
	 * 
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