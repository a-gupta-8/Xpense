import Nav from './Nav.jsx';
import AssetChart from './AssetChart.jsx';

function ExpenseApp({ supabase }) {

    return (
        <>
            <Nav supabase={supabase} />
            <AssetChart supabase={supabase} bank="BMO" />
        </>

    );
}

export default ExpenseApp;