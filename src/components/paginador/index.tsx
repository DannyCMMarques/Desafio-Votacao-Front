import type { PaginadorProps } from '../../interfaces/components/paginadorProps';

const Paginador = ({ paginaAtual, totalPaginas, totalItens, aoMudarPagina }: PaginadorProps) => {
  const tamanhoSegmento = 5;
  const inicio = Math.floor((paginaAtual - 1) / tamanhoSegmento) * tamanhoSegmento + 1;
  const fim = Math.min(inicio + tamanhoSegmento - 1, totalPaginas);

  const paginas = Array.from({ length: fim - inicio + 1 }, (_, i) => inicio + i);

  if (totalPaginas <= 1) return null;

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between mt-4 px-4 space-y-2 md:space-y-0">
      <div className="text-sm font-bold text-gray-600">Total encontrado: {totalItens}</div>

      <div className="flex space-x-2">
        <button
          onClick={() => aoMudarPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          ‹
        </button>

        {inicio > 1 && (
          <button
            onClick={() => aoMudarPagina(inicio - 1)}
            className="px-2 py-1 rounded hover:bg-gray-100"
          >
            …
          </button>
        )}

        {paginas.map((p) => (
          <button
            key={p}
            onClick={() => aoMudarPagina(p)}
            className={`px-3 py-1 rounded-sm border ${
              p === paginaAtual
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {p}
          </button>
        ))}

        {fim < totalPaginas && (
          <button
            onClick={() => aoMudarPagina(fim + 1)}
            className="px-2 py-1 rounded hover:bg-gray-100"
          >
            …
          </button>
        )}

        <button
          onClick={() => aoMudarPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
          className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Paginador;
