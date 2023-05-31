import {useEffect, useState} from "react";
import useImageRepository from "./Repository/useImageRepository";

export default function (controllerRef) {

    const {
        images,
        repository
    } = useImageRepository(controllerRef)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        repository.getAll()
            .finally(() => {
                setLoaded(true)
            })
    }, [])

    return [images, loaded]
}