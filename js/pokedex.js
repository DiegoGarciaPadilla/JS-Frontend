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
            pokemonNombre(pokeName);

            // ID
            let pokeID = data.id;
            pokemonID(pokeID);

            // Imagen
            let pokeImg = data.sprites.front_default;
            pokemonImg(pokeImg);

            // Tipo
            document.getElementById("pokemonTypes-Titulo").innerHTML = "Tipo";

            let types = data.types.map((typ) => typ.type.name)
            document.getElementById("pokemonTypes").innerHTML = "";
            pokemonTipos(types)


            // Estadísticas
            document.getElementById("pokemonStats-Titulo").innerHTML = "Estadísticas";
            document.getElementById("pokemonStats").innerHTML = "";

            let stats = [];

            for (let i = 0; i < 6; i++) {
                stats.push(data.stats[i].base_stat)
            }

            pokemonStats(stats);

            // Movimientos
            document.getElementById("pokemonMoves-Titulo").innerHTML = "Movimientos";
            let moves = data.moves.map((typ) => typ.move.name);
            document.getElementById("pokemonMoves").innerHTML = "";
            pokemonMovimientos(moves);
        }
    });
}

pokemonNombre = (nombre) => {
    document.getElementById('pokemonNombre').innerHTML = nombre;
}

pokemonID = (id) => {
    document.getElementById('pokemonID').innerHTML = `# ${id}`;
}

pokemonImg = (url) => {
    document.getElementById('pokeImg').src = url;
}

pokemonTipos = (tipos) => {
    tipos.forEach(function (el) {
        document.getElementById("pokemonTypes").innerHTML += `<li> ${el} </li>`;
    });
}

pokemonMovimientos = (movimientos) => {
    movimientos.forEach(function (el) {
        document.getElementById("pokemonMoves").innerHTML += `<li> ${el} </li>`;
    });
}

pokemonStats = (stats) => {
    const li_hp = document.createElement("li");
    const li_attack = document.createElement("li");
    const li_defense = document.createElement("li");
    const li_specialattack = document.createElement("li");
    const li_specialdefense = document.createElement("li");
    const li_speed = document.createElement("li");

    li_hp.innerHTML = `<b>HP:</b> ${stats[0]}`;
    li_attack.innerHTML = `<b>Ataque:</b> ${stats[1]}`;
    li_defense.innerHTML = `<b>Defensa:</b> ${stats[2]}`;
    li_specialattack.innerHTML = `<b>Ataque especial:</b> ${stats[3]}`;
    li_specialdefense.innerHTML = `<b>Defensa especial:</b> ${stats[4]}`;
    li_speed.innerHTML = `<b>Velocidad:</b> ${stats[5]}`;

    const lista = document.getElementById("pokemonStats");

    lista.appendChild(li_hp);
    lista.appendChild(li_attack);
    lista.appendChild(li_defense);
    lista.appendChild(li_specialattack);
    lista.appendChild(li_specialdefense);
    lista.appendChild(li_speed);
}