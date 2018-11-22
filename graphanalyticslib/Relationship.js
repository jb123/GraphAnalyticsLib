/*
 * GraphAnalyticsLib Copyright (c)  2018 - 2019 Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Class defining a relationship in a graph
 */


module.exports = class Relationship {
	
	constructor(id, sourceVertex, destinationVertex, type, attributes) {
		this.id = id;
		this.type = type;
		this.sourceVertex = sourceVertex;
		this.destinationVertex = destinationVertex;
		this.attributes = attributes;  
	}	

	getRelationshipId()
	{
		return this.id;
	}

	getType()
	{
		return this.type;
	}

	/**
	 * each relationship can have attributes
	 * associated with it.
	 */
	getRelationshipAttributes()
	{
		let attributes = JSON.parse(this.attributes);
		return attributes;
	}

	/**
	 * get source vertex of the relationship
	 */
	getSourceVertex()
	{
		return this.sourceVertex;
	}

	/**
	 * get destination vertex of the relationship
	 */
	getDestinationVertex()
	{
		return this.destinationVertex;
	}

}