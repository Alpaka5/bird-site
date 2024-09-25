import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import bird from '../assets/bird.png'
import '../styles/base.css'
import {BirdEntry} from "./birds/columns.tsx";

export default function BirdDescriptionWindow({selectedBird}: { selectedBird: BirdEntry }) {
    const postQuery = useQuery({
        queryKey: [`bird_description_${selectedBird.latin_name}`],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/api/birds/description/${selectedBird.latin_name}/eng`);
            const data = await response.data;
            return data;
        }
    });

    if (postQuery.isLoading) return <h1>Loading....</h1>;
    if (postQuery.isError) return <h1>Error loading data!!!</h1>;


    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="place-content-center">
                <div className="font-bold text-start">{selectedBird.latin_name}</div>
                <div className="italic text-start">{selectedBird.family}</div>
                <div className="text-start">Weight [g]: {selectedBird.weight_min_g} - {selectedBird.weight_max_g}</div>
                <div className="text-start">Height
                    [mm]: {selectedBird.length_min_mm} - {selectedBird.length_max_mm}</div>
            </div>
            <div>
                <img src={bird} alt="React logo" className="w-100"/>
            </div>
            <div className="col-span-2 text-start">
                {postQuery.data.description}
            </div>

        </div>
    )
}