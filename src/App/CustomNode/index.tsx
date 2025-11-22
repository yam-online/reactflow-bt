import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';

export type NodeData = {
  label: string;
}

export function SelectorNode(props: any) {
  const data = (props.data ?? {}) as NodeData;
  
  return (
    <>
      <label>Selector: </label>
      <input defaultValue={data.label} />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export function SequenceNode(props: any) {
  const data = (props.data ?? {}) as NodeData;
  
  return (
    <>
      <label>Sequence: </label>
      <input defaultValue={data.label} />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}