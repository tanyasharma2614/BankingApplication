document.addEventListener('DOMContentLoaded', function () {
    // Add Event listeners
    const credit_card_payment = document.getElementById('credit_card_payment');
    const bank_statement = document.getElementById('bank_statement');
    const debit_card_details = document.getElementById('debit_card_details'); 

    credit_card_payment.addEventListener('click', function () {
        window.location.href = "/card_payment.html";
    });
    bank_statement.addEventListener('click',function () {
        window.location.href = "/bank_statement.html";
    });
    report_debit_card.addEventListener('click', function () {
        window.location.href = "/report_debit_card.html"; // Redirect to the new debit card details page
    });
    explore_products.addEventListener('click', function () {
        window.location.href = "/products.html"; // Redirect to the new debit card details page
    });

    //Move to admin dash
    modify_products.addEventListener('click', function () {
        window.location.href = "/modify_products.html"; // Redirect to the new debit card details page
    });
});
