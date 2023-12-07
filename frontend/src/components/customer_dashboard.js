document.addEventListener('DOMContentLoaded', function () {
    // Add Event listeners
    const credit_card_payment = document.getElementById('credit_card_payment');
    const bank_statement = document.getElementById('bank_statement');

    credit_card_payment.addEventListener('click', function () {
        window.location.href = "/card_payment.html";
    });
    bank_statement.addEventListener('click',function () {
        window.location.href = "/bank_statement.html";
    });

});
