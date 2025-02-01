import React from "react";

type Tech = {
  name: string;
  icon: React.JSX.Element;
};

const Stack = ({ stack }: { stack: Tech[] }) => {
  return (
    <div className="flex items-center space-x-4">
      {stack.map((tech, index) => (
        <div
          key={index}
          className="flex items-center justify-center space-x-1 text-neutral-500"
        >
          {tech.icon}
          <p className="text-body3 font-medium">{tech.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Stack;
