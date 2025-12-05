import React from "react";

interface CategoryLabelProps {
  categoryTitle: string;
}

const CategoryLabel: React.FC<CategoryLabelProps> = ({ categoryTitle }) => {
  const categoryStyles: Record<string, string> = {
    GENERAL_MERCHANDISE: "bg-orange-100 text-orange-400",
    GROCERIES: "bg-green-100 text-green-400",
    FOOD_AND_DRINK: "bg-pink-100 text-pink-400",
    TRANSPORTATION: "bg-blue-100 text-blue-400",
    ENTERTAINMENT: "bg-purple-100 text-purple-400",
    RENT_AND_UTILITIES: "bg-yellow-100 text-yellow-500",
    HEALTHCARE: "bg-red-100 text-red-400",
    EDUCATION: "bg-indigo-100 text-indigo-400",
    TRAVEL: "bg-cyan-100 text-cyan-500",
    TRANSFER_OUT: "bg-slate-100 text-slate-500",
    TRANSFER_IN: "bg-emerald-100 text-emerald-500",
    PERSONAL_CARE: "bg-fuchsia-100 text-fuchsia-400",
    INCOME: "bg-sky-100 text-sky-400"
  };

  const defaultStyle = "bg-gray-100 text-gray-400";
  const categoryClass = categoryStyles[categoryTitle] || defaultStyle;

  const formatCategoryTitle = (title: string) => {
    return title
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className={`p-1 ${categoryClass} text-xs rounded-md font-medium`}>
      {formatCategoryTitle(categoryTitle)}
    </div>
  );
};

export default CategoryLabel;