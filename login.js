document.getElementById('loginBtn').addEventListener('click', () => {
    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
  
    if (!emailInput || !passwordInput) {
      alert('Please enter both email and password.');
      return;
    }
  
    const storedUser = JSON.parse(localStorage.getItem('userData'));
  
    if (
      storedUser &&
      storedUser.email === emailInput &&
      storedUser.password === passwordInput
    ) {
      alert('Login successful!');

      window.location.href = 'materials.html';
    } else {
      alert('Invalid email or password.');
    }
  });
  