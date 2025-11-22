import type {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
} from '@xyflow/react';

import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { createWithEqualityFn } from 'zustand/traditional';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  createNewNode: (type: string, label: string, position: { x: number; y: number }) => void;
};

const useStore = createWithEqualityFn<RFState>((set, get) => ({
  nodes: [
    {
      id: 'root',
      type: 'selector',
      data: { label: 'idj' },
      position: { x: 0, y: 0 },
    },
  ],

  edges: [],

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  createNewNode: (type, label, position) => {
    const newNode: Node = {
      id: crypto.randomUUID(),
      type, 
      data: { label },
      position,
    };
    set({ nodes: [...get().nodes, newNode] });
  },

}));

export default useStore;