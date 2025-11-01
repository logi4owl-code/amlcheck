import { memo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Shield, AlertTriangle, Building2, Coins, Link as LinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { getRiskLevel, type RiskLevel } from '@/lib/graph-utils';

export type AddressCardData = {
  address: string;
  label?: string;
  entityType: 'EOA' | 'Contract' | 'Token' | 'Bridge' | 'Exchange';
  riskScore: number;
  tags: string[];
  chain: string;
  isSource?: boolean;
  isDestination?: boolean;
};

export type AddressCardNode = Node<AddressCardData, 'addressCard'>;

function AddressCardNodeComponent({ data, selected }: NodeProps<AddressCardNode>) {
  const { t } = useTranslation();
  // data is now properly typed
  const nodeData = data;
  
  const getRiskColor = (level: RiskLevel) => {
    if (level === 'high') return 'text-red-600 bg-red-50 dark:bg-red-950/30';
    if (level === 'medium') return 'text-orange-600 bg-orange-50 dark:bg-orange-950/30';
    return 'text-green-600 bg-green-50 dark:bg-green-950/30';
  };
  
  const getRiskLevelText = (level: RiskLevel) => {
    return t(`common.riskLevel.${level}`);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Exchange':
        return <Building2 className="h-4 w-4" />;
      case 'Bridge':
        return <LinkIcon className="h-4 w-4" />;
      case 'Token':
        return <Coins className="h-4 w-4" />;
      case 'Contract':
        return <Shield className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const shortAddress = `${nodeData.address.slice(0, 6)}...${nodeData.address.slice(-4)}`;

  // Get special styling for Source and Destination wallets
  const getSpecialNodeStyle = () => {
    if (nodeData.isSource) {
      return {
        className: cn(
          'rounded-xl border-[5px] bg-white transition-all dark:bg-slate-900',
          'border-emerald-500',
          selected ? 'shadow-2xl' : 'shadow-xl'
        ),
        style: {
          width: 280,
          minHeight: 120,
          outline: selected ? '4px solid rgba(16, 185, 129, 0.3)' : '3px solid rgba(16, 185, 129, 0.5)',
          outlineOffset: '3px',
          boxShadow: selected 
            ? '0 0 0 8px rgba(16, 185, 129, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            : '0 0 0 4px rgba(16, 185, 129, 0.2), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      };
    }
    if (nodeData.isDestination) {
      return {
        className: cn(
          'rounded-xl border-[5px] bg-white transition-all dark:bg-slate-900',
          'border-purple-500',
          selected ? 'shadow-2xl' : 'shadow-xl'
        ),
        style: {
          width: 280,
          minHeight: 120,
          outline: selected ? '4px solid rgba(168, 85, 247, 0.3)' : '3px solid rgba(168, 85, 247, 0.5)',
          outlineOffset: '3px',
          boxShadow: selected 
            ? '0 0 0 8px rgba(168, 85, 247, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            : '0 0 0 4px rgba(168, 85, 247, 0.2), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      };
    }
    return {
      className: cn(
        'rounded-lg border bg-white shadow-md transition-all dark:bg-slate-900',
        selected
          ? 'border-blue-500 ring-2 ring-blue-500/20'
          : 'border-slate-300 dark:border-slate-700'
      ),
      style: { width: 280, minHeight: 120 },
    };
  };

  const nodeStyle = getSpecialNodeStyle();

  return (
    <div
      className={nodeStyle.className}
      style={nodeStyle.style}
    >
      {/* Handles */}
      <Handle type="target" position={Position.Left} className="!bg-blue-500" />
      <Handle type="source" position={Position.Right} className="!bg-blue-500" />

      {/* Header */}
      <div className="flex items-center justify-between border-b px-3 py-2 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="rounded bg-blue-100 p-1.5 text-blue-600 dark:bg-blue-950/30">
            {getTypeIcon(nodeData.entityType)}
          </div>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {nodeData.entityType}
          </span>
        </div>
        {nodeData.riskScore > 0 && (
          <div className={cn('flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', getRiskColor(getRiskLevel(nodeData.riskScore)))}>
            {nodeData.riskScore >= 40 && <AlertTriangle className="h-3 w-3" />}
            <span className="whitespace-nowrap">
              {t('common.riskLevel.label')}: {getRiskLevelText(getRiskLevel(nodeData.riskScore))}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {nodeData.label && (
          <div className="mb-1 font-semibold text-slate-900 dark:text-white">
            {nodeData.label}
          </div>
        )}
        <div className="font-mono text-sm text-slate-600 dark:text-slate-400">
          {shortAddress}
        </div>
        
        {/* Tags */}
        {nodeData.tags && nodeData.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {nodeData.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const MemoizedAddressCardNode = memo(AddressCardNodeComponent);
MemoizedAddressCardNode.displayName = 'AddressCardNode';

export default MemoizedAddressCardNode;
