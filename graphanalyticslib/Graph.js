/*
 * GraphAnalyticsLib Copyright (c) 2018 - 2019 Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Class defining a graph. This class is responsible for manipulating/managing a graph
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
	 * This function removes the node from a graph given its label
	 * @param {String} nodeLabel 
	 */
	removeNode(nodeLabel)
	{
		if(!this.vertexMap.has(nodeLabel))
		{
			return false;
		}


	    let nodeToRemove = this.vertexMap.get(nodeLabel);
	    let allInboundRelationships = nodeToRemove.getAllInBoundRelationships();
	    let allOutboundRelationships = nodeToRemove.getAllOutBoundRelationships();

		for(var i=0; i < allInboundRelationships.length; ++i)
		{
		    this.removeRelationship(allInboundRelationships[i]);
		}

		for(var i=0; i < allOutboundRelationships.length; ++i)
		{
		    this.removeRelationship(allOutboundRelationships[i]);
		}
		
		this.vertexMap.delete(nodeLabel);
		
		return true;

	 
	}


	/**
	 * This function adds a relationship (edge along with its associated attributes)
	 * to the graph.The pre-requisite to add a relationship to the graph is that both
	 * its source and destination vertex/nodes should be present in the graph.
	 * 
	 * @param {Relationship} relationship 
	 */
	addRelationship(relationship)
	{
		if(!validateRelationshipVertices(relationship))
		{
			return false;
		}

		++this.noOfEdges;
		let sourceVertex = this.vertexMap.get(relationship.getSourceVertex());
		let destinationVertex =  this.vertexMap.get(relationship.getDestinationVertex());
		sourceVertex.addOutBoundRelationship(relationship);
		destinationVertex.addInBoundRelationship(relationship);		
		return true;
		
	}
	
	/**
	 * This function removes a relationship from a graph.The pre-requisite to remove a relationship
	 * is that the relationship should exist in the Graph
	 * 
	 * @param {Relationship} relationship 
	 */
	removeRelationship(relationship)
	{
		if(!validateRelationshipVertices(relationship))
		{
			return false;
		}

		--this.noOfEdges;
		let sourceVertex = this.vertexMap.get(relationship.getSourceVertex());
		let destinationVertex =  this.vertexMap.get(relationship.getDestinationVertex());
		sourceVertex.removeOutBoundRelationship(relationship);
		destinationVertex.removeInBoundRelationship(relationship);	

	}

	/**
	 * This function validates if aboth the vertices of a relationship
	 * exists in the graph
	 * @param {Relationship} relationship 
	 */
	validateRelationshipVertices(relationship)
	{
		if(this.vertexMap.has(relationship.getSourceVertex()) && this.vertexMap.has(relationship.getDestinationVertex()))
			return true;
		else
		    return false;	 
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