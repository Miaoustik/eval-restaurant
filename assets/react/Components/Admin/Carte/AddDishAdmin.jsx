import React from "react";
import DishInputs from "../../Ui/DishInputs";
import HeightTransition from "../../Ui/HeightTransition";

export default function (props) {
    return (
        <>
            <h3 className={'merri fs-4 text-primary mb-4'}>Nouveaux plats : </h3>
            <form data-id={'1'} onSubmit={props.handleSubmit}>
                <button data-id={'1'} className={'btn btn-primary w-100 shadow1 mb-3'} onClick={props.handleAddNewDish}>{props.show['1'] ? "Annuler" : "Ajouter un nouveau plat"}  </button>
                <HeightTransition show={props.show['1']} start={props.start}>
                    <div className={'rounded border border-primary shadow1  pt-4 pb-2'}>
                        <DishInputs required={true} id={'1'} inputsRef={props.inputsNewRef} categories={props.categories}/>
                    </div>
                    {props.created &&
                        <div role={'button'} onClick={props.closeAlert} className={' mt-4 alert alert-success'}>
                            Votre plat a bien été crée.
                        </div>
                    }
                    <button data-id={'1'} type={'submit'} className={'btn btn-primary w-100 shadow1 my-4'}>Enregistrer</button>
                </HeightTransition>
            </form>
        </>
    )
}
