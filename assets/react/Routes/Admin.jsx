import React, {useRef, useState} from "react";
import Header from "../Components/Header";
import {Container} from "react-bootstrap";
import useControllerRef from "../Hooks/useControllerRef";
import httpApi from "../Components/Utils/httpApi";

export default function ({isAdmin, user}) {

    const imgRef = useRef();
    const controllerRef = useControllerRef()
    const http = httpApi(controllerRef)

    const [images, setImages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        const files = imgRef.current.files
        const data = new FormData()
        Object.values(files).forEach(e => {
            data.append(e.name, e)
        })

        http.post('api/admin/images/save', data)
            .then(res => {
                if (!res.ok) {
                    console.log(res.errorMessage)
                } else {
                    setImages(res.data)
                }
            })
    }

    const handleImageDelete = () => {
        http.get('/api/admin/images/deletebdd')
    }

    return (
        <>
            <Header isAdmin={isAdmin} user={user}/>
            <main className={'mainContainer'}>
                <Container fluid={true}>
                    <h1>Ici Admin</h1>
                    <button className={'btn btn-primary w-100'}>Gérer les images</button>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="formFileMultiple" className="form-label">Multiple files input
                                example
                            </label>
                            <input ref={imgRef} className="form-control" type="file" id="formFileMultiple" multiple/>
                        </div>
                        <button>Submit</button>
                    </form>
                    <button onClick={handleImageDelete}>Supprimer image BDD</button>
                </Container>
            </main>
        </>
    )
}