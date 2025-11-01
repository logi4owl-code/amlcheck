import { memo } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps, type Edge } from '@xyflow/react';
import { useTranslation } from 'react-i18next';

export type CustomEdgeData = {
  label?: string;
  kind: string;
  txHash: string;
  token?: { symbol: string };
  amount?: string;
  timestamp?: number;
  count: number;
};

export type CustomEdgeType = Edge<CustomEdgeData, 'custom'>;

function CustomEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps<CustomEdgeType>) {
  const { t } = useTranslation();
  const edgeData = data;
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Format label with transaction count
  const formatLabel = () => {
    const parts: string[] = [];
    
    // Add transaction count with i18n
    const count = edgeData?.count || 1;
    const countLabel = t('graph.edge.transactionCount', { count });
    parts.push(countLabel);
    
    // Add existing label (timestamp and amount)
    if (edgeData?.label) {
      parts.push(edgeData.label);
    }
    
    return parts.join(' | ');
  };

  const displayLabel = formatLabel();

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      {displayLabel && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan rounded bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-300"
          >
            {displayLabel}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

const MemoizedCustomEdge = memo(CustomEdgeComponent);
MemoizedCustomEdge.displayName = 'CustomEdge';

export default MemoizedCustomEdge;
