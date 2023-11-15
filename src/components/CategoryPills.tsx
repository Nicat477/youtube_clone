import { Button } from "./Button";
import {useState,useRef, useEffect} from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react"
type CategoryPillsProps={
    categories:string[],
    selectedCategory:string,
    onSelect:(category:string)=>void
}
const TRANSLATE_AMOUNT=200
export  function CategoryPills({categories,selectedCategory,onSelect}:CategoryPillsProps){
    const [translate,setTranslate]=useState(0)
    const [isLeftVisible,setIsLeftVisible]=useState(false)
    const [isRightVisible,setIsRightVisible]=useState(false)
    const containerRef=useRef<HTMLDivElement>(null)
    useEffect(()=>{
        if (containerRef.current==null) return 
        const observer=new ResizeObserver(entries=>{

        })
        observer.observe(containerRef.current)
        return ()=>observer.disconnect()
    }),[categories,translate]
    return (
        <div ref={containerRef} className="overflow-x-hidden relative">
            <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]" style={{transform:`translateX(-${translate}px)`}}>
                {categories.map(category=>(
                    <Button onClick={()=>onSelect(category)} key={category} variant={selectedCategory===category ? "dark" : "default"} className="py-1 px-3 rounded-lg whitespace-nowrap">{category}</Button>
                ))}
                
            </div>
            {isLeftVisible && (
               <div className="absloute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent h-full w-24">
                 <Button onClick={()=>{
                    setTranslate(translate=>{
                        const newTranslate=translate-TRANSLATE_AMOUNT
                        if (newTranslate<=0){
                            return 0
                        }
                        return newTranslate
                    })
                 }} 
                 variant="ghost" size="icon" className="h-full aspect-square w-auto p-1.5">
                     <ChevronLeft/>
                 </Button>
             </div>
            )}
            {isRightVisible && (
               <div className="flex justify-end absloute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent h-full w-24">
                 <Button onClick={()=>{
                    
                    setTranslate(translate=>{
                        if (containerRef.current==null) return translate
                        const edge=containerRef.current.scrollWidth
                        const width=containerRef.current.clientWidth
                        const newTranslate=translate+TRANSLATE_AMOUNT
                        if (newTranslate+width>=edge){
                            return edge-width
                        }
                        return newTranslate
                    })
                 }}  variant="ghost" size="icon" className="h-full aspect-square w-auto p-1.5">
                     <ChevronRight/>
                 </Button>
             </div>
            )}
           
        </div>
    )
}