let UUID = 0

let UniqueID = () => {
    const getID = () => {
        UUID++
        return UUID
    }
    return {
        getID
    }
}

export default UniqueID;