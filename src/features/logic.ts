import { useState, useEffect, useRef } from 'react';
// useRef --> stores changing variables without triggering a new render like useState
import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
  getIncomers,
  useNodes,
  useEdges,
  type Node,
} from '@xyflow/react';

function TreePlayer() {
  // update the node's color, status, etc.
  const { updateNodeData } = useReactFlow();
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ currentNode, setCurrentNode ] = useState(null);
  const [ count, setCount ] = useState(3);
  const [ rootNode, setRootNode ] = useState<Node | null>(null);
  const nodes = useNodes();
  const edges = useEdges();
  
  function playTree() {
    setIsPlaying(true);
  }
  function pauseTree() {
    setIsPlaying(false);
  }

  function getRootNode() {
    nodes.forEach((node) => {
      const incomers = getIncomers(node, nodes, edges);
      if(incomers.length === 0) {
        setRootNode(node);
      }
    });
  }

  // the root node is recalculated every time a new node is added or a new edge is added
  useEffect(()=> {
    getRootNode();
    console.log(rootNode);
  }, [nodes, edges])
  
  // runs once on mount
  useEffect(() => {
    // start interval at 3 seconds
    const interval = setInterval(() => {
      setCount(c => c - 1);
    }, 1000);

    // set currentnode to the root
    // setCurrentNode()
    return () => clearInterval(interval);
  }, [])

  // runs every time count changes
  useEffect(() => {
    if(count === 0) {
      setCount(3);
    }
  }, [count])
}

export default TreePlayer;