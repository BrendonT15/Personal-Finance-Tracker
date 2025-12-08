import CategoryLabel from "./CategoryLabel";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const TransactionRow = ({
  transactionNumber,
  transactionID,
  description,
  merchant,
  category,
  date,
  price,
  paymentChannel,
  website,
  logo_url,
  pending,
}: {
  transactionNumber: number;
  transactionID: string;
  description: string;
  merchant: string;
  category: string;
  date: string;
  price: number;
  paymentChannel: string;
  website: string;
  logo_url: string;
  pending: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);

    if (!isOpen) {
      gsap.to(backdropRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(backdropRef.current, { autoAlpha: 0, duration: 0.3 });
      gsap.to(menuRef.current, {
        x: menuRef.current!.offsetWidth,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    gsap.to(backdropRef.current, { autoAlpha: 0, duration: 0.3 });
    gsap.to(menuRef.current, {
      x: menuRef.current!.offsetWidth,
      duration: 0.5,
      ease: "power3.in",
    });
  };

  const transactionRowClasses =
    "justify-center flex items-center text-gray-400 text-xs";

  return (
    <>
      <div
        className="p-4 border-b border-gray-200  grid grid-cols-7  hover:bg-gray-50 cursor-pointer"
        onClick={toggleMenu}
      >
        <div className={transactionRowClasses}>
          <p>{transactionNumber}</p>
        </div>
        <div className={transactionRowClasses}>
          <p>{transactionID}</p>
        </div>
        <div className={transactionRowClasses}>
          <p>{description}</p>
        </div>
        <div className={transactionRowClasses}>
          <p>{merchant}</p>
        </div>
        <div className={transactionRowClasses}>
          <CategoryLabel categoryTitle={category} />
        </div>
        <div className={transactionRowClasses}>
          <p>{date}</p>
        </div>
        <div className={transactionRowClasses}>
          <p>${price.toFixed(2)}</p>
        </div>
      </div>

      <div
        ref={backdropRef}
        onClick={closeMenu}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 50, pointerEvents: isOpen ? "auto" : "none" }}
      ></div>

      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full bg-gray-100 w-2/5 p-4"
        style={{ transform: "translateX(100%)", zIndex: 51 }}
      >
        {/* Transaction Menu Content */}
        <div className="h-full">
          <div className="cursor-pointer text-end " onClick={closeMenu}>
            <CloseOutlinedIcon className="text-gray-500" fontSize="inherit" />
          </div>

          <div className="p-4 h-full col gap-2">
            <h2 className="text-4xl font-semibold text-orange-400">{transactionID}</h2>

            <div className="border border-gray-300 flex-1 flex flex-col rounded-md">
              <p className="text-gray-400 text-sm uppercase font-medium tracking-tight border-b border-gray-300 p-4 w-full ">
                Transaction Detail
              </p>

              <div className="p-4 border-b border-gray-300">
                <p className="text-4xl font-semibold">${price.toFixed(2)}</p>
              </div>

              <div className="p-4 grid grid-cols-2 gap-4 border-b border-gray-300">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 ">
                    {logo_url && (
                      <img
                        src={logo_url}
                        className="object-cover rounded-md w-10 h-10"
                      />
                    )}
                    <div className="">
                      <p className="text-xs text-gray-400">Transaction Name</p>
                      <p>{merchant}</p>
                    </div>
                  </div>
                  <div className="">
                    <p className="text-xs text-gray-400">Date</p>
                    <p>{date}</p>
                  </div>

                  <div className="">
                    <p className="text-xs text-gray-400">Payment Channels</p>
                    <p>{paymentChannel}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="">
                    <p className="text-xs text-gray-400">Transaction ID</p>
                    <p>{transactionID}</p>
                  </div>
                  <div className="">
                    <p className="text-xs text-gray-400">Website</p>
                    <p>{website}</p>
                  </div>
                  <div className="">
                    <p className="text-xs text-gray-400">Category</p>
                    <p>{category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionRow;
