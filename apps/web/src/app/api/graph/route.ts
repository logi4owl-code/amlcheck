import { NextRequest, NextResponse } from 'next/server';
import type { DomainGraph } from '@/lib/types';

/**
 * Mock graph API - returns sample transaction flow data
 * In production, this would call your backend service
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  
  const src = searchParams.get('src');
  const dst = searchParams.get('dst');
  const depth = parseInt(searchParams.get('depth') || '3');
  const chains = searchParams.get('chains')?.split(',') || ['ethereum'];

  if (!src || !dst) {
    return NextResponse.json(
      { error: 'Source and destination addresses are required' },
      { status: 400 }
    );
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Generate mock graph data
  const mockGraph: DomainGraph = {
    query: {
      src,
      dst,
      chains,
      depth,
      direction: 'both',
    },
    entities: [
      // Source - Legitimate user wallet
      {
        id: 'src',
        address: src,
        chain: 'ethereum',
        type: 'EOA',
        label: 'Source Wallet',
        riskScore: 12,
        tags: ['verified', 'kyc-passed'],
      },
      // Final destination - High risk
      {
        id: 'dst',
        address: dst,
        chain: 'ethereum',
        type: 'EOA',
        label: 'Destination Wallet',
        riskScore: 88,
        tags: ['suspicious', 'high-value', 'multiple-sources', 'rapid-withdrawal'],
      },
      // CEX - Binance
      {
        id: 'binance',
        address: '0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
        chain: 'ethereum',
        type: 'Exchange',
        label: 'Binance Hot Wallet',
        riskScore: 8,
        tags: ['exchange', 'centralized', 'kyc-required'],
      },
      // Layering wallet 1 - Structuring pattern
      {
        id: 'layer1a',
        address: '0x742d35cc6634c0532925a3b844bc9e7595f0beb1',
        chain: 'ethereum',
        type: 'EOA',
        label: 'Intermediate Wallet 1A',
        riskScore: 45,
        tags: ['new-account', 'rapid-turnover'],
      },
      {
        id: 'layer1b',
        address: '0x8e5c23b2a973f61e2d7f0c9b4e6d8a5f3c1b9e7d',
        chain: 'ethereum',
        type: 'EOA',
        label: 'Intermediate Wallet 1B',
        riskScore: 42,
        tags: ['new-account', 'structuring'],
      },
      {
        id: 'layer1c',
        address: '0x3f9a4c8e7d6b5a2f1e0c9b8a7d6e5f4c3b2a1e0d',
        chain: 'ethereum',
        type: 'EOA',
        label: 'Intermediate Wallet 1C',
        riskScore: 38,
        tags: ['new-account'],
      },
      // Tornado Cash mixer
      {
        id: 'tornado',
        address: '0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2b63',
        chain: 'ethereum',
        type: 'Contract',
        label: 'Tornado Cash (100 ETH)',
        riskScore: 98,
        tags: ['mixer', 'sanctioned', 'ofac-listed'],
      },
      // Privacy protocol
      {
        id: 'railgun',
        address: '0xfa7093cdd9ee6932b4eb2c9e1cde7ce00b1fa4b9',
        chain: 'ethereum',
        type: 'Contract',
        label: 'Railgun Privacy Protocol',
        riskScore: 72,
        tags: ['privacy', 'shielded-pool'],
      },
      // Cross-chain bridge to BSC
      {
        id: 'bridge_eth_bsc',
        address: '0x1a2a1c938ce3ec39b6d47113c7955baa9dd454f2',
        chain: 'ethereum',
        type: 'Bridge',
        label: 'Multichain Bridge (ETH→BSC)',
        riskScore: 15,
        tags: ['bridge', 'cross-chain'],
      },
      // BSC intermediate wallet
      {
        id: 'bsc_intermediate',
        address: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
        chain: 'bsc',
        type: 'EOA',
        label: 'BSC Intermediate Wallet',
        riskScore: 55,
        tags: ['cross-chain', 'rapid-movement'],
      },
      // PancakeSwap DEX
      {
        id: 'pancakeswap',
        address: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
        chain: 'bsc',
        type: 'Contract',
        label: 'PancakeSwap Router',
        riskScore: 18,
        tags: ['dex', 'defi', 'bsc'],
      },
      // Bridge back to Ethereum
      {
        id: 'bridge_bsc_eth',
        address: '0x4dae2f939acf50408e13d58534ff8c2776d45265',
        chain: 'bsc',
        type: 'Bridge',
        label: 'Multichain Bridge (BSC→ETH)',
        riskScore: 15,
        tags: ['bridge', 'cross-chain'],
      },
      // Uniswap DEX
      {
        id: 'uniswap',
        address: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
        chain: 'ethereum',
        type: 'Contract',
        label: 'Uniswap V2 Router',
        riskScore: 12,
        tags: ['dex', 'defi', 'verified'],
      },
      // Layering wallet 2 - Post-mixing
      {
        id: 'layer2a',
        address: '0x5e8f9b2c1d0a3f4e5d6c7b8a9e0f1d2c3b4a5e6f',
        chain: 'ethereum',
        type: 'EOA',
        label: 'Intermediate Wallet 2A',
        riskScore: 68,
        tags: ['mixer-recipient', 'suspicious-pattern'],
      },
      {
        id: 'layer2b',
        address: '0x7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
        chain: 'ethereum',
        type: 'EOA',
        label: 'Intermediate Wallet 2B',
        riskScore: 65,
        tags: ['mixer-recipient'],
      },
      // Unlicensed P2P exchange
      {
        id: 'p2p_exchange',
        address: '0x2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a',
        chain: 'ethereum',
        type: 'Contract',
        label: 'P2P Exchange (Unlicensed)',
        riskScore: 82,
        tags: ['p2p', 'no-kyc', 'high-risk-jurisdiction'],
      },
      // Peel chain wallets - Common layering technique
      {
        id: 'peel1',
        address: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c',
        chain: 'ethereum',
        type: 'EOA',
        label: 'Peel Chain Wallet 1',
        riskScore: 58,
        tags: ['peel-chain', 'layering'],
      },
      {
        id: 'peel2',
        address: '0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b',
        chain: 'ethereum',
        type: 'EOA',
        label: 'Peel Chain Wallet 2',
        riskScore: 61,
        tags: ['peel-chain', 'layering'],
      },
      // Crypto ATM operator
      {
        id: 'crypto_atm',
        address: '0x6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e',
        chain: 'ethereum',
        type: 'Exchange',
        label: 'Crypto ATM Operator',
        riskScore: 48,
        tags: ['atm', 'cash-conversion', 'limited-kyc'],
      },
    ],
    edges: [
      // Phase 1: Initial deposit to CEX and structuring (breaking into smaller amounts)
      {
        id: 'edge1',
        src: 'src',
        dst: 'binance',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x7f3c8e9d2a1b5c6e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e',
        token: { symbol: 'ETH', decimals: 18 },
        amount: '125.8',
        timestamp: Date.now() - 86400000 * 3.5,
        count: 1,
      },
      // Structuring: Split into 3 smaller wallets (below reporting threshold)
      {
        id: 'edge2a',
        src: 'binance',
        dst: 'layer1a',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b',
        token: { symbol: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6 },
        amount: '9850',
        timestamp: Date.now() - 86400000 * 3.2,
        count: 1,
      },
      {
        id: 'edge2b',
        src: 'binance',
        dst: 'layer1b',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d',
        token: { symbol: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6 },
        amount: '9920',
        timestamp: Date.now() - 86400000 * 3.15,
        count: 1,
      },
      {
        id: 'edge2c',
        src: 'binance',
        dst: 'layer1c',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f',
        token: { symbol: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6 },
        amount: '9780',
        timestamp: Date.now() - 86400000 * 3.1,
        count: 1,
      },
      // Phase 2: Cross-chain obfuscation via BSC
      {
        id: 'edge3',
        src: 'layer1a',
        dst: 'bridge_eth_bsc',
        chain: 'ethereum',
        kind: 'bridge',
        txHash: '0x8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
        token: { symbol: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6 },
        amount: '9850',
        timestamp: Date.now() - 86400000 * 3,
        count: 1,
      },
      {
        id: 'edge4',
        src: 'bridge_eth_bsc',
        dst: 'bsc_intermediate',
        chain: 'bsc',
        kind: 'transfer',
        txHash: '0x0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d',
        token: { symbol: 'USDT', address: '0x55d398326f99059ff775485246999027b3197955', decimals: 6 },
        amount: '9820',
        timestamp: Date.now() - 86400000 * 2.9,
        count: 1,
      },
      // Swap on PancakeSwap to obfuscate
      {
        id: 'edge5',
        src: 'bsc_intermediate',
        dst: 'pancakeswap',
        chain: 'bsc',
        kind: 'swap',
        txHash: '0x2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f',
        token: { symbol: 'BNB', decimals: 18 },
        amount: '38.5',
        timestamp: Date.now() - 86400000 * 2.85,
        count: 1,
      },
      // Bridge back to Ethereum
      {
        id: 'edge6',
        src: 'pancakeswap',
        dst: 'bridge_bsc_eth',
        chain: 'bsc',
        kind: 'bridge',
        txHash: '0x4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b',
        token: { symbol: 'BNB', decimals: 18 },
        amount: '38.2',
        timestamp: Date.now() - 86400000 * 2.8,
        count: 1,
      },
      {
        id: 'edge7',
        src: 'bridge_bsc_eth',
        dst: 'layer2a',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d',
        token: { symbol: 'ETH', decimals: 18 },
        amount: '4.8',
        timestamp: Date.now() - 86400000 * 2.7,
        count: 1,
      },
      // Phase 3: Mixing via Tornado Cash (high risk)
      {
        id: 'edge8',
        src: 'layer1b',
        dst: 'tornado',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
        token: { symbol: 'ETH', decimals: 18 },
        amount: '100.0',
        timestamp: Date.now() - 86400000 * 2.5,
        count: 1,
      },
      // Exit from mixer to different wallet
      {
        id: 'edge9',
        src: 'tornado',
        dst: 'layer2b',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b',
        token: { symbol: 'ETH', decimals: 18 },
        amount: '99.5',
        timestamp: Date.now() - 86400000 * 1.8,
        count: 1,
      },
      // Phase 4: Privacy protocol layering
      {
        id: 'edge10',
        src: 'layer1c',
        dst: 'railgun',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d',
        token: { symbol: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', decimals: 6 },
        amount: '9780',
        timestamp: Date.now() - 86400000 * 2.3,
        count: 1,
      },
      {
        id: 'edge11',
        src: 'railgun',
        dst: 'peel1',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f',
        token: { symbol: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', decimals: 6 },
        amount: '9650',
        timestamp: Date.now() - 86400000 * 1.5,
        count: 1,
      },
      // Phase 5: Peel chain technique - gradually moving funds
      {
        id: 'edge12',
        src: 'peel1',
        dst: 'peel2',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b',
        token: { symbol: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', decimals: 6 },
        amount: '8500',
        timestamp: Date.now() - 86400000 * 1.3,
        count: 1,
      },
      {
        id: 'edge13',
        src: 'peel1',
        dst: 'dst',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d',
        token: { symbol: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', decimals: 6 },
        amount: '1150',
        timestamp: Date.now() - 86400000 * 1.25,
        count: 1,
      },
      // Phase 6: DEX swaps and P2P exchange
      {
        id: 'edge14',
        src: 'layer2a',
        dst: 'uniswap',
        chain: 'ethereum',
        kind: 'swap',
        txHash: '0x0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f',
        token: { symbol: 'DAI', address: '0x6b175474e89094c44da98b954eedeac495271d0f', decimals: 18 },
        amount: '14200',
        timestamp: Date.now() - 86400000 * 1.1,
        count: 2,
      },
      {
        id: 'edge15',
        src: 'uniswap',
        dst: 'p2p_exchange',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b',
        token: { symbol: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6 },
        amount: '14000',
        timestamp: Date.now() - 86400000 * 1.05,
        count: 1,
      },
      {
        id: 'edge16',
        src: 'p2p_exchange',
        dst: 'dst',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d',
        token: { symbol: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6 },
        amount: '13800',
        timestamp: Date.now() - 86400000 * 0.9,
        count: 1,
      },
      // Phase 7: Multiple rapid transfers from mixer output
      {
        id: 'edge17',
        src: 'layer2b',
        dst: 'crypto_atm',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f',
        token: { symbol: 'ETH', decimals: 18 },
        amount: '45.2',
        timestamp: Date.now() - 86400000 * 0.7,
        count: 3,
      },
      {
        id: 'edge18',
        src: 'crypto_atm',
        dst: 'dst',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
        token: { symbol: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', decimals: 6 },
        amount: '132000',
        timestamp: Date.now() - 86400000 * 0.5,
        count: 1,
      },
      // Additional peel chain exit
      {
        id: 'edge19',
        src: 'peel2',
        dst: 'dst',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d',
        token: { symbol: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', decimals: 6 },
        amount: '8500',
        timestamp: Date.now() - 86400000 * 0.3,
        count: 1,
      },
      // Final rapid withdrawal pattern
      {
        id: 'edge20',
        src: 'layer2b',
        dst: 'dst',
        chain: 'ethereum',
        kind: 'transfer',
        txHash: '0x2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f',
        token: { symbol: 'ETH', decimals: 18 },
        amount: '54.3',
        timestamp: Date.now() - 86400000 * 0.1,
        count: 1,
      },
    ],
  };

  return NextResponse.json(mockGraph);
}
