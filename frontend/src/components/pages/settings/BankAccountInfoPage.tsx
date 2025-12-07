import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PlaidDisconnectButton from "../../plaid/PlaidDisconnectButton";
import ConnectBankBanner from "../../widgets/ConnectBankBanner";
import { usePlaidData } from "../../../hooks/usePlaidData";  

const BankAccountInfoPage = () => {
  const { hasBankAccount, refetch } = usePlaidData();         
  return (
    <div className="p-4">
      {hasBankAccount ? (
        <div className=" rounded-md p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-800">
                Bank Account Connected
              </h3>
              <p className="text-sm text-green-600">
                Your financial data is synced and up to date
              </p>
            </div>

            <PlaidDisconnectButton onSuccess={refetch} />
          </div>
        </div>
      ) : (
        <ConnectBankBanner onSuccess={refetch} />
      )}
    </div>
  );
};

export default BankAccountInfoPage;
