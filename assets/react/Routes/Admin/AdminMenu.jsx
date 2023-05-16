import React, {useEffect, useState} from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {Container} from "react-bootstrap";
import useMenuRepository from "../../Hooks/Repository/useMenuRepository";
import useControllerRef from "../../Hooks/useControllerRef";
import LoadingFetch from "../../Components/Ui/LoadingFetch";
import HeightTransition from "../../Components/Ui/HeightTransition";
import useHeightTransition from "../../Hooks/useHeightTransition";
import useScrollToTop from "../../Hooks/useScrollToTop";

export default function ({user, isAdmin, horaires}) {

    const controllerRef = useControllerRef()
    const {repository, setMenus, menus} = useMenuRepository(controllerRef)
    const [loading, setLoading] = useState(true)
    const {setShow, toggleShow, show} = useHeightTransition()
    const {setShow: setShowModifyTitle, toggleShow: toggleShowModifyTitle, show: showModifyTitle, } = useHeightTransition()
    const {setShow: setShowModifyFormula, toggleShow: toggleShowModifyFormula, show: showModifyFormula, } = useHeightTransition()
    const [loadingTitle, setLoadingTitle] = useState(false)
    const [menuTitles, setMenuTitles] = useState({})
    const [menuFormulas, setMenuFormulas] = useState({})


    useEffect(() => {
        repository.get()
            .then(res => {
                setMenuTitles(() => {
                    const obj = {}
                    res.data.forEach(menu => {
                        obj[menu.id] = ''
                    })
                    return obj
                })
                setMenuFormulas(() => {
                    const obj1 = {}
                    res.data.forEach(menu => {
                        const obj2 = {}

                        menu.formulas.forEach(formula => {
                            obj2[formula.id] = {
                                title: '',
                                description: '',
                                price: ''
                            }
                        })
                        obj1[menu.id] = obj2
                    })
                    return obj1
                })
                setMenus(res.data)
            })
            .finally(() => setLoading(false))
    }, [])

    const handleChangeMenuTitle = (e) => {
        setMenuTitles(prevState => {
            const news = {...prevState}
            news[e.target.getAttribute('data-id')] = e.target.value
            return news
        })
    }

    const handleChangeFormula = (e) => {
        setMenuFormulas(prev => {
            const news = {...prev}
            const menu = e.target.getAttribute('data-menu')
            const formula = e.target.getAttribute('data-formula')
            const cat = e.target.getAttribute('data-cat')

            news[menu][formula][cat] = e.target.value
            return news
        })
    }

    const customToggleShowModifyTitle = (e) => {
        toggleShowModifyTitle(e)
        const id = e.target.getAttribute('data-id')
        if (showModifyTitle[id] === true) {
            setMenuTitles(prev => {
                const news = {...prev}
                news[id] = ''
                return news
            })
        }

    }

    const resetModifyFormula = (menu, formula) => {
        setMenuFormulas(prevState => {
            const news ={...prevState}
            news[menu][formula]['title'] = ''
            news[menu][formula]['description'] = ''
            news[menu][formula]['price'] = ''
            return news
        })
    }

    const customToggleShowModifyFormula = (e) => {
        toggleShowModifyFormula(e)
        const menu = e.target.getAttribute('data-menu')
        const formula = e.target.getAttribute('data-id')
        resetModifyFormula(menu, formula)
    }

    const handleSubmitMenuTitle = (e) => {
        e.preventDefault()
        setLoadingTitle(true)

        const id = e.target.getAttribute('data-id')
        const data = {
            id,
            title: menuTitles[id]
        }

        repository.modifyMenuTitle(data)
            .then(res => {
                console.log(res)
                setMenus(prevState => {
                    const news = [...prevState]
                    news.forEach(el => {
                        if (el.id == id) {
                            el.title = menuTitles[id]
                        }
                    })
                    console.log(news)
                    return news
                })
                setShowModifyTitle(prev => {
                    const news = {...prev}
                    news[id] = false
                    return news
                })
                setMenuTitles(prevState => {
                    const news = {...prevState}
                    news[id] = ''
                    return news
                })
                e.target.scrollIntoView()
            })
            .finally(() => setLoadingTitle(false))
    }

    const handleSubmitModifyFormula = (e) => {
        e.preventDefault()


        const menu = e.target.getAttribute('data-menu')
        const formula = e.target.getAttribute('data-formula')
        const title = menuFormulas[menu][formula]['title']
        const description = menuFormulas[menu][formula]['description']
        const price = menuFormulas[menu][formula]['price']



        const data = {
            menu,
            formula,
            title,
            description,
            price
        }

        repository.modifyMenuFormula(data)
            .then((res) => {
                if (res.ok) {
                    setMenus(prev => {
                        const news = [...prev]
                        news.forEach(menuu => {
                            if (menuu.id == menu) {
                                menuu.formulas.forEach(formulaa => {
                                    if (formulaa.id == formula) {
                                        if (title !== '') {
                                            formulaa['title'] = title
                                        }
                                        if (description !== '') {
                                            formulaa['description'] = description
                                        }
                                        if (price !== '') {
                                            formulaa['price'] = price
                                        }
                                    }
                                })
                            }
                        })
                        return news
                    })
                    resetModifyFormula(menu, formula)
                    setShowModifyFormula(prev => {
                        const news = {...prev}
                        news[formula] = false
                        return news
                    })
                    e.target.scrollIntoView()
                }
            })
    }



    return (
        <>
            <Header user={user} isAdmin={isAdmin} />
            <Container className={'mainContainer'}>
                <h2>Gérer les menus</h2>
                {loading
                    ? (<LoadingFetch message={'Chargement...'} />)
                    : (
                        <div>
                            {menus.map(menu => {
                                return (
                                    <div className={'border border-primary shadow1 rounded px-2 mb-4'} key={menu.id}>
                                        <div data-id={menu.id} role={'button'} onClick={toggleShow} >
                                            <p data-id={menu.id} className={'m-0 py-4 text-center merri text-secondary'}>Titre du menu: {menu.title}</p>
                                        </div>
                                        <HeightTransition show={show[menu.id]}>

                                            {loadingTitle
                                                ? (<LoadingFetch message={'Changement du titre en cours ...'} />)
                                                : (
                                                    <>
                                                        <div className={'px-2'}>
                                                            <button data-id={menu.id} onClick={customToggleShowModifyTitle} className={'btn btn-primary w-100 shadow1 mb-4'}>{showModifyTitle[menu.id] ? "Annuler" : "Modifier le titre du menu"}</button>
                                                        </div>

                                                        <HeightTransition show={showModifyTitle[menu.id]}>
                                                            <form data-id={menu.id} onSubmit={handleSubmitMenuTitle}>
                                                                <div className={'px-2 pb-4'}>
                                                                    <label className={'mb-2 text-primary mukta'}>Nouveau titre : </label>
                                                                    <input required={true} onChange={handleChangeMenuTitle} data-id={menu.id} value={menuTitles[menu.id]} className={'form-control border-primary rounded shadow1'} type={'text'} required={true} />
                                                                </div>
                                                                <HeightTransition show={menuTitles[menu.id] !== ''} >
                                                                    <div className={'p-2'}>
                                                                        <button type={'submit'} className={'btn btn-primary mukta w-100 shadow1 mb-4'}>Enregistrer le titre</button>
                                                                    </div>
                                                                </HeightTransition>
                                                            </form>
                                                        </HeightTransition>
                                                    </>
                                                )
                                            }

                                            {menu.formulas.map(formula => {
                                                return (
                                                    <div key={formula.id} className={'mx-2 border border-primary py-4 rounded shadow1 mb-4'}>
                                                        <div className={'px-2'}>
                                                            <p className={'mukta text-primary'}>Titre de la formule :  {formula.title}</p>
                                                            <p className={'mukta text-primary'}>Description :  {formula.description}</p>
                                                            <p className={'mukta text-primary'}>Prix :  {formula.price} euros</p>
                                                            <button data-menu={menu.id} data-id={formula.id} onClick={customToggleShowModifyFormula} className={'btn btn-primary mukta mt-4 w-100 shadow1'}>{showModifyFormula[formula.id] ? "Annuler" : "Modifier la formule"}</button>
                                                        </div>
                                                        <HeightTransition show={showModifyFormula[formula.id]}>

                                                                <form data-menu={menu.id} data-formula={formula.id} onSubmit={handleSubmitModifyFormula}>
                                                                    <div className={"px-2"}>
                                                                        <label className={'mukta text-primary mt-4 mb-2'}>Titre de la formule :</label>
                                                                        <input value={menuFormulas[menu.id][formula.id]['title']} onChange={handleChangeFormula} data-cat={'title'} data-menu={menu.id} data-formula={formula.id}  type={'text'} className={'form-control border-primary rounded shadow1'} />
                                                                        <label className={'mukta text-primary mt-4 mb-2'}>Description de la formule :</label>
                                                                        <textarea value={menuFormulas[menu.id][formula.id]['description']} onChange={handleChangeFormula} data-cat={'description'} data-menu={menu.id} data-formula={formula.id} rows={3} className={'form-control border-primary rounded shadow1'} />
                                                                        <label className={'mukta text-primary mt-4 mb-2'}>Prix de la formule :</label>
                                                                        <input value={menuFormulas[menu.id][formula.id]['price']} onChange={handleChangeFormula} data-cat={'price'} data-menu={menu.id} data-formula={formula.id} type={'number'} step={0.01}  className={'form-control border-primary rounded shadow1 mb-2'} />
                                                                    </div>
                                                                    <HeightTransition show={menuFormulas[menu.id][formula.id]['title'] !== '' || menuFormulas[menu.id][formula.id]['description'] !== '' || menuFormulas[menu.id][formula.id]['price'] !== ''} >
                                                                        <div className={'p-2'}>
                                                                            <button type={'submit'} className={'btn btn-primary w-100 shadow1 mukta'}>Enregistrer la formule</button>
                                                                        </div>
                                                                    </HeightTransition>
                                                                </form>
                                                        </HeightTransition>
                                                    </div>
                                                )
                                            })}
                                        </HeightTransition>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }

            </Container>
            <Footer horaires={horaires} />

        </>
    )
}