import React from "react";
import useCarteAdmin from "../../Hooks/Admin/useCarteAdmin";
import CarteAdmin from "../../Components/Admin/Carte/CarteAdmin";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {Container} from "react-bootstrap";

export default function ({horaires, user, isAdmin}) {

    const props = useCarteAdmin()

    return (
        <>
            <Header isAdmin={isAdmin} user={user} />
            <Container className={'mainContainer'} >
                <CarteAdmin {...props} />
            </Container>
            <Footer horaires={horaires} />
        </>
    )
}