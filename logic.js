document.getElementById('VerifyButton').addEventListener('click', function () {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
    const cardInfo = document.getElementById('cardInfo');
    const cardLogo = document.getElementById('cardLogo');
    const cardType = document.getElementById('cardType');

    //Validate the card number using the Luhn algorithm
    const [isValid, numDigits, firstDigits] = validateCardNumber(cardNumber);

    if (isValid) {
        let type = '';
        let logoSrc = '';

        //Determine Card
        if ((firstDigits === 34 || firstDigits === 37) && numDigits === 15) {
            type = 'American Express';
            logoSrc = 'files/amex.svg';
        } else if (firstDigits >= 51 && firstDigits <= 55 && numDigits === 16) {
            type = 'MasterCard';
            logoSrc = 'files/mastercard.svg';
        } else if (cardNumber.startswith('4') && (numDigits === 13 || numDigits === 16)) {
            type = "visa";
            logoSrc = 'files/visa.svg';
        } else {
            type = 'Invalid Card';
            logoSrc = '';
        }

        cardInfo.classList.remove('hidden');
        cardLogo.src = logoSrc;
        cardType.textContent = type;
    } else {
        cardInfo.classList.add('hidden');
        alert('Not a valid credit card number!')
    }

});

function validateCardNumber(number) {
    let sum = 0;
    let numDigits = number.length;
    let parity = numDigits % 2;

    for (let i = 0; i < numDigits; i++) {
        let digit = parseInt(number.charAt(i), 10);

        if (i % 2 === parity) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
    }

    const isValid = (sum % 10 === 0);
    const firstDigits = parseInt(number.substring(0, 2), 10); // Extract first two digits
    return [isValid, numDigits, firstDigits]
}