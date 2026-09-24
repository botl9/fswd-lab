import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [dark, setDark] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/projects")
            .then(res => {
                if (!res.ok)
                    throw new Error("Failed to load projects");
                return res.json();
            })
            .then(data => setProjects(data))
            .catch(() => setError("Unable to load projects."))
            .finally(() => setLoading(false));
    }, []);

    async function submit(e) {
        e.preventDefault();
        setSuccess("");

        if (!form.name || !form.email || !form.message) {
            setError("Please fill all fields.");
            return;
        }

        try {
            const res = await fetch(
                "http://localhost:3000/api/contacts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            if (!res.ok)
                throw new Error("Submission failed");

            setSuccess("Message submitted successfully!");
            setForm({ name: "", email: "", message: "" });
            setError("");
        } catch {
            setError("Failed to submit message.");
        }
    }

    return (
        <div className={dark ? "dark" : ""}>
            <header>
                <h1>Mohammed Ufraan</h1>
                <button onClick={() => setDark(!dark)}>
                    {dark ? "Light" : "Dark"}
                </button>
            </header>

            <section>
                <h2>Projects</h2>

                {loading && <p>Loading projects...</p>}
                {error && <p>{error}</p>}

                {projects.map(project => (
                    <article key={project._id}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <p>Rating: {project.rating}/5</p>
                    </article>
                ))}
            </section>

            <section>
                <h2>Contact</h2>

                <form onSubmit={submit}>
                    <input
                        placeholder="Name"
                        value={form.name}
                        onChange={e =>
                            setForm({...form, name: e.target.value})
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={e =>
                            setForm({...form, email: e.target.value})
                        }
                    />

                    <textarea
                        placeholder="Message"
                        value={form.message}
                        onChange={e =>
                            setForm({...form, message: e.target.value})
                        }
                    />

                    <button type="submit">Submit</button>
                </form>

                {success && <p>{success}</p>}
            </section>
        </div>
    );
}

export default App;