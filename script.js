/**
 * Simple Product Dashboard - JavaScript
 * Handles login, logout, product selection, and checkout functionality
 */

// Dummy credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

/**
 * LOGIN FUNCTION
 * Validates user credentials and redirects to dashboard
 * @param {Event} event - Form submission event
 */
function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Reset error message
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    // Validate credentials
    if (username === ADMIN_CREDENTIALS.username && 
        password === ADMIN_CREDENTIALS.password) {
        
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Show error message
        errorMessage.textContent = '❌ Invalid username or password. Please try again.';
        errorMessage.classList.add('show');
        
        // Clear password field
        document.getElementById('password').value = '';
    }
}

/**
 * LOGOUT FUNCTION
 * Clears session and redirects to login page
 */
function logout() {
    // Confirm logout
    if (confirm('Are you sure you want to logout?')) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
}

/**
 * BUY NOW FUNCTION
 * Stores product price in localStorage and redirects to checkout
 * @param {number} price - Product price in INR
 */
function buyNow(price) {
    localStorage.setItem('productPrice', price.toString());
    window.location.href = 'checkout.html';
}

/**
 * SHOW PAYMENT METHOD FUNCTION
 * Displays payment-specific instructions and QR code
 */
function showPaymentMethod() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const paymentQRSection = document.getElementById('paymentQRSection');
    const qrCodeDisplay = document.getElementById('qrCodeDisplay');
    const paymentInstructions = document.getElementById('paymentInstructions');
    const paymentConfirm = document.getElementById('paymentConfirm');
    
    // Hide section if no payment method selected
    if (!paymentMethod) {
        paymentQRSection.style.display = 'none';
        paymentConfirm.checked = false;
        return;
    }
    
    // Show section only for UPI and NetBanking
    if (paymentMethod === 'upi' || paymentMethod === 'netbanking') {
        paymentQRSection.style.display = 'block';
        paymentConfirm.checked = false;
        
        // Generate QR code based on payment method
        if (paymentMethod === 'upi') {
            qrCodeDisplay.innerHTML = generateUPIQRCode();
            paymentInstructions.innerHTML = `
                <strong>📱 UPI Payment Instructions:</strong>
                1. Open any UPI app (Google Pay, PhonePe, Paytm)<br>
                2. Scan the QR code or use ID: <code>yourshop@upi</code><br>
                3. Enter amount and complete payment<br>
                4. Check the confirmation box below after payment
            `;
        } else if (paymentMethod === 'netbanking') {
            qrCodeDisplay.innerHTML = generateNetBankingQRCode();
            paymentInstructions.innerHTML = `
                <strong>🏦 NetBanking Payment Instructions:</strong>
                1. Scan the QR code with your bank's app<br>
                2. Or enter details: Account: 1234567890<br>
                3. IFSC: SBIN0001234<br>
                4. After payment completion, check the confirmation box
            `;
        }
    } else {
        paymentQRSection.style.display = 'none';
        paymentConfirm.checked = false;
    }
}

/**
 * GENERATE UPI QR CODE
 * Creates a dummy UPI QR code SVG
 * @returns {string} SVG QR code pattern
 */
function generateUPIQRCode() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 250 250">
            <!-- Background -->
            <rect width="250" height="250" fill="white"/>
            
            <!-- QR Code Pattern (simplified dummy) -->
            <rect x="10" y="10" width="30" height="30" fill="black"/>
            <rect x="45" y="10" width="15" height="15" fill="black"/>
            <rect x="65" y="10" width="10" height="30" fill="black"/>
            <rect x="210" y="10" width="30" height="30" fill="black"/>
            <rect x="210" y="45" width="15" height="15" fill="black"/>
            <rect x="210" y="65" width="30" height="10" fill="black"/>
            
            <rect x="10" y="45" width="15" height="15" fill="black"/>
            <rect x="30" y="65" width="10" height="30" fill="black"/>
            <rect x="60" y="40" width="20" height="20" fill="black"/>
            <rect x="95" y="30" width="15" height="15" fill="black"/>
            <rect x="95" y="60" width="10" height="20" fill="black"/>
            
            <rect x="10" y="210" width="30" height="30" fill="black"/>
            <rect x="45" y="210" width="15" height="15" fill="black"/>
            <rect x="65" y="210" width="10" height="30" fill="black"/>
            
            <!-- Random data pattern -->
            <rect x="120" y="100" width="12" height="12" fill="black"/>
            <rect x="135" y="100" width="12" height="12" fill="black"/>
            <rect x="150" y="100" width="12" height="12" fill="black"/>
            <rect x="120" y="120" width="12" height="12" fill="black"/>
            <rect x="135" y="120" width="12" height="12" fill="black"/>
            <rect x="150" y="120" width="12" height="12" fill="black"/>
            <rect x="120" y="140" width="12" height="12" fill="black"/>
            <rect x="150" y="140" width="12" height="12" fill="black"/>
            <rect x="135" y="155" width="12" height="12" fill="black"/>
            <rect x="150" y="155" width="12" height="12" fill="black"/>
            
            <!-- Center white box -->
            <rect x="100" y="100" width="50" height="50" fill="white"/>
            <rect x="110" y="110" width="30" height="30" fill="white" stroke="black" stroke-width="2"/>
            
            <!-- Text -->
            <text x="125" y="135" font-size="12" font-weight="bold" text-anchor="middle" fill="black">UPI</text>
        </svg>
    `;
}

/**
 * GENERATE NETBANKING QR CODE
 * Creates a dummy NetBanking QR code SVG
 * @returns {string} SVG QR code pattern
 */
function generateNetBankingQRCode() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 250 250">
            <!-- Background -->
            <rect width="250" height="250" fill="white"/>
            
            <!-- QR Code Pattern (simplified dummy) -->
            <rect x="10" y="10" width="30" height="30" fill="black"/>
            <rect x="50" y="10" width="15" height="15" fill="black"/>
            <rect x="70" y="10" width="10" height="30" fill="black"/>
            <rect x="210" y="10" width="30" height="30" fill="black"/>
            <rect x="210" y="50" width="15" height="15" fill="black"/>
            <rect x="210" y="70" width="30" height="10" fill="black"/>
            
            <rect x="10" y="50" width="15" height="15" fill="black"/>
            <rect x="35" y="70" width="10" height="30" fill="black"/>
            <rect x="65" y="45" width="20" height="20" fill="black"/>
            <rect x="100" y="35" width="15" height="15" fill="black"/>
            <rect x="100" y="65" width="10" height="20" fill="black"/>
            
            <rect x="10" y="210" width="30" height="30" fill="black"/>
            <rect x="50" y="210" width="15" height="15" fill="black"/>
            <rect x="70" y="210" width="10" height="30" fill="black"/>
            
            <!-- Random data pattern -->
            <rect x="125" y="105" width="12" height="12" fill="black"/>
            <rect x="140" y="105" width="12" height="12" fill="black"/>
            <rect x="155" y="105" width="12" height="12" fill="black"/>
            <rect x="125" y="125" width="12" height="12" fill="black"/>
            <rect x="140" y="125" width="12" height="12" fill="black"/>
            <rect x="155" y="125" width="12" height="12" fill="black"/>
            <rect x="125" y="145" width="12" height="12" fill="black"/>
            <rect x="155" y="145" width="12" height="12" fill="black"/>
            <rect x="140" y="160" width="12" height="12" fill="black"/>
            <rect x="155" y="160" width="12" height="12" fill="black"/>
            
            <!-- Center white box -->
            <rect x="105" y="105" width="50" height="50" fill="white"/>
            <rect x="115" y="115" width="30" height="30" fill="white" stroke="#1e3c72" stroke-width="2"/>
            
            <!-- Text -->
            <text x="130" y="140" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e3c72">BANK</text>
        </svg>
    `;
}

/**
 * UPDATE PLACE ORDER FUNCTION
 * Now includes payment confirmation check
 */
function placeOrder(event) {
    event.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const pincode = document.getElementById('pincode').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;
    const paymentConfirm = document.getElementById('paymentConfirm');
    const totalAmount = localStorage.getItem('productPrice');
    
    // Validation
    if (!fullName || !mobile || !address || !city || !pincode || !paymentMethod) {
        alert('❌ Please fill all required fields!');
        return;
    }
    
    // Check if payment confirmation is required
    if ((paymentMethod === 'upi' || paymentMethod === 'netbanking') && !paymentConfirm.checked) {
        alert('❌ Please confirm that you have completed the payment!');
        return;
    }
    
    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
        alert('❌ Mobile number must be 10 digits!');
        return;
    }
    
    // Validate pincode (6 digits)
    if (!/^\d{6}$/.test(pincode)) {
        alert('❌ Pincode must be 6 digits!');
        return;
    }
    
    // Payment method mapping
    const paymentMethodNames = {
        'card': 'Credit/Debit Card',
        'upi': 'UPI',
        'netbanking': 'NetBanking',
        'cod': 'Cash on Delivery'
    };
    
    // Show success message
    alert(
        `✅ Order Placed Successfully!\n\n` +
        `Name: ${fullName}\n` +
        `Mobile: ${mobile}\n` +
        `Payment Method: ${paymentMethodNames[paymentMethod]}\n` +
        `Amount: ₹${parseInt(totalAmount).toLocaleString('en-IN')}\n\n` +
        `(This is a dummy payment - no actual transaction occurred)`
    );
    
    // Clear localStorage
    localStorage.clear();
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

/**
 * Check if user is logged in before accessing protected pages
 * Call this on dashboard.html and checkout.html page load
 */
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // If not logged in and on a protected page, redirect to login
    if (!isLoggedIn && 
        (window.location.pathname.includes('dashboard.html') || 
         window.location.pathname.includes('checkout.html'))) {
        
        alert('⚠️ Please login first!');
        window.location.href = 'index.html';
    }
}

// Check login status on page load for protected pages
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});
