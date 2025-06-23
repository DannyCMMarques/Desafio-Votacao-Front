export interface AssociadoRequestDTO {
    nome: string;
    cpf: string;

}

export interface AssociadoResponseDTO {
    id: number;
    nome: string;
}


export interface Page<T> {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalElements: number;
    totalPages: number;
    last: boolean;

}

export type AssociadoPage = Page<AssociadoResponseDTO>;