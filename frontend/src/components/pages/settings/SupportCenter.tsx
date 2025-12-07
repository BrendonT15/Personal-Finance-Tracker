import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";

const SupportCenter = () => {
  return (
    <div className="p-4 col gap-6">
      <div className="">
        <p className="font-semibold text-xl">Support Center</p>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore odit
          hic esse voluptatem 
        </p>
      </div>

      <div className="border-b border-gray-200"></div>

      <div className="relative bg-gray-100 p-2 rounded-sm flex items-center gap-2 w-full">
        <SearchOutlinedIcon className="text-gray-500" fontSize="small" />
        <input
          type="text"
          placeholder="Search here"
          className="bg-gray-100 focus:outline-none flex-1 text-sm text-gray-500 placeholder-gray-400"
        />
      </div>

      <div className="border border-gray-200 rounded-md p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
        <div className="">
          <div className="flex items-center gap-1 ">
            <SafetyCheckIcon fontSize="small" />
            <p className="font-medium">Safety Center</p>
          </div>
          <p className="text-xs mt-1 font-light">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed sint
            ut qui voluptate tempora cupiditate facilis optio{" "}
          </p>
        </div>
        <ArrowForwardOutlinedIcon fontSize="small" />
      </div>

      <div className="border border-gray-200 rounded-md p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
        <div className="">
          <div className="flex items-center gap-1 ">
            <LocalActivityOutlinedIcon fontSize="small" />
            <p className="font-medium">Ticket Support</p>
          </div>
          <p className="text-xs mt-1 font-light">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed sint
            ut qui voluptate tempora cupiditate facilis optio{" "}
          </p>
        </div>
        <ArrowForwardOutlinedIcon fontSize="small" />
      </div>

      <div className="border border-gray-200 rounded-md p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
        <div className="">
          <div className="flex items-center gap-1 ">
            <PsychologyOutlinedIcon fontSize="small" />
            <p className="font-medium">How BAT Works</p>
          </div>
          <p className="text-xs mt-1 font-light">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed sint
            ut qui voluptate tempora cupiditate facilis optio{" "}
          </p>
        </div>
        <ArrowForwardOutlinedIcon fontSize="small" />
      </div>

      <div className="border border-gray-200 rounded-md p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
        <div className="">
          <div className="flex items-center gap-1 ">
            <QuestionAnswerOutlinedIcon fontSize="small" />
            <p className="font-medium">FAQs</p>
          </div>
          <p className="text-xs mt-1 font-light">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed sint
            ut qui voluptate tempora cupiditate facilis optio{" "}
          </p>
        </div>
        <ArrowForwardOutlinedIcon fontSize="small" />
      </div>

      <div className="border-b border-gray-200"></div>
    </div>
  );
};

export default SupportCenter;
