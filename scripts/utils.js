//utility files

//gets time as input from radio stream and converts id : is not present
function checkAndConvertSecondsToMin(input){

    if(!input){
        return ""
    }

    if(input.includes(":")){
        return input
    }

    const seconds =  (input%60).toPrecision(2)
    const minutes = setMinutesPrecision((input/60))
    return `${minutes}:${seconds} - ${input}`
}

//gets time in minute from above function and sets hour and minutes
function setMinutesPrecision(minutes){

    if(minutes<10){
        return minutes.toPrecision(1)
    }
    if(minutes<60){
        return minutes.toPrecision(2)
    }

    const hours = (minutes/60).toPrecision(1)
    const hourMinutes = (input%60).toPrecision(2)

    return `${hours}:${hourMinutes}`
}