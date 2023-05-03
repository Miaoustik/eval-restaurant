import {useEffect, useRef, useState} from "react";
import useImageRepository from "./Repository/useImageRepository";

export default function (controllerRef) {

    const {
        images,
        repository,
        setImages
    } = useImageRepository(controllerRef)
    const [loading, setLoading] = useState(true)
    const [refreshImg, setRefreshImg] = useState(false)


    useEffect(() => {
        setLoading(true)
        repository.getAll()
            .finally(() => setLoading(false))
    }, [refreshImg])

    const handleDeleteAll = () => {
        repository.deleteAll()
            .then(() => {
                setRefreshImg(s => !s)
            })
    }

    return {
        images,
        handleDeleteAll,
        loading,
        repository,
        setImages,
        setRefreshImg
    }
}