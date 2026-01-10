import { useState } from 'react';
import {
  ServerSideDataTable,
  DataTable,
  TreeTable,
  VirtualScrollerTable,
  DataTableColumn,
  TreeTableColumn,
  TableFooter,
  TableHeaderGroup,
  TreeNode,
} from '@prime-repo/ui';
import { Button, Badge, Avatar } from '@prime-repo/ui';
import { Card } from '@prime-repo/ui';
import { VStack } from '@prime-repo/ui';

// Mock data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export function TableExamples() {
  // ========================================
  // 1. SERVER-SIDE DATATABLE (com Django DRF)
  // ========================================
  
  const userColumns: DataTableColumn[] = [
    {
      field: 'id',
      header: 'ID',
      sortable: true,
      bodyStyle: { width: '80px' },
    },
    {
      field: 'name',
      header: 'Nome',
      sortable: true,
      body: (user: User) => (
        <div className="flex items-center gap-2">
          <Avatar name={user.name} size="sm" />
          <span>{user.name}</span>
        </div>
      ),
    },
    {
      field: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      field: 'role',
      header: 'Função',
      sortable: true,
    },
    {
      field: 'status',
      header: 'Status',
      body: (user: User) => (
        <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
          {user.status === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
    {
      field: 'createdAt',
      header: 'Criado em',
      sortable: true,
    },
    {
      field: 'actions',
      header: 'Ações',
      body: (user: User) => (
        <div className="flex gap-2">
          <Button
            icon="pi pi-pencil"
            size="small"
            variant="info"
            rounded
            text
          />
          <Button
            icon="pi pi-trash"
            size="small"
            variant="danger"
            rounded
            text
          />
        </div>
      ),
      bodyStyle: { width: '120px', textAlign: 'center' },
    },
  ];

  // Simular chamada API
  const fetchUsers = async ({ page, pageSize, ordering, filters }: any) => {
    // Aguardar 500ms para simular latência
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock data
    const allUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'Editor', 'Viewer'][i % 3],
      status: i % 3 === 0 ? 'inactive' : 'active',
      createdAt: new Date(2024, 0, i + 1).toLocaleDateString('pt-BR'),
    }));

    // Simular ordenação
    if (ordering) {
      const fields = ordering.split(',');
      allUsers.sort((a, b) => {
        for (const field of fields) {
          const isDesc = field.startsWith('-');
          const key = (isDesc ? field.substring(1) : field) as keyof User;
          const order = isDesc ? -1 : 1;

          if (a[key] < b[key]) return -1 * order;
          if (a[key] > b[key]) return 1 * order;
        }
        return 0;
      });
    }

    // Simular paginação
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedUsers = allUsers.slice(start, end);

    return {
      data: paginatedUsers,
      total: allUsers.length,
    };
  };

  // ========================================
  // 2. CLIENT-SIDE DATATABLE
  // ========================================

  const products: Product[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Produto ${i + 1}`,
    category: ['Eletrônicos', 'Roupas', 'Alimentos'][i % 3],
    price: (i + 1) * 10.5,
    stock: Math.floor(Math.random() * 100),
  }));

  const productColumns: DataTableColumn[] = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'name', header: 'Nome', sortable: true },
    { field: 'category', header: 'Categoria', sortable: true },
    {
      field: 'price',
      header: 'Preço',
      sortable: true,
      body: (product: Product) => (
        <span>R$ {product.price.toFixed(2)}</span>
      ),
    },
    { field: 'stock', header: 'Estoque', sortable: true },
  ];

  // ========================================
  // 3. TREETABLE
  // ========================================

  const treeData: TreeNode[] = [
    {
      key: '0',
      data: { name: 'Documentos', size: '75kb', type: 'Pasta' },
      children: [
        {
          key: '0-0',
          data: { name: 'Work', size: '55kb', type: 'Pasta' },
          children: [
            { key: '0-0-0', data: { name: 'Expenses.doc', size: '30kb', type: 'Documento' } },
            { key: '0-0-1', data: { name: 'Resume.doc', size: '25kb', type: 'Documento' } },
          ],
        },
        {
          key: '0-1',
          data: { name: 'Home', size: '20kb', type: 'Pasta' },
          children: [
            { key: '0-1-0', data: { name: 'Invoices.txt', size: '20kb', type: 'Texto' } },
          ],
        },
      ],
    },
    {
      key: '1',
      data: { name: 'Pictures', size: '150kb', type: 'Pasta' },
      children: [
        { key: '1-0', data: { name: 'barcelona.jpg', size: '90kb', type: 'Imagem' } },
        { key: '1-1', data: { name: 'primeui.png', size: '60kb', type: 'Imagem' } },
      ],
    },
  ];

  const treeColumns: TreeTableColumn[] = [
    { field: 'name', header: 'Nome', expander: true, sortable: true },
    { field: 'size', header: 'Tamanho', sortable: true },
    { field: 'type', header: 'Tipo', sortable: true },
  ];

  // ========================================
  // 4. VIRTUAL SCROLLER (grandes volumes)
  // ========================================

  const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    code: `CODE-${i + 1}`,
    name: `Item ${i + 1}`,
    category: `Category ${(i % 5) + 1}`,
    quantity: Math.floor(Math.random() * 100),
  }));

  const virtualColumns: DataTableColumn[] = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'code', header: 'Código', sortable: true },
    { field: 'name', header: 'Nome', sortable: true },
    { field: 'category', header: 'Categoria', sortable: true },
    { field: 'quantity', header: 'Quantidade', sortable: true },
  ];

  return (
    <VStack spacing={8}>
      {/* 1. Server-Side DataTable */}
      <Card title="Server-Side DataTable" subTitle="Paginação, ordenação e filtros via URL (Django DRF)" elevated>
        <div className="p-4">
          <ServerSideDataTable
            fetchData={fetchUsers}
            columns={userColumns}
            defaultPageSize={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </div>
      </Card>

      {/* 2. Client-Side DataTable */}
      <Card title="Client-Side DataTable" subTitle="Dados carregados localmente" elevated>
        <div className="p-4">
          <DataTable
            data={products}
            columns={productColumns}
            striped
            footerColumnGroup={
              <TableFooter
                columns={[
                  { content: 'Total de produtos:', colSpan: 4, align: 'right' },
                  { content: products.length, align: 'left' },
                ]}
              />
            }
          />
        </div>
      </Card>

      {/* 3. TreeTable */}
      <Card title="TreeTable" subTitle="Dados hierárquicos" elevated>
        <div className="p-4">
          <TreeTable
            data={treeData}
            columns={treeColumns}
          />
        </div>
      </Card>

      {/* 4. Virtual Scroller */}
      <Card title="Virtual Scroller Table" subTitle="10.000 registros com virtual scroll" elevated>
        <div className="p-4">
          <VirtualScrollerTable
            data={largeDataset}
            columns={virtualColumns}
            itemSize={50}
            scrollHeight="400px"
          />
        </div>
      </Card>

      {/* 5. DataTable com Header Agrupado */}
      <Card title="Header Agrupado" subTitle="Cabeçalho com múltiplas linhas" elevated>
        <div className="p-4">
          <DataTable
            data={products}
            columns={[
              { field: 'id', header: 'ID' },
              { field: 'name', header: 'Nome' },
              { field: 'category', header: 'Categoria' },
              { field: 'price', header: 'Preço', body: (p: Product) => `R$ ${p.price.toFixed(2)}` },
              { field: 'stock', header: 'Estoque' },
            ]}
            headerColumnGroup={
              <TableHeaderGroup
                rows={[
                  {
                    columns: [
                      { header: 'Informações Básicas', colSpan: 3 },
                      { header: 'Detalhes Financeiros', colSpan: 2 },
                    ],
                  },
                  {
                    columns: [
                      { header: 'ID' },
                      { header: 'Nome' },
                      { header: 'Categoria' },
                      { header: 'Preço' },
                      { header: 'Estoque' },
                    ],
                  },
                ]}
              />
            }
          />
        </div>
      </Card>

      {/* 6. DataTable com Seleção */}
      <Card title="Seleção Múltipla" subTitle="Checkbox para seleção" elevated>
        <div className="p-4">
          <SelectableTableExample />
        </div>
      </Card>
    </VStack>
  );
}

// Componente separado para seleção
function SelectableTableExample() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const products: Product[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Produto ${i + 1}`,
    category: ['Eletrônicos', 'Roupas', 'Alimentos'][i % 3],
    price: (i + 1) * 10.5,
    stock: Math.floor(Math.random() * 100),
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {selectedProducts.length} produto(s) selecionado(s)
        </span>
        {selectedProducts.length > 0 && (
          <Button
            label="Limpar Seleção"
            size="small"
            variant="secondary"
            onClick={() => setSelectedProducts([])}
          />
        )}
      </div>

      <DataTable
        data={products}
        columns={[
          { field: 'id', header: 'ID' },
          { field: 'name', header: 'Nome' },
          { field: 'category', header: 'Categoria' },
          { field: 'price', header: 'Preço', body: (p: Product) => `R$ ${p.price.toFixed(2)}` },
          { field: 'stock', header: 'Estoque' },
        ]}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value as Product[])}
        selectionMode="checkbox"
        dataKey="id"
      />
    </div>
  );
}
