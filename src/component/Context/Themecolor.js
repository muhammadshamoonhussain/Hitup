import React, { useContext, useEffect, useState,createContext } from 'react'

export const ThemeContext = createContext(); 

function Themecolor({children}) {
    const [color,setcolor] = useState({})
    const [id,setid] = useState(null)
    const [bgcolor,setbgcolor] = useState("#fff")
    const [textcolor,settextcolor] = useState("#000")

    useEffect(() => {
    const userid = localStorage.getItem("id")
    if(userid){
        setid(userid)
    }
    },[])

    useEffect(() => {
        if(id){
            const savebgcolor = JSON.parse(localStorage.getItem("bgcolor"))|| {}
            const savetextcolor = JSON.parse(localStorage.getItem("textcolor"))|| {}
           
            setbgcolor(savebgcolor[id] || "#fff")
            settextcolor(savetextcolor[id] || "#000")
        }
    },[id])
    if (!id) return null;

    const usercolor = (newcolor) =>{
        const userid = localStorage.getItem("id")
        if(!userid) return
        setbgcolor(newcolor)

        const savecolor = JSON.parse(localStorage.getItem("bgcolor")) || {}
        savecolor[userid] = newcolor
        localStorage.setItem("bgcolor",JSON.stringify(savecolor));
    }
    const usertextcolor = (newcolor) =>{
        const userid = localStorage.getItem("id")
        if(!userid) return
        settextcolor(newcolor)

        const savecolor = JSON.parse(localStorage.getItem("textcolor")) || {}
        savecolor[userid] = newcolor
        localStorage.setItem("textcolor",JSON.stringify(savecolor));
    }
  return (
   <ThemeContext.Provider value={{bgcolor,usercolor,textcolor,usertextcolor,setid}}>
   {children}
   </ThemeContext.Provider>
  )
}

export const useThemeColor = () => useContext(ThemeContext)

export default Themecolor
