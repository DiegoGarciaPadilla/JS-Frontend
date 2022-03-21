const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokemon");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("media/pokemon-sad.png")

            document.getElementById("pokemonId").innerHTML = "";
            document.getElementById("pokemonNombre").innerHTML = "";
            document.getElementById("pokemonTipo").innerHTML = "";
            document.getElementById("pokemonStats").innerHTML = "";
            document.getElementById("pokeMoves").innerHTML = "";
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);

            // Nombre
            let pokeName = data.name;
            document.getElementById('pokemonNombre').innerHTML = pokeName;

            // ID
            let pokeID = data.id;
            document.getElementById('pokemonID').innerHTML = `# ${pokeID}`;

            // Imagen
            let pokeImg = data.sprites.front_default;
            document.getElementById('pokeImg').src = pokeImg;

            // Tipo
            document.getElementById("pokemonTypes-Titulo").innerHTML = "Tipo";

            let types = data.types.map((typ) => typ.type.name)
            document.getElementById("pokemonTypes").innerHTML = "";
            types.forEach(function (el) {
                document.getElementById("pokemonTypes").innerHTML += `<li> ${el} </li>`;
            });
            

            // Estadísticas
            document.getElementById("pokemonStats-Titulo").innerHTML = "Estadísticas";

            let hp = data.stats[0].base_stat;
            let attack = data.stats[1].base_stat;
            let defense = data.stats[2].base_stat;
            let specialattack = data.stats[3].base_stat;
            let specialdefense = data.stats[4].base_stat;
            let speed = data.stats[5].base_stat;

            document.getElementById("pokemonStats").innerHTML = "";
            const lista = document.getElementById("pokemonStats");

            const li_hp = document.createElement("li");
            const li_attack = document.createElement("li");
            const li_defense = document.createElement("li");
            const li_specialattack = document.createElement("li");
            const li_specialdefense = document.createElement("li");
            const li_speed = document.createElement("li");

            li_hp.innerHTML = `<b>HP:</b> ${hp}`;
            li_attack.innerHTML = `<b>Ataque:</b> ${attack}`;
            li_defense.innerHTML = `<b>Defensa:</b> ${defense}`;
            li_specialattack.innerHTML = `<b>Ataque especial:</b> ${specialattack}`;
            li_specialdefense.innerHTML = `<b>Defensa especial:</b> ${specialdefense}`;
            li_speed.innerHTML = `<b>Velocidad:</b> ${speed}`;

            lista.appendChild(li_hp);
            lista.appendChild(li_attack);
            lista.appendChild(li_defense);
            lista.appendChild(li_specialattack);
            lista.appendChild(li_specialdefense);
            lista.appendChild(li_speed);

            // Movimientos
            document.getElementById("pokemonMoves-Titulo").innerHTML = "Movimientos";
            let moves2 = data.moves.map((typ) => typ.move.name);
            document.getElementById("pokemonMoves").innerHTML = "";
            moves2.forEach(function (el) {
                document.getElementById("pokemonMoves").innerHTML += `<li> ${el} </li>`;
            });
        }
    });
}