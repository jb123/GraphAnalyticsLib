/*
 * GraphAnalyticsLib (C) 2018 - 2019 Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Class defining a relationship in a graph
 */


class Relationship {

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

	getRelationshipAttributes()
	{
		let attributes = JSON.parse(this.attributes);
		return attributes;
	}

	getSourceVertex()
	{
		return this.sourceVertex;
	}

	getDestinationVertex()
	{
		return this.destinationVertex;
	}

}