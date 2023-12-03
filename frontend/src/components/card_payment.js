document.addEventListener('DOMContentLoaded', function () {

    var list_of_account_numbers = [];
    var list_of_account_balances = [];
    var list_of_account_types = [];

    try{

        fetch("/api/accountActivity?cust_id=1", {
            method: "GET",
            headers: {
                "Content-Type":"application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => {

            var results_lists = data.data.results[1];

            // Iterate over the array and access each element
            for (var i = 0; i < results_lists.length; i++) {

                var account_info = results_lists[i];
                list_of_account_numbers.push(account_info.Account_Number);
                list_of_account_balances.push(account_info.Account_Balance);
                list_of_account_types.push(account_info.Account_Type);
            }

            var list_of_from_account_numbers = [];
            var map_of_from_balances = {};
            var list_of_to_account_numbers = [];
            var map_of_to_balances = {};
            
            for (var i = 0; i < list_of_account_types.length; i++){

                if(list_of_account_types[i] === 0){
                    list_of_from_account_numbers.push(list_of_account_numbers[i]);
                    map_of_from_balances[list_of_account_numbers[i]] = list_of_account_balances[i];
                }
                else if(list_of_account_types[i] === 2){
                    list_of_to_account_numbers.push(list_of_account_numbers[i]);
                    map_of_to_balances[list_of_account_numbers[i]] = list_of_account_balances[i];
                }
            }

            const accountFromDropdown = document.getElementById('account_from');

            // Clear existing options
            accountFromDropdown.innerHTML = '';

            // Add options to the dropdown
            list_of_from_account_numbers.forEach(function (account) {
                const option = document.createElement('option');
                option.value = account;
                option.textContent = account;
                accountFromDropdown.appendChild(option);
            });

            const accountToDropdown = document.getElementById('account_to');

            // Clear existing options
            accountToDropdown.innerHTML = '';

            // Add options to the dropdown
            list_of_to_account_numbers.forEach(function (account) {
                const option = document.createElement('option');
                option.value = account;
                option.textContent = account;
                accountToDropdown.appendChild(option);
            });

            document.getElementById('account_balance_from').textContent = map_of_from_balances[document.getElementById('account_from').value].toFixed(2);
            document.getElementById('account_balance_to').textContent = map_of_to_balances[document.getElementById('account_to').value].toFixed(2);
            
        })
        .catch((err) => {
            console.log(err);
            window.alert("An error occurred during the API request.");
        })
    } 
    catch (error) {
        console.error("Error:", error);
        alert("An error occurred during the API request.");
    }

});

// The rest of your script.js remains the same...
function submit_payment() {

    // Get selected values from dropdowns
    const customer_id = 1;
    const account_from = document.getElementById('account_from').value;
    const account_to = document.getElementById('account_to').value;
    const transaction_amount = document.getElementById('payment_amount').value;

    console.log(customer_id);
    console.log(account_from);
    console.log(account_to);
    console.log(transaction_amount);

    const payload = {
        "customer_id" : customer_id,
        "account_num_from" : account_from,
        "account_num_to" : account_to,
        "transaction_amount" : transaction_amount
    }

    //TODO: Check for invalid payment amount
    fetch("/api/card_payment", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(payload)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        window.alert('Money transferred successfully!');
    })
    .catch((err) => {
        console.log(err);
        window.alert('Error in processing the transaction.');
    })
}
