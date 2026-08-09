
// Adds income or moves assets to a different bank accounts

export async function addAsset({ supabase, bank, balance }) {
    if (!bank || !balance) {
        console.error("Bank and balance are required to add an asset.");
        return;
    }


    if (bank === "WealthSimple_Invest") {
        const { data: existingData, error: existingError } = await supabase
            .from("asset")
            .select("balance")
            .eq("bank", "WealthSimple")
            .single();

        if (existingError && existingError.message !== "No rows found") {
            console.error("Error fetching existing asset:", existingError.message);
            return;
        }

        const reducedAmount = existingData ? existingData.balance - balance : existingData.balance;

        const { data, error } = await supabase
            .from("asset")
            .update({
                balance: reducedAmount
            })
            .eq("bank", "WealthSimple")

        if (error) {
            console.error("Error reducing asset:", error.message);
            return;
        }
        console.log("Asset reduced:", {data, error});
    }

    // current amount + added amount
    const { data: existingData, error: existingError } = await supabase
        .from("asset")
        .select("balance")
        .eq("bank", bank)
        .single();

    if (existingError && existingError.message !== "No rows found") {
        console.error("Error fetching existing asset:", existingError.message);
        return;
    }

    const newAmount = existingData ? existingData.balance + balance : balance;

    const { data, error } = await supabase
    .from("asset")
    .update({
      balance: newAmount
    })
    .eq("bank", bank);

    if (error) {
        console.error("Error adding asset:", error.message);
        return;
    }

    console.log("Asset added:", data);
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