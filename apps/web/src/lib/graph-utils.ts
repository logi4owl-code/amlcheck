import dagre from 'dagre';
import type { Node, Edge } from '@xyflow/react';
import type { DomainGraph, Entity, TransferEdge } from './types';

/**
 * Risk level type definition
 */
export type RiskLevel = 'high' | 'medium' | 'low';

/**
 * Convert risk score (0-100) to risk level
 * - High (高): score >= 70
 * - Medium (中): 40 <= score < 70
 * - Low (低): score < 40
 */
export function getRiskLevel(score: number): RiskLevel {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

/**
 * Convert DomainGraph to React Flow nodes and edges
 */
export function domainGraphToReactFlow(domainGraph: DomainGraph): {
  nodes: Node[];
  edges: Edge[];
} {
  // Convert entities to React Flow nodes
  const nodes: Node[] = domainGraph.entities.map((entity) => ({
    id: entity.id,
    type: 'addressCard', // Custom node type
    position: { x: 0, y: 0 }, // Will be set by layout algorithm
    data: {
      address: entity.address,
      label: entity.label,
      entityType: entity.type,
      riskScore: entity.riskScore || 0,
      tags: entity.tags || [],
      chain: entity.chain,
      isSource: entity.id === 'src', // Mark source wallet
      isDestination: entity.id === 'dst', // Mark destination wallet
    },
    style: {
      background: getNodeColor(entity),
    },
  }));

  // Convert transfers to React Flow edges
  const edges: Edge[] = domainGraph.edges.map((edge) => ({
    id: edge.id,
    source: edge.src,
    target: edge.dst,
    type: 'custom', // Custom edge type with label
    animated: false,
    markerEnd: {
      type: 'arrowclosed',
      width: 20,
      height: 20,
      color: getEdgeColor(edge),
    },
    style: {
      stroke: getEdgeColor(edge),
      strokeWidth: Math.min((edge.count || 1) * 1.5, 5),
    },
    data: {
      label: formatEdgeLabel(edge),
      kind: edge.kind,
      txHash: edge.txHash,
      token: edge.token,
      amount: edge.amount,
      timestamp: edge.timestamp,
      count: edge.count || 1,
    },
  }));

  return { nodes, edges };
}

/**
 * Format edge label with token, amount, and timestamp
 * Transaction count is handled separately in the CustomEdge component for i18n support
 */
function formatEdgeLabel(edge: TransferEdge): string {
  const parts: string[] = [];
  
  if (edge.timestamp) {
    const date = new Date(edge.timestamp);
    parts.push(date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }));
  }
  
  if (edge.token?.symbol && edge.amount) {
    parts.push(`${edge.amount} ${edge.token.symbol}`);
  }
  
  return parts.join(' | ');
}

/**
 * Get node color based on entity type and risk score
 */
function getNodeColor(entity: Entity): string {
  const riskScore = entity.riskScore || 0;

  // High risk nodes
  if (riskScore >= 70) {
    return '#dc2626'; // red-600
  }

  // Type-based colors
  switch (entity.type) {
    case 'Exchange':
      return '#0ea5e9'; // sky-500
    case 'Bridge':
      return '#8b5cf6'; // violet-500
    case 'Contract':
      return '#f59e0b'; // amber-500
    case 'Token':
      return '#10b981'; // emerald-500
    case 'EOA':
    default:
      // Medium risk
      if (riskScore >= 40) {
        return '#f97316'; // orange-500
      }
      // Low risk
      return '#3b82f6'; // blue-500
  }
}

/**
 * Get edge color based on transfer kind
 */
function getEdgeColor(edge: TransferEdge): string {
  switch (edge.kind) {
    case 'swap':
      return '#8b5cf6'; // violet-500
    case 'bridge':
      return '#06b6d4'; // cyan-500
    case 'mint':
      return '#10b981'; // emerald-500
    case 'burn':
      return '#ef4444'; // red-500
    case 'transfer':
    default:
      return '#94a3b8'; // slate-400
  }
}

/**
 * Apply Dagre hierarchical layout to nodes
 */
export function applyDagreLayout(
  nodes: Node[],
  edges: Edge[]
): Node[] {
  const dagreGraph = new dagre.graphlib.Graph();
  
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR', nodesep: 100, ranksep: 150 });

  // Add nodes to dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 280, height: 120 });
  });

  // Add edges to dagre graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Apply positions to nodes
  return nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 140, // Center the node
        y: nodeWithPosition.y - 60,
      },
    };
  });
}
