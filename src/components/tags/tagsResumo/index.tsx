import TagStatus from '..';
import type { TagsResumoProps } from '../../../interfaces/components/tagsResumoProps';
import corTags from '../../../utils/helper/CoresTags';
import { handleStatus } from '../../../utils/helper/StatusUtils';

const TagsResumo = ({ status, resultado, exibirResultado = true }: TagsResumoProps) => (
  <div className="flex gap-2 flex-wrap">
    <TagStatus cor={corTags(status)} texto={handleStatus(status)} />
    {exibirResultado && resultado && <TagStatus cor={corTags(resultado)} texto={resultado} />}
  </div>
);

export default TagsResumo;
