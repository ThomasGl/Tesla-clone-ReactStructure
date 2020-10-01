import { useMotionValue} from 'framer-motion';
import { useContext, useEffect } from 'react';

import ModelsContext from './ModelsContext'

export default function useWrapperScroll() {
    const { wrapperRef} = useContext(ModelsContext)
    
    const scrollY = useMotionValue(0)
    const scrollYProgress = useMotionValue(0)

    useEffect(() => {
        const element = wrapperRef.current

        const updateScrollValue = () => {
            if (element) {
                const {scrollTop, scrollHeight, offsetHeight} = element

                const fullScroll = scrollHeight - offsetHeight

                scrollY.set(scrollTop) // number in px
                scrollYProgress.set(scrollTop / fullScroll) // a "%"", presented within 0-1
            }
        }
        if (element){
            element.addEventListener('scroll', updateScrollValue)
        }
        return () => {
            element?.removeEventListener('scroll', updateScrollValue)
        }
    }, [scrollY, scrollYProgress, wrapperRef])

    return { scrollY, scrollYProgress}
}