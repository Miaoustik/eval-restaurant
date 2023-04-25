import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styled from "styled-components";

export default function ({ horaires }) {

    return (
        <>
            <Header />
            <main className={'mainContainer'}>

            </main>
            <Footer horaires={horaires} />
        </>
    )
}