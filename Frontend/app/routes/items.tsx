import MainLayout from "../src/components/MainLayout";
import { useState, useEffect } from "react";
import { Item } from "../../types"; // Asegúrate de que este tipo esté definido correctamente

const MonsterList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // Inicializar como un array vacío
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    fetchItems(page); // Cambiar a fetchItems en lugar de fetchMonsters
  }, [page]);

  const fetchItems = async (pageNumber: number) => {
    const response = await fetch(`http://localhost:4001/api/items?page=${pageNumber}`);
    const data = await response.json();

    setItems(data.items || []); // Asegurarse de que items sea un array
    setTotalPages(data.totalPages || 1); // Manejar el total de páginas
  };

  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold mb-4">Items</h2>
      
      {/* Cuadros de ítems */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="border border-gray-300 bg-white p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className="text-gray-500">Item-ID#{item.id}</span>
              </div>
              <img src={`/items/${item.itemIcon}`} alt={item.name} className="w-12 h-12 mx-auto mb-4" />
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">HP:</span> {item.health}
                </div>
                <div>
                  <span className="font-medium">attackPower:</span> {item.attackPower}
                </div>
                {/* Más atributos aquí */}
              </div>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center space-x-2 mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </MainLayout>
  );
};

export default MonsterList;
