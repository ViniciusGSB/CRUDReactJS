import React, { useState } from 'react';

const initialProducts = [
  {
    id: 1,
    name: 'Arco Recurvo Artesanal do Xará',
    description: 'Feito à mão com materiais de qualidade por um praticante experiente.',
    price: 850.00,
    imageUrl: '61HJLjRUJcL.webp'
  },
  {
    id: 2,
    name: 'Arco Composto de Madeira',
    description: 'Une tradição e modernidade, ideal para todos os níveis.',
    price: 1000.00,
    imageUrl: 'RARE-1989-Bill-Stewart-Signature-Multi-Cam-Recurve.webp'
  },
  {
    id: 3,
    name: 'Balestra Multimateriais com Luneta',
    description: 'Design seguro, boa precisão e uso simples.',
    price: 1100.00,
    imageUrl: '51HX0lwIvhL.webp'
  },
  {
    id: 4,
    name: 'Flechas longas de madeira',
    description: 'Kit de flechas de madeira com ponta de metal.',
    price: 25.00,
    imageUrl: 's-l400.webp'
  },
  {
    id: 5,
    name: 'Flechas longas de fibra de carbono',
    description: 'Kit de flechas de fibra de carbono com ponta de metal.',
    price: 30.00,
    imageUrl: 'D_Q_NP_2X_727128-MLB81736865674_012025-E-kit-12-flechas-de-fibra-de-vidro-practical-carbon-arrow.webp'
  },
  {
    id: 6,
    name: 'Flechas longas de madeira',
    description: 'Kit de flechas de madeira com ponta de metal.',
    price: 25.00,
    imageUrl: 's-l400.webp'
  },
  {
    id: 7,
    name: 'Mira com trilho',
    description: 'Mira de qualidade para fixação no arco.',
    price: 50.00,
    imageUrl: 'product-img-20230214-0135_800x.webp'
  }
  ,
  {
    id: 8,
    name: 'Proteção dedos e antebraço',
    description: 'Kit de proteção para dedos e antebraço, essencial para segurança durante a prática.',
    price: 30.00,
    imageUrl: 'kit-bra-adeira-e-dedeira-le5kxuqtg9.webp'
  }
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  // Atualiza os campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Cadastra um novo produto ou atualiza um existente
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update (Atualizar)
      setProducts(products.map((prod) => (prod.id === formData.id ? formData : prod)));
      setIsEditing(false);
    } else {
      // Create (Criar)
      const newProduct = {
        ...formData,
        id: Date.now(), // Gera um ID simples baseado no timestamp
      };
      setProducts([...products, newProduct]);
    }

    // Limpa o formulário
    resetForm();
  };

  // Prepara o formulário para edição
  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  // Delete (Excluir)
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este produto?');
    if (confirmDelete) {
      setProducts(products.filter((prod) => prod.id !== id));
    }
  };

  // Reseta os campos
  const resetForm = () => {
    setFormData({ id: '', name: '', description: '', price: '', imageUrl: '' });
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Editor de produtos: Fundação Mineira de Arco e Flecha</h1>
      </header>

      <main style={styles.main}>
        {/* Formulário de Cadastro/Edição */}
        <section style={styles.formSection}>
          <h2>{isEditing ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Nome do Produto"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="description"
              placeholder="Descrição"
              value={formData.description}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <input
              type="number"
              name="price"
              placeholder="Preço (R$)"
              value={formData.price}
              onChange={handleInputChange}
              required
              step="0.01"
              style={styles.input}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="URL ou nome da Imagem (ex: arco.webp)"
              value={formData.imageUrl}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.btnSubmit}>
                {isEditing ? 'Salvar Alterações' : 'Cadastrar Produto'}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm} style={styles.btnCancel}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Listagem de Produtos */}
        <section style={styles.listSection}>
          <h2>Produtos Cadastrados</h2>
          {products.length === 0 ? (
            <p>Nenhum produto cadastrado no momento.</p>
          ) : (
            <div style={styles.grid}>
              {products.map((product) => (
                <div key={product.id} style={styles.card}>
                    <img 
                    src={`/${product.imageUrl}`} 
                    alt={product.name} 
                    style={styles.productImage} 
                    onError={(e) => { 
                      // Caso a imagem não seja encontrada na pasta public, mostra um bloco cinza padrão
                      e.target.src = 'https://via.placeholder.com/150?text=Sem+Foto'; 
                    }}
                  />
                  <h3 style={styles.cardTitle}>{product.name}</h3>
                  <p style={styles.cardDesc}>{product.description}</p>
                  <p style={styles.cardPrice}>R$ {Number(product.price).toFixed(2)}</p>
                  <div style={styles.cardActions}>
                    <button onClick={() => handleEdit(product)} style={styles.btnEdit}>
                      Editar
                    </button>
                    <button onClick={() => handleDelete(product.id)} style={styles.btnDelete}>
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// Estilos básicos inspirados na paleta do seu projeto (IndianRed, Preto, Branco)
const styles = {
  container: { fontFamily: 'Arial, sans-serif', backgroundColor: 'indianred', minHeight: '100vh', paddingBottom: '40px' },
  header: { backgroundColor: '#000', color: 'white', padding: '20px', textAlign: 'center' },
  main: { maxWidth: '1000px', margin: '20px auto', padding: '0 20px' },
  formSection: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 3px 10px rgba(0,0,0,0.1)' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' },
  input: { padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' },
  buttonGroup: { display: 'flex', gap: '10px' },
  btnSubmit: { backgroundColor: '#27ae60', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  btnCancel: { backgroundColor: '#95a5a6', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  listSection: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 3px 10px rgba(0,0,0,0.1)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' },
  card: { border: '1px solid #eee', padding: '15px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#f9f9f9' },
  productImage: { width: '100%', height: '150px', objectFit: 'contain', marginBottom: '15px', borderRadius: '8px', backgroundColor: '#fff' },
  cardTitle: { fontSize: '1.2em', marginBottom: '10px', color: '#2c3e50' },
  cardDesc: { fontSize: '0.9em', color: '#555', marginBottom: '10px', minHeight: '40px' },
  cardPrice: { fontWeight: 'bold', fontSize: '1.1em', marginBottom: '15px', color: '#c0392b' },
  cardActions: { display: 'flex', justifyContent: 'center', gap: '10px' },
  btnEdit: { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' },
  btnDelete: { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }
};