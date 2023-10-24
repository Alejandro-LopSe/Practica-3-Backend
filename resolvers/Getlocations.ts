// deno-lint-ignore-file
import { Location,Apierror,Locations } from "../mongo/types.ts";

const url = "https://rickandmortyapi.com/api/location"

export const  getlocations =async (page: string=""): Promise<Location[]> => {
    
    const response = await  fetch(`${url}/?page=${page}`)

    if(response.status!==200){
        
        const error: Apierror = await response.json()
        
        throw error;
    }

    const data: Locations = await response.json()


    if(data.results===undefined){
        console.log(data.results)
        throw new Error;
    }

    const finaldata: Location[] = data.results.reduce((acc: Location[], elem: Location)=>{
        acc  = data.results.map((elem: Location)=>{
            return {
                id: elem.id,
                name: elem.name
            }
        })
        return acc
    },[])
        
    return finaldata;
}