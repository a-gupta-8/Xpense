import { useEffect, useState } from 'react';
import MonthExpenseCard from './MonthExpenseCard.jsx';

function MonthExpenseList({ supabase, refresh }) {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getMonthlyExpenses() {
            setLoading(true);

            const today = new Date();

            const startDate = new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );

            const endDate = new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                1
            );

            const { data, error } = await supabase
                .from('expenses')
                .select('*')
                .gte('date', startDate.toISOString())
                .lt('date', endDate.toISOString())
                .order('date', { ascending: false });

            if (error) {
                console.error('Error fetching monthly expenses:', error);
                setExpenses([]);
            } else {
                setExpenses(data || []);
            }

            setLoading(false);
        }

        getMonthlyExpenses();
    }, [supabase, refresh]);

    async function handleDelete(id) {
        const { error } = await supabase
            .from('expenses')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting expense:', error);
            return;
        }

        // Remove it immediately from the list
        setExpenses((currentExpenses) =>
            currentExpenses.filter((expense) => expense.id !== id)
        );
    }

    function handleEdit(expense) {
        console.log('Edit expense:', expense);

        // We'll implement the edit modal/form here
    }

    const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const monthName = new Date().toLocaleString('default', {
        month: 'long',
    });

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-md p-6">
                <p className="text-gray-500">
                    Loading expenses...
                </p>
            </div>
        );
    }

    return (
       <div className="flex flex-col top-150 bg-mauve-300 border border-mauve-500 rounded-2xl shadow-md p-6 w-[min(80vw,700px)] max-h-[80vh] overflow-y-auto">

    {/* Header */}
    <div className="flex items-center justify-between w-full mb-5">
        <div>
            <h2 className="text-xl font-semibold text-[#4B2861]">
                {monthName} Expenses
            </h2>

            <p className="text-sm text-gray-500">
                {expenses.length} expense
                {expenses.length !== 1 ? 's' : ''}
            </p>
        </div>

        <div className="text-right">
            <p className="text-sm text-gray-500">
                Total
            </p>

            <p className="text-xl font-bold text-[#4B2861]">
                ${totalExpenses.toFixed(2)}
            </p>
        </div>
    </div>

    {/* Expense cards */}
    <div className="w-full">
        {expenses.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
                No expenses this month.
            </div>
        ) : (
            <div className="flex flex-col gap-3">
                {expenses.map((expense) => (
                    <MonthExpenseCard
                        key={expense.id}
                        expense={expense}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        )}
    </div>

</div>
    );
}

export default MonthExpenseList;