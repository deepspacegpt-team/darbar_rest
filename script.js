async function handleSubmit(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    guests: document.getElementById('guests').value,
    message: document.getElementById('message').value,
  };

  try {
    // RELATIVE PATH: This works on both Localhost and Vercel
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('🎉 Reservation successful! MR X will contact you shortly.');
      e.target.reset();
    } else {
      alert('❌ Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Server error. Please ensure the backend is deployed.');
  }
}
