import {useState} from "react";

export default function () {
    const [showAlert, setShowAlert] = useState(false)

    const handleCloseFlash = (e) => {
        e.preventDefault()
        setShowAlert(false)
    }

    return {
        showAlert,
        setShowAlert,
        handleCloseFlash
    }
}