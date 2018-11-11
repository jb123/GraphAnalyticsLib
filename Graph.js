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

	addNode(n)
	{
		this.vertexMap.set(n.getLabel(),n);
		++this.noOfVertices;
		
	}

	addRelationship(relationship)
	{
		++this.noOfEdges;
		let sourceVertex = this.vertexMap.get(relationship.getSourceVertex());
		let destinationVertex =  this.vertexMap.get(relationship.getDestinationVertex());
		sourceVertex.addOutBoundRelationship(relationship);
		destinationVertex.addInBoundRelationship(relationship);		
		
	}

	getNode(node)
	{
		return this.vertexMap.get(node);
	}

	getName()
	{
		return this.name;
	}

	getNoOfEdges()
	{
		return this.noOfEdges;
	}

	getNoOfVertices()
	{
		return this.noOfVertices;
	}

	getVertexMap()
	{
		return this.vertexMap;
	}


}