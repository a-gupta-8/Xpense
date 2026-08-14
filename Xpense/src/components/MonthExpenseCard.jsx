function MonthExpenseCard({ expense, onDelete, onEdit }) {
    const formattedDate = new Date(expense.date).toLocaleDateString(
        undefined,
        {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }
    );

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            {/* Expense details */}
            <div className="flex items-center gap-4">
                {/* Category icon */}
                <div className="w-10 h-10 rounded-full bg-[#4B2861]/10 flex items-center justify-center">
                    <span className="text-[#4B2861] font-semibold">
                        {expense.name?.charAt(0).toUpperCase()}
                    </span>
                </div>

                <div>
                    <p className="font-medium text-gray-800">
                        {expense.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        {expense.category} • {formattedDate}
                    </p>
                </div>
            </div>

            {/* Amount + buttons */}
            <div className="flex items-center gap-5">
                <p className="font-semibold text-gray-800">
                    ${Number(expense.amount).toFixed(2)}
                </p>

                <button
                    onClick={() => onEdit(expense)}
                    className="text-sm text-[#4B2861] hover:underline"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(expense.id)}
                    className="text-sm text-red-500 hover:underline"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default MonthExpenseCard;