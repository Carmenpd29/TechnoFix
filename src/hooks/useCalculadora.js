import { useState } from "react";

/**
 * useCalculadora
 * Hook personalizado que encapsula la lógica de una calculadora básica.
 * Gestiona operaciones aritméticas, entrada de dígitos y control de estado.
 */
export const useCalculadora = () => {
  // Estado actual mostrado en la pantalla de la calculadora
  const [calculadora, setCalculadora] = useState("0");

  // Valor almacenado de la operación anterior
  const [operacionAnterior, setOperacionAnterior] = useState("");

  // Operador seleccionado (+, -, ×, ÷)
  const [operador, setOperador] = useState("");

  // Indica si se espera la entrada de un nuevo operando
  const [esperandoOperando, setEsperandoOperando] = useState(false);

  /**
   * Maneja la entrada de un dígito numérico.
   * Si se está esperando un operando, reemplaza el valor actual.
   */
  const inputDigito = (digito) => {
    if (esperandoOperando) {
      setCalculadora(String(digito));
      setEsperandoOperando(false);
    } else {
      setCalculadora(calculadora === "0" ? String(digito) : calculadora + digito);
    }
  };

  /**
   * Maneja la entrada de un operador aritmético.
   * Calcula la operación pendiente si existe una previa.
   */
  const inputOperador = (nextOperador) => {
    const inputValue = parseFloat(calculadora);

    if (operacionAnterior === "") {
      setOperacionAnterior(inputValue);
    } else if (operador) {
      const currentValue = operacionAnterior || 0;
      // Se ejecuta la operación anterior antes de guardar el nuevo operador
      const newValue = calcular(currentValue, inputValue, operador);

      setCalculadora(String(newValue));
      setOperacionAnterior(newValue);
    }

    setEsperandoOperando(true);
    setOperador(nextOperador);
  };

  /**
   * Ejecuta el cálculo aritmético entre dos valores.
   */
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

  /**
   * Ejecuta el cálculo final al pulsar el botón de igual.
   */
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

  /**
   * Restablece la calculadora a su estado inicial.
   */
  const limpiarCalculadora = () => {
    setCalculadora("0");
    setOperacionAnterior("");
    setOperador("");
    setEsperandoOperando(false);
  };

  /**
   * Maneja la entrada del separador decimal.
   * Evita múltiples decimales en un mismo número.
   */
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