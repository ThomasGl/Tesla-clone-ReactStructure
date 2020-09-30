import {useCallback, useContext, useEffect} from 'react'

import ModelsContext from "./ModelsContext"

export default function useModel(modelName: string) {
    const {registerModel, unregisteredModel, getModelbyName} = useContext(ModelsContext)

    useEffect(() => () => unregisteredModel(modelName), [
        modelName,
        unregisteredModel
    ])

    const getModel = useCallback(() => getModelbyName(modelName), [
        getModelbyName,
        modelName
    ])

    return { registerModel, getModel }
}

