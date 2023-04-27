import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ({horaires}) {
    return (
        <>
            <Header />
            <main className={'mainContainer'}>
                <h1>Carte du restaurant</h1>
            </main>
            <Footer horaires={horaires} />
        </>
    )
}