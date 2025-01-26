import { useRouter } from "next/navigation";

interface RedirectButtonProps {
  url: string;
}

const RedirectButton: React.FC<RedirectButtonProps> = ({ url }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(url)}
      className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Go to Create Character
    </button>
  );
};

export default RedirectButton;
