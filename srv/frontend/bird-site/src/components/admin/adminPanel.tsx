import "../../styles/admin_styles.css"

export default function AdminPanel() {
    return (
        <div className="flex flex-column h-full w-full items-center justify-center">
            <form className="admin-panel-form">
                <div>
                    <label>Latin bird name</label>
                    <div>
                        <input type="text" placeholder="Enter latin bird name"/>
                    </div>

                </div>
                <div className="col-end-2">
                    <label>Length [mm]</label>
                    <div className="grid grid-cols-2 gap-1 w-fit">
                        <input type="number" placeholder="Enter minimum length"/>
                        <input type="number" placeholder="Enter maximum length"/>
                    </div>
                </div>

                <div className="col-end-2">
                    <label>Weight [g]</label>
                    <div className="grid grid-cols-2 gap-1 w-fit">
                        <input type="number" placeholder="Enter minimum weight"/>
                        <input type="number" placeholder="Enter maximum weight"/>
                    </div>

                </div>
                <div className="col-end-2">
                    <label>Bird family</label>
                    <div>
                        <input type="text" placeholder="Enter latin bird family name"/>
                    </div>

                </div>
                <div className="col-end-2">
                    <label>Polish bird name</label>
                    <div>
                        <input type="text" placeholder="Enter polish bird name"/>
                    </div>

                </div>
                <div className="col-end-2">
                    <label>English bird name</label>
                    <div>
                        <input type="text" placeholder="Enter english bird name"/>
                    </div>
                </div>
                <div className="row-start-1 col-start-2">

                    <label>Bird photo</label>
                    <div>
                        <input type="file" id="bird-photo-admin" name="bird-photo-admin"
                               accept="image/png, image/jpeg"/>
                    </div>
                </div>
                <div className="row-start-2 col-start-2">

                    <label>Bird sound file</label>
                    <div>
                        <input type="file" id="bird-sound-admin" name="bird-sound-admin" accept="audio/mpeg"/>
                    </div>

                </div>

                <button className="col-span-2 row-span-2 place-self-center" type="submit">
                    Submit bird
                </button>
            </form>
        </div>)
}