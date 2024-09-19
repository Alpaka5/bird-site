import {BirdEntry, columns} from "./birds/columns.tsx";
import {DataTable} from "./birds/data-table.tsx";
import {useState, useEffect} from "react";

async function getData(): Promise<BirdEntry[]> {
    return [
        {
            latin_name: "Bird 1",
            family: "Family 1",
            length_min_mm: 1,
            length_max_mm: 1,
            weight_min_g: 1,
            weight_max_g: 1,
        },
        {
            latin_name: "Bird 2",
            family: "Family 2",
            length_min_mm: 2,
            length_max_mm: 2,
            weight_min_g: 2,
            weight_max_g: 2,
        },
    ]
}

export default function LibraryWindow() {
    const [birdLibraryData, setBirdLibraryData] = useState<BirdEntry[]>([])

    useEffect(() => {
        async function fetchData() {
            const data = await getData()
            setBirdLibraryData(data)
        }
        fetchData()
    }, []);

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={birdLibraryData}/>
        </div>
    )
}