function exerciceTemplate(goal, level, line, type) {
  return `
    Generate an exercice in French language,
    the text is french language only,
    l'exercice est pour but ${goal},
    le niveau est ${level} du laungage francais,
    l'exercice ne depasse pas ${line} linges,
    le text est strictement en francais,
    l'exercice est du ${type + "form" || "n'importe quelle form"},
    faite attention au languge , ne fait pas de faute,
    attaché la reponse en dernier,
  `;
}

export default exerciceTemplate;
