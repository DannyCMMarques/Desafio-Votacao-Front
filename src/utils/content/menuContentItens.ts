import { FaVoteYea } from "react-icons/fa";
import { TfiAgenda } from "react-icons/tfi";
import type { MenuItem } from "../interfaces/MenuContentInterface";
const menuContentItens: MenuItem[] = [
  {
    id: 2,
    label: "Pautas",
    link: "/",
    icon: TfiAgenda,
    active: false,
  },
  {
    id: 3,
    label: "Sessões",
    link: "/sessao",
    icon: FaVoteYea,
    active: false,
  }
];

export default menuContentItens;
