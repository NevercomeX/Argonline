export type Character = {
    id: number;
    name: string;
    baseLevel: number;
    jobLevel: number;
    health: number;
    mana: number;
    attackPower: number;
    defense: number;
    magicDefense: number;
    str: number; // Strength
    agi: number; // Agility
    vit: number; // Vitality
    int: number; // Intelligence
    dex: number; // Dexterity
    luk: number; // Luck
    jobclassId: number; // ID of the job class
    userId: number; // ID of the user who owns the character
  };

const CharacterCard = ({ character }: { character: Character }) => (
    <div className="border border-gray-300 bg-white p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{character.name}</h3>
        <span className="text-gray-500">Character-ID#{character.id}</span>
      </div>
      <img src={`/characters/${character.id}.gif`} alt={character.name} className="w-36 h-38 mx-auto mb-4" />
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div><span className="font-medium">Base Level:</span> {character.baseLevel}</div>
        <div><span className="font-medium">Job Level:</span> {character.jobLevel}</div>
        <div><span className="font-medium">HP:</span> {character.health}</div>
        <div><span className="font-medium">Mana:</span> {character.mana}</div>
        <div><span className="font-medium">Attack Power:</span> {character.attackPower}</div>
        <div><span className="font-medium">Defense:</span> {character.defense}</div>
        <div><span className="font-medium">Magic Defense:</span> {character.magicDefense}</div>
        <div><span className="font-medium">STR:</span> {character.str}</div>
        <div><span className="font-medium">AGI:</span> {character.agi}</div>
        <div><span className="font-medium">VIT:</span> {character.vit}</div>
        <div><span className="font-medium">INT:</span> {character.int}</div>
        <div><span className="font-medium">DEX:</span> {character.dex}</div>
        <div><span className="font-medium">LUK:</span> {character.luk}</div>
        <div><span className="font-medium">Job Class:</span> {character.jobclassId}</div>
        <div><span className="font-medium">User ID:</span> {character.userId}</div>
      </div>
    </div>
  );

  export default CharacterCard;