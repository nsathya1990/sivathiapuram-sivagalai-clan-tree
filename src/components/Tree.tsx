import React, { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import './Tree.css';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface TreeProps {
  treeDataUrl: string;
  orientation: 'vertical' | 'horizontal'; // vertical or horizontal layout
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
      .then((data) => setTreeData(data));
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

  return (
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
          renderCustomNodeElement={({ nodeDatum, hierarchyPointNode }) => (
            <g>
              <circle
                r={15}
                className={getNodeClassName(hierarchyPointNode.depth)}
              />
              <text fill='black' x='20' y='-10' style={{ fontSize: '12px' }}>
                {nodeDatum.name}
              </text>
            </g>
          )}
        />
      )}
    </div>
  );
};

export default FamilyTree;
