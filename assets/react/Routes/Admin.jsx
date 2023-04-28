import React, {useRef} from "react";
import Header from "../Components/Header";
import {Container} from "react-bootstrap";
import useControllerRef from "../Hooks/useControllerRef";

export default function ({isAdmin, user}) {

    const imgRef = useRef();



    const controllerRef = useControllerRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(imgRef.current.files)

        const files = imgRef.current.files
        const data = new FormData()
        data.append(files[0].name, files[0])
        Object.keys(files).forEach(e => {
            data.append(files[e].name, files[e])

        })

        const fetchOptions = {
            method: 'POST',
            body: data,
            signal: controllerRef.current.signal
        }

        console.log(fetchOptions)

        try {
            const response = await fetch('/api/images', fetchOptions)
            console.log(response.status)
            const data = await response.json()
            if (!response.ok) {
                console.log('error', data)
            } else {
                console.log('ok', data)
            }
        } catch (e) {
            console.warn('error', e.message)
        }

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
                </Container>
            </main>
        </>
    )
}