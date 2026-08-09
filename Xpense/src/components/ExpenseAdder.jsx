import { useState, useEffect } from "react";
import { addAsset } from "./Supabaser.js";

function ExpenseAdder({supabase, onClose}) {

    const [bankTypes, setBankTypes] = useState([]);
    const [categoryType, setCategoryType] = useState([]);

    const [expenseName, setExpenseName] = useState("");
    const [expenseCategory, setExpenseCategory] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseBank, setExpenseBank] = useState("BMO");
    const [expenseDate, setExpenseDate] = useState("");

    useEffect(() => {
        async function getBankTypes() {
            const { data, error } = await supabase.rpc("get_my_banks");

            if (error) {
                console.error(error);
                return;
            }

            setBankTypes(data);
        }

        async function getCategoryTypes() {
            const { data, error } = await supabase.rpc("get_categories");

            if (error) {
                console.error(error);
                return;
            }

            setCategoryType(data);
        }

        getBankTypes();
        getCategoryTypes();

    }, []);

    async function handleAddExpense() {
        const result = await addAsset({
            supabase,
            bank: selectedBank,
            balance: parseFloat(amount)
        });

        if (!result?.error) {
            onClose();
        }
    }

    function handleClose() {
        onClose();
    }

    return (
        <div class="fixed flex flex-col w-[min(80vw,800px)] bg-mauve-200 flex items-center justify-center gap-8 top-40 border-4 border-mauve-500">
            <h2 class="flex w-full text-xl font-bold text-white bg-mauve-500 text-center h-12 justify-center items-center pb-1 font-mono" onClick={handleClose}>Add Asset</h2>
            <p class="text-mauve-500 font-mono">Institution</p>
            <select class="bg-mauve-200 text-black placeholder:text-gray-100 border border-mauve-500 focus:outline-none focus:ring-2 focus:ring-mauve-500 font-mono" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                {bankTypes.map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <p class="text-mauve-500 font-mono">Amount</p>
            <input class="bg-mauve-200 text-black border border-mauve-500 focus:outline-none focus:ring-2 focus:ring-mauve-500 font-mono" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button class="bg-mauve-500 hover:bg-mauve-700 text-white font-bold py-2 px-4 rounded mb-4 font-mono" onClick={handleAddAsset}>Add Asset</button>
        </div>
    )
}

export default AssetAdder;