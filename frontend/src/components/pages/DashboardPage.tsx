import ConnectBankBanner from "../widgets/ConnectBankBanner";
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
import PlaidDisconnectButton from "../plaid/PlaidDisconnectButton";
import IncomeSpendingChart from "../widgets/charts/IncomeSpendingChart";
import SpendingPieChart from "../widgets/charts/SpendingPieChart";
import DailyCashflowChart from "../widgets/charts/DailyCashflowChart";
import TransactionsWidget from "../widgets/TransactionsWidget";

const DashboardPage = () => {
  const { metrics, hasBankAccount, isLoading, error, refetch } = usePlaidData();

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-96">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 min-h-screen">
      <h2 className="text-4xl font-medium flex items-center gap-3">
        Dashboard
      </h2>

      {hasBankAccount ? (
        <div className="rounded-md p-4 bg-green-50">
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

      <div className="flex items-center gap-2 flex-wrap">
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
        <div className="flex flex-col gap-4">
          <IncomeSpendingChart data={metrics.timeSeriesData} />
          <DailyCashflowChart data={metrics.dailyCashFlow} />
        </div>

        <SpendingPieChart data={metrics.categoryData} />
      </div>

     <TransactionsWidget/>
    </div>
  );
};

export default DashboardPage;
