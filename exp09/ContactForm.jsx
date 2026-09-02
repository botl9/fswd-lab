// react contact form submission
async function submit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();
    alert(data.message || data.error);
}