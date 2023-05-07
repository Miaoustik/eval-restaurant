import {useState} from "react";

export default function ( start = false) {
    const [show, setShow] = useState({})


    const toggleShow = (e) => {
        e.preventDefault()
        const id = e.target.getAttribute('data-id')
        setShow(s => {
            const news = {...s}
            news[id] = news[id] ? !news[id] : true
            return news
        })
    }

    return {
        show,
        toggleShow,
        setShow,
        start
    }
}