import {columns} from "../birds/columns.tsx";
import {DataTable} from "../birds/data-table.tsx";
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

export default function LibraryWindow() {
    // const [birdLibraryData, setBirdLibraryData] = useState<BirdEntry[]>([])
    //
    // useEffect(() => {
    //     async function fetchData() {
    //         const data = await getData()
    //         setBirdLibraryData(data)
    //     }
    //     fetchData()
    // }, []);

    const postQuery = useQuery({
        queryKey: ['birds_data'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/birds/all_birds');
            const data = await response.data;
            return data;
        }
    });

    if (postQuery.isLoading) return <h1>Loading....</h1>;
    if (postQuery.isError) return <h1>Error loading data!!!</h1>;

    return (
        <div className="flex flex-column h-full w-full items-center justify-center">

            <DataTable columns={columns} data={postQuery.data}/>
        </div>
    )
}