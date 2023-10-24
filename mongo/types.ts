export type Character = {
    id?: number,
    _id?:number,
    name: string,
    status?: string,
    species?: string,
    type?: string,
    gender?: string,
    origin?: {
        name?: string,
    },
    location?: {
        name?: string,
    },
    created?: Date | string
}

export type Apierror = {
    error: string
}

export type Characters = {
    info: {
      count: number,
      pages: number,
      next: string,
      prev: string    
    },
    results: Character[]
}

export type Location = {
    id?: number,
    _id?:number,
    name:	string,
    type?:	string,
    dimension?:	string,
    created?:	Date | string
}

export type Locations = {
    info: {
      count: number,
      pages: number,
      next: string,
      prev: string    
    },
    results: Location[]
}