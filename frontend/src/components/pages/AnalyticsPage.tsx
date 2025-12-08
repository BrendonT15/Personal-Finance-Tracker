import {
  AccountBalanceWalletOutlined,
  TrendingDownOutlined,
  TrendingUpOutlined,
  SavingsOutlined,
  ReceiptOutlined,
  AccountBalanceOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import StatWidget from "../widgets/StatWidget";
import { usePlaidData } from "../../hooks/usePlaidData";
import { CumulativeBalanceChart } from "../widgets/charts/CumulativeBalanceChart";
import { WeeklySpendingChart } from "../widgets/charts/WeeklySpendingChart";
import { CashFlowAnalysisChart } from "../widgets/charts/CashFlowAnalysisChart";
import { CategoryRadarChart } from "../widgets/charts/CategoryRadarChart";

const AnalyticsPage = () => {
  const { metrics, hasBankAccount, isLoading, error, refetch } = usePlaidData();

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Loading analytics data...</p>
        </div>
      </div>
    );
  }
  
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 min-h-screen space-y-6">
      <h2 className="text-4xl font-medium">Analytics</h2>

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-4 gap-2">
        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Account Balance"
          widgetValue={metrics.totalBalance}
          widgetPercentChange={6.5}
          widgetPercentIcon={TrendingUpOutlined}
          percentColor="text-green-500"
          isCurrency={true}
        />

        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Transactions"
          widgetValue={metrics.transactionCount}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
          isCurrency={false}
        />

        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Spending"
          widgetValue={metrics.spending}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
          isCurrency={true}
        />

        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Income"
          widgetValue={metrics.income}
          widgetPercentChange={8.2}
          widgetPercentIcon={TrendingUpOutlined}
          percentColor="text-green-500"
          isCurrency={true}
        />

        <StatWidget
          widgetIcon={SavingsOutlined}
          widgetTitle="Savings Rate"
          widgetValue={metrics.savingsRate}
          isPercentage={true}
          widgetPercentChange={2.1}
          widgetPercentIcon={TrendingUpOutlined}
          percentColor="text-green-500"
          isCurrency={false}
        />

        <StatWidget
          widgetIcon={AccountBalanceOutlined}
          widgetTitle="Net Cash Flow"
          widgetValue={metrics.netCashFlow}
          widgetPercentChange={3.5}
          widgetPercentIcon={
            metrics.netCashFlow >= 0 ? TrendingUpOutlined : TrendingDownOutlined
          }
          percentColor={
            metrics.netCashFlow >= 0 ? "text-green-500" : "text-red-500"
          }
          isCurrency={true}
        />

        <StatWidget
          widgetIcon={ReceiptOutlined}
          widgetTitle="Avg Transaction"
          widgetValue={metrics.spending / (metrics.transactionCount || 1)}
          widgetPercentChange={-1.2}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
          isCurrency={true}
        />

        <StatWidget
          widgetIcon={RemoveOutlined}
          widgetTitle="Subscriptions"
          widgetValue={0}
          widgetPercentChange={0}
          widgetPercentIcon={RemoveOutlined}
          percentColor="text-gray-500"
          isCurrency={false}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CumulativeBalanceChart
          timeSeriesData={metrics.timeSeriesData}
          totalBalance={metrics.totalBalance}
        />
        <WeeklySpendingChart timeSeriesData={metrics.timeSeriesData} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CashFlowAnalysisChart timeSeriesData={metrics.timeSeriesData} />
        <CategoryRadarChart categoryData={metrics.categoryData} />
      </div>
    </div>
  );
};

export default AnalyticsPage;