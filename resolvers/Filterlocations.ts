import { Location } from "../mongo/types.ts";
import { LocationCollection } from "../mongo/db.ts";



export const  filterlocation_type =async (_type: string | undefined): Promise<Location[]> => {
    

    try{

        const existe: Location[] = await LocationCollection.find({type: _type}).toArray()

        if(existe.length===0){
            throw String("No se ha encontrado ninguno, o se ha introducido mal el cmapo")
        }
        
        return existe

    }catch(error){
        return error
        
    }

}
export const  filterlocation_dimension =async (_dimension: string | undefined): Promise<Location[]> => {
    

    try{

        const existe: Location[] = await LocationCollection.find({dimension: _dimension}).toArray()

        if(existe.length===0){
            throw String("No se ha encontrado ninguno, o se ha introducido mal el cmapo")
        }
        return existe

    }catch(error){
        return error
    }

}