import { useState, useEffect } from "react";

const skills = [["Go",5],["TypeScript",5],["Java",4]];
const projects = [
    ["Holo","P2P file sharing"],
    ["Copia","Database in Go"],
    ["Jpeg Go","JPEG encoder in Go"]
];

function Header({dark,toggle}) {
    return <header>
        <h1>Mohammed Ufraan</h1>
        <nav>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <button onClick={toggle}>{dark?"Light":"Dark"}</button>
        </nav>
    </header>;
}

function Skills({data}) {
    return <section id="skills">
        <h2>Skills</h2>
        <table><tbody>
            {data.map(([n,r]) =>
                <tr key={n}><td>{n}</td><td>{r}/5</td></tr>
            )}
        </tbody></table>
    </section>;
}

function Projects({data}) {
    return <section id="projects">
        <h2>Projects</h2>
        <div className="projects">
            {data.map(([n,d]) =>
                <article key={n}>
                    <h3>{n}</h3><p>{d}</p>
                </article>
            )}
        </div>
    </section>;
}

function Contact() {
    const [name,setName] = useState("");
    const [msg,setMsg] = useState("");

    function submit(e) {
        e.preventDefault();
        alert(name && msg ? "Message submitted!" : "Fill all fields.");
    }

    return <section id="contact">
        <h2>Contact</h2>
        <form onSubmit={submit}>
            <input value={name} placeholder="Name"
                onChange={e=>setName(e.target.value)}/>
            <textarea value={msg} placeholder="Message"
                onChange={e=>setMsg(e.target.value)}/>
            <button>Submit</button>
        </form>
    </section>;
}

function GitHub() {
    const [user,setUser] = useState(null);

    useEffect(() => {
        fetch("https://api.github.com/users/ufraaan")
            .then(r=>r.json()).then(setUser);
    }, []);

    return <section>
        <h2>GitHub</h2>
        {user && <p>{user.login}: {user.followers} followers,
            {user.public_repos} repos</p>}
    </section>;
}

export default function App() {
    const [dark,setDark] = useState(false);

    return <div className={dark ? "dark" : ""}>
        <Header dark={dark} toggle={()=>setDark(!dark)}/>
        <section id="about">
            <h2>About</h2>
            <p>CSE student interested in backend engineering
                and scalable systems.</p>
        </section>
        <Skills data={skills}/>
        <Projects data={projects}/>
        <GitHub/>
        <Contact/>
    </div>;
}