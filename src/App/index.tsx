import { ReactFlow, Controls, Panel, useNodes, useEdges, getIncomers } from '@xyflow/react';
import type { NodeOrigin } from '@xyflow/react';
import { shallow } from 'zustand/shallow'

import useStore from './store'
import type { RFState } from './store';
import { SelectorNode, SequenceNode, ActionNode, ConditionNode } from './CustomNode'
import CustomEdge from './CustomEdge';
import TreePlayer from '../features/logic';
 
import '@xyflow/react/dist/style.css';

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  createNewNode: state.createNewNode,
  addEdge: state.addEdge,
})

// puts the center of the node in its center
const nodeOrigin: NodeOrigin = [0.5, 0.5];

const nodeTypes = {
  selector: SelectorNode,
  sequence: SequenceNode,
  action: ActionNode,
  condition: ConditionNode,
}
 
const edgeTypes = {
  btEdge: CustomEdge
}

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, createNewNode, addEdge } = useStore(selector, shallow);

  TreePlayer();
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      // edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={addEdge}
      nodeOrigin={nodeOrigin}
      fitView
    >
      <Controls showInteractive={false} />
      <Panel position="top-left">Behavior Tree Visualizer</Panel>
      <Panel className='space-x-4' position="top-right">
        <button
          className='px-2 py-1 rounded bg-white shadow'
          onClick={() => createNewNode('selector', '', { x: 100, y: 100 })}
        >
          selector
        </button>
        <button
          className='px-2 py-1 rounded bg-white shadow'
          onClick={() => createNewNode('sequence', '', { x: 100, y: 100 })}
        >
          sequence
        </button>
        <button
          className='px-2 py-1 rounded bg-white shadow'
          onClick={() => createNewNode('action', '', { x: 100, y: 100 })}
        >
          action
        </button>
        <button
          className='px-2 py-1 rounded bg-white shadow'
          onClick={() => createNewNode('condition', '', { x: 100, y: 100 })}
        >
          condition
        </button>
        <button
          className='px-2 py-1 rounded bg-white shadow'
          onClick={() => createNewNode('condition', '', { x: 100, y: 100 })}
        >
          play tree
        </button>
      </Panel>
    </ReactFlow>
  );
}
 
export default Flow;