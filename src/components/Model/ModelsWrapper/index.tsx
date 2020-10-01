import React, { useCallback, useRef, useState } from 'react';

import ModelsContext, {CarModel} from '../ModelsContext'
import ModelOverlay from '../ModelOverlay'

import { Container, OverlaysRoot } from './styles';


const ModelsWrapper: React.FC = ({children}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [registeredModels, setRegisteredModels] = useState<CarModel[]>([])

  const registerModel = useCallback((model: CarModel) => {
    setRegisteredModels(state => [...state, model])
  }, [])

  const unregisteredModel = useCallback((modelName: string) =>{
    setRegisteredModels(state =>
       state.filter(model => model.modelName !== modelName))
  },[])

  const getModelbyName = useCallback(
    (modelName: string) => {
    return registeredModels.find(item => item.modelName === modelName) || null
  },[registeredModels])

  return (
    <ModelsContext.Provider
     value={{
      wrapperRef,
      registeredModels,
      registerModel,
      unregisteredModel,
      getModelbyName
    }}>
       
      <Container ref={wrapperRef}>
        <OverlaysRoot>
          {registeredModels.map(item => (
            <ModelOverlay key={item.modelName} model={item}>
              {item.overlayNode}
              </ModelOverlay>
          ))}

        </OverlaysRoot>


        {children}
      </Container>;
    </ModelsContext.Provider>
  )
};

export default ModelsWrapper;
