import { useEffect, useState } from "react";
import API from "../services/api";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subs, setSubs] = useState([]);

  const [project, setProject] = useState({ name: "", description: "" });
  const [client, setClient] = useState({
    name: "",
    company: "",
    testimonial: "",
  });

  const load = async () => {
    setProjects((await API.get("/projects")).data);
    setClients((await API.get("/clients")).data);
    setContacts((await API.get("/contacts")).data);
    setSubs((await API.get("/newsletter")).data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="admin-page">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* ADD FORMS */}
      <div className="admin-grid">
        {/* ADD PROJECT */}
        <div className="admin-card">
          <h3>Add Project</h3>
          <input
            placeholder="Project Name"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
          />
          <textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />
          <button
            onClick={async () => {
              await API.post("/projects", project);
              setProject({ name: "", description: "" });
              load();
            }}
          >
            Add Project
          </button>
        </div>

        {/* ADD CLIENT */}
        <div className="admin-card">
          <h3>Add Client</h3>
          <input
            placeholder="Client Name"
            value={client.name}
            onChange={(e) => setClient({ ...client, name: e.target.value })}
          />
          <input
            placeholder="Company"
            value={client.company}
            onChange={(e) => setClient({ ...client, company: e.target.value })}
          />
          <textarea
            placeholder="Testimonial"
            value={client.testimonial}
            onChange={(e) =>
              setClient({ ...client, testimonial: e.target.value })
            }
          />
          <button
            onClick={async () => {
              await API.post("/clients", client);
              setClient({ name: "", company: "", testimonial: "" });
              load();
            }}
          >
            Add Client
          </button>
        </div>
      </div>

      {/* PROJECTS TABLE */}
      <div className="admin-card">
        <h3>Projects</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td colSpan="3" className="empty">
                  No projects added
                </td>
              </tr>
            )}
            {projects.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={async () => {
                      await API.delete(`/projects/${p._id}`);
                      load();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CLIENTS TABLE */}
      <div className="admin-card">
        <h3>Happy Clients</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Testimonial</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 && (
              <tr>
                <td colSpan="4" className="empty">
                  No clients added
                </td>
              </tr>
            )}
            {clients.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.company}</td>
                <td>{c.testimonial}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={async () => {
                      await API.delete(`/clients/${c._id}`);
                      load();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CONTACTS + SUBSCRIBERS */}
      <div className="admin-grid">
        <div className="admin-card">
          <h3>Contact Messages</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 && (
                <tr>
                  <td className="empty">No messages</td>
                </tr>
              )}
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td>{c.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-card">
          <h3>Newsletter Subscribers</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {subs.length === 0 && (
                <tr>
                  <td className="empty">No subscribers</td>
                </tr>
              )}
              {subs.map((s) => (
                <tr key={s._id}>
                  <td>{s.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
