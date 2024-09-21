// src/routes/TreePage.tsx
import React from 'react';
import FamilyTree from '../components/Tree';

const TreePage1: React.FC = () => {
  return (
    <FamilyTree
      treeDataUrl='/data/male-ancestors.json'
      orientation='vertical'
    />
  );
};

const TreePage2: React.FC = () => {
  return <FamilyTree treeDataUrl='/data/tree2.json' orientation='horizontal' />;
};

export { TreePage1, TreePage2 };
