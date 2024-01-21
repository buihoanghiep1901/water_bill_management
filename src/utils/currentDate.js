function currentDate() {
    
    const date = new Date();
    let day = date.getDate()>9 ? date.getDate() : `0${date.getDate()}`;
    let month = (date.getMonth() + 1)>9 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}` ;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
       return currentDate
}

export default currentDate