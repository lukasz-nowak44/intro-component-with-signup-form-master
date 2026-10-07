let allowedCharacters = [];

let letter;

for (let i=97; i<=122; i++) {

  letter = String.fromCharCode(i);
  allowedCharacters.push(letter);

}

for (let i=0; i<=9; i++) {

  allowedCharacters.push(i);

}

allowedCharacters.push("-");
allowedCharacters.push(".");

$(".btn").click(function(event){

  let inputsCollection  = $("input");
  let numberOfImputs = inputsCollection.length;
  let emailAdress = inputsCollection[2].value;
 
  for (let i=0; i<numberOfImputs; i++) {

    let inputName = $(inputsCollection[i]).attr("name");
    
    let doesErrorTextExist = $(inputsCollection[i]).hasClass("exclamation-mark");

    if ((inputsCollection[i].value === "") && (!doesErrorTextExist)) {

      stylizeAfterValidation(inputsCollection[i]);

      if (i !== 2){

          $(".field").eq(i).append("<div class='error'>" + inputName + " cannot be empty</div>");

        } else {

          $(".field").eq(i).append("<div class='error'>Looks like this is not an email</div>");

        }

    } else if (inputsCollection[i].value !== "") {

      let handleForDivError = ".no" + i + " .error";
      
      if (i !== 2){

        $(inputsCollection[i]).removeClass("exclamation-mark");
        $(handleForDivError).remove();

      } else if (checkEmailAdress(emailAdress)){

        $(inputsCollection[i]).removeClass("exclamation-mark");
        $(handleForDivError).remove();

      } else if (!checkEmailAdress(emailAdress) && (!doesErrorTextExist)) {

        $(inputsCollection[i]).addClass("exclamation-mark");
        $(".field").eq(i).append("<div class='error'>Looks like this is not an email</div>");

      }
    }
  } 
});

function stylizeAfterValidation (input) {

  $(input).addClass("exclamation-mark");
  $(input).attr("placeholder", "");
  $(".no2 input:read-write").addClass("user-wrong-text");

}

function checkEmailAdress (email) {

  email = email.toLowerCase();

  let emailSignsCounter = 0;
  let ifDotExist = false;
  let emailSignPosition;
  let lastDotPosition;
  let domain;
  
  for (let i=0; i < email.length; i++) {

    if (email[i] === "@"){

      emailSignsCounter++;
      emailSignPosition = i;
      
    } 
  }

  for (let i=0; i < email.length; i++) {

    if (email[i] === "."){

      ifDotExist = true;
      lastDotPosition = i;

      if (lastDotPosition === 0) {

        return false;

      }
    } 
  }  

  domain = email.slice(emailSignPosition+1);

  if (!(emailSignsCounter === 1)) {

    return false;

  } else if (!ifDotExist){

    return false;

  } else if (!((lastDotPosition - emailSignPosition) >= 3)){

    return false;

  } else if (emailSignPosition === 0) {

    return false;

  } else if (!checkIfDomainContainsAllowedSigns(domain)){

    return false;

  } else {

    return true;

  }  
}

function checkIfDomainContainsAllowedSigns (domain) {

  let doesSignAllowed = false;

  for (let i=0; i<domain.length; i++){

    let singleSign = domain[i];

    for (let j=0; j<allowedCharacters.length; j++) {

      if (singleSign === allowedCharacters[j]) {

        doesSignAllowed = true;
        break;

      } else {

        doesSignAllowed = false;

      } 
    }

    if (!doesSignAllowed) {

      return false;

    }
  }

  return true;

}
