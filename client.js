var form = document.querySelector("form");
var input = document.querySelector("input");
var loading = document.querySelector("#loadingImage");
var sectionImagens = document.querySelector(".imagens");

loading.style.display = 'none';

var API_URL = "https://pesquisa-imagem-api.now.sh/";

var imagens = [];


form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    var query = {
        "termo": input.value
    }

    loading.style.display = '';
    imagens = [];
    sectionImagens.innerHTML = '';

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(query),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(resposta => resposta.json())
        .then(images => {

            imagens = images;

            console.log(imagens);

            imagens.data.forEach(imagem => {
                var url = imagem.assets.huge_thumb.url;
                var descricao = imagem.description;

                var img = document.createElement("img");
                img.src = url;
                img.setAttribute('title', descricao);


                sectionImagens.appendChild(img);


            });
            loading.style.display = 'none';
        });
});



