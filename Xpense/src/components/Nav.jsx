import { useState } from 'react'
import AssetAdder from './AssetAdder.jsx';
function Nav({ supabase }) {
    const [assetAdder, setAssetAdder] = useState(false);
    const [expenseAdder, setExpenseAdder] = useState(false);

    return (
        <>
           <div class="fixed w-full bg-mauve-400 flex items-center justify-center gap-15 p-4 top-0 border-4 border-mauve-500">
                <button class="bg-mauve-500 hover:bg-mauve-700 text-white font-bold py-2 px-4 rounded" onClick={() => setAssetAdder(true)}>Add Asset</button>
                <button class="bg-mauve-500 hover:bg-mauve-700 text-white font-bold py-2 px-4 rounded" onClick={() => setExpenseAdder(true)}>Add Expense</button>
            </div>

            {assetAdder && (
                <AssetAdder
                    supabase={supabase}
                    onClose={() => setAssetAdder(false)} />
            )}
        </>

    );
}

export default Nav;