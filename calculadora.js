//calculadora.js

//TODO: Crie função de soma
function somar (a, b){
    return a+b;
}

//TODO: Crie função de subtração
function subtrair (a, b){
    return a-b;
}

//TODO: Crie função de multiplicação
function multiplicar (a, b){
    return a*b;
}

//TODO: Crie função de divisão com verificação de divisão por zero
function dividir (a, b){
    //TODO: Verifique se b !==0 (b é diferente de 0), senão retorne erro
    if (b === 0) {
        return 'Erro: Divisão por zero!';
        }
        return a/b;
}

//TODO: Teste todas as funções
const num1 = 10;
const num2 = 5;

console.log('Soma:', somar(num1, num2));
console.log('Subtração:', subtrair(num1, num2));
console.log('Multiplicação:', multiplicar(num1, num2));
console.log('Divisão:', dividir(num1, num2));