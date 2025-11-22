import { useState } from "react";

// Hook para manejar las funciones de calculadora
export const useCalculadora = () => {
  const [calculadora, setCalculadora] = useState("0");
  const [operacionAnterior, setOperacionAnterior] = useState("");
  const [operador, setOperador] = useState("");
  const [esperandoOperando, setEsperandoOperando] = useState(false);

  const inputDigito = (digito) => {
    if (esperandoOperando) {
      setCalculadora(String(digito));
      setEsperandoOperando(false);
    } else {
      setCalculadora(calculadora === "0" ? String(digito) : calculadora + digito);
    }
  };

  const inputOperador = (nextOperador) => {
    const inputValue = parseFloat(calculadora);

    if (operacionAnterior === "") {
      setOperacionAnterior(inputValue);
    } else if (operador) {
      const currentValue = operacionAnterior || 0;
      const newValue = calcular(currentValue, inputValue, operador);

      setCalculadora(String(newValue));
      setOperacionAnterior(newValue);
    }

    setEsperandoOperando(true);
    setOperador(nextOperador);
  };

  const calcular = (firstValue, secondValue, operator) => {
    switch (operator) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const ejecutarCalculo = () => {
    const inputValue = parseFloat(calculadora);

    if (operacionAnterior !== "" && operador) {
      const newValue = calcular(operacionAnterior, inputValue, operador);
      setCalculadora(String(newValue));
      setOperacionAnterior("");
      setOperador("");
      setEsperandoOperando(true);
    }
  };

  const limpiarCalculadora = () => {
    setCalculadora("0");
    setOperacionAnterior("");
    setOperador("");
    setEsperandoOperando(false);
  };

  const inputDecimal = () => {
    if (esperandoOperando) {
      setCalculadora("0.");
      setEsperandoOperando(false);
    } else if (calculadora.indexOf(".") === -1) {
      setCalculadora(calculadora + ".");
    }
  };

  return {
    calculadora,
    setCalculadora,
    inputDigito,
    inputOperador,
    ejecutarCalculo,
    limpiarCalculadora,
    inputDecimal
  };
};