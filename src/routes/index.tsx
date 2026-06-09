import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plane, Hotel, MapPin, FileCheck, ShieldCheck, Briefcase, Church, Heart, Users, LifeBuoy,
  Phone, Mail, MessageCircle, Star, ArrowRight, CheckCircle2, Send,
  Facebook, Instagram, Linkedin,
} from "lucide-react";

import { IntroExperience } from "@/components/IntroExperience";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

import logoAsset from "@/assets/tiba-logo.asset.json";
import heroImg from "@/assets/hero-travel.jpg";
import aboutImg from "@/assets/about-team.jpg";
import dParis from "@/assets/dest-paris.jpg";
import dDubai from "@/assets/dest-dubai.jpg";
import dLisbon from "@/assets/dest-lisbon.jpg";
import dLondon from "@/assets/dest-london.jpg";
import dIstanbul from "@/assets/dest-istanbul.jpg";
import dZanzibar from "@/assets/dest-zanzibar.jpg";
import dCapeTown from "@/assets/dest-capetown.jpg";
import dJoburg from "@/assets/dest-joburg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TIBA Viagens & Turismo — Agência de Viagens em Luanda" },
      { name: "description", content: "Passagens aéreas, hotéis, vistos, pacotes turísticos e viagens corporativas. Atendimento premium em Luanda, Angola." },
      { property: "og:title", content: "TIBA Viagens & Turismo" },
      { property: "og:description", content: "Transformamos viagens em experiências inesquecíveis." },
    ],
  }),
  component: Home,
});

// ---------- Helpers ----------
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function SectionTitle({ eyebrow, title, sub, light }: { eyebrow: string; title: string; sub?: string; light?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <span className={`mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest ${light ? "bg-white/10 text-white" : "bg-primary/10 text-primary"}`}>
        {eyebrow}
      </span>
      <h2 className={`text-4xl font-bold leading-tight sm:text-5xl ${light ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {sub && <p className={`mt-4 text-lg ${light ? "text-white/80" : "text-muted-foreground"}`}>{sub}</p>}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString("pt-PT")}{suffix}</span>;
}

// ---------- Data ----------
const services = [
  { icon: Plane, title: "Reserva e Emissão de Passagens", desc: "Passagens nacionais e internacionais com as melhores tarifas." },
  { icon: Hotel, title: "Hospedagem", desc: "Hotéis, pousadas e apartamentos selecionados." },
  { icon: MapPin, title: "Pacotes Turísticos", desc: "Pacotes personalizados para todos os destinos." },
  { icon: FileCheck, title: "Vistos e Documentação", desc: "Assistência completa para vistos e documentação." },
  { icon: ShieldCheck, title: "Seguro de Viagem", desc: "Proteção total durante toda a sua viagem." },
  { icon: Briefcase, title: "Viagens Corporativas", desc: "Gestão empresarial de viagens executivas." },
  { icon: Church, title: "Turismo Religioso", desc: "Excursões e roteiros religiosos guiados." },
  { icon: Heart, title: "Lua de Mel", desc: "Pacotes românticos e exclusivos para casais." },
  { icon: Users, title: "Viagens em Grupo", desc: "Famílias, amigos e excursões organizadas." },
  { icon: LifeBuoy, title: "Assistência ao Viajante", desc: "Suporte antes, durante e após a viagem." },
];

const destinations = [
  { img: dParis, name: "Paris", country: "França", desc: "A cidade luz, romance e arte." },
  { img: dDubai, name: "Dubai", country: "EAU", desc: "Luxo, modernidade e desertos infinitos." },
  { img: dLisbon, name: "Lisboa", country: "Portugal", desc: "História, fado e tradição à beira-mar." },
  { img: dLondon, name: "Londres", country: "Reino Unido", desc: "Cultura, monumentos e sofisticação." },
  { img: dIstanbul, name: "Istambul", country: "Turquia", desc: "Encontro entre Oriente e Ocidente." },
  { img: dZanzibar, name: "Zanzibar", country: "Tanzânia", desc: "Praias paradisíacas e águas turquesa." },
  { img: dCapeTown, name: "Cidade do Cabo", country: "África do Sul", desc: "Natureza, vinhos e a Table Mountain." },
  { img: dJoburg, name: "Joanesburgo", country: "África do Sul", desc: "Negócios, cultura e safari." },
];

const stats = [
  { value: 12000, suffix: "+", label: "Viajantes Satisfeitos" },
  { value: 80, suffix: "+", label: "Destinos Internacionais" },
  { value: 24, suffix: "/7", label: "Assistência Permanente" },
  { value: 15, suffix: "+", label: "Anos de Experiência" },
];

const steps = [
  { n: "01", title: "Contacte-nos", desc: "Fale com a nossa equipa por telefone, email ou WhatsApp." },
  { n: "02", title: "Receba o orçamento", desc: "Preparamos uma proposta personalizada para si." },
  { n: "03", title: "Preparação documental", desc: "Cuidamos de vistos, seguros e documentação." },
  { n: "04", title: "Confirmação da viagem", desc: "Confirmamos reservas, voos e itinerário final." },
  { n: "05", title: "Embarque e acompanhamento", desc: "Suporte completo antes, durante e após a viagem." },
];

const testimonials = [
  { name: "Maria Fernandes", role: "Cliente Corporativa", quote: "Atendimento excecional. Resolveram tudo da minha viagem a Dubai sem qualquer preocupação da minha parte." },
  { name: "João Pedro Cabral", role: "Lua de Mel em Zanzibar", quote: "Profissionalismo do início ao fim. A nossa lua de mel foi exatamente o que sonhámos." },
  { name: "Ana Sousa", role: "Viagem em Família", quote: "Confiança total. Levaram a nossa família a Lisboa com o máximo de conforto e segurança." },
  { name: "Carlos Mendes", role: "Viagem Corporativa", quote: "A TIBA é parceira de confiança da nossa empresa há anos. Recomendo sem reservas." },
];

const orcamentoSchema = z.object({
  nome: z.string().trim().min(2, "Nome obrigatório").max(100),
  telefone: z.string().trim().min(6, "Telefone obrigatório").max(30),
  email: z.string().trim().email("Email inválido").max(255),
  destino: z.string().trim().min(2, "Destino obrigatório").max(100),
  data: z.string().min(1, "Data prevista obrigatória"),
  passageiros: z.coerce.number().min(1, "Mín. 1").max(50),
  mensagem: z.string().trim().max(1000).optional().or(z.literal("")),
});
type OrcamentoForm = z.infer<typeof orcamentoSchema>;

// ---------- Page ----------
function Home() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <IntroExperience />
      <SiteHeader />
      <WhatsAppFloat />

      <Hero />
      <Sobre />
      <Servicos />
      <Destinos />
      <PorqueEscolher />
      <ComoFunciona />
      <Testemunhos />
      <Orcamento />
      <Contactos />
      <CTAFinal />
      <Footer />
    </div>
  );
}

// ---------- Sections ----------
function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Destino paradisíaco"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/85 via-primary/70 to-[#040820]/85" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,212,0,0.15),transparent_50%)]" />

      <div className="container-x grid w-full gap-12 pt-32 pb-20 lg:grid-cols-[1.2fr,1fr] lg:items-center">
        <div className="text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            Luanda · Angola
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-6 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Viaje com <span className="text-shine">Segurança</span>,<br /> Conforto e Confiança.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl"
          >
            A TIBA Viagens & Turismo transforma sonhos em experiências inesquecíveis, oferecendo soluções completas para viagens nacionais e internacionais.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#orcamento" className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-foreground shadow-elevated transition hover:brightness-110">
              Solicitar Orçamento
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a
              href="https://wa.me/244959120000"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <MessageCircle className="h-5 w-5" />
              Falar no WhatsApp
            </a>
          </motion.div>

          {/* Indicators */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { icon: Plane, label: "Passagens Aéreas" },
              { icon: Hotel, label: "Hotéis" },
              { icon: FileCheck, label: "Vistos" },
              { icon: MapPin, label: "Pacotes" },
            ].map((it, i) => (
              <motion.div
                key={it.label}
                whileHover={{ y: -4 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur"
              >
                <it.icon className="h-5 w-5 text-gold" />
                <span className="text-sm font-medium text-white">{it.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating logo card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
          className="hidden lg:block"
        >
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-gold/30 to-primary-glow/30 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/20 bg-white/95 p-10 shadow-elevated backdrop-blur animate-float">
              <img src={logoAsset.url} alt="TIBA Logo" className="mx-auto h-56 w-auto" />
              <p className="mt-4 text-center text-sm font-semibold uppercase tracking-widest text-primary">
                Viagens & Turismo
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70">
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/40 p-1">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="h-2 w-1 rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="py-24 sm:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
          <img
            src={aboutImg} alt="Equipa TIBA"
            className="rounded-3xl object-cover shadow-elevated"
            loading="lazy" width={1200} height={900}
          />
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-white p-5 shadow-xl ring-1 ring-border sm:block">
            <div className="text-3xl font-bold text-primary"><Counter to={15} suffix="+" /></div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Anos de Experiência</div>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Quem Somos
          </span>
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
            Uma agência que cuida de <span className="text-gradient-brand">cada detalhe</span> da sua viagem.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            A TIBA Viagens & Turismo é uma agência especializada em planeamento e gestão de viagens nacionais e internacionais.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Prestamos assistência completa aos nossos clientes, desde a emissão de passagens até ao acompanhamento durante toda a viagem, garantindo conforto, segurança e tranquilidade.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Atendimento personalizado", "Suporte 24/7", "Equipa especializada", "Destinos globais"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function Servicos() {
  return (
    <section id="servicos" className="bg-secondary/50 py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle eyebrow="Nossos Serviços" title="Soluções completas para a sua viagem" sub="Tudo o que precisa, num só lugar, com a confiança de uma equipa premium." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border transition hover:shadow-elevated"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100" />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Destinos() {
  return (
    <section id="destinos" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle eyebrow="Destinos em Destaque" title="O mundo está à sua espera" sub="Selecionámos para si destinos icónicos com experiências únicas." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <motion.a
              key={d.name}
              href="#orcamento"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-md"
            >
              <img
                src={d.img} alt={d.name}
                loading="lazy" width={800} height={1024}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040820]/95 via-[#040820]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="text-xs uppercase tracking-widest text-gold">{d.country}</div>
                <h3 className="mt-1 text-2xl font-bold">{d.name}</h3>
                <p className="mt-1 text-sm text-white/80">{d.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur transition group-hover:bg-accent">
                  Solicitar Cotação <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PorqueEscolher() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-white sm:py-32">
      <div className="absolute inset-0 -z-10 gradient-brand" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,212,0,0.18),transparent_55%)]" />
      <div className="container-x">
        <SectionTitle light eyebrow="Porque escolher a TIBA" title="Confiança que se traduz em números" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-3xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur"
            >
              <div className="text-5xl font-bold text-gold">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-white/80">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle eyebrow="Como Funciona" title="Cinco passos para uma viagem perfeita" />
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-gradient-to-b from-primary via-accent to-primary md:left-1/2 md:block" />
          <div className="space-y-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`md:flex md:items-center md:gap-12 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
              >
                <div className="md:w-1/2">
                  <div className={`rounded-3xl bg-card p-8 shadow-md ring-1 ring-border ${i % 2 === 0 ? "md:text-right" : ""}`}>
                    <div className="text-sm font-bold text-accent">PASSO {s.n}</div>
                    <h3 className="mt-1 text-2xl font-bold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex md:w-12 md:justify-center">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full gradient-brand text-lg font-bold text-white shadow-elevated">
                    {i + 1}
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testemunhos() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="bg-secondary/50 py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle eyebrow="Testemunhos" title="O que os nossos clientes dizem" />
        <div className="mx-auto max-w-3xl">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="rounded-3xl bg-card p-10 text-center shadow-elevated ring-1 ring-border"
          >
            <div className="mb-4 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-xl italic text-foreground">"{testimonials[idx].quote}"</p>
            <div className="mt-6">
              <div className="text-base font-semibold text-primary">{testimonials[idx].name}</div>
              <div className="text-sm text-muted-foreground">{testimonials[idx].role}</div>
            </div>
          </motion.div>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Testemunho ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-2 bg-border"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Orcamento() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<OrcamentoForm>({
    resolver: zodResolver(orcamentoSchema),
  });

  const onSubmit = async (data: OrcamentoForm) => {
    const msg = `Olá TIBA! Solicito um orçamento.%0A%0A*Nome:* ${data.nome}%0A*Telefone:* ${data.telefone}%0A*Email:* ${data.email}%0A*Destino:* ${data.destino}%0A*Data Prevista:* ${data.data}%0A*Passageiros:* ${data.passageiros}%0A*Mensagem:* ${encodeURIComponent(data.mensagem || "—")}`;
    window.open(`https://wa.me/244959120000?text=${msg}`, "_blank");
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 6000);
  };

  const fld = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <section id="orcamento" className="py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-start">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            Solicitar Orçamento
          </span>
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
            Conte-nos sobre a sua <span className="text-gradient-brand">próxima viagem</span>.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Preencha o formulário e a nossa equipa preparará uma proposta personalizada em até 24 horas.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { i: Phone, t: "+244 921 122 000", s: "Atendimento telefónico" },
              { i: MessageCircle, t: "+244 959 120 000", s: "WhatsApp 24/7" },
              { i: Mail, t: "info@tibaviagenseturismo.com", s: "Resposta em 24h" },
            ].map(({ i: Icon, t, s }) => (
              <div key={t} className="flex items-center gap-4 rounded-2xl bg-secondary/60 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t}</div>
                  <div className="text-xs text-muted-foreground">{s}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl bg-card p-8 shadow-elevated ring-1 ring-border"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nome Completo</label>
              <input className={fld} {...register("nome")} placeholder="O seu nome" />
              {errors.nome && <p className="mt-1 text-xs text-destructive">{errors.nome.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Telefone</label>
              <input className={fld} {...register("telefone")} placeholder="+244 ..." />
              {errors.telefone && <p className="mt-1 text-xs text-destructive">{errors.telefone.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
              <input className={fld} type="email" {...register("email")} placeholder="exemplo@email.com" />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Destino</label>
              <input className={fld} {...register("destino")} placeholder="Ex: Dubai" />
              {errors.destino && <p className="mt-1 text-xs text-destructive">{errors.destino.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Data Prevista</label>
              <input className={fld} type="date" {...register("data")} />
              {errors.data && <p className="mt-1 text-xs text-destructive">{errors.data.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Número de Passageiros</label>
              <input className={fld} type="number" min={1} max={50} defaultValue={1} {...register("passageiros")} />
              {errors.passageiros && <p className="mt-1 text-xs text-destructive">{errors.passageiros.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mensagem</label>
              <textarea className={`${fld} min-h-[120px]`} {...register("mensagem")} placeholder="Conte-nos mais sobre a sua viagem ideal..." />
            </div>
          </div>
          <button
            type="submit" disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-accent-foreground shadow-elevated transition hover:brightness-110 disabled:opacity-60"
          >
            {sent ? <><CheckCircle2 className="h-5 w-5" /> Enviado!</> : <><Send className="h-5 w-5" /> Solicitar Orçamento</>}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Contactos() {
  return (
    <section id="contactos" className="bg-secondary/50 py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle eyebrow="Contactos" title="Estamos disponíveis para si" />
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4">
            <ContactCard icon={Phone} title="Telefone" lines={["+244 921 122 000"]} />
            <ContactCard
              icon={MessageCircle} title="WhatsApp"
              lines={["+244 959 120 000", "+244 959 121 000", "+244 959 123 000", "+244 959 124 000"]}
            />
            <ContactCard icon={Mail} title="Email" lines={["info@tibaviagenseturismo.com"]} />
            <ContactCard icon={MapPin} title="Endereço" lines={["Av. Pedro de Castro Van-Dúnem nº 74", "Morro Bento, Luanda — Angola"]} />
          </div>
          <div className="overflow-hidden rounded-3xl shadow-elevated ring-1 ring-border">
            <iframe
              title="Mapa TIBA"
              src="https://www.google.com/maps?q=Morro+Bento+Luanda+Angola&output=embed"
              className="h-[500px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, title, lines }: { icon: typeof Phone; title: string; lines: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="flex gap-4 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-brand text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</div>
        {lines.map((l) => (
          <div key={l} className="font-medium text-foreground">{l}</div>
        ))}
      </div>
    </motion.div>
  );
}

function CTAFinal() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-white">
      <div className="absolute inset-0 -z-10 gradient-brand" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(255,122,26,0.25),transparent_60%)]" />
      <div className="container-x text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        >
          Pronto para a sua <span className="text-shine">próxima viagem</span>?
        </motion.h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
          Entre em contacto com a TIBA Viagens & Turismo e permita-nos planear uma experiência única para si.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="#orcamento" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-accent-foreground shadow-elevated transition hover:brightness-110">
            Solicitar Orçamento <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href="https://wa.me/244959120000"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#040820] py-16 text-white/80">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="rounded-2xl bg-white p-4 inline-block">
            <img src={logoAsset.url} alt="TIBA" className="h-20 w-auto" />
          </div>
          <p className="mt-5 text-sm">Transformamos viagens em experiências inesquecíveis. Luanda — Angola.</p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((I, i) => (
              <a key={i} href="#" aria-label="Social" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-accent">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Links Rápidos</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#sobre" className="hover:text-white">Sobre Nós</a></li>
            <li><a href="#servicos" className="hover:text-white">Serviços</a></li>
            <li><a href="#destinos" className="hover:text-white">Destinos</a></li>
            <li><a href="#orcamento" className="hover:text-white">Orçamento</a></li>
            <li><a href="#contactos" className="hover:text-white">Contactos</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Serviços</h4>
          <ul className="space-y-2 text-sm">
            <li>Passagens Aéreas</li>
            <li>Hospedagem</li>
            <li>Vistos e Documentação</li>
            <li>Viagens Corporativas</li>
            <li>Lua de Mel</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Contactos</h4>
          <ul className="space-y-2 text-sm">
            <li>+244 921 122 000</li>
            <li>info@tibaviagenseturismo.com</li>
            <li>Av. Pedro de Castro Van-Dúnem nº 74</li>
            <li>Morro Bento, Luanda — Angola</li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} TIBA Viagens & Turismo. Todos os direitos reservados.
      </div>
    </footer>
  );
}
