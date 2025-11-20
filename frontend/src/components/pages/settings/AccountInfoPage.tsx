import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const AccountInfoPage = () => {
  return (
    <div className="p-1 col gap-4">
      <div className="col gap-4">
        <div className="flex items-center justify-between">
          <div className="">
            <p>Account Information</p>
            <p className="text-xs text-gray-500">
              Update your personal details here
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button className="rounded-md border p-2 cursor-pointer text-xs border-gray-200 font-medium">
              Cancel
            </button>
            <button className="rounded-md border p-2 cursor-pointer text-xs bg-purple-700 text-white font-medium">
              Save Changes
            </button>
          </div>
        </div>

        <div className="border-b border-gray-200"></div>
      </div>

      <div className="flex items-top justify-between">
        <p>Name</p>

        <div className="flex items-center gap-1">
          <div className="col gap-1">
            <p className="text-xs text-gray-500"> First Name</p>
            <input
              type="text"
              className="border rounded-md border-gray-200 focus:outline-none"
            />
          </div>
          <div className="col gap-1">
            <p className="text-xs text-gray-500"> Last Name</p>
            <input
              type="text"
              className="border border-gray-200 rounded-md focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>

      <div className="flex items-top justify-between">
        <p>Email Address</p>
        <div className="col gap-1">
          <input type="text" className="border border-gray-200 rounded-md" />
          <p className="text-xs text-orange-400">Your email address is not verified yet.</p>
          <p className="text-xs text-purple-700 cursor-pointer">Verify now</p>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>
      <div className="flex items-top justify-between">
        <p>Phone Number</p>
        <div className="flex items-center gap-1">
          <div className="bg-gray-200 rounded-md p-1">
            <p className='text-gray-500'>1234 567 890</p>
          </div>
          <EditOutlinedIcon fontSize='inherit' className='text-gray-500 cursor-pointer'/>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>
      <div className="flex items-top justify-between">
        <p>Country</p>
        <div className="flex items-center gap-1">
          <input type="text" className="border border-gray-200 rounded-md" />
          <p className="text-xs text-purple-700">Verify now</p>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>
    </div>
  );
};

export default AccountInfoPage;
