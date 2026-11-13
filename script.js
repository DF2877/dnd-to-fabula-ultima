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

    const cr =
        parseCR(
            document.getElementById("cr").value
        );

    const level =
        calculateLevel(cr);

    const traitsText =
        document.getElementById("traits").value;

    const traits =
        traitsText
            .split(",")
            .map(t => t.trim())
            .filter(t => t);

    if (traits.length !== 4) {

        alert(
            "Please enter exactly 4 traits separated by commas."
        );

        return;
    }

    document.getElementById("characterName").textContent =
        name || "Unnamed Character";

    document.getElementById("characterLevel").textContent =
        level;

    document.getElementById("characterTraits").textContent =
        traits.join(", ");
}
