import {useLocation} from "react-router-dom";
import {useLayoutEffect, useState} from "react";

export default function () {


    const [refresh, setRefresh] = useState(false)
    const { pathname } = useLocation()

    useLayoutEffect(() => {
        window.scrollTo(0,0)
    }, [pathname, refresh])

    return setRefresh
}