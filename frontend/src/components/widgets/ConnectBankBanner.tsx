import PlaidButton from "../plaid/PlaidButton";

const ConnectBankBanner = ({ onSuccess }: { onSuccess?: () => void }) => {
  return (
    <div className="w-full p-4 rounded-md border border-blue-300 bg-blue-50 flex items-center justify-between">
      <div className="flex flex-col">
        <h3 className="text-xl font-medium">Connect your bank account</h3>
        <p className="text-gray-600">
          Link your bank securely through Plaid to start tracking your finances.
        </p>
      </div>

      <div>
      <PlaidButton onSuccess={onSuccess} />
      </div>
    </div>
  );
};

export default ConnectBankBanner;
