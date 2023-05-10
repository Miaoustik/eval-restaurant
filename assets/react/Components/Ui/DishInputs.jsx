import React from "react";
import InputWithRef from "./InputWithRef";

export default function ({inputsRef, categories, id, required = false}) {
    return (
        <>
            <div className={'mx-4 mb-3'}>
                <InputWithRef required={required} ref={el => inputsRef.current[id] = {...inputsRef.current[id], title: el}} type={'text'} label={"Nouveau titre :"} />
            </div>
            <div className={'mx-4 mb-3'}>
                <InputWithRef required={required} ref={el => inputsRef.current[id] = {...inputsRef.current[id], description: el}} type={'text'} label={"Nouvelle description :"} />
            </div>
            <div className={'mx-4 mb-3'}>
                <InputWithRef required={required} min={0} step={0.01} ref={el =>inputsRef.current[id] = {...inputsRef.current[id], price: el}} type={'number'} label={"Nouveau prix :"} />
            </div>
            <div className={'mx-4 mb-4'}>
                <label className={'mb-2'} htmlFor={'cat' + id}>Nouvelle catégorie : </label>
                <select required={required} ref={el => inputsRef.current[id] = { ...inputsRef.current[id], category: el}} id={'cat' + id} className="form-select" >
                    <option value={''}>Choississez une catégorie</option>
                    {categories.map(g => {
                        return (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        )
                    })}
                </select>
            </div>
        </>
    )
}