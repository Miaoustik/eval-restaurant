import {useEffect, useState} from "react";
import useImageRepository from "./Repository/useImageRepository";

export default function (controllerRef) {

    const {
        images,
        repository
    } = useImageRepository(controllerRef)

    useEffect(() => {
        repository.getAll()
    }, [])

    return images
}