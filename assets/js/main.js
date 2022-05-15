// =================> *O CÓDIGO COMEÇA LÁ EM BAIXO* <=================

const form = document.querySelector("#form");
let screenSize = window.screen.width;
const input = document.querySelectorAll("[type=text");

//Muda o  tipo input pra number se estiver no mobile
window.addEventListener("load", () =>{
  
  if(screenSize <= 720){
    for(let i = 0; i < input.length; i++)
      input[i].setAttribute("type", "number");
  }
})


//Cria o paragrafo que guardará a mensagem
const createResult = () => {
  const pResult = document.createElement("p");
  return pResult;
}
//Resultado quando o botão é clicado 
const setResult = (msg, isValid) => {

  //--> isValid é um boolean que define a cor da mensagem <--
  const result = document.querySelector("#result");
  result.innerHTML = ''; //Apaga o resultado do calculo anterior

  const resultMsg = createResult(); //Mensagem que será colocada dentro da div result

  //msg de ERRO o paragrafo fica VERMELHO, msg de RESULTADO VÁLIDO o paragrafo fica VERDE
  const msgStyle = resultMsg.classList;
  isValid ? msgStyle.add("valid-result") : msgStyle.add("error");

  resultMsg.innerHTML = msg;
  result.appendChild(resultMsg); //Coloca o paragrafo no div resultado
}

//Adiciona um nível de obesidade da tabela imc
const addLevel = (arrLevel, msgLevel) => arrLevel.push(msgLevel); 

const imcLevel = (imc) => {
  const level = []; //Cria array vazio
  addLevel(level, "Abaixo do peso");
  addLevel(level, "Peso normal");
  addLevel(level, "Sobrepeso");
  addLevel(level, "Obesidade grau 1");
  addLevel(level, "Obesidade grau 2");
  addLevel(level, "Obesidade grau 3");
  if (imc > 40)
    return level[5];
  if (imc >= 35)
    return level[4];
  if (imc >= 30)
    return level[3];
  if (imc >= 25)
    return level[2];
  if (imc >= 20)
    return level[1];
  if (imc >= 18.5)
    return level[1];
  if (imc < 18.5)
    return level[0];
}

//Weight = peso, height = altura
const getImc = (weight, height) => (weight / Math.pow(height, 2)).toFixed(2);

//========= COMEÇA AQUI ==========
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  //target é o evento disparado (qnd o evento disparar pegue o input com o id peso)
  const inputPeso = e.target.querySelector("#peso");
  const inputAltura = e.target.querySelector("#altura");

  //Pega o VALOR DOS INPUTS
  const peso = Number((inputPeso.value).replace(",", "."));
  const altura = Number((inputAltura.value).replace(",", "."));

  //Se tiver erro ele mostra o erro e para a função
  if(isError(peso,altura)){
    return;
  }


  const imc = getImc(peso, altura);
  const level = imcLevel(imc);
  let msg = `IMC: ${imc}. ${level}`;

  setResult(msg, true);

});



// ============== TRATAMENTO DE ERROS =============
const isError = (peso, altura) => {

  //Caso o input NÃO tiver um valor do tipo NUMBER ou o valor FOR ZERO
  if (!peso) {
    setResult("Peso inválido !!", false);
    document.querySelector('#peso').classList.add("fieldError");
    return true; //A partir do momento q ele encontra return a função nao é mais executada
  }
  document.querySelector('#peso').classList.remove("fieldError");

  if (!altura) {
    setResult("Altura inválida !!", false);
    document.querySelector('#altura').classList.add("fieldError");
    return true;
  }
  document.querySelector('#altura').classList.remove("fieldError");
  //caso o peso seja negativo 
  if(peso < 0){
    setResult("Não é possível calcular um IMC com o peso negativo", false);
    document.querySelector('#peso').classList.add("fieldError");
    return true;
  }
  document.querySelector('#peso').classList.remove("fieldError");

  //caso o peso seja maior que 700
  if(peso > 630){
    setResult("Peso inválido !! Não existe pessoa com mais de 630kg", false);
    document.querySelector('#peso').classList.add("fieldError");
    return true;
  }
  document.querySelector('#peso').classList.remove("fieldError");

  //caso a altura seja maior do que a da maior pessoa do mundo
  if (altura > 2.51) {
    setResult("Altura inválida !! Não existe pessoa com mais de 2.51m de altura ", false);
    document.querySelector('#altura').classList.add("fieldError");
    return true;
  }
  document.querySelector('#altura').classList.remove("fieldError");

  //caso a altura seja maior que o peso
  if(altura > peso){
    setResult("Não é possível calcular um IMC onde a altura seja maior que o peso", false);
    document.querySelector('#altura').classList.add("fieldError");
    return true;
  }
  document.querySelector('#altura').classList.remove("fieldError");

  //caso a a altura seja negativa
  if(altura < 0){
    setResult("Não é possível calcular um IMC com altura negativa", false);
    document.querySelector('#altura').classList.add("fieldError");
    return true;
  }
  document.querySelector('#altura').classList.remove("fieldError");

  return false;
}
