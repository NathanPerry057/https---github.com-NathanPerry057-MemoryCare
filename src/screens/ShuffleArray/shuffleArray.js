

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {        //starts with i set to last index and continues until greater than 0 and decrements i by 1
        const j = Math.floor(Math.random() * (i + 1));  //caculates random index j between 0 and i and then multiplied by i + 1
        [array[i], array[j]] = [array[j], array[i]];    //destructing assignment to shuffle array
    }
    return array;
};