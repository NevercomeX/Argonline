const lineLength = 59; // The total length of the line, adjust as needed
export function drawEnemyHealthBar(currentHP, maxHP) {
  const barLength = 20; // Total length of the bar
  let filledLength = Math.round((currentHP / maxHP) * barLength); // Length of the filled bar
  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  const healthLine = `║ HP:       [${filledBar}${emptyBar}] ${currentHP}/${maxHP}`;
  const lineLength = 59; // The total length of the line, adjust as needed
  const paddingLength = lineLength - healthLine.length;
  const padding = " ".repeat(paddingLength);

  console.log(healthLine + padding + "║");
}

export function drawHealthBar(currentHP, maxHP) {
  const barLength = 20; // Total length of the bar
  let filledLength = Math.round((currentHP / maxHP) * barLength); // Length of the filled bar
  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  let healthLine = `║ HP:       [${filledBar}${emptyBar}] ${currentHP}/${maxHP}`;
  let paddingLength = lineLength - healthLine.length;
  let padding = " ".repeat(paddingLength);
  healthLine += padding + " ║";

  console.log(healthLine);
}

export function drawManaBar(currentSP, maxSP) {
  const barLength = 20; // Total length of the bar
  let filledLength = Math.round((currentSP / maxSP) * barLength); // Length of the filled bar
  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  let manaLine = `║ Mana:     [${filledBar}${emptyBar}] ${currentSP}/${maxSP}`;
  let paddingLength = lineLength - manaLine.length;
  let padding = " ".repeat(paddingLength);
  manaLine += padding + " ║";

  console.log(manaLine);
}

export function drawExperienceBar(currentExp, maxExp) {
  const barLength = 20; // Total length of the bar
  let filledLength = Math.round((currentExp / maxExp) * barLength); // Length of the filled bar
  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  let expLine = `║ Base Exp: [${filledBar}${emptyBar}] ${currentExp}/${maxExp}`;
  let paddingLength = lineLength - expLine.length;
  let padding = " ".repeat(paddingLength);
  expLine += padding + " ║";

  console.log(expLine);
}

export function drawJobExperienceBar(currentJobExp, maxJobExp) {
  const barLength = 20; // Total length of the bar
  let filledLength = Math.round((currentJobExp / maxJobExp) * barLength); // Length of the filled bar
  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  let jobExpLine = `║ Job Exp:  [${filledBar}${emptyBar}] ${currentJobExp}/${maxJobExp}`;
  let paddingLength = lineLength - jobExpLine.length;
  let padding = " ".repeat(paddingLength);
  jobExpLine += padding + " ║";

  console.log(jobExpLine);
}
