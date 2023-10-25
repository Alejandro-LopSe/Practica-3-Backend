

export const format = (s: string): string | undefined=>{

    if(s){
        const min = s.substring(1).toLowerCase()
        const may = s.substring(0,1).toUpperCase()
        const word = may+min
        return word
    }

}