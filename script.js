// Set your live backend URL here
const API_BASE_URL = 'https://biashara-api.onrender.com';

// Load products on page load
window.addEventListener('DOMContentLoaded', async () => {
  console.log('Biashara Link loaded');

  const productList = document.getElementById('product-list');

  try {
    const res = await fetch(`${API_BASE_URL}/api/products`);
    const products = await res.json();

    productList.innerHTML = products.map(p => `
      <div class="product-card">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p><strong>Price:</strong> ${p.price} KES</p>
        <p><strong>Supplier:</strong> ${p.supplierName}</p>
        <button onclick="sendInquiry('${p._id}')">Send Inquiry</button>
      </div>
    `).join('');
  } catch (err) {
    productList.innerHTML = '<p>Failed to load products.</p>';
    console.error('Error fetching products:', err);
  }
});

// Send inquiry
async function sendInquiry(productId) {
  const buyerName = prompt("Enter your name:");
  const buyerEmail = prompt("Enter your email:");
  const message = prompt("Enter your inquiry message:");

  if (!buyerName || !buyerEmail || !message) return alert("All fields are required.");

  try {
    const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, buyerName, buyerEmail, message })
    });

    if (res.ok) {
      alert("Inquiry sent successfully!");
    } else {
      alert("Failed to send inquiry.");
    }
  } catch (err) {
    console.error("Error sending inquiry:", err);
    alert("Something went wrong.");
  }
}
