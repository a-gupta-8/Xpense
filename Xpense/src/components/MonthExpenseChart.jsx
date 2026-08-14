import { PieChart } from '@mui/x-charts';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';

const StyledText = styled('text')(({ theme }) => ({
    fill: '#4B2861',
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
    fontFamily: 'monospace',
}));

function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();

    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}

function MonthExpenseChart({ supabase, refresh }) {
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        async function getExpenses() {
            const today = new Date();

            // First day of current month
            const startDate = new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );

            // First day of next month
            const endDate = new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                1
            );

            const { data, error } = await supabase
                .from('expenses')
                .select('category, amount')
                .gte('date', startDate.toISOString())
                .lt('date', endDate.toISOString());

            if (error) {
                console.error('Error fetching expenses:', error);
                return;
            }

            // Group expenses by category
            const categoryTotals = {};

            data.forEach((expense) => {
                if (!categoryTotals[expense.category]) {
                    categoryTotals[expense.category] = 0;
                }

                categoryTotals[expense.category] += Number(expense.amount);
            });

            // Convert into MUI PieChart format
            const formattedData = Object.entries(categoryTotals).map(
                ([category, amount], index) => ({
                    id: index,
                    value: amount,
                    label: category,
                })
            );

            setExpenseData(formattedData);
        }

        getExpenses();
    }, [supabase, refresh]);

    const totalExpenses = expenseData.reduce(
        (total, expense) => total + expense.value,
        0
    );

    return (
        <div className="flex flex-col w-[min(80vw,500px)] bg-mauve-300 items-center justify-center gap-1 top-40 border-4 h-80 border-mauve-500 z-0">
            <p className="text-mauve-500 font-mono pt-5">
                Expenses This Month
            </p>

            <PieChart
                colors={['#4B2861', '#795F8A', '#9B82A8', '#B8A6C2', '#D0C5D6']}
                height={200}
                width={200}
                series={[
                    {
                        data: expenseData,
                        innerRadius: 90,
                        outerRadius: 100,
                        paddingAngle: 3,
                        cornerRadius: 4,
                        startAngle: 0,
                        endAngle: 360,
                    },
                ]}
                slotProps={{
                    legend: {
                        hidden: true,
                    },
                }}
            >
                <PieCenterLabel>
                    ${totalExpenses.toLocaleString()}
                </PieCenterLabel>
            </PieChart>
        </div>
    );
}

export default MonthExpenseChart;