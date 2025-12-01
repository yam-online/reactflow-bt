import { useState, useEffect, useRef } from 'react'; // useRef --> stores changing variables without triggering a new render like useState
import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
} from '@xyflow/react'

function TreePlayer({}) {
  // update the node's color, status, etc.
  const { updateNodeData } = useReactFlow();
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ currentNode, setCurrentNode ] = useState(null);
  
  function playTree() {
    setIsPlaying(true);
  }
  function pauseTree() {
    setIsPlaying(false);
  }
}