function populateUF() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then(res => res.json())
        .then(states => {
            for (let state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUF()

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    
    const stateInput = document.querySelector('input[name=state]')
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = '<option value="">Selecione a cidade</option>'
    citySelect.disabled = true

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`)
        .then(res => res.json())
        .then(cities => {
            let cityOptions = ''
            for (let city of cities) {
                cityOptions += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.innerHTML = cityOptions
            citySelect.disabled = false
        })
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (let item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')
let selectedItems = []

function handleSelectedItem(event) {
    event.target.classList.toggle('selected')
    const itemId = event.target.dataset.id

    const alreadySelected = selectedItems.findIndex(item => item === itemId)

    if (alreadySelected != -1) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else selectedItems.push(itemId)

    collectedItems.value = selectedItems.join(', ')
    console.log(collectedItems.value)
}