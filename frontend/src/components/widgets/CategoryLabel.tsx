import React from "react";

interface CategoryLabelProps {
  categoryTitle: string;
}

const CategoryLabel: React.FC<CategoryLabelProps> = ({ categoryTitle }) => {
  const categoryStyles: Record<string, string> = {
    Clothes: "bg-orange-100 text-orange-400",
    Groceries: "bg-green-100 text-green-400",
    Dining: "bg-pink-100 text-pink-400",
    Transportation: "bg-blue-100 text-blue-400",
    Entertainment: "bg-purple-100 text-purple-400",
    Utilities: "bg-yellow-100 text-yellow-500",
    Healthcare: "bg-red-100 text-red-400",
    Education: "bg-indigo-100 text-indigo-400",
    Travel: "bg-cyan-100 text-cyan-500",
    Subscriptions: "bg-slate-100 text-slate-500",
  };

  const defaultStyle = "bg-gray-100 text-gray-400";
  const categoryClass = categoryStyles[categoryTitle] || defaultStyle;

  return (
    <div className={`p-1 ${categoryClass} text-xs rounded-md font-medium`}>
      {categoryTitle}
    </div>
  );
};

export default CategoryLabel;
