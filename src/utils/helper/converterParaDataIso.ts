export const converterParaDataIso = (data: string): string => {
  const [dia, mes, resto] = data.split('/');
  const [ano, hora] = resto.split(' ');
  return `${ano}-${mes}-${dia}T${hora}`;
};
