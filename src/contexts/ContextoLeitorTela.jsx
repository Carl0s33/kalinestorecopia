import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

/**
 * ContextoLeitorTela
 * Guarda se o recurso de "leitor de tela" personalizado está habilitado e expõe
 * a função `falar` que usa a Web Speech API para verbalizar mensagens quando
 * o recurso estiver ativo.
 */
const ContextoLeitorTela = createContext({
  habilitado: false,
  alternar: () => {},
  falar: (texto) => {},
});

export const useLeitorTela = () => useContext(ContextoLeitorTela);

export function ProvedorLeitorTela({ children }) {
  const [habilitado, setHabilitado] = useState(false);

  // Obtém uma voz em português (Brasil) quando disponível
  const obterVozPreferida = () => {
    const vozes = speechSynthesis.getVoices();
    // Prioridade: pt-AO (português angolano) → pt-PT → pt-BR → qualquer português → default
    const vozAO = vozes.find((v) => v.lang?.toLowerCase().startsWith('pt-ao'));
    if (vozAO) return vozAO;
    const vozPT = vozes.find((v) => v.lang?.toLowerCase().startsWith('pt-pt'));
    if (vozPT) return vozPT;
    const vozBR = vozes.find((v) => v.lang?.toLowerCase().startsWith('pt-br'));
    if (vozBR) return vozBR;
    const qualquerPT = vozes.find((v) => v.lang?.toLowerCase().startsWith('pt'));
    return qualquerPT || vozes[0];
  };

  const falar = useCallback(
    (texto) => {
      if (!habilitado || !texto) return;
      const utter = new SpeechSynthesisUtterance(texto);
      utter.voice = obterVozPreferida();
      speechSynthesis.speak(utter);
    },
    [habilitado]
  );

  useEffect(() => {
    if (!habilitado) {
      speechSynthesis.cancel();
    } else {
      falar('Leitor de tela ativado');
    }
  }, [habilitado, falar]);

  const alternar = () => setHabilitado((prev) => !prev);

  return (
    <ContextoLeitorTela.Provider value={{ habilitado, alternar, falar }}>
      {children}
    </ContextoLeitorTela.Provider>
  );
}
