/*
 * GraphAnalyticsLib (C) 2018 Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Class defining a Node for the graph
 */

class Node {

	constructor(label) {
	  this.label = label;
	  this.outBoundRelationships = [];
	  this.inBoundRelationships = []; 
	}	
  
   getOutBoundRelationships() {
	   return this.outBoundRelationships;
   }

   getInBoundRelationships() {
	return this.inBoundRelationships;
   }

   addOutBoundRelationship(or)
   {
	   this.outBoundRelationships.push(or);
   }

   addInBoundRelationship(ir)
   {
	   this.inBoundRelationships.push(ir);
   }

   getLabel()
   {
	   return this.label;
   }

}