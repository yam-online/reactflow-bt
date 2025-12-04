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
import { nanoid } from 'nanoid/non-secure';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  createNewNode: (type: string, label: string, status: string, position: { x: number; y: number }) => void;
  addEdge: (data: any) => void;
};

const useStore = createWithEqualityFn<RFState>((set, get) => ({
  nodes: [
    {
      id: 'root',
      type: 'selector',
      data: {
        label: 'idj',
        status: 'none',
      },
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

  createNewNode: (type, label, status, position) => {
    const newNode: Node = {
      id: nanoid(),
      type: type!, 
      data: { label, status },
      position,
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  addEdge(data: any) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({edges: [edge, ...get().edges] });
  },

}));

export default useStore;