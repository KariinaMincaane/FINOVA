document.getElementById('signupBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
  
    if (!name || !email || !password) {
      alert('Please fill in all fields!');
      return;
    }
  
    const user = { name, email, password };
    localStorage.setItem('userData', JSON.stringify(user));
  
    alert('Account created! Your data has been saved.');
  });
  