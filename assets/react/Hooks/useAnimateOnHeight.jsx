import {useRef, useState} from "react";

export default function () {
    const [state, setState] = useState({})
    const Refs = useRef([])

    const layoutEffect = () => {
        setState(() => {
            const newState = {}
            Refs.current.forEach(e => {
                const id = e.getAttribute('data-id')
                newState[id] = {
                    height: e.clientHeight,
                    show: false
                }
            })
            return newState
        })
    }



    const toggleShow = (e) => {
        setState(prevState => {
            const id = e.target.getAttribute('data-id')
            const newState = {...prevState}
            newState[id].show = !newState[id].show
            return newState
        })
    }

    return {state, toggleShow, Refs, layoutEffect, setState}
}