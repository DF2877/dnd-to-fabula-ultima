document
    .getElementById("generateBtn")
    .addEventListener("click", generateCharacter);

function generateCharacter() {

    const name =
        document.getElementById("name").value;

    const race =
        document.getElementById("race").value;

    const charClass =
        document.getElementById("class").value;

    const strength =
        Math.floor(Math.random() * 6) + 10;

    document.getElementById("characterSheet").innerHTML = `
        <h2>${name || "Unnamed Character"}</h2>

        <p><strong>Race:</strong> ${race}</p>

        <p><strong>Class:</strong> ${charClass}</p>

        <p><strong>Strength:</strong> ${strength}</p>
    `;
}
