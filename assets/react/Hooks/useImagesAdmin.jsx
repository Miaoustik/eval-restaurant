import {useEffect, useRef, useState} from "react";
import useImageRepository from "./Repository/useImageRepository";

export default function (controllerRef) {

    const imgRef = useRef();

    const {
        images,
        repository
    } = useImageRepository(controllerRef)

    const [refreshImg, setRefreshImg] = useState(false)


    useEffect(() => {
        repository.getAll()
    }, [refreshImg])

    const handleSave = (e) => {
        e.preventDefault()

        const files = imgRef.current.files
        const data = new FormData()
        Object.values(files).forEach(e => {
            data.append(e.name, e)
        })
        repository.save(data)
    }

    const handleDeleteAll = () => {
        repository.deleteAll()
            .then(() => {
                setRefreshImg(s => !s)
            })
    }

    return {
        images,
        imgRef,
        handleSave,
        handleDeleteAll
    }
}