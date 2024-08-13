import { Nota } from "./nota"

export interface NotasPaginadas {
    "first": number,
    "prev": number | null,
    "next": number,
    "last": number,
    "pages": number,
    "items": number,
    "data": Array<Nota>
}
