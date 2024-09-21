import React from 'react';

export interface NodeProps {
  name: string;
  children: NodeProps[];
  level: number;
}

const getColor = (level: number) => {
  const colors = [
    '#ffcccb',
    '#add8e6',
    '#90ee90',
    '#ffd700',
    '#ffb6c1',
    '#e6e6fa',
    '#ffdead',
    '#d3d3d3',
  ];
  return colors[level % colors.length];
};

const Node: React.FC<NodeProps> = ({ name, children, level }) => {
  return (
    <div
      style={{
        margin: '20px',
        backgroundColor: getColor(level),
        padding: '10px',
        borderRadius: '5px',
      }}
    >
      <p>{name}</p>
      {children.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {children.map((child, index) => (
            <Node key={index} {...child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Node;
