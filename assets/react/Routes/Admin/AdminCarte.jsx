import React from "react";
import useCarteAdmin from "../../Hooks/Admin/useCarteAdmin";
import CarteAdmin from "../../Components/Admin/Carte/CarteAdmin";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {Container} from "react-bootstrap";
import useAddDishAdmin from "../../Hooks/Admin/useAddDishAdmin";
import AddDishAdmin from "../../Components/Admin/Carte/AddDishAdmin";
import useControllerRef from "../../Hooks/useControllerRef";
import useCarteRepository from "../../Hooks/Repository/useCarteRepository";

export default function ({horaires, user, isAdmin}) {

    const controllerRef = useControllerRef()
    const {carte, error, repository, setCarte} = useCarteRepository(controllerRef)

    const categories = carte.map(el => {
        return {
            id: el.id,
            name: el.name
        }
    })

    const props = useCarteAdmin(carte, repository, setCarte, categories)
    const propsDish = useAddDishAdmin(carte, repository, setCarte, categories)

    return (
        <>
            <Header isAdmin={isAdmin} user={user} />
            <Container className={'mainContainer'} >
                <CarteAdmin {...props} />
                <AddDishAdmin {...propsDish} />
            </Container>
            <Footer horaires={horaires} />
        </>
    )
}