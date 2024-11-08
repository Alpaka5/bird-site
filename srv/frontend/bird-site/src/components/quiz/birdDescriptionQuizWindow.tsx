import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import '../../styles/base.css'
import '../../styles/quiz_styles.css'
import {BirdEntry} from "../birds/columns.tsx";
import {birdDescription} from "../types/birdResponsesType.tsx";

export default function BirdDescriptionWindow({selectedBird}: { selectedBird: BirdEntry }) {
    const postQuery = useQuery({
        queryKey: [`bird_description_${selectedBird.latin_name}`],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/birds/description/${selectedBird.latin_name}/eng`);
            return await response.data as birdDescription;
        }
    });
    if (postQuery.isLoading) return <h1>Loading....</h1>;
    if (postQuery.isError) return <h1>Error loading data!!!</h1>;


    return (
        <div className="grid grid-cols-2  justify-evenly content-center gap-4">
            <div className="place-content-center text-start">
                <div className="font-bold text-3xl font-serif">{selectedBird.latin_name}</div>
                <div className="italic text-xl font-serif">{selectedBird.family}</div>
                <div className="font-sans text-lg">Weight
                    [g]: {selectedBird.weight_min_g} - {selectedBird.weight_max_g}</div>
                <div className="font-sans text-lg">Height
                    [mm]: {selectedBird.length_min_mm} - {selectedBird.length_max_mm}</div>
                <div>
                    <audio controls className="h-7  mt-4"
                           src={"http://localhost:5000/birds/sound/" + selectedBird.latin_name}></audio>
                </div>
                <br/>
                <div className="font-sans text-lg">
                    {postQuery.data.description}
                </div>
            </div>
            <div className="flex justify-center">
                <img src={'http://localhost:5000/birds/image/' + selectedBird.latin_name} alt="Image of bird"
                     className="description_image"/>
            </div>

        </div>
    )
}