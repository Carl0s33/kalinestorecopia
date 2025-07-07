import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

/**
 * ScreenReaderContext
 * Mantém o estado de ativação do "leitor de tela" customizado e disponibiliza
 * uma função `speak` que utiliza a Web Speech API (speechSynthesis) para verbalizar
 * textos quando o recurso estiver habilitado.
 */
const ScreenReaderContext = createContext({
  enabled: false,
  toggle: () => {},
  speak: (text) => {},
});

export const useScreenReader = () => useContext(ScreenReaderContext);

export function ScreenReaderProvider({ children }) {
  const [enabled, setEnabled] = useState(false);

  /**
   * Procura por uma voz em pt-BR; caso não exista, usa a default.
   */
  const getPreferredVoice = () => {
    const voices = speechSynthesis.getVoices();
    const brVoice = voices.find((v) => v.lang?.toLowerCase().startsWith('pt-br'));
    return brVoice || voices[0];
  };

  /**
   * Fala um texto se o recurso estiver habilitado.
   */
  const speak = useCallback(
    (text) => {
      if (!enabled || !text) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.voice = getPreferredVoice();
      speechSynthesis.speak(utter);
    },
    [enabled]
  );

  /**
   * Cancela fala pendente quando desabilitar.
   */
  useEffect(() => {
    if (!enabled) {
      speechSynthesis.cancel();
    } else {
      // anúncio inicial
      speak('Leitor de tela ativado');
    }
  }, [enabled, speak]);

  const toggle = () => setEnabled((prev) => !prev);

  return (
    <ScreenReaderContext.Provider value={{ enabled, toggle, speak }}>
      {children}
    </ScreenReaderContext.Provider>
  );
}
