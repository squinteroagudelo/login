// Quitar espacios (inicio - fin), reemplazar espacios internos por _ y remover tildes
const formatCompare = (text) => {
    return text
        .trim()
        .replaceAll(" ", "_")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

// Remover tildes
const removeAccents = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Remover caracteres especialesy el under score
const removeSpecialChars = (string) =>
    string.replace(/[^\w\d]|_/gi, "");

// Capitalizar frases
const capitalizingString = (string) =>
    string.replace(
        /\w\S*/g,
        (e) => `${e.charAt(0).toUpperCase()}${e.slice(1).toLowerCase()}`
    ).replaceAll('  ', ' ');

// YYYY/MM/dd
function calcularEdad(date) {
    let today = new Date();
    let birth = new Date(date);
    let age = today.getFullYear() - birth.getFullYear();
    let m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate()))
        age--;

    return age;
}

/**
 * Currency format - extended.
 * Currency sign
 *
 * @param  amount:number
 * @param  fractionDigits:number
 * @return String
 */
const extendedFormatCurrency = (amount, fractionDigits = 2) =>
    amount.toLocaleString('es-CO', {
        style: 'currency', currency: 'COP', minimumFractionDigits: fractionDigits
    })

/**
 * Currency format - extended.
 * No currency sign
 *
 * @param  amount:number
 * @param  fractionDigits:number
 * @return String
 */
const simpleFormatCurrency = (amount, fractionDigits = 2) =>
    amount.toLocaleString('es-CO', {minimumFractionDigits: fractionDigits});
