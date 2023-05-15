import {useEffect, useState} from "react";
import useHoraireRepository from "./Repository/usehoraireRepository";

export default function (controllerRef) {
    
    const {
        horaires,
        repository
    } = useHoraireRepository(controllerRef)

    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        repository.getAllParsed()
            .finally(() => setLoading(false))
    }, [])

    return [horaires, loading, repository]
}