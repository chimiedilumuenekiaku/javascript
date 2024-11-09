var maxValue = 100;
var nbAttempt = 5;
var valueToFind = Math.floor(Math.random() * maxValue + 1);
var numberTry = 0;
var valueField = document.getElementById('valueField');
var instruction = document.getElementById('result');
var lastResult = document.getElementById('lastResult');

if (valueToFind > maxValue){
    valueToFind = maxValue;
}

document.getElementById('maxValue').innerHTML = maxValue;
document.getElementById('tentative').innerHTML = nbAttempt;
valueField.value = '';
valueField.focus();

function verifyReply() {
    var proposedValue = valueField.value;
    var pattern = /^\d+$/;

    if(pattern.test(proposedValue)){
        numberTry ++;
        
        proposedValue = parseInt(proposedValue);
        if(numberTry === nbAttempt){
            lastResult.textContent = '!!! FIN DU JEUX !!!';
            instruction.innerHTML = 'Vous avez perdu!';
            instruction.style.backgroundColor = 'red';
            instruction.style.color = 'white';
            valueField.value = '';
            valueField.focus();
        }
        else if(proposedValue < valueToFind){
            instruction.innerHTML = "Le nombre a trouver est plus grand";
            valueField.value = '';
            valueField.focus();
        }
        else if(proposedValue > valueToFind){
            instruction.innerHTML = "Le nombre a trouver est plus petit";
            valueField.value = '';
            valueField.focus(); 
        }
        else
        {
            instruction.innerHTML = "Félicitations! Vous avez Gagné! en "+numberTry + " coups";
            instruction.style.backgroundColor = 'green';
            instruction.style.color = 'white';
            valueField.value = '';
            valueField.focus();
        }
    }
    else
    {
        instruction.textContent = alert('La valeur doit etre un nombre');
    }
    return false;
}

