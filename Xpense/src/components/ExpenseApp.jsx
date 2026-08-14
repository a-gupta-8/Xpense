import Nav from './Nav.jsx';
import AssetChart from './AssetChart.jsx';
import ExpenseTrendChart from './ExpenseTrendChart.jsx';
import MonthExpenseChart from './MonthExpenseChart.jsx';
import MonthExpenseList from './MonthExpenseList.jsx';
import { useState } from 'react';

function ExpenseApp({ supabase }) {

    const [refreshCharts, setRefreshCharts] = useState(0);

    return (
        <>
            <Nav supabase={supabase} setRefreshCharts={setRefreshCharts} />
            <div className="w-full flex flex-col items-center gap-20 px-4 pt-40">
                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-16 px-4 md:-mt-50">
                    <AssetChart supabase={supabase} bank="BMO" refresh={refreshCharts} />
                    <ExpenseTrendChart supabase={supabase} refresh={refreshCharts} />
                    <MonthExpenseChart supabase={supabase} refresh={refreshCharts} />
                </div>
                <MonthExpenseList supabase={supabase} refresh={refreshCharts} />
            </div>
        </> 

    );
}

export default ExpenseApp;