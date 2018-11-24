/*
 * GraphAnalyticsLib Copyright (c)  2018 - 2019 Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Class defining a Node for the graph and its corresponding functions.
 * 
 */

module.exports  = class Node {

    constructor(label) {
	  this.label = label;
	  this.outBoundRelationshipsMap = new Map();
      this.inBoundRelationshipsMap = new Map();
	}	
  
  /**
   * get all outbound relationships
   * of the node for the specified relationship type
   */
   getOutBoundRelationshipsByRelationshipType(relationshipType) {
       return MapUtils.getValues(this.outBoundRelationshipsMap.get(relationshipType));
   }


    /**
    * get all inbound relationships of the 
    * node for the specified relationship type
    */
   getInBoundRelationshipsByRelationshipType(relationshipType) {
    return MapUtils.getValues(this.inBoundRelationshipsMap.get(relationshipType));
   }


   /**
    * get all Out edges/relationships for the node
    */
   getAllOutBoundRelationships() {
    let allOutBoundRelationships = [];
    let outBoundRelationshipsMap = this.outBoundRelationshipsMap;

    for (const [relationshipType, relationshipsMap] of outBoundRelationshipsMap) {
        let v = MapUtils.getValues(relationshipsMap);
        allOutBoundRelationships.push.apply(allOutBoundRelationships,v);
    }
    
    return allOutBoundRelationships;
   }

   /**
    * get all In edges/relationships for the node
    */
   getAllInBoundRelationships() {
    let allInBoundRelationships = [];
    let inBoundRelationshipsMap = this.inBoundRelationshipsMap;

    for (const [relationshipType, relationshipsMap] of inBoundRelationshipsMap) {
        let v = MapUtils.getValues(relationshipsMap);
        allInBoundRelationships.push.apply(allInBoundRelationships, v);
    }
    
    return allInBoundRelationships;
   }

   /**
    * This function adds an outbound relationship to the node.
    * Do Not directly call this function on a Node object to create a relationship, instead
    * create relationships using the Graph object and functions in the Graph module.
    * @param {Relationship} or 
    */
   addOutBoundRelationship(or)
   { 
       if(this.outBoundRelationshipsMap.get(or.getType()) === undefined)
       {
            let relationshipIdToRelationshipMap = new Map();
            relationshipIdToRelationshipMap.set(or.getRelationshipId(),or);
            this.outBoundRelationshipsMap.set(or.getType(),relationshipIdToRelationshipMap);
       }
       else
       {
           this.outBoundRelationshipsMap.get(or.getType()).set(or.getRelationshipId(),or);
       }
	  
   }

   /**
    * This function adds an inbound relationship to the node.
    * Do Not directly call this function on a Node object to create a relationship, instead
    * create relationships using the graph object  and functions in the Graph module to
    * add inbound relationship
    * @param {Relationship} ir 
    */
   addInBoundRelationship(ir)
   {
   
       if(this.inBoundRelationshipsMap.get(ir.getType()) === undefined)
       {
           let relationshipIdToRelationshipMap = new Map();
           relationshipIdToRelationshipMap.set(ir.getRelationshipId(),ir);
           this.inBoundRelationshipsMap.set(ir.getType(),relationshipIdToRelationshipMap);
       }
       else
       {
           this.inBoundRelationshipsMap.get(ir.getType()).set(ir.getRelationshipId(),ir);
       }
   }


   /**
    * This function removes an outbound relationship from a node
    * 
    * Do Not directly call this function on a Node object to delete/remove a relationship, instead
    * delete/remove relationships using the graph object  and functions in the Graph module
    * 
    * @param {Relationship} or 
    */
   removeOutBoundRelationship(or)
   {
       this.outBoundRelationshipsMap.get(or.getType()).delete(or.getRelationshipId());
   }

   /**
    * This function removes an inbound relationship from a node
    * 
    * Do Not directly call this function on a Node object to delete/remove a relationship, instead
    * delete/remove relationships using the graph object  and functions in the Graph module
    * 
    * @param {Relationship} ir 
    */
   removeInBoundRelationship(ir)
   {
       this.inBoundRelationshipsMap.get(ir.getType()).delete(ir.getRelationshipId());
   }



   /**
    * get Node label
    */
   getLabel()
   {
	   return this.label;
   }

}