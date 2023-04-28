import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ({horaires, user, isAdmin}) {
    return (
        <>
            <Header user={user} isAdmin={isAdmin} />
            <main className={'mainContainer'}>
                <h1>Menus</h1>
            </main>
            <Footer horaires={horaires} />
        </>
    )
}