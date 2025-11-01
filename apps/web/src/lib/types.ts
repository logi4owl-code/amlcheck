/**
 * Domain types for graph data and queries
 */

export type ChainId = 'ethereum' | 'bsc' | 'polygon' | 'solana' | string;

export interface Entity {
  id: string;
  address: string;
  chain: ChainId;
  type: 'EOA' | 'Contract' | 'Token' | 'Bridge' | 'Exchange';
  label?: string;
  riskScore?: number;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface TransferEdge {
  id: string;
  src: string;
  dst: string;
  chain: ChainId;
  kind: 'transfer' | 'swap' | 'bridge' | 'mint' | 'burn';
  txHash: string;
  token?: {
    symbol: string;
    address?: string;
    decimals?: number;
  };
  amount?: string;
  timestamp?: number;
  count?: number;
  metadata?: Record<string, unknown>;
}

export interface GraphQuery {
  src: string;
  dst: string;
  chains: ChainId[];
  depth: number;
  timeRange?: [number, number];
  direction?: 'in' | 'out' | 'both';
}

export interface DomainGraph {
  query: GraphQuery;
  entities: Entity[];
  edges: TransferEdge[];
}

// User session (mock)
export interface User {
  id: string;
  email: string;
  name: string;
}
