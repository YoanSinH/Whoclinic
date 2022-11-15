import { Loading } from "../Loading";

export function UserHome(params) {
    if (!params) return (<Loading/>)
    const data = params.data;
    console.log(data);//flag
    return (
        <>
            <h2>Buen día, </h2>
            <div className="row mt-2">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body cardbody">
                            <div>
                                <h4 className="card-title">Bienvenido a WHospital</h4>
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}