import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

export type NodeData = {
  label: string;
  status: string;
  updateLabel: Function;
}

export function SelectorNode(props: any) {
  const data = (props.data ?? {}) as NodeData;
  const [ localLabel, setLocalLabel ] = useState(data.label);

  return (
    <>
      <label>Selector: </label>
      <input
        value={localLabel}
        placeholder="Type here..."
        onChange={(evt) => setLocalLabel(evt.target.value)}
        onBlur={data.updateLabel(localLabel)}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export function SequenceNode(props: any) {
  const data = (props.data ?? {}) as NodeData;
  const [ localLabel, setLocalLabel ] = useState(data.label);

  return (
    <>
      <label>Sequence: </label>
      <input
        value={localLabel}
        placeholder="Type here..."
        onChange={(evt) => setLocalLabel(evt.target.value)}
        onBlur={data.updateLabel(localLabel)}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export const Checkbox = (props: any) => {
  const [ isChecked, setIsChecked ] = useState(false);
  const data = (props.data ?? {}) as NodeData;

  const checkHandler = () => {
    setIsChecked(!isChecked);
    data.status = isChecked ? 'success' : 'failure';
  }

  return (
    <div>
      <input 
        type="checkbox"
        id="checkbox"
        className="box"
        checked={isChecked}
        onChange={checkHandler}
      />
      {
        (isChecked)
        ? <label htmlFor="checkbox" className="text">Success</label>
        : <label htmlFor="checkbox" className="text">Failure</label>
      }
    </div>
  )
}

export function ActionNode(props: any) {
  const data = (props.data ?? {}) as NodeData;
  const [ localLabel, setLocalLabel ] = useState(data.label);

  return (
    <>
      <label>Action: </label>
      <input
        value={localLabel}
        placeholder="Type here..."
        onChange={(evt) => setLocalLabel(evt.target.value)}
        onBlur={data.updateLabel(localLabel)}
      />
      <Checkbox />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export function ConditionNode(props: any) {
  const data = (props.data ?? {}) as NodeData;
  const [ localLabel, setLocalLabel ] = useState(data.label);
  return (
    <>
      <label>Condition: </label>
      <input
        value={localLabel}
        placeholder="Type here..."
        onChange={(evt) => setLocalLabel(evt.target.value)}
        onBlur={data.updateLabel(localLabel)}
      />
      <Checkbox />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}