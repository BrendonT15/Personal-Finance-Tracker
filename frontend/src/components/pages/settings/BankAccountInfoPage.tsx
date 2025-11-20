import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const BankAccountInfoPage = () => {
  return (
    <div className="p-1 col gap-4">
      <div className="col gap-4">
        <div className="flex items-center justify-between">
          <div className="">
            <p>Bank Account Information</p>
            <p className="text-xs text-gray-500">
              Update your account details here.
            </p>
          </div>

          <button className="rounded-md border p-2 cursor-pointer text-xs bg-purple-700 text-white font-medium flex items-center gap-1">
            <AddOutlinedIcon fontSize="inherit" className="text-white" />
            Add New
          </button>
        </div>

        <div className="border-b border-gray-200"></div>
      </div>

      <div className="col gap-4">
        <p>Saved Accounts</p>

        <div className="bg-green-100 p-1 rounded-md flex items-center gap-2 w-fit">
          <InfoOutlinedIcon className="text-green-500" fontSize="inherit"/>
          <p className="text-xs text-green-600 font-medium">Your bank account information is safe and secured</p>
        </div>

        <div className="border-gray-200 border rounded-md p-1 h-full">
          <p>Bank Account Widget</p>
        </div>
      </div>
    </div>
  );
};

export default BankAccountInfoPage;
