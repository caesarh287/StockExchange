const ENDPOINT = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/"

document.getElementById('submit-form').addEventListener('submit', (e) => {
    e.preventDefault()
    document.getElementById("loader").style.display = "block"
    fetchResults()
})


async function fetchResults() {
    const searchInput = document.getElementById('search-input').value
    try {
        const respone = await fetch(ENDPOINT + `/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`)
        const data = await respone.json()
        displayResults(data)
        document.getElementById("loader").style.display = "none"
    } catch (err) {
        console.log(err)
    }
}

function displayResults(dataArray) {
    dataArray.forEach(company => {
        const row = generateRow(company)
        document.getElementById('results').appendChild(row)
    })
}

function generateRow(object) {
    const row =   
        `
        <a href="/company.html?symbol=${object.symbol}">
        <div class="card">
            <div class="card-body">
                ${object.name} (${object.symbol})
            </div>
        </div>
        </a>
        `
    const parser = new DOMParser()
    const element = parser.parseFromString(row, 'text/html')
    return element.body.childNodes[0]
}
