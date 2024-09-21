import React, { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import './Tree.css';

interface TreeNode {
  name: string;
  noChildren?: boolean; // Flag for no children
  onlyGirlChild?: boolean; // Flag for only girl child
  children?: TreeNode[];
}

interface TreeProps {
  treeDataUrl: string;
  orientation: 'vertical' | 'horizontal'; // Vertical or horizontal layout
}

const FamilyTree: React.FC<TreeProps> = ({ treeDataUrl, orientation }) => {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    fetch(treeDataUrl)
      .then((response) => response.json())
      .then((data) => {
        setTreeData(data); // Set tree data directly without modifying it
      });
  }, [treeDataUrl]);

  // Adjust the position of the root node to center it
  useEffect(() => {
    const container = treeContainerRef.current;
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      if (orientation === 'horizontal') {
        setTranslate({ x: 100, y: height / 2 }); // Center vertically, root node on the left
      } else {
        setTranslate({ x: width / 2, y: 100 }); // Center horizontally, root node at the top
      }
    }
  }, [orientation]);

  const nodeSize = { x: 200, y: 200 }; // Node spacing

  // Color based on generation
  const getNodeClassName = (depth: number) => `node-gen-${depth % 5}`;

  // Custom node rendering function
  const renderCustomNodeElement = ({ nodeDatum, hierarchyPointNode }: any) => {
    const nodeClass = getNodeClassName(hierarchyPointNode.depth);

    // Determine if the node needs a special marker (X or ♀)
    let marker = null;
    if (nodeDatum.noChildren) {
      marker = (
        <text fill='red' x={-10} y={35} style={{ fontSize: '24px' }}>
          ✘
        </text>
      );
    } else if (nodeDatum.onlyGirlChild) {
      marker = (
        <text fill='blue' x={-10} y={35} style={{ fontSize: '24px' }}>
          ♀
        </text>
      );
    }

    return (
      <g>
        {/* Node circle */}
        <circle r={15} className={nodeClass} />

        {/* Node name */}
        <text fill='black' x={20} y={-10} style={{ fontSize: '12px' }}>
          {nodeDatum.name}
        </text>

        {/* Render special marker if applicable */}
        {marker}
      </g>
    );
  };

  return (
    <div>
      <div className='fixed-panel'>
        <h4>Legend</h4>
        <p>
          <span style={{ color: 'red' }}>✘</span> - No Children
        </p>
        <p>
          <span style={{ color: 'blue' }}>♀</span> - Only Female Children
        </p>
      </div>
      <div
        id='treeWrapper'
        ref={treeContainerRef}
        className={`tree-orientation-${orientation}`}
      >
        {treeData && (
          <Tree
            data={treeData}
            nodeSize={nodeSize}
            orientation={orientation}
            pathFunc='diagonal'
            translate={translate}
            renderCustomNodeElement={renderCustomNodeElement} // Use custom node renderer
          />
        )}
      </div>
    </div>
  );
};

export default FamilyTree;
