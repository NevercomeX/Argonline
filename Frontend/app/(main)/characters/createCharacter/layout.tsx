// app/characters/createCharacter/layout.tsx
import { CharacterCreationProvider } from "./context/CharacterCreationContext";

export default function CreateCharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CharacterCreationProvider>
      <div className="p-6">{children}</div>
    </CharacterCreationProvider>
  );
}
