$(document).ready(function () {
    // Capturar el evento de envío del formulario
    $('form').submit(function (event) {
        event.preventDefault();
        const userInput = $('#superhero').val();

        // Comprobar que la información ingresada sea solo un número
        if (!isNaN(userInput)) {
            // Consultar la API
            searchSuperhero(userInput);
        } else {
            alert('Por favor ingresa solo números.');
        }
    });

    // Función para consultar la API
    function searchSuperhero(id) {
        $.ajax({
            url: 'https://www.superheroapi.com/api.php/4905856019427443/' + id,
            method: 'GET',
            success: function (response) {
                // Renderizar la información recibida
                renderSuperheroCard(response);
            },
            error: function () {
                alert('No se pudo encontrar al superhéroe.');
            }
        });
    }

    // Función para renderizar la información
    function renderSuperheroCard(superhero) {
        var card = '';
        if (superhero.response === "success") {
            card += '<h3 class="text-center mt-4">Superhéroe Encontrado</h3>'; // Título
            card += '<div class="card">';
            card += '<div class="row g-0">';
            card += '<div class="col-md-4">';
            card += '<img src="' + superhero.image.url + '" class="card-img" alt="' + superhero.name + '">';
            card += '</div>';
            card += '<div class="col-md-8">';
            card += '<div class="card-body">';
            card += '<h5 class="card-title">' + superhero.name + '</h5>';
            card += '<p class="card-text"><strong>Conexiones:</strong> ' + superhero.connections['group-affiliation'] + '</p>';
            card += '<p class="card-text"><strong>Publicado por:</strong> ' + superhero.biography.publisher + '</p>';
            card += '<p class="card-text"><strong>Ocupación:</strong> ' + superhero.work.occupation + '</p>';
            card += '<p class="card-text"><strong>Primera Aparición:</strong> ' + superhero.biography['first-appearance'] + '</p>';
            card += '<p class="card-text"><strong>Altura:</strong> ' + superhero.appearance.height[0] + '</p>';
            card += '<p class="card-text"><strong>Peso:</strong> ' + superhero.appearance.weight[0] + '</p>';
            card += '<p class="card-text"><strong>Alianzas:</strong> ' + superhero.connections['group-affiliation'] + '</p>';
            card += '</div></div></div></div>';

            generatePowerstatsChart(superhero.powerstats,superhero.name);



        } else {
            card += '<h3 class="text-center mt-4">No se encontró ningún superhéroe</h3>'; // Titulo si no se encuentra ningún superhéroe
        }

        $('#superhero__res').html(card);
    }

    // Función para generar el gráfico de CanvasJS con las estadísticas de poder
function generatePowerstatsChart(powerstats, name) {
    console.log(powerstats)
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Estadísticas de Poder para " + name
        },
        data: [{
            type: "pie",
            dataPoints: [
                { label: "Inteligencia", y: parseInt(powerstats.intelligence) },
                { label: "Fuerza", y: parseInt(powerstats.strength) },
                { label: "Velocidad", y: parseInt(powerstats.speed) },
                { label: "Durabilidad", y: parseInt(powerstats.durability) },
                { label: "Poder", y: parseInt(powerstats.power) },
                { label: "Combate", y: parseInt(powerstats.combat) }
            ]
        }]
    });

    chart.render();
}


});
