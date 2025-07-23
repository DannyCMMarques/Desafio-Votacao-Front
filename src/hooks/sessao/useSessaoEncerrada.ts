import { useState, useCallback } from 'react';

export function useSessaoEncerrada(initial = false) {
  const [sessaoEncerrada, setSessaoEncerrada] = useState(initial);

  const handleSessaoEncerrada = useCallback(() => {
    setSessaoEncerrada(true);
  }, []);

  return {
    sessaoEncerrada,
    handleSessaoEncerrada,
  };
}
