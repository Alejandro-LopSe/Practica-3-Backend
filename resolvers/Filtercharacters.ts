import { Character } from "../mongo/types.ts";
import { CharacterCollection } from "../mongo/db.ts";



export const  filtercharacter_gender =async (_gender: string): Promise<Character[]> => {
    

    try{

        const existe: Character[] = await CharacterCollection.find({gender: _gender}).toArray()

        return existe

    }catch(error){
        console.log(error)
        return error
        
    }

}
export const  filtercharacter_status =async (_status: string): Promise<Character[]> => {
    
    if(_status==="dead"){
        _status="Dead"
    }else if(_status==="alive"){
        _status="Alive"
    }

    try{

        const existe: Character[] = await CharacterCollection.find({status: _status}).toArray()

        if(existe.length===0){
            throw Error("No se ha encontrado ninguno, o se ha introducido mal el cmapo")
        }
        return existe

    }catch(error){
        console.log(error)
        return error.message
        
    }

}