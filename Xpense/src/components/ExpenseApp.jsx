import Nav from './Nav.jsx';

function ExpenseApp({ supabase }) {

    return (
       <Nav supabase={supabase} />
    );
}

export default ExpenseApp;