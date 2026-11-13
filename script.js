document
    .getElementById("generateBtn")
    .addEventListener("click", generateCharacter);

function parseCR(value) {

    value = value.trim();

    if (value.includes("/")) {

        const [num, den] = value.split("/");

        return Number(num) / Number(den);
    }

    return Number(value);
}

function calculateLevel(cr) {

    const doubled = cr * 2;

    return Math.ceil(doubled / 5) * 5;
}

function generateCharacter() {

    const name =
        document.getElementById("name").value;

    const crText =
        document.getElementById("cr").value;

    const cr =
        parseCR(crText);

    const level =
        calculateLevel(cr);

    document.getElementById("characterName").textContent =
        name || "Unnamed Character";

    document.getElementById("characterLevel").textContent =
        level;
}
