'use client';

import { useCallback, useEffect, useTransition } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { DomainGraph } from '@/lib/types';
import { domainGraphToReactFlow, applyDagreLayout } from '@/lib/graph-utils';
import AddressCardNode from './nodes/AddressCardNode';
import CustomEdge from './edges/CustomEdge';
import { Loader2 } from 'lucide-react';

// Define node and edge types outside component to prevent re-renders
const nodeTypes = {
  addressCard: AddressCardNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

interface GraphCanvasProps {
  data: DomainGraph;
}


/**
 * Main GraphCanvas component with React Flow
 */
export default function GraphCanvas({ data }: GraphCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [isLayouting, startLayoutTransition] = useTransition();

  // Load graph data and apply layout
  useEffect(() => {
    startLayoutTransition(() => {
      const { nodes: initialNodes, edges: initialEdges } = domainGraphToReactFlow(data);

      // Apply Dagre hierarchical layout
      const layoutedNodes = applyDagreLayout(initialNodes, initialEdges);

      setNodes(layoutedNodes);
      setEdges(initialEdges);
    });
  }, [data, setNodes, setEdges, startLayoutTransition]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Clicked node:', node.data);
    // TODO: Open side panel with node details
  }, []);

  if (isLayouting) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-slate-50 dark:bg-slate-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'custom',
          animated: false,
          markerEnd: {
            type: 'arrowclosed',
            width: 20,
            height: 20,
          },
        }}
      >
        <Background color="#1e293b" gap={16} style={{ opacity: 0.25 }} />
        <Controls className="aml-flow-controls" position="bottom-left" />
        <MiniMap
          nodeColor={(node) => {
            return node.style?.background as string || '#3b82f6';
          }}
          maskColor="rgba(15, 23, 42, 0.75)"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(148, 163, 184, 0.25)',
            borderRadius: '0.75rem',
          }}
        />
        <Panel position="bottom-right">
          <div className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200 shadow-lg">
            AML Check Graph Explorer
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
