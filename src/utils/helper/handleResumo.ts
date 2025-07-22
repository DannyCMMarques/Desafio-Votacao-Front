export const handleResumo = (texto: string) => {
  const limite = 230;
  return texto.length <= limite ? texto : texto.slice(0, limite - 3).trim() + '...';
};
