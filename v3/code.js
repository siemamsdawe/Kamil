document.getElementById("enter").addEventListener('click', check);
document.getElementById("cancel").addEventListener('click', cancel);
document.getElementById("clearAll").addEventListener('click', clearAll);

document.querySelectorAll('.key').forEach( element => { 
    element.addEventListener('click', function(){
        keyboardAddLetter(element.getAttribute('data-value'))
        });
});

const words = ["ROWER", "RURKA", "MYSZA", "LAMPA", "KOTKI", "SKLEP", "TRAWA", "KARTY","TANIE", "KWIAT", "SZAFA", "MISKA","DUSZA","BŁOTO","KRATA","PRACA","SERCE","KUFEL","PLAMA","MISJA","KLATA","ZAMEK","PŁYTA","SŁOWO","BRAMA","WYSPA","ŚMIEĆ", "GRACZ","DROGA", "RANNY", "CHATA", "MUCHA","DESKA", "PRAWO", "NARTY", "PIŁKA", "ŁYDKA"];

let word = words[Math.floor(Math.random() * words.length-1)];
const randomWordArray = word.split("");
const randomWordString = word;
var helpArray = [0, 0, 0, 0, 0];
var counter = 0;
var currentCounter = 1;
var valueInput = document.getElementById("txt");

console.log(word)

    document.querySelector('body').addEventListener('keydown', element => { writeInputKey(element, 1)});

function writeInputKey(element, access)
{
    if(currentCounter <7)
    {
        var outputHandle = document.querySelector("#output"+(counter+1)+(" div.block:nth-child(")+currentCounter+(")"));

        if(access == 1)
        {
            //code for keyevents

            if(element.key == "Backspace") 
            {
                cancel();
            }
            else if(element.key == "Enter") 
            {
                check();
            }
            else if(element.keyCode >= 65 && element.keyCode <=90 && currentCounter < 6)
            {
                valueInput.value += element.key;
                outputHandle.innerHTML = element.key;
                currentCounter++;
            }

        }
        else if(access == 2 && currentCounter < 6)
        {
            valueInput.value += element.key;
            outputHandle.innerHTML = element.key;
            currentCounter++; 
        }
    }

}

function check() 
{
    if (valueInput.value.length == 5) 
    {
        var valueInputArray = valueInput.value.toUpperCase().split("");

        helpArray = [0, 0, 0, 0, 0];
        for (i = 0; i < 5; i++) 
        {
            if (valueInputArray[i] == randomWordArray[i])
            {
                helpArray[i] = 1;
                colorKeyboard(valueInputArray[i], "rgb(52, 116, 52)");
            } 
            else if (randomWordString.indexOf(valueInputArray[i]) > -1)
            {
                helpArray[i] = 2;
                colorKeyboard(valueInputArray[i], "rgb(171, 171, 23)");
            } 
            else
            {
                colorKeyboard(valueInputArray[i], "rgb(71, 72, 71)");
            }
        }

        let contentGenerated = "";
        for (i = 0; i < 5; i++)
        {
            if (helpArray[i] == 1)contentGenerated += `<div class="block green">${valueInputArray[i]}</div>`;
            else if (helpArray[i] == 2)contentGenerated += `<div class="block yellow">${valueInputArray[i]}</div>`;
            else contentGenerated += `<div class="block gray"> ${valueInputArray[i]}</div>`;
        }
        contentGenerated += "<div style='clear: both'></div>";

        document.querySelector(("#output" + (++counter))).innerHTML = contentGenerated;

        checIfWin();
        currentCounter = 1;
    }
}

function checIfWin() 
{
    let flag = 0;
    for (i = 0; i < 5; i++) 
    {
        if(helpArray[i] == 1) flag++;
    }
    if (flag == 5) 
    {
        valueInput.style.display = "none";
        let x = 'output'+counter;
        document.getElementById(x).classList.add('coolWin');
 
    }
    else if (counter == 6) 
    {
        alert("poprawne słoto to: " + randomWordString)
        valueInput.style.display = "none";
    }

    valueInput.value ="";
}

function colorKeyboard(value, color)
{
    document.querySelectorAll('.key').forEach(element => {
        if(element.getAttribute('data-value') == value) element.style.backgroundColor = color;
    })
}

function keyboardAddLetter(letter)
{
    writeInputKey({key: letter, code: letter},2);
}

function cancel()
{
    if(valueInput.value.length > 0)
    {
        let canceledOneLastLetter = valueInput.value.substring(0,valueInput.value.length-1)
        valueInput.value = canceledOneLastLetter;
        currentCounter--;
        var outputHandle = document.querySelector("#output"+(counter+1)+(" div.block:nth-child(")+currentCounter+(")"));
        outputHandle.innerHTML = "";
    }
}

function clearAll()
{
    valueInput.value = "";
    var outputHandlev2 = document.querySelectorAll("#output"+(counter+1)+" "+"div.block");
    outputHandlev2.forEach(element => { element.innerHTML = ""})
    currentCounter = 1;
}