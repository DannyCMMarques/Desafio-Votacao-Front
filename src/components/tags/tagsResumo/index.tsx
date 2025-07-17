import TagStatus from '..';
import corTags from '../../../utils/helper/CoresTags';

interface TagsResumoProps {
  status: string;
  resultado?: string;
  exibirResultado?: boolean;
}

const TagsResumo = ({ status, resultado, exibirResultado = true }: TagsResumoProps) => (
  <div className="flex gap-2 flex-wrap">
    <TagStatus cor={corTags(status)} texto={status} />
    {exibirResultado && resultado && <TagStatus cor={corTags(resultado)} texto={resultado} />}
  </div>
);

export default TagsResumo;
