
// Adds income or moves assets to a different bank accounts

export async function addAsset({ supabase, bank, amount }) {
    if (!bank || !amount) {
        console.error("Bank and amount are required to add an asset.");
        return;
    }

    if (bank === "WealthSimple_Invest") {
        const { errorSubtract } = await supabase.rpc("subtract_balance_from_bank", {
            subtracted_bank: "WealthSimple",
            subtracted_amount: amount
        }); 

        if (errorSubtract) {
            console.error("Error subtracting balance from WealthSimple:", errorSubtract.message);
            return;
        }
    }

    const { errorAdd } = await supabase.rpc("add_balance_to_bank", {
            added_bank: bank,
            added_amount: amount
    });

    if (errorAdd) {
        console.error("Error adding balance to bank:", errorAdd.message);
        return;
    }

    console.log("Asset added");
    return;
}

// insert into asset table

export async function insertAsset({ supabase, bank, balance }) {
    if (!bank || !balance) {
        console.error("Bank and balance are required to insert an asset.");
        return;
    }

    const { data, error } = await supabase
        .from("asset")
        .insert({
            bank: bank,
            balance: balance
        });

    if (error) {
        console.error("Error inserting asset:", error.message);
        return;
    }

    console.log("Asset inserted:", data);
    return;
}

// add expense to the expense table

export async function addExpense({ supabase, name, category, amount, bank, date }) {
    if (!name || !category || !amount || !bank || !date) {
        console.error("All fields are required to add an expense.");
        return;
    }

    const { data, error } = await supabase
        .from("expenses")
        .insert({
            name: name,
            category: category,
            amount: amount,
            paid_by: bank,
            date: date
        });

    if (error) {
        console.error("Error adding expense:", error.message);
        return;
    }

    const { errorSubtract } = await supabase.rpc("subtract_balance_from_bank", {
            subtracted_bank: bank,
            subtracted_amount: amount
    });

    if (errorSubtract) {
        console.error("Error subtracting balance from bank", errorSubtract.message);
        return;
    }

    console.log("Expense added:", data);
    return;
}