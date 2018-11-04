/*
 * GraphAnalyticsLib (C) 2018 - 2019 Jatin Bhasin.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Priority Queue for processing the shortest path analytical algorithms
 */



class PQNode {
    constructor(value, priority) {
      this.value = value;
      this.priority = priority;
    }
  }


class PriorityQueue {
    
    constructor()
    {
         this.queue = [null];
         this.posMap = new Map();
    }

    addNode(value,priority)
    {
        const newNode = new PQNode(value, priority);
        this.queue.push(newNode);
        let currentNodeIdx = this.queue.length - 1;
        this.posMap.set(newNode.value,currentNodeIdx);
        let currentNodeParentIdx = Math.floor(currentNodeIdx / 2);
        while (this.queue[currentNodeParentIdx] && newNode.priority < this.queue[currentNodeParentIdx].priority) 
        {
          const parent = this.queue[currentNodeParentIdx];
          this.queue[currentNodeParentIdx] = newNode;
          this.queue[currentNodeIdx] = parent;
          this.posMap.set(parent.value,currentNodeIdx);
          currentNodeIdx = currentNodeParentIdx;
          this.posMap.set(newNode.value,currentNodeIdx);
          currentNodeParentIdx = Math.floor(currentNodeIdx / 2);
        }
    }

    getElement(pos)
    {
        if(pos<0)
            return null;

        return this.queue[pos];
    }

    exists(nodeLabel)
    {
        if(this.posMap.get(nodeLabel)!=undefined)
            return true;
        else
            return false;
    }

    getSize()
    {
        return this.queue.length;
    }

    getNode(nodeLabel)
    {
        let pos = this.posMap.get(nodeLabel);
        return this.queue[pos];
    }

   decreasePriority(toDecreaseNodeLabel,newPriority)
   {
        let pos = this.posMap.get(toDecreaseNodeLabel);
        let node = this.queue[pos];
        node.priority = newPriority;
        this.queue[pos] = node;
        let currentNodeIdx =pos;
        let currentNodeParentIdx = Math.floor(currentNodeIdx / 2);
        while (this.queue[currentNodeParentIdx] && node.priority < this.queue[currentNodeParentIdx].priority) 
        {
          const parent = this.queue[currentNodeParentIdx];
          this.queue[currentNodeParentIdx] = node;
          this.queue[currentNodeIdx] = parent;
          this.posMap.set(parent.value,currentNodeIdx);
          currentNodeIdx = currentNodeParentIdx;
          this.posMap.set(node.value,currentNodeIdx);
          currentNodeParentIdx = Math.floor(currentNodeIdx / 2);
        }

   }

    removeNode()
    {
        
        if (this.queue.length < 3) {
              const response = this.queue.pop();
              this.queue[0] = null;
              if(response!=null)
                  this.posMap.delete(response.value);
              return response;
        }
        const removedNode = this.queue[1];
        this.queue[1] = this.queue.pop();
        let currentIdx = 1;
        this.posMap.set(this.queue[1].value,currentIdx);
        let [left, right] = [2*currentIdx, 2*currentIdx + 1];
        let currentChildIdx = this.queue[right] && this.queue[right].priority <= this.queue[left].priority ? right : left;
        while (this.queue[currentChildIdx] && this.queue[currentIdx].priority > this.queue[currentChildIdx].priority) {
            let currentNode = this.queue[currentIdx]
            let currentChildNode = this.queue[currentChildIdx];
            this.queue[currentChildIdx] = currentNode;
            this.posMap.set(currentNode.value,currentChildIdx);
            this.queue[currentIdx] = currentChildNode;
            this.posMap.set(currentChildNode.value,currentIdx);
    
        }
            this.posMap.delete(removedNode.value);

        return removedNode;
          
    }
}