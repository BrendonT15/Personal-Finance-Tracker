const TransactionButton = ({
  buttonTitle,
  badgeValue,
}: {
  buttonTitle: string;
  badgeValue: number;
}) => {
  return (
    <button className="flex items-center justify-between border-gray-100 py-1 px-2 rounded-sm bg-gray-100 cursor-pointer text-gray-500 gap-2 text-xs">
      <span>{buttonTitle}</span>

      <div className="bg-gray-200 p-1 text-gray-500 font-medium text-xs flex items-center justify-center rounded-sm">
        {badgeValue}
      </div>
    </button>
  );
};

export default TransactionButton;
