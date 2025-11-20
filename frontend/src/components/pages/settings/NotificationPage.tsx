const NotificationPage = () => {
  return (
    <div className="p-1 col gap-4">
      <div className="col gap-4">
        <div className="flex items-center justify-between">
          <div className="">
            <p>Notifications</p>
            <p className="text-xs text-gray-500">
              Get emails to find out what's going on when you're not online.
              Turn them off anytime.
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200"></div>
      </div>

      <div className="flex items-top justify-between">
        <div className="">
          <p>Mobile Notifications</p>
          <p className="text-xs text-gray-500">
            Recieve the latesrt news, updates, and industry tutorials from us.
          </p>
        </div>

        <div className="col gap-4">
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-[2px]" />
            <div className=" col gap-1 text-xs ">
              <p>Enable Text Notifications</p>
              <p className="text-gray-500">
                News about product and feature updates
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-[2px]" />
            <div className=" col gap-1 text-xs ">
              <p>Push Notifications</p>
              <p className="text-gray-500">
                News about product and feature updates
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-[2px]" />
            <div className=" col gap-1 text-xs ">
              <p>Weekly Notifications</p>
              <p className="text-gray-500">
                News about product and feature updates
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>

      <div className="flex items-top justify-between">
        <div className="">
          <p>Emaik Notifications</p>
          <p className="text-xs text-gray-500">
            Recieve the latesrt news, updates, and industry tutorials from us.
          </p>
        </div>

        <div className="col gap-4">
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-[2px]" />

            <p className="text-xs">Promotional & Announcments</p>
          </div>
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-[2px]" />
            <div className=" col gap-1 text-xs ">
              <p>Latest Offers & Deals </p>
              <p className="text-gray-500">
                News about product and feature updates
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>
    </div>
  );
};

export default NotificationPage;
