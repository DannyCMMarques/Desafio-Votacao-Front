import type { TagStatusProps } from '../../interfaces/components/tagStatusProps';

const TagStatus = ({ cor, texto }: TagStatusProps) => {
  const coresClasses = {
    verde: 'bg-green-100 text-green-800',
    amarelo: 'bg-yellow-100 text-yellow-800',
    vermelho: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`text-[11px] font-semibold px-1 py-[2px] rounded-full inline-block ${coresClasses[cor]}`}
    >
      {texto}
    </span>
  );
};

export default TagStatus;
