const TransactionButton = ({
  buttonTitle,
  badgeValue,
}: {
  buttonTitle: string;
  badgeValue: number;
}) => {
  return (
    <button className="flex items-center justify-between border-gray-100 py-2 px-4 rounded-sm bg-gray-100 cursor-pointer text-gray-500 gap-2">
      <span>{buttonTitle}</span>

      <div className="bg-gray-200 px-1 py-1 text-gray-500 font-medium text-xs flex items-center justify-center rounded-sm">
        {badgeValue}
      </div>
    </button>
  );
};

export default TransactionButton;
