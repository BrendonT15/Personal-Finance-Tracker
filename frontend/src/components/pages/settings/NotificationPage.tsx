const NotificationPage = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-6">
        <div className="">
          <p className="text-xl font-semibold">Notifications</p>
          <p className="text-sm">
            Get emails to find out what's going on when you're not online. You
            can turn them off anytime.
          </p>
        </div>

        <div className="border-b border-gray-200"></div>

        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <p>Mobile Notifications</p>
            <p>
              Recieve the latest news, updates, and industry tutorials from us.
            </p>
          </div>
          <div className=" col gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />

              <div className="">
                <p>Enable text notifcations </p>
                <p>News about products and feature updates</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />

              <div className="">
                <p>Enable text notifcations </p>
                <p>News about products and feature updates</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />

              <div className="">
                <p>Enable text notifcations </p>
                <p>News about products and feature updates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200"></div>

        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <p>Email Notifications</p>
            <p>
              Recieve the latest news, updates, and industry tutorials from us.
            </p>
          </div>
          <div className=" col gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />

              <div className="">
                <p>Enable text notifcations </p>
                <p>News about products and feature updates</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />

              <div className="">
                <p>Enable text notifcations </p>
                <p>News about products and feature updates</p>
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
