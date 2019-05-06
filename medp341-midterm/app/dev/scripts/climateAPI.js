
const api_url = 'http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas'
const timeData = {
    past1: {
        start: 1920,
        end: 1939
    },
    past2: {
        start: 1940,
        end: 1959
    },
    past3: {
        start: 1960,
        end: 1979
    },
    past4: {
        start: 1980,
        end: 1999
    },
    future1: {
        start: 2020,
        end: 2039
    },
    future2: {
        start: 2040,
        end: 2059
    },
    future3: {
        start: 2060,
        end: 2079
    },
    future4: {
        start: 2080,
        end: 2099
    },
}
const ISO = {
    india: 'IND',
    australia: 'AUS',
    congo: 'COD',
    brazil: 'BRA',
}

const roundNum = (num, pre) => {
    pre = Math.pow(10, pre)
    return Math.ceil(num * pre) / pre
}

const handleRequest = (timePeriod, iso) => {
    let path = `${api_url}/${timePeriod.start}/${timePeriod.end}/${iso}`
    $(`#title-time-period`).html(`Time Period from ${timePeriod.start} to ${timePeriod.end}`)


    //request 
    $.get(path, (data) => {
        $(`#time-period-info`).html(`Total Records: ${data.length}`)
        let sum = 0
        for ( month in data) {
            let tempF = (( (data[month].annualData[0] * 9) / 5) + 32)
            tempF = roundNum(tempF, 2)
            sum += tempF
            $(`#temperature-data`).append(`<li>${tempF} &deg;F</li>`)
        }
        let tempAvg = roundNum(sum/data.length, 2)
        $(`#time-period-avg`).html(`Average: ${tempAvg}`)
    })

   
}

const handleForm = () => {
    //clear any previous data 
    $(`#time-period-info`).empty()
    $(`#time-period-avg`).empty()
    $(`#title-time-period`).empty()
    $(`#temperature-data`).children().remove()

    let val =  $(`#apiForm`)[0].children[0].value
    let path = window.location.pathname
    path = path.slice(1, -5)

    let timePeriod = timeData[val]
    let iso = ISO[path]

    handleRequest(timePeriod, iso)
}

$( () => {
    console.log('page is loaded')
})