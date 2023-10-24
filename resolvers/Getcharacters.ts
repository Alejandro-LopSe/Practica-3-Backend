// deno-lint-ignore-file
import { Character,Apierror,Characters } from "../mongo/types.ts";

const url = "https://rickandmortyapi.com/api/character"

export const  getcharacters =async (page: string=""): Promise<Character[]> => {
    
    const response = await  fetch(`${url}/?page=${page}`)

    if(response.status!==200){
        
        const error: Apierror = await response.json()
        
        throw error;
    }

    const data: Characters = await response.json()


    if(data.results===undefined){
        console.log(data.results)
        throw new Error;
    }

    const finaldata: Character[] = data.results.reduce((acc: Character[], elem: Character)=>{
        acc  = data.results.map((elem: Character)=>{
            return {
    
                name: elem.name
            }
        })
        return acc
    },[])
        
    return finaldata;
}