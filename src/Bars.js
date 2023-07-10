export function drawHealthBar(currentHP, maxHP) {
  const barLength = 20; // Longitud total de la barra
  const filledLength = Math.round((currentHP / maxHP) * barLength); // Longitud de la barra llena

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  console.log(`HP:  [${filledBar}${emptyBar}] ${currentHP}/${maxHP}`);
}

export function drawManaBar(currentSP, maxSP) {
  const barLength = 20; // Longitud total de la barra
  const filledLength = Math.round((currentSP / maxSP) * barLength); // Longitud de la barra llena

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  console.log(`Mana:  [${filledBar}${emptyBar}] ${currentSP}/${maxSP}`);
}

export function drawExperienceBar(currentExp, maxExp) {
  const barLength = 20; // Longitud total de la barra
  const filledLength = Math.round((currentExp / maxExp) * barLength); // Longitud de la barra llena

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  console.log(`Base Exp: [${filledBar}${emptyBar}] ${currentExp}/${maxExp}`);
}

export function drawJobExperienceBar(currentJobExp, maxJobExp) {
  const barLength = 20; // Longitud total de la barra
  const filledLength = Math.round((currentJobExp / maxJobExp) * barLength); // Longitud de la barra llena

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  console.log(
    `Job Exp:  [${filledBar}${emptyBar}] ${currentJobExp}/${maxJobExp}`
  );
}
