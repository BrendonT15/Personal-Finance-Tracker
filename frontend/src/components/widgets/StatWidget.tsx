import type { SvgIconComponent } from "@mui/icons-material";

interface StatWidgetProps {
  widgetIcon: SvgIconComponent;
  widgetTitle: string;
  widgetValue: number;
  widgetPercentChange: number;
  widgetPercentIcon: SvgIconComponent;
  percentColor: string;
}

const StatWidget = ({
  widgetIcon: WidgetIcon,
  widgetTitle,
  widgetValue,
  widgetPercentChange,
  widgetPercentIcon: WidgetPercentIcon,
  percentColor,
}: StatWidgetProps) => {
  return (
    <div className="col gap-1 border border-gray-200 rounded-md p-3">
      <div className="flex items-center gap-2">
        <WidgetIcon className="text-gray-400" fontSize="inherit" />
        <p className="text-sm text-gray-400">{widgetTitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-medium text-2xl">
          $
          {typeof widgetValue === "number"
            ? widgetValue.toLocaleString()
            : widgetValue}
        </p>
        <div className="flex items-center gap-1">
          <WidgetPercentIcon className={percentColor} fontSize="inherit" />
          <p className={`text-xs font-medium ${percentColor}`}>
            {widgetPercentChange}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatWidget;
