# 🎨 Novos Componentes UI - Guia Completo

Todos os componentes PrimeReact faltantes foram adicionados ao `@prime-repo/ui` mantendo o padrão de qualidade do projeto.

---

## 📦 INPUTS (9 novos)

### MultiStateCheckbox
Checkbox com múltiplos estados (mais de 2 opções).

```typescript
const options = [
  { value: 'yes', icon: 'pi pi-check' },
  { value: 'no', icon: 'pi pi-times' },
  { value: 'maybe', icon: 'pi pi-question' }
];

<MultiStateCheckbox
  options={options}
  value={value}
  onChange={(e) => setValue(e.value)}
  label="Approved?"
/>
```

### CascadeSelect
Seleção hierárquica em cascata (País > Estado > Cidade).

```typescript
const countries = [
  {
    name: 'Brazil',
    states: [
      { name: 'São Paulo', cities: [{ name: 'São Paulo' }] }
    ]
  }
];

<CascadeSelect
  value={selectedCity}
  options={countries}
  optionLabel="name"
  optionGroupLabel="name"
  optionGroupChildren={['states', 'cities']}
  onChange={(e) => setSelectedCity(e.value)}
  placeholder="Select City"
  fullWidth
/>
```

### Chips
Input de múltiplos valores (tags/emails).

```typescript
<Chips
  value={tags}
  onChange={(e) => setTags(e.value)}
  placeholder="Add tags"
  separator=","
  label="Tags"
  fullWidth
/>
```

### Editor
Editor de texto rico (WYSIWYG).

```typescript
<Editor
  value={content}
  onTextChange={(e) => setContent(e.htmlValue)}
  height="320px"
  label="Description"
/>
```

### InputOtp
Input para códigos OTP (autenticação de 2 fatores).

```typescript
<InputOtp
  value={otp}
  onChange={(e) => setOtp(e.value)}
  length={6}
  integerOnly
  label="Verification Code"
/>
```

### Knob
Controle circular de valor (volume, temperatura).

```typescript
<Knob
  value={volume}
  onChange={(e) => setVolume(e.value)}
  min={0}
  max={100}
  valueTemplate="{value}%"
  label="Volume"
/>
```

### ListBox
Lista de opções selecionáveis (alternativa ao Select).

```typescript
const cities = [
  { name: 'São Paulo', code: 'SP' },
  { name: 'Rio de Janeiro', code: 'RJ' }
];

<ListBox
  value={selectedCity}
  options={cities}
  onChange={(e) => setSelectedCity(e.value)}
  optionLabel="name"
  multiple
  filter
  fullWidth
/>
```

### TreeSelect
Seleção em árvore hierárquica.

```typescript
const nodes = [
  {
    key: '0',
    label: 'Documents',
    children: [
      { key: '0-0', label: 'Work' },
      { key: '0-1', label: 'Home' }
    ]
  }
];

<TreeSelect
  value={selectedNodeKey}
  options={nodes}
  onChange={(e) => setSelectedNodeKey(e.value)}
  filter
  selectionMode="checkbox"
  fullWidth
/>
```

### TriStateCheckbox
Checkbox com 3 estados (checked/unchecked/indeterminate).

```typescript
<TriStateCheckbox
  value={value}
  onChange={(e) => setValue(e.value)}
  label="Accept terms"
/>
```

---

## 📊 LISTS/TABLES (6 novos)

### DataView
Exibição de dados em grid ou lista com paginação.

```typescript
<DataView
  value={products}
  itemTemplate={(product, layout) => (
    layout === 'grid' ? <ProductGridItem product={product} /> : <ProductListItem product={product} />
  )}
  layout={layout}
  onLayoutChange={setLayout}
  paginated
  page={page}
  pageSize={10}
  totalRecords={100}
  onPageChange={(e) => setPage(e.page)}
/>
```

### OrderList
Lista ordenável de itens (drag & drop).

```typescript
<OrderList
  value={items}
  onChange={(e) => setItems(e.value)}
  itemTemplate={(item) => <div>{item.name}</div>}
  header="Products"
  dragdrop
  filter
/>
```

### OrganizationChart
Gráfico de organização hierárquica.

```typescript
const data = [{
  label: 'CEO',
  expanded: true,
  children: [
    { label: 'Manager 1' },
    { label: 'Manager 2' }
  ]
}];

<OrganizationChart
  value={data}
  nodeTemplate={(node) => <div>{node.label}</div>}
/>
```

### PickList
Transferência de itens entre duas listas.

```typescript
<PickList
  source={availableProducts}
  target={selectedProducts}
  onChange={(e) => {
    setAvailableProducts(e.source);
    setSelectedProducts(e.target);
  }}
  itemTemplate={(item) => <div>{item.name}</div>}
  sourceHeader="Available"
  targetHeader="Selected"
  filter
/>
```

### Tree
Árvore hierárquica navegável.

```typescript
const nodes = [
  {
    key: '0',
    label: 'Documents',
    icon: 'pi pi-folder',
    children: [
      { key: '0-0', label: 'Work', icon: 'pi pi-folder' }
    ]
  }
];

<Tree
  value={nodes}
  selectionMode="checkbox"
  selectionKeys={selectedKeys}
  onSelectionChange={(e) => setSelectedKeys(e.value)}
  filter
/>
```

### Timeline
Linha do tempo de eventos.

```typescript
const events = [
  { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
  { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
  { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-envelope', color: '#FF9800' }
];

<Timeline
  value={events}
  align="alternate"
  content={(item) => <div>{item.status}</div>}
  opposite={(item) => <small>{item.date}</small>}
/>
```

---

## 🔲 OVERLAYS (5 novos)

### ConfirmDialog
Dialog de confirmação global.

```typescript
// No root do app:
<ConfirmDialog />

// Para usar:
import { confirmDialog } from '@prime-repo/ui';

confirmDialog({
  message: 'Are you sure you want to proceed?',
  header: 'Confirmation',
  icon: 'pi pi-exclamation-triangle',
  accept: () => handleDelete(),
  reject: () => console.log('Cancelled')
});
```

### ConfirmPopup
Popup de confirmação próximo ao elemento.

```typescript
// No root do app:
<ConfirmPopup />

// Para usar:
import { confirmPopup } from '@prime-repo/ui';

const confirm = (event) => {
  confirmPopup({
    target: event.currentTarget,
    message: 'Are you sure?',
    accept: () => handleDelete()
  });
};

<Button onClick={confirm} label="Delete" />
```

### Dialog
Modal dialog.

```typescript
<Dialog
  visible={visible}
  onHide={() => setVisible(false)}
  header="Dialog Header"
  footer={
    <div>
      <Button label="Cancel" onClick={() => setVisible(false)} />
      <Button label="Save" onClick={handleSave} />
    </div>
  }
  style={{ width: '50vw' }}
>
  Dialog content
</Dialog>
```

### OverlayPanel
Painel sobreposto.

```typescript
const op = useRef(null);

<Button label="Show" onClick={(e) => op.current.toggle(e)} />
<OverlayPanel ref={op}>
  Panel content
</OverlayPanel>
```

### Sidebar
Painel lateral.

```typescript
<Sidebar
  visible={visible}
  onHide={() => setVisible(false)}
  position="right"
  header="Filters"
>
  <div>Sidebar content</div>
</Sidebar>
```

---

## 🖼️ MEDIA (3 novos)

### Carousel
Carrossel de itens.

```typescript
const responsiveOptions = [
  { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
  { breakpoint: '768px', numVisible: 2, numScroll: 2 }
];

<Carousel
  value={products}
  numVisible={3}
  numScroll={1}
  responsiveOptions={responsiveOptions}
  itemTemplate={(product) => <ProductCard product={product} />}
  circular
  autoplayInterval={3000}
/>
```

### Galleria
Galeria de imagens com navegação.

```typescript
const images = [
  { itemImageSrc: 'image1.jpg', thumbnailImageSrc: 'thumb1.jpg' },
  { itemImageSrc: 'image2.jpg', thumbnailImageSrc: 'thumb2.jpg' }
];

<Galleria
  value={images}
  numVisible={5}
  circular
  showItemNavigators
  showThumbnails
/>
```

### Image
Imagem com preview em tela cheia.

```typescript
<Image
  src="image.jpg"
  alt="Description"
  width="250"
  preview
/>
```

---

## 📢 FEEDBACK (6 novos - substituindo versões antigas)

### Avatar (PrimeReact)
Avatar com imagem, ícone ou iniciais.

```typescript
<Avatar image="user.jpg" size="large" shape="circle" />
<Avatar label="JD" size="xlarge" />
<Avatar icon="pi pi-user" />
```

### Badge (PrimeReact)
Badge indicador.

```typescript
<Badge value="2" severity="danger" />
<Badge value="New" severity="success" />

// Com overlay:
<Button label="Messages" className="p-overlay-badge">
  <Badge value="5" />
</Button>
```

### ProgressBar
Barra de progresso.

```typescript
<ProgressBar value={50} />
<ProgressBar mode="indeterminate" />
<ProgressBar value={75} showValue={false} />
```

### ProgressSpinner
Spinner de loading.

```typescript
<ProgressSpinner />
<ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" />
```

### Skeleton (PrimeReact)
Placeholder de loading.

```typescript
<Skeleton width="10rem" className="mb-2" />
<Skeleton width="100%" height="150px" />
<Skeleton shape="circle" size="4rem" />
```

### Tag
Tag de status/categoria.

```typescript
<Tag value="New" severity="success" />
<Tag value="Sale" severity="danger" icon="pi pi-tag" />
<Tag value="Pending" severity="warning" rounded />
```

---

## 🔧 MISC (9 novos)

### BlockUI
Bloquear interface durante operação.

```typescript
<BlockUI blocked={loading}>
  <Panel header="Content">
    Content that will be blocked
  </Panel>
</BlockUI>

<BlockUI blocked={loading} fullScreen />
```

### Chip
Chip de informação compacta.

```typescript
<Chip label="Action" icon="pi pi-check" />
<Chip label="Comedy" removable onRemove={handleRemove} />
<Chip label="John Doe" image="user.jpg" />
```

### DeferredContent
Carregamento lazy de conteúdo.

```typescript
<DeferredContent onLoad={loadData}>
  <DataTable value={data} />
</DeferredContent>
```

### Divider (PrimeReact)
Divisor visual com conteúdo opcional.

```typescript
<Divider />
<Divider align="center">OR</Divider>
<Divider layout="vertical" />
<Divider type="dashed" />
```

### Inplace
Edição inline.

```typescript
<Inplace
  closable
  display={<span>View Content</span>}
  content={<InputText value={text} onChange={(e) => setText(e.target.value)} />}
/>
```

### MeterGroup
Grupo de medidores.

```typescript
const values = [
  { label: 'Apps', color: '#34d399', value: 16 },
  { label: 'Messages', color: '#fbbf24', value: 8 }
];

<MeterGroup value={values} />
```

### ScrollTop
Botão para voltar ao topo.

```typescript
<ScrollTop />
<ScrollTop threshold={100} icon="pi pi-arrow-up" />
```

### Splitter
Divisor redimensionável.

```typescript
import { Splitter, SplitterPanel } from '@prime-repo/ui';

<Splitter style={{ height: '300px' }}>
  <SplitterPanel size={30}>Left Panel</SplitterPanel>
  <SplitterPanel size={70}>Right Panel</SplitterPanel>
</Splitter>
```

### Stepper
Componente de steps/wizard.

```typescript
import { Stepper, StepperPanel } from '@prime-repo/ui';

const stepperRef = useRef(null);

<Stepper ref={stepperRef}>
  <StepperPanel header="Personal Info">
    <InputText placeholder="Name" />
    <Button label="Next" onClick={() => stepperRef.current.nextCallback()} />
  </StepperPanel>
  <StepperPanel header="Address">
    <InputText placeholder="Address" />
    <Button label="Submit" />
  </StepperPanel>
</Stepper>
```

---

## 📋 Resumo

**38 NOVOS COMPONENTES ADICIONADOS:**

- ✅ **9 Inputs**: MultiStateCheckbox, CascadeSelect, Chips, Editor, InputOtp, Knob, ListBox, TreeSelect, TriStateCheckbox
- ✅ **6 Lists/Tables**: DataView, OrderList, OrganizationChart, PickList, Tree, Timeline
- ✅ **5 Overlays**: ConfirmDialog, ConfirmPopup, Dialog, OverlayPanel, Sidebar
- ✅ **3 Media**: Carousel, Galleria, Image
- ✅ **6 Feedback**: Avatar*, Badge*, ProgressBar, ProgressSpinner, Skeleton*, Tag (*substitui versão antiga)
- ✅ **9 Misc**: BlockUI, Chip, DeferredContent, Divider*, Inplace, MeterGroup, ScrollTop, Splitter, Stepper (*substitui versão antiga)

---

## 🚀 Como Usar

```typescript
// Importar componentes
import {
  // Inputs
  MultiStateCheckbox, CascadeSelect, Chips, Editor, InputOtp,
  Knob, ListBox, TreeSelect, TriStateCheckbox,
  
  // Lists
  DataView, OrderList, OrganizationChart, PickList, Tree, Timeline,
  
  // Overlays
  ConfirmDialog, ConfirmPopup, Dialog, OverlayPanel, Sidebar,
  confirmDialog, confirmPopup,
  
  // Media
  Carousel, Galleria, Image,
  
  // Feedback
  Avatar, Badge, ProgressBar, ProgressSpinner, Skeleton, Tag,
  
  // Misc
  BlockUI, Chip, DeferredContent, Divider, Inplace,
  MeterGroup, ScrollTop, Splitter, SplitterPanel, Stepper, StepperPanel
} from '@prime-repo/ui';
```

---

## 📦 Build

```bash
# Build do package
pnpm --filter @prime-repo/ui build
```

---

## 💡 Notas

- Todos os componentes mantêm o padrão de qualidade do projeto
- Wrappers que estendem PrimeReact com helpers (error, helperText, label, etc)
- TypeScript completo com tipos exportados
- Consistência com componentes existentes
- Documentação inline com exemplos
