function populateStates() {
    const stateSelect = document.querySelector('select[id=state]')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then(res => res.json())
        .then(states => {
            for (let state of states) {
                stateSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateStates()

function getCities(event) {
    // Store State name in the hidden input
    const stateInput = document.querySelector('input[name=state]')
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const stateId = event.target.value
    const citySelect = document.querySelector('select[name=city]')
    
    citySelect.innerHTML = '<option value="">Selecione a cidade</option>'
    citySelect.disabled = true

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios?orderBy=nome`)
        .then(res => res.json())
        .then(cities => {
            let cityOptions = citySelect.innerHTML
            
            for (let city of cities) {
                cityOptions += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.innerHTML = cityOptions
            citySelect.disabled = false
        })
}

document
    .querySelector('select[id=state]')
    .addEventListener('change', getCities)

document.querySelectorAll('.items-grid li').forEach(item => {
    item.addEventListener('click', handleSelectedItem)
})

const collectedItems = document.querySelector('input[name=items]')

function handleSelectedItem(event) {
    event.target.classList.toggle('selected')
    
    let selectedItems = []
    document.querySelectorAll('.items-grid .selected').forEach(item => {
        selectedItems.push(item.dataset.id)
    })

    collectedItems.value = selectedItems.join(', ')
}