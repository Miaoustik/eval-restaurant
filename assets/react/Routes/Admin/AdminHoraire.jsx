import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {Container} from "react-bootstrap";
import useHoraireAdmin from "../../Hooks/Admin/useHoraireAdmin";
import useControllerRef from "../../Hooks/useControllerRef";
import HoraireAdmin from "../../Components/Admin/Horaire/HoraireAdmin";

export default function ({horaires, repository, user, isAdmin}) {

    const controllerRef = useControllerRef()

    const props = useHoraireAdmin(controllerRef, horaires, repository)

    return (
        <>
            <Header user={user} isAdmin={isAdmin} />
            <Container className={'mainContainer'}>
                <HoraireAdmin {...props} />
            </Container>
            <Footer horaires={horaires} />
        </>
    )
}