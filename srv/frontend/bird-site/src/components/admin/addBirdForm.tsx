import "../../styles/admin_styles.css"
import {UserContext} from "../../context/userContext.tsx";
import {useContext, useState} from "react";
import {set, SubmitHandler, useForm, Controller} from "react-hook-form";

type addBirdData = {
    latin_name: string
    length_min_mm: number
    length_max_mm: number
    weight_min_g: number
    weight_max_g: number
    family: string
}

type addBirdDescription = {
    bird: string
    language: string
    description: string
}

type addBirdTranslatedName = {
    bird: string
    language: string
    name: string
}

type addBirdInputs = {
    bird_data: addBirdData
    bird_description_data: addBirdDescription
    bird_translated_name_english: addBirdTranslatedName
    bird_translated_name_polish: addBirdTranslatedName
    bird_sound_file: object
    bird_image_file: object
}

export default function AddBirdForm() {
    const [token,] = useContext(UserContext);
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<addBirdInputs>()

    const submitAddBird: SubmitHandler<addBirdInputs> = async (data) => {
        setValue("bird_translated_name_polish.language", "pol")
        setValue("bird_translated_name_english.language", "eng")
        setValue("bird_description_data.language", "eng")
        setValue("bird_description_data.bird", data.bird_data.latin_name)
        setValue("bird_translated_name_english.bird", data.bird_data.latin_name)
        setValue("bird_translated_name_polish.bird", data.bird_data.latin_name)

        const formData = new FormData()
        formData.append("bird_sound_file", data.bird_sound_file[0])
        formData.append("bird_image_file", data.bird_image_file[0])
        formData.append("bird_data", JSON.stringify(data.bird_data))
        formData.append("bird_description_data", JSON.stringify(data.bird_description_data))
        formData.append("bird_translated_name_english", JSON.stringify(data.bird_translated_name_english))
        formData.append("bird_translated_name_polish", JSON.stringify(data.bird_translated_name_polish))

        const requestOptions = {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
            },
            body: formData
        }

        const response = await fetch("http://localhost:5000/admin/add_bird/basic", requestOptions)

        const response_json = await response.json()
        // if (response.ok) {
        //     document.getElementById("add-bird-basic-form").reset();
        // }
        alert(response_json.detail + " Response code: " + response.status);


    }


    return (
        <div className="flex flex-column h-full w-full items-center justify-center">
            <form id="add-bird-basic-form" onSubmit={handleSubmit(submitAddBird)} className="admin-panel-form">
                <div>
                    <label>Latin bird name</label>
                    <div>
                        <input type="text" placeholder="Enter latin bird name" {...register("bird_data.latin_name")}/>
                    </div>

                </div>
                <div>
                    <label>English bird name</label>
                    <div>
                        <input type="text"
                               placeholder="Enter english bird name" {...register("bird_translated_name_english.name")}/>
                    </div>

                </div>
                <div>
                    <label>Polish bird name</label>
                    <div>
                        <input type="text"
                               placeholder="Enter polish bird name" {...register("bird_translated_name_polish.name")}/>
                    </div>

                </div>
                <div className="col-end-2">
                    <label>Length [mm]</label>
                    <div className="grid grid-cols-2 gap-1 w-fit">
                        <input type="number"
                               placeholder="Enter minimum length" {...register("bird_data.length_min_mm")}/>
                        <input type="number"
                               placeholder="Enter maximum length" {...register("bird_data.length_max_mm")}/>
                    </div>
                </div>

                <div className="col-end-2">
                    <label>Weight [g]</label>
                    <div className="grid grid-cols-2 gap-1 w-fit">
                        <input type="number"
                               placeholder="Enter minimum weight" {...register("bird_data.weight_min_g")}/>
                        <input type="number"
                               placeholder="Enter maximum weight" {...register("bird_data.weight_max_g")}/>
                    </div>

                </div>
                <div className="col-end-2">
                    <label>Bird family</label>
                    <div>
                        <input type="text"
                               placeholder="Enter latin bird family name" {...register("bird_data.family")}/>
                    </div>

                </div>

                <div className="row-start-1 col-start-2">

                    <label>Bird photo</label>
                    <div>
                        <input type="file" id="bird-image-admin"
                               accept="image/png, image/jpeg" {...register("bird_image_file")}/>
                    </div>
                </div>
                <div className="row-start-2 col-start-2">

                    <label>Bird sound file</label>
                    <div>
                        <input type="file" id="bird-sound-admin"{...register("bird_sound_file")}
                               accept="audio/mpeg, audio/m4a"/>
                    </div>

                </div>

                <div className="flex flex-col row-start-3 col-start-2 row-span-2 w-full h-full">
                    <label>Bird description </label>
                    <textarea className="h-full w-full" {...register("bird_description_data.description")}/>
                </div>

                <button className="col-span-2 row-span-2 place-self-center" type="submit">
                    Submit bird
                </button>
            </form>
        </div>)
}