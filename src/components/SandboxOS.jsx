import React, { useState } from 'react';
import './SandboxOS.css';

const initialInventory = [
  { id: 1, name: 'Processor Model-X', sku: 'PR-MDX-01', stock: 15, minStock: 20, price: 120 },
  { id: 2, name: 'Gigabit Router v2', sku: 'RT-GB2-09', stock: 45, minStock: 15, price: 85 },
  { id: 3, name: 'Cat6 Cable 305m', sku: 'CB-C6R-12', stock: 8, minStock: 10, price: 65 },
  { id: 4, name: 'Dynamic UPS 1500VA', sku: 'UP-D15-44', stock: 24, minStock: 8, price: 180 },
];

const initialSales = [
  { id: 101, item: 'Gigabit Router v2', qty: 2, total: 170, time: '10 mins ago' },
  { id: 102, item: 'Cat6 Cable 305m', qty: 1, total: 65, time: '25 mins ago' }
];

const SandboxOS = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inventory, setInventory] = useState(initialInventory);
  const [sales, setSales] = useState(initialSales);
  const [revenue, setRevenue] = useState(3420);
  
  // POS Form States
  const [posItem, setPosItem] = useState(1);
  const [posQty, setPosQty] = useState(1);
  const [posSuccess, setPosSuccess] = useState(false);

  // Add Product Form States
  const [newName, setNewName] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newStock, setNewStock] = useState('');
  const [newMinStock, setNewMinStock] = useState('');
  const [newPrice, setNewPrice] = useState('');

  if (!isOpen) return null;

  // Actions
  const handleRestock = (id) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, stock: item.stock + 20 };
      }
      return item;
    }));
  };

  const handlePOSSubmit = (e) => {
    e.preventDefault();
    const item = inventory.find(i => i.id === parseInt(posItem));
    if (!item) return;

    if (item.stock < posQty) {
      alert(`Insufficient stock! Only ${item.stock} left.`);
      return;
    }

    const total = item.price * posQty;

    // Deduct stock
    setInventory(prev => prev.map(i => {
      if (i.id === item.id) {
        return { ...i, stock: i.stock - posQty };
      }
      return i;
    }));

    // Record sale
    const newSale = {
      id: sales.length + 103,
      item: item.name,
      qty: posQty,
      total: total,
      time: 'Just now'
    };
    setSales([newSale, ...sales]);

    // Add revenue
    setRevenue(prev => prev + total);

    setPosSuccess(true);
    setTimeout(() => setPosSuccess(false), 2000);
    setPosQty(1);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newName || !newSku || !newStock || !newPrice) return;

    const newProd = {
      id: inventory.length + 1,
      name: newName,
      sku: newSku.toUpperCase(),
      stock: parseInt(newStock),
      minStock: parseInt(newMinStock || 5),
      price: parseFloat(newPrice)
    };

    setInventory([...inventory, newProd]);
    
    // Reset inputs
    setNewName('');
    setNewSku('');
    setNewStock('');
    setNewMinStock('');
    setNewPrice('');
  };

  const lowStockItems = inventory.filter(i => i.stock <= i.minStock);

  return (
    <div className="sandbox-overlay" onClick={onClose}>
      <div className="sandbox-window glass-panel animate-scale-up" onClick={(e) => e.stopPropagation()}>
        
        {/* Title bar */}
        <div className="sandbox-titlebar">
          <div className="titlebar-info">
            <span className="titlebar-logo">📦</span>
            <span className="titlebar-name">Protech OS v1.0 <span className="titlebar-pill">Playground</span></span>
          </div>
          <button className="titlebar-close" onClick={onClose}>✕</button>
        </div>

        {/* Workspace body */}
        <div className="sandbox-body">
          {/* Sidebar */}
          <aside className="sandbox-sidebar">
            <button 
              className={`sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`sidebar-link ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              📦 Inventory Manager
            </button>
            <button 
              className={`sidebar-link ${activeTab === 'pos' ? 'active' : ''}`}
              onClick={() => setActiveTab('pos')}
            >
              💳 POS Terminal
            </button>
          </aside>

          {/* Main workspace */}
          <main className="sandbox-main">
            {activeTab === 'dashboard' && (
              <div className="sandbox-panel">
                <h3 className="panel-title">System Overview</h3>
                
                {/* Counters */}
                <div className="sandbox-counters">
                  <div className="counter-card glass-panel">
                    <span className="counter-label">Net Sales Revenue</span>
                    <span className="counter-value text-gradient">${revenue}</span>
                  </div>
                  <div className="counter-card glass-panel">
                    <span className="counter-label">Sales Recorded</span>
                    <span className="counter-value">{sales.length}</span>
                  </div>
                  <div className="counter-card glass-panel">
                    <span className="counter-label">Alerts (Low Stock)</span>
                    <span className={`counter-value ${lowStockItems.length > 0 ? 'text-red' : ''}`}>
                      {lowStockItems.length}
                    </span>
                  </div>
                </div>

                {/* Sales logs */}
                <div className="panel-section" style={{ marginTop: '2rem' }}>
                  <h4 className="section-subtitle">Recent POS Transactions</h4>
                  <div className="table-container">
                    <table className="sandbox-table">
                      <thead>
                        <tr>
                          <th>Sale ID</th>
                          <th>Product Name</th>
                          <th>Qty</th>
                          <th>Total Amount</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sales.map(s => (
                          <tr key={s.id}>
                            <td>#{s.id}</td>
                            <td>{s.item}</td>
                            <td>{s.qty}</td>
                            <td>${s.total}</td>
                            <td className="text-secondary">{s.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="sandbox-panel">
                <div className="panel-header-action">
                  <h3 className="panel-title">Warehousing Inventory</h3>
                </div>

                <div className="table-container">
                  <table className="sandbox-table">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Current Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map(item => {
                        const isLow = item.stock <= item.minStock;
                        return (
                          <tr key={item.id}>
                            <td className="code-text">{item.sku}</td>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td className="text-bold">{item.stock} units</td>
                            <td>
                              <span className={`badge ${isLow ? 'badge-red' : 'badge-green'}`}>
                                {isLow ? 'Low Stock' : 'In Stock'}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn btn-secondary btn-mini"
                                onClick={() => handleRestock(item.id)}
                              >
                                ⚡ Restock (+20)
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Add Product Form */}
                <div className="panel-section" style={{ marginTop: '2rem' }}>
                  <h4 className="section-subtitle">Register New Product Inventory</h4>
                  <form className="add-product-form" onSubmit={handleAddProduct}>
                    <input 
                      type="text" 
                      placeholder="Product Name" 
                      value={newName} 
                      onChange={e => setNewName(e.target.value)} 
                      required 
                    />
                    <input 
                      type="text" 
                      placeholder="SKU" 
                      value={newSku} 
                      onChange={e => setNewSku(e.target.value)} 
                      required 
                    />
                    <input 
                      type="number" 
                      placeholder="Qty" 
                      value={newStock} 
                      onChange={e => setNewStock(e.target.value)} 
                      required 
                    />
                    <input 
                      type="number" 
                      placeholder="Min Limit" 
                      value={newMinStock} 
                      onChange={e => setNewMinStock(e.target.value)} 
                    />
                    <input 
                      type="number" 
                      placeholder="Price ($)" 
                      value={newPrice} 
                      onChange={e => setNewPrice(e.target.value)} 
                      required 
                    />
                    <button type="submit" className="btn btn-primary">
                      + Register
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'pos' && (
              <div className="sandbox-panel">
                <h3 className="panel-title">Point of Sale Terminal</h3>
                
                <div className="pos-grid">
                  <div className="pos-form-container glass-panel">
                    <h4 className="section-subtitle">Record Retail Checkout</h4>
                    <form className="pos-form" onSubmit={handlePOSSubmit}>
                      <div className="form-group">
                        <label>Select Product</label>
                        <select 
                          value={posItem} 
                          onChange={e => setPosItem(e.target.value)}
                        >
                          {inventory.map(i => (
                            <option key={i.id} value={i.id}>
                              {i.name} - ${i.price} ({i.stock} left)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Checkout Quantity</label>
                        <input 
                          type="number" 
                          min="1" 
                          value={posQty} 
                          onChange={e => setPosQty(parseInt(e.target.value))} 
                          required 
                        />
                      </div>

                      {posSuccess && (
                        <div className="success-banner">
                          ✓ Sale completed! Stock updated and logged.
                        </div>
                      )}

                      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        ✓ Confirm & Record Transaction
                      </button>
                    </form>
                  </div>

                  <div className="pos-sidebar-info glass-panel">
                    <h4>How to test:</h4>
                    <ul className="help-list">
                      <li>1. Go to the **POS Terminal** tab and process a sale.</li>
                      <li>2. Go back to the **Dashboard** and notice the *Net Sales Revenue* and *Sales Recorded* values have risen!</li>
                      <li>3. Inspect the **Inventory Manager** tab to verify the stock level for that product has decremented.</li>
                      <li>4. Click the **⚡ Restock** button next to any item to add more inventory units dynamically.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SandboxOS;
