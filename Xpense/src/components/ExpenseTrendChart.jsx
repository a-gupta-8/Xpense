import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

function ExpenseTrendChart({ supabase, refresh }) {
    const [monthlyExpenses, setMonthlyExpenses] = useState([]);

    useEffect(() => {
        async function getExpenses() {
            const today = new Date();

            const startDate = new Date(
                today.getFullYear(),
                today.getMonth() - 5,
                1
            );

            const { data, error } = await supabase
                .from('expenses')
                .select('amount, date')
                .gte(
                    'date',
                    startDate.toISOString().split('T')[0]
                );

            if (error) {
                console.error('Error fetching expenses:', error);
                return;
            }

            const months = [];

            for (let i = 5; i >= 0; i--) {
                const date = new Date(
                    today.getFullYear(),
                    today.getMonth() - i,
                    1
                );

                months.push({
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    label: date.toLocaleString('default', {
                        month: 'short',
                    }),
                    total: 0,
                });
            }

            data.forEach((expense) => {
                const expenseDate = new Date(expense.date);

                const month = months.find(
                    (m) =>
                        m.year === expenseDate.getFullYear() &&
                        m.month === expenseDate.getMonth()
                );

                if (month) {
                    month.total += Number(expense.amount);
                }
            });

            setMonthlyExpenses(months);
        }

        getExpenses();
    }, [supabase, refresh]);

    return (
        <div className="top-40 flex h-80 w-[min(80vw,500px)] flex-col items-center justify-center gap-1 border-4 border-mauve-500 bg-mauve-300">
            <LineChart
                width={window.innerWidth < 768 ? window.innerWidth * 0.8 : 500}
                height={300}
                series={[
                    {
                        data: monthlyExpenses.map(
                            (month) => month.total
                        ),
                        label: 'Expenses',
                        showMark: true,
                        color: "#795F8A",
                    },
                ]}
                xAxis={[
                    {
                        scaleType: 'point',
                        data: monthlyExpenses.map(
                            (month) => month.label
                        ),
                    },
                ]}
                yAxis={[
                    {
                        valueFormatter: (value) =>
                            `$${value.toLocaleString()}`,
                    },
                ]}
                hideLegend
            />
        </div>
    );
}

export default ExpenseTrendChart;