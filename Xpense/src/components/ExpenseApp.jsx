import Nav from './Nav.jsx';
import AssetChart from './AssetChart.jsx';
import ExpenseTrendChart from './ExpenseTrendChart.jsx';

function ExpenseApp({ supabase }) {

    return (
        <>
            <Nav supabase={supabase} />
            <AssetChart supabase={supabase} bank="BMO" />
            <ExpenseTrendChart supabase={supabase} bank="BMO" />
        </>

    );
}

export default ExpenseApp;