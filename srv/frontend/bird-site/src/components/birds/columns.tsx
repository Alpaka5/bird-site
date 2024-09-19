import {ColumnDef} from "@tanstack/react-table"

export type BirdEntry = {
    latin_name: string
    family: string
    length_min_mm: number
    length_max_mm: number
    weight_min_g: number
    weight_max_g: number
}

export const columns: ColumnDef<BirdEntry>[] = [
    {
        accessorKey: "latin_name",
        header: "Latin name",
    },
    {
        accessorKey: "family",
        header: "Family",
    },
    {
        accessorKey: "length_min_mm",
        header: "Min length [mm]",
    },
    {
        accessorKey: "length_max_mm",
        header: "Max length [mm]",
    },
    {
        accessorKey: "weight_min_g",
        header: "Min weight [g]",
    },
    {
        accessorKey: "weight_max_g",
        header: "Max weight [g]",
    },
]