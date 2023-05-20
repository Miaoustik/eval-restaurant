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
    const {setShow: setShowNewMenu, toggleShow: toggleShowNewMenu, show: showNewMenu, } = useHeightTransition()
    const {setShow: setShowDeleteFormula, toggleShow: toggleShowDeleteFormula, show: showDeleteFormula, } = useHeightTransition()
    const {setShow: setShowDeleteMenu, toggleShow: toggleShowDeleteMenu, show: showDeleteMenu, } = useHeightTransition()
    const {setShow: setShowAddFormula, toggleShow: toggleShowAddFormula, show: showAddFormula, } = useHeightTransition()
    const [loadingTitle, setLoadingTitle] = useState(false)
    const [menuTitles, setMenuTitles] = useState({})
    const [menuFormulas, setMenuFormulas] = useState({})
    const [newMenu, setNewMenu] = useState({
        title: '',
        formulas: []
    })
    const [submittedNew, setSubmittedNew] = useState(false)
    const [refreshData, setRefreshData] = useState(false)
    const [menuOldFormulas, setMenuOldFormulas] = useState({})

    const scrollToTop = useScrollToTop()

    useEffect(() => {
        scrollToTop(s => !s)
        setLoading(true)
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
                setMenuOldFormulas(() => {
                    const obj = {}
                    res.data.forEach(el => {
                        obj[el.id] = {
                            title: '',
                            description: '',
                            price: ''
                        }
                    })
                    return obj
                })
            })
            .finally(() => setLoading(false))
    }, [refreshData])

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

    const handleChangeOldFormula = (e) => {
        const menuId = e.target.getAttribute('data-menu')
        const cat = e.target.getAttribute('data-cat')
        setMenuOldFormulas(prev => {
            const news = {...prev}
            news[menuId][cat] = e.target.value
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

    const handleChangeNewMenuTitle = (e) => {
        setNewMenu(prev => {
            const news = {...prev}
            news.title = e.target.value
            return news
        })
    }

    const handleChangeNewFormula = (e) => {
        const id = e.target.getAttribute('data-id')
        const cat = e.target.getAttribute('data-cat')
        setNewMenu(prev => {
            const news = {...prev}

            news.formulas.every(formula => {
                if (formula.id == id) {
                    formula[cat] = e.target.value
                    return false
                }
                return true
            })

            return news
        })
    }

    const handleSubmitNewMenu = (e) => {
        e.preventDefault()
        setSubmittedNew(false)
        if (newMenu.formulas.length === 0) {
            return null
        }

        repository.createMenu(newMenu)

            .then(res => {
                if (res.ok) {
                    e.target.scrollIntoView()
                    setSubmittedNew(true)
                    setRefreshData(s => !s)

                    setShowNewMenu(prev => {
                        const news = {...prev}

                        news['1'] = false

                        return news
                    })

                    if (showNewMenu['1'] === true) {
                        setNewMenu({
                            title: '',
                            formulas: []
                        })
                    }
                }
            })
    }

    const handleAddNewFormula = (e) => {
        e.preventDefault()
        const id = e.target.getAttribute('data-id')
        setNewMenu(prev => {
            const news = {...prev}
            let idFormula
            if (news.formulas.length === 0) {
                idFormula = 1
            } else {
                idFormula = news.formulas[news.formulas.length - 1].id + 1
            }
            news.formulas.push({
                id: idFormula,
                title: '',
                description: '',
                price: ''
            })
            return news
        })
    }

    const handleDeleteNewFormula = (e) => {
        e.preventDefault()
        setNewMenu(prevState => {
            const news = {...prevState}
            const formulaId = e.target.getAttribute('data-formula')
            news.formulas.every((formula, key) => {
                if (formula.id == formulaId) {
                    newMenu.formulas.splice(key, 1)
                    return false
                }
                return true
            })
            return news
        })
    }

    const customToggleShowNewMenu = (e) => {
        e.preventDefault()
        toggleShowNewMenu(e)
        if (showNewMenu['1'] === true) {
            setNewMenu({
                title: '',
                formulas: []
            })
        }
    }

    const handleDeleteFormula = (e) => {
        const formulaId = e.target.getAttribute('data-formula')
        repository.deleteFormula({
            id: formulaId
        })
            .then(res => {
                console.log(res)
                const menuId = e.target.getAttribute('data-menu')
                if (res.ok) {
                    setMenus(prev => {
                        const news = [...prev]
                        news.every(menu => {
                            if (menu.id == menuId) {
                                menu.formulas.every((formula, key) => {
                                    if (formula.id == formulaId) {
                                        menu.formulas.splice(key, 1)
                                        return false
                                    }
                                    return true
                                })
                                return false
                            }
                            return true
                        })
                        return news
                    })
                }
            })
    }

    const handleSubmitAddFormula = (e) => {
        e.preventDefault()
        const menuId = e.target.getAttribute('data-menu')

        const data = {
            menuId,
            formula: menuOldFormulas[menuId]
        }

        repository.addFormula(data)
            .then(res => {
                if (res.ok) {
                    console.log(res)
                    setMenus(prevState => {
                        const news = [...prevState]
                        news.every(el => {
                            if (el.id == menuId) {
                                el.formulas.push({
                                    id: res.data.formulaId,
                                    title: menuOldFormulas[menuId]['title'],
                                    description: menuOldFormulas[menuId]['description'],
                                    price: menuOldFormulas[menuId]['price'],
                                })
                                return false
                            }
                            return true
                        })
                        return news
                    })

                    setMenuFormulas(() => {
                        const obj1 = {}
                        menus.forEach(menu => {
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

                    setShowAddFormula(prevState => {
                        const news = {...prevState}
                        news[menuId] = false
                        return news
                    })

                    setMenuOldFormulas(prevState => {
                        const news = {...prevState}
                        news[menuId] = {
                            title: '',
                            description: '',
                            price: ''
                        }
                        return news
                    })
                }
            })
        console.log(data)
    }

    const customToggleShow = (e) => {
        e.preventDefault()
        toggleShow(e)
        const id = e.target.getAttribute('data-id')

        setShowModifyTitle(prevState => {
            const news = {...prevState}
            news[id] = false
            return news
        })

        setMenuTitles(prev => {
            const news = {...prev}
            news[id] = ''
            return news
        })

    }

    const handleDeleteMenu = (e) => {
        e.preventDefault()
        scrollToTop(s => !s)
        setLoading(true)
        const menuId = e.target.getAttribute('data-menu')
        repository.deleteMenu({
            id: menuId
        })
            .then(res => {
                if (res.ok) {
                    setRefreshData(s => !s)
                }
            })
    }


    return (
        <>
            <Header user={user} isAdmin={isAdmin} />
            <Container className={'mainContainer'}>
                <h2 className={'text-secondary merri my-4'}>Gérer les menus</h2>
                {loading
                    ? (<LoadingFetch message={'Chargement...'} />)
                    : (
                        <div>
                            {menus.map(menu => {
                                return (
                                    <div className={'border border-primary shadow1 rounded px-2 mb-4'} key={menu.id}>
                                        <div data-id={menu.id} role={'button'} onClick={customToggleShow} >
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

                                                        <div className={'px-2'}>
                                                            <button data-id={menu.id} onClick={toggleShowDeleteMenu} className={'btn w-100 shadow1 mb-4 ' + (showDeleteMenu[menu.id] ? 'btn-success' : 'btn-danger')}>{showDeleteMenu[menu.id] ? "Annuler" : "Supprimer le menu"}</button>
                                                        </div>

                                                        <HeightTransition show={showDeleteMenu[menu.id]}>
                                                            <div className={"px-2"}>
                                                                <p className={'text-secondary merri'}>Êtes-vous sûr ?</p>
                                                                <button data-menu={menu.id} onClick={handleDeleteMenu} className={'btn btn-danger w-100 shadow1 mb-4'}>Supprimer le menu</button>
                                                            </div>
                                                        </HeightTransition>

                                                        <HeightTransition show={showAddFormula[menu.id]}>

                                                            <form className={'mb-4'} data-menu={menu.id} onSubmit={handleSubmitAddFormula}>
                                                                <div className={"px-2"}>
                                                                    <label className={'mukta text-primary mt-4 mb-2'}>Titre de la formule :</label>
                                                                    <input required={true} value={menuOldFormulas[menu.id]['title']} onChange={handleChangeOldFormula} data-cat={'title'} data-menu={menu.id}  type={'text'} className={'form-control border-primary rounded shadow1'} />
                                                                    <label className={'mukta text-primary mt-4 mb-2'}>Description de la formule :</label>
                                                                    <textarea required={true} value={menuOldFormulas[menu.id]['description']} onChange={handleChangeOldFormula} data-cat={'description'} data-menu={menu.id}  rows={3} className={'form-control border-primary rounded shadow1'} />
                                                                    <label className={'mukta text-primary mt-4 mb-2'}>Prix de la formule :</label>
                                                                    <input required={true} value={menuOldFormulas[menu.id]['price']} onChange={handleChangeOldFormula} data-cat={'price'} data-menu={menu.id}  type={'number'} step={0.01} min={0} className={'form-control border-primary rounded shadow1 mb-2'} />
                                                                </div>
                                                                <HeightTransition show={menuOldFormulas[menu.id]['title'] !== '' && menuOldFormulas[menu.id]['description'] !== '' && menuOldFormulas[menu.id]['price'] !== ''} >
                                                                    <div className={'p-2'}>
                                                                        <button type={'submit'} className={'btn btn-primary w-100 shadow1 mukta'}>Enregistrer la formule</button>
                                                                    </div>
                                                                </HeightTransition>
                                                            </form>
                                                        </HeightTransition>
                                                        <div className={'px-2'}>
                                                            <button data-id={menu.id} onClick={toggleShowAddFormula} className={'btn btn-primary w-100 shadow1 mb-4'}>{showAddFormula[menu.id] ? "Annuler" : "Ajouter une formule"}</button>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            <p className={'merri text-primary'}>Formules actuelles</p>
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
                                                                        <input  value={menuFormulas[menu.id][formula.id]['title']} onChange={handleChangeFormula} data-cat={'title'} data-menu={menu.id} data-formula={formula.id}  type={'text'} className={'form-control border-primary rounded shadow1'} />
                                                                        <label className={'mukta text-primary mt-4 mb-2'}>Description de la formule :</label>
                                                                        <textarea  value={menuFormulas[menu.id][formula.id]['description']} onChange={handleChangeFormula} data-cat={'description'} data-menu={menu.id} data-formula={formula.id} rows={3} className={'form-control border-primary rounded shadow1'} />
                                                                        <label className={'mukta text-primary mt-4 mb-2'}>Prix de la formule :</label>
                                                                        <input  value={menuFormulas[menu.id][formula.id]['price']} onChange={handleChangeFormula} data-cat={'price'} data-menu={menu.id} data-formula={formula.id} type={'number'} step={0.01} min={0} className={'form-control border-primary rounded shadow1 mb-2'} />
                                                                    </div>
                                                                    <HeightTransition show={menuFormulas[menu.id][formula.id]['title'] !== '' || menuFormulas[menu.id][formula.id]['description'] !== '' || menuFormulas[menu.id][formula.id]['price'] !== ''} >
                                                                        <div className={'p-2'}>
                                                                            <button type={'submit'} className={'btn btn-primary w-100 shadow1 mukta'}>Enregistrer la formule</button>
                                                                        </div>
                                                                    </HeightTransition>
                                                                </form>
                                                        </HeightTransition>

                                                        {menu.formulas.length > 1 &&
                                                            <div className={"px-2"}>
                                                                <button data-id={'1'} onClick={toggleShowDeleteFormula} className={'btn mukta mt-4 w-100 shadow1 ' + (showDeleteFormula['1'] ? 'btn-success' : 'btn-danger')} >{showDeleteFormula['1'] ? 'Annuler' : "Supprimer la formule"} </button>
                                                            </div>
                                                        }
                                                        {menu.formulas.length > 1 &&
                                                            <HeightTransition show={showDeleteFormula['1']}>
                                                                <div className={'px-3'}>
                                                                    <p className={'mukta text-secondary mt-4 mb-0'}>Êtes-vous sûr ?</p>
                                                                    <button data-menu={menu.id} data-formula={formula.id} onClick={handleDeleteFormula} className={'btn btn-danger mukta mt-4 w-100 shadow1'}>Supprimer la formule</button>
                                                                </div>
                                                            </HeightTransition>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </HeightTransition>
                                    </div>
                                )
                            })}

                            {submittedNew &&
                                <div className={'alert alert-success'}>
                                    Votre menu a bien été crée.
                                </div>
                            }

                            <button data-id={'1'} onClick={customToggleShowNewMenu} className={'btn btn-primary w-100 shadow1 my-4'}>{showNewMenu['1'] ? 'Annuler' : "Créer un nouveau menu"}</button>
                            <HeightTransition show={showNewMenu['1']}>
                                <div className={'border border-primary rounded shadow1 mb-4'}>
                                    <form onSubmit={handleSubmitNewMenu}>
                                        <div className={'px-3'}>
                                            <label className={'text-primary mukta mt-4 mb-2'}>Titre du menu : </label>
                                            <input onChange={handleChangeNewMenuTitle} value={newMenu.title} type={'text'} required className={'form-control border-primary shadow1'} />
                                            {newMenu.formulas.length === 0 &&
                                                <div className={'mt-4 alert alert-danger shadow1'}>
                                                    Veuillez ajouter au moin 1 formule.
                                                </div>
                                            }
                                        </div>

                                        {newMenu.formulas.map(formula => {
                                            return (
                                                <HeightTransition start={true} key={formula.id}>
                                                    <div className={'px-3 mt-2 mx-3 border border-primary rounded'}>
                                                        <label className={'text-primary mukta mt-4 mb-2'}>Titre de la formule : </label>
                                                        <input onChange={handleChangeNewFormula} data-id={formula.id} data-cat={'title'} value={formula.title} type={'text'} required={true} className={'form-control border-primary shadow1'} />

                                                        <label className={'text-primary mukta mt-4 mb-2'}>Description de la formule : </label>
                                                        <textarea onChange={handleChangeNewFormula} data-id={formula.id} data-cat={'description'} value={formula.description} rows={3} required={true} className={'form-control border-primary shadow1'} />

                                                        <label className={'text-primary mukta mt-4 mb-2'}>Prix de la formule : </label>
                                                        <input onChange={handleChangeNewFormula} data-id={formula.id} data-cat={'price'} value={formula.price} type={'number'} required={true} min={0} step={0.01} className={'form-control  border-primary shadow1'} />
                                                        <button onClick={handleDeleteNewFormula} data-formula={formula.id} className={'btn btn-primary w-100 shadow1 my-4' }>Supprimer la formule</button>
                                                    </div>
                                                </HeightTransition>
                                            )
                                        })}

                                        <div className={"px-3"}>
                                            <button onClick={handleAddNewFormula} className={'btn btn-primary w-100 shadow1 my-4'}>Ajouter une formule</button>
                                            <button type={'submit'} className={'btn btn-primary w-100 shadow1 my-4'}>Enregistrer</button>
                                        </div>
                                    </form>
                                </div>
                            </HeightTransition>
                        </div>

                    )
                }

            </Container>
            <Footer horaires={horaires} />

        </>
    )
}