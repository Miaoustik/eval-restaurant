import React from "react";
import DishInputs from "./DishInputs";

export default function ({handleSubmit = null, inputsRef, categories, id}) {
    return (
        <form data-id={id} onSubmit={handleSubmit}>
            <DishInputs inputsRef={inputsRef} id={id} categories={categories} />
            <div className={'mx-4 mb-4'}>
                <button type={'submit'} className={'btn btn-primary w-100 shadow1'}>Enregistrer</button>
            </div>
        </form>
    )
}