const NotificationPage = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-6">
        <div className="">
          <p className="text-2xl font-semibold">Notifications</p>
          <p className="text-sm">
            Choose how you want to stay updated. Manage email and mobile alerts
            for account activity, product updates, and important notifications.
          </p>
        </div>

        <div className="border-b border-gray-200"></div>

        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <p className="text-lg font-medium">Mobile Notifications</p>
            <p className="text-sm">
              Receive real-time alerts directly to your phone. Perfect for quick
              updates and immediate activity notices.
            </p>
          </div>
          <div className=" col gap-4">
            <div className="flex items-center gap-4">
              <input type="checkbox" />

              <div className="">
                <p className=" font-medium">Enable text notifcations </p>
                <p className="text-xs">
                  Get SMS alerts for spending, deposits, and account activity
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input type="checkbox" />

              <div className="">
                <p className=" font-medium">Marketing & product updates</p>
                <p className="text-xs">
                  Hear about new features, tools, and financial tips
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input type="checkbox" />

              <div className="">
                <p className=" font-medium">Security & login alerts</p>
                <p className="text-xs">
                  Get notified about suspicious logins or access attempts
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200"></div>

        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <p className="text-lg font-medium">Email Notifications</p>
            <p className="text-sm">
              Stay informed with regular email summaries, insights, and
              account-related alerts. You can unsubscribe anytime.
            </p>
          </div>
          <div className=" col gap-4">
            <div className="flex items-center gap-4">
              <input type="checkbox" />

              <div className="">
                <p className="font-medium">Weekly account summary</p>
                <p className="text-xs">
                  Overview of spending, balances, and insights
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input type="checkbox" />

              <div className="">
                <p className="font-medium">Product news & feature releases</p>
                <p className="text-xs">
                  Be first to know about new updates and improvements
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200"></div>
      </div>
    </div>
  );
};

export default NotificationPage;
