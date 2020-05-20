const form = document.querySelector('form')
const input = document.querySelector('input')
const loading = document.querySelector('#loading')
const imageSection = document.querySelector('.images')

loading.style.display = 'none'

const API_URL = 'https://pesquisa-imagem-api.now.sh/'

let images = []

form.addEventListener('submit', e => {
  e.preventDefault()

  const query = {
    termo: input.value
  }

  images = []
  loading.style.display = ''
  imageSection.innerHTML = ''

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(images => {
      images = images

      if (images.data.length > 0) {
        images.data.forEach(image => {
          const url = image.assets.huge_thumb.url
          const descricao = image.description

          const img = document.createElement('img')
          img.src = url
          img.onclick = expandImage
          img.setAttribute('title', descricao)

          imageSection.appendChild(img)
        })
      } else {
        imageSection.innerHTML = '<b>Nenhum resultado encontrado<b/>'
      }

      loading.style.display = 'none'
    })
})

function expandImage(e) {
  const modal = document.getElementById('myModal')
  const modalImg = document.getElementById('img01')

  modal.style.display = 'flex'
  modalImg.src = e.path[0].src
}

const span = document.getElementsByClassName('fechar')[0]

span.onclick = function () {
  const modal = (document.getElementById('myModal').style.display = 'none')
}
