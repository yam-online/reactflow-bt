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
  updateNodeLabel: (nodeId: string, label: string) => void;
  updateNodeStatus: (nodeId: string, status: string) => void;
};

const useStore = createWithEqualityFn<RFState>((set, get) => ({
  nodes: [
    {
      id: 'root',
      type: 'selector',
      data: {
        label: 'idj',
        status: 'none',
        updateLabel: (newLabel: string) => get().updateNodeLabel('root', newLabel),
        updateStatus: (newStatus: string) => get().updateNodeStatus('root', newStatus),
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
    const id = nanoid();
    const newNode: Node = {
      id: id,
      type: type!, 
      data: {
        label,
        status,
        updateLabel: (newLabel: string) => get().updateNodeLabel(id, newLabel) },
      position,
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  addEdge(data: any) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({edges: [edge, ...get().edges] });
  },

  updateNodeLabel: (nodeId, label) => {
    set({
      nodes: get().nodes.map((node) => {
        if(node.id === nodeId) {
          node.data = { ...node.data, label };
        }

        return node;
      }),
    });
  },

  updateNodeStatus: (nodeId, status) => {
    set({
      nodes: get().nodes.map((node) => {
        if(node.id === nodeId) {
          node.data = { ...node.data, status };
        }

        return node;
      })
    });
  },

}));

export default useStore;