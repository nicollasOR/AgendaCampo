

export const formatarData = (data?: Date): string | undefined => {
    if(!data) 
        throw new Error("Faz o L ne pae, cade a data")

    const dataGet = data instanceof Date? data: new Date(data)

    if(isNaN(dataGet.getTime()))
    {
        console.error(`Fudeu né fio${data}`)
        return undefined
    }

    return dataGet.toISOString()

    
}