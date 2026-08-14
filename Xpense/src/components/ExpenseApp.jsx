import Nav from './Nav.jsx';
import AssetChart from './AssetChart.jsx';
import ExpenseTrendChart from './ExpenseTrendChart.jsx';
import MonthExpenseChart from './MonthExpenseChart.jsx';
import { useState } from 'react';

function ExpenseApp({ supabase }) {

    const [refreshCharts, setRefreshCharts] = useState(0);

    return (
        <>
            <Nav supabase={supabase} setRefreshCharts={setRefreshCharts} />
            <div className="flex flex-col md:flex-row gap-16 -mt-140">
                <AssetChart supabase={supabase} bank="BMO" refresh={refreshCharts} />
                <ExpenseTrendChart supabase={supabase} refresh={refreshCharts} />
                <MonthExpenseChart supabase={supabase} refresh={refreshCharts} />
            </div>

        </>

    );
}

export default ExpenseApp;