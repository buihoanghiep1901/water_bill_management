export function changeDateFomat(olddate) {
    const result=olddate.split('-') //2023-09-18 -> 18/09/2023

    return `${result[2]}/${result[1]}/${result[0]}`
}

export function reverseChangeDateFomat(olddate) {
    const result=olddate.split('/') //18/09/2023 -> 2023-09-18

    return `${result[2]}-${result[1]}-${result[0]}`
}
