const CreateCharacterButton = () => (
    <div className="flex justify-end mb-4">
      <a
        href="http://localhost:3000/characters/createCharacter"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create New Character
      </a>
    </div>
  );
  
  export default CreateCharacterButton;