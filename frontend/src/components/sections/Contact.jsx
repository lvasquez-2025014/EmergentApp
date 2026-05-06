import { useState } from "react";
import { toast } from "sonner";

export default function Contact({ apiData }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  // Usar datos de API si están disponibles
  const title = apiData?.title || "Encarga una obra única";
  const subtitle = apiData?.subtitle || "Cada solicitud se atiende personalmente por nuestra dirección artística. Tiempo de respuesta: 48 horas.";
  const contactInfo = apiData?.contact;

  const set = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Completa todos los campos requeridos.");
      return;
    }
    setSending(true);
    // No backend — store locally + simulate delivery
    try {
      const orders = JSON.parse(localStorage.getItem("sm_orders") || "[]");
      orders.push({ ...form, ts: new Date().toISOString() });
      localStorage.setItem("sm_orders", JSON.stringify(orders));
    } catch {
      /* ignore */
    }
    setTimeout(() => {
      setSending(false);
      toast.success("Solicitud enviada. Te responderemos en 48 horas.");
      setForm({ name: "", email: "", interest: "", message: "" });
    }, 800);
  };

  return (
    <section id="contact" className="section" data-testid="section-contact">
      <div className="section-frame">
        <div className="overline mb-3">IV — Encargo</div>
        <h2 className="font-monumental text-5xl md:text-7xl uppercase tracking-tight max-w-5xl">
          {title.split(' ').slice(0, 2).join(' ')}<br />
          <span className="font-narrative italic font-light text-[var(--primary-accent)]">
            {title.split(' ').slice(2).join(' ')}
          </span>
        </h2>
        <p className="font-narrative text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mt-6 mb-16">
          {subtitle}
        </p>

        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl"
          data-testid="contact-form"
        >
          <div>
            <label className="overline block mb-3">01 — Nombre</label>
            <input
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="Tu nombre completo"
              className="input-sacro"
              data-testid="contact-input-name"
            />
          </div>
          <div>
            <label className="overline block mb-3">02 — Correo</label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="nombre@correo.com"
              className="input-sacro"
              data-testid="contact-input-email"
            />
          </div>
          <div className="md:col-span-2">
            <label className="overline block mb-3">03 — Obra de interés</label>
            <input
              type="text"
              value={form.interest}
              onChange={set("interest")}
              placeholder="Ej. Christus Patiens, encargo a medida..."
              className="input-sacro"
              data-testid="contact-input-interest"
            />
          </div>
          <div className="md:col-span-2">
            <label className="overline block mb-3">04 — Mensaje</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={set("message")}
              placeholder="Cuéntanos sobre el espacio o la intención de la obra..."
              className="input-sacro resize-none"
              data-testid="contact-input-message"
            />
          </div>
          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-6 pt-6">
            <div className="overline">
              {contactInfo 
                ? `Atelier · ${contactInfo.address.city} &nbsp;·&nbsp; ${contactInfo.phone}`
                : "Atelier · Sevilla, ES &nbsp;·&nbsp; +34 954 000 000"
              }
            </div>
            <button
              type="submit"
              disabled={sending}
              className="btn-sacro magnetic"
              data-cursor-label="Enviar"
              data-testid="contact-submit"
            >
              {sending ? "Enviando…" : "Enviar solicitud →"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
