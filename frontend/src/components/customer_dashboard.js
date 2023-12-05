document.addEventListener('DOMContentLoaded', function () {

    const credit_card_payment = document.getElementById('credit_card_payment');

    credit_card_payment.addEventListener('click', function () {
        window.location.href = "/card_payment.html";
    });
});
