/*
 * GraphAnalyticsLib Copyright (c)  2018 - 2019 Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Class defining a Node for the graph
 */
class Node {
//module.exports  = class Node {

	constructor(label) {
	  this.label = label;
	  this.outBoundRelationshipsMap = new Map();
	  this.inBoundRelationshipsMap = new Map(); 
	}	
  
  /**
   * get all outbound relationships
   * of the node for the specified relationship
   */
   getOutBoundRelationships(relationshipType) {
	   return this.outBoundRelationshipsMap.get(relationshipType);
   }

   /**
    * get all inbound relationships of the 
    * node
    */
   getInBoundRelationships(relationshipType) {
	return this.inBoundRelationshipsMap.get(relationshipType);
   }

   /**
    * add outbound relationship
    * @param {Relationship} or 
    */
   addOutBoundRelationship(or)
   { 
       if(this.outBoundRelationshipsMap.get(or.getType()) === undefined)
       {
           this.outBoundRelationshipsMap.set(or.getType(),[or]);
       }
       else
       {
           this.outBoundRelationshipsMap.get(or.getType()).push(or);
       }
	  
   }

   /**
    * add inbound relationship
    * @param {Relationship} ir 
    */
   addInBoundRelationship(ir)
   {
   
       if(this.inBoundRelationshipsMap.get(ir.getType()) === undefined)
       {
           this.inBoundRelationshipsMap.set(ir.getType(),[ir]);
       }
       else
       {
           this.inBoundRelationshipsMap.get(ir.getType()).push(ir);
       }
   }

   /**
    * get Node label
    */
   getLabel()
   {
	   return this.label;
   }

}