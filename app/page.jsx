"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Komponen untuk Slideshow Foto Otomatis yang Mulus (Fade Effect)
const AutoSlideShow = ({ images, intervalTime = 3000, containerStyle = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, intervalTime);
      return () => clearInterval(slideInterval);
    }
  }, [images.length, intervalTime]);

  return (
    <div className={`overflow-hidden relative flex items-center justify-center ${containerStyle}`}>
      {images.map((img, idx) => (
        <img 
          key={idx}
          src={img} 
          alt={`Slide ${idx + 1}`} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
        />
      ))}
    </div>
  );
};

// Komponen khusus untuk Slider Kartu Proyek
const ProjectCard = ({ title, description, category, images, tags, links, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (images.length > 1 && !isModalOpen) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(slideInterval);
    }
  }, [images.length, isModalOpen]);

  const getLinkStyle = (type) => {
    switch (type) {
      case 'github': return 'bg-slate-800 text-white hover:bg-slate-700';
      case 'figma': return 'bg-pink-400 text-white hover:bg-pink-500';
      case 'live': return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
      default: return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
    }
  };

  return (
    <>
      <div className={`bg-[#fdfbf7] p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center ${theme.span ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}>
        <div className={`w-full h-48 ${theme.bg} rounded-2xl mb-6 border-2 ${theme.border} overflow-hidden relative group flex items-center justify-center cursor-pointer`} onClick={() => setIsModalOpen(true)}>
          <img 
            src={images[currentIndex]} 
            alt={`${title} - image ${currentIndex + 1}`} 
            className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-500" 
          />
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 w-7 h-7 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10 text-xs">◀</button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10 text-xs">▶</button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 bg-slate-900/40 px-2 py-0.5 rounded-full backdrop-blur-sm z-10 pointer-events-none">
                {images.map((_, idx) => (
                  <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`} />
                ))}
              </div>
            </>
          )}
          <span className="absolute top-2 left-2 bg-slate-900/60 text-white px-2 py-0.5 rounded-md text-[9px] font-bold backdrop-blur-sm pointer-events-none z-10">
            {currentIndex + 1} / {images.length}
          </span>
          <span className="absolute top-2 right-2 bg-white/80 text-slate-800 p-1 rounded-md text-[9px] font-bold backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            🔍 Zoom
          </span>
        </div>

        <h4 className="text-lg font-bold text-slate-700 uppercase tracking-wide mb-2">{title}</h4>
        <p className="text-slate-500 text-sm mb-4 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] border border-slate-200 px-3 py-1 rounded-full uppercase tracking-widest text-slate-500">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3 w-full justify-center border-t border-slate-200 pt-4 mt-auto">
          {links.map((link, idx) => (
            <a key={idx} href={link.url} className={`flex-1 text-xs font-bold py-2 rounded-xl transition-colors ${getLinkStyle(link.type)}`}>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)}>
          <button className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white text-4xl transition-colors z-[110]" onClick={() => setIsModalOpen(false)}>&times;</button>
          {images.length > 1 && (
            <button onClick={prevImage} className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md transition-all z-[110]">◀</button>
          )}
          <img src={images[currentIndex]} alt="Full Zoom" className="max-w-[95vw] max-h-[85vh] object-contain rounded-xl shadow-2xl z-[105] cursor-default" onClick={(e) => e.stopPropagation()} />
          {images.length > 1 && (
            <button onClick={nextImage} className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md transition-all z-[110]">▶</button>
          )}
          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-[110]">
              {images.map((_, idx) => (
                <div key={idx} className={`w-2.5 h-2.5 rounded-full transition-colors shadow-sm ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default function Home() {
  
  const heroPhotos = ["/profil.png"]; 
  const aboutPhotos = ["/me1.jpeg", "/me2.jpeg"]; 
  const eduPhotos = ["/logo ub.jpg"]; 
  const expPhotos = ["/logo ip.png"]; 

  const projectsData = [
    {
      title: "SmartGrow",
      description: "Monitoring and Control System Greenhouse berbasis IoT menggunakan ESP32, Soil Moisture, BH-1750, dan DHT11.",
      tags: ["IoT", "Web Dev", "PHP Laravel", "Arduino", "ESP32"],
      theme: { bg: "bg-emerald-100", border: "border-emerald-200" },
      images: ["smartgrow1.png", "smartgrow2.png", "smartgrow3.png"],
      links: [
        { label: "GitHub Source Code", url: "https://github.com/nevaaintina/greenhouse-project.git", type: "github" },
        { label: "Website", url: "https://www.smartgrow.web.id/", type: "live" }
      ]
    },
    {
      title: "ZA&HI Beauty Care",
      description: "Website Profil Salon. Perancangan antarmuka pengguna interaktif dan responsif untuk salon kecantikan.",
      tags: ["Web Dev", "PHP Laravel", "MySQL", "Tailwind CSS", "Figma"],
      theme: { bg: "bg-pink-100", border: "border-pink-200" },
      images: ["zahi1.png", "zahi2.png", "zahi3.png"],
      links: [
        { label: "Figma Design", url: "https://www.figma.com/design/1FJygeWSXqhqprXrw16XLY/wireframe?node-id=0-1&t=2kfjWJQrzuEBFfMJ-1", type: "figma" },
        { label: "GitHub Source Code", url: "https://github.com/nevaaintina/Za-Hi-Beauty-Care.git", type: "github" }
      ]
    },
    {
      title: "Powercycle",
      description: "Platform website untuk digitalisasi dan manajemen pengelolaan operasional bank sampah di PLN Indonesia Power UBP Mrica.",
      tags: ["Web Dev", "Javascript", "React", "Next.js", "MySQL", "Firebase"],
      theme: { bg: "bg-emerald-100", border: "border-emerald-200" },
      images: ["powercycle1.png", "powercycle2.png", "powercycle3.png"],
      links: [
        { label: "GitHub Source Code", url: "#", type: "github" },
        { label: "Live Website", url: "#", type: "live" }
      ]
    },
    {
      title: "Telephone Directory App",
      description: "Website manajemen direktori telepon. Dilengkapi dengan fitur pencarian, filter, dan paginasi.",
      tags: ["Web Dev", "Javascript", "Next.js", "Spreadsheets"],
      theme: { bg: "bg-purple-100", border: "border-purple-200" },
      images: ["directory1.png", "directory2.png"],
      links: [
        { label: "GitHub Source Code", url: "https://github.com/awaliawd12/phonebook-sht.git", type: "github" },
        { label: "Website", url: "https://phonebook-sht.vercel.app/", type: "live" }
      ]
    },
    {
      title: "Smart Waste Detection",
      description: "System pendeteksi dan pengklasifikasi sampah secara real-time menggunakan model AI YOLOv8.",
      tags: ["AI", "YOLOv8", "Python", "HTML", "CSS"],
      theme: { bg: "bg-amber-100", border: "border-amber-200" },
      images: ["smartwaste1.png", "smartwaste2.png"],
      links: [
        { label: "GitHub Source Code", url: "https://github.com/awaliawd12/smartwaste.git", type: "github" }
      ]
    },
    {
      title: "Find Your Beauty",
      description: "Website Rekomendasi dan Review Skincare. Platform kurasi produk perawatan kulit yang terstruktur.",
      tags: ["Web Dev", "Tailwind CSS", "PHP", "MySQL", "Figma"],
      theme: { bg: "bg-orange-100", border: "border-orange-200" },
      images: ["findyourbeauty1.png", "findyourbeauty2.png", "findyourbeauty3.png", "findyourbeauty4.png"],
      links: [
        { label: "Figma Design", url: "https://www.figma.com/design/psM1HzH5RTjlUVO81JZCNK/Wireframe?node-id=0-1&t=H9aJRUnaQPVth6tp-1", type: "figma" },
        { label: "GitHub Source Code", url: "https://github.com/awaliawd12/find-your-beauty.git", type: "github" }
      ]
    },
    {
      title: "School Academic Info System",
      description: "Pengembangan sistem informasi akademik berbasis aplikasi mobile untuk menunjang manajemen sekolah.",
      tags: ["Mobile App", "Flutter", "Dart", "Firebase"],
      theme: { bg: "bg-blue-100", border: "border-blue-200", span: true },
      images: ["school1.png", "school2.png"],
      links: [
        { label: "GitHub Source Code", url: "https://github.com/Rafadi999/uasmobilekel4.git", type: "github" }
      ]
    }
  ];

  const docPhotos = [
    { src: "pameran1.jpeg", caption: "Pameran", rotate: "-rotate-2" },
    { src: "pameranfyb.jpeg", caption: "Find Your Beauty", rotate: "rotate-3" },
    { src: "coba iot1.jpeg", caption: "Buat IoT", rotate: "-rotate-1" },
    { src: "coba iot.jpeg", caption: "Uji Coba Alat IoT", rotate: "rotate-2" },
    { src: "presenai.jpeg", caption: "AI SmartWaste Detection", rotate: "-rotate-3" },
    { src: "pameraniot.jpeg", caption: "IoT Smartgrow", rotate: "rotate-1" },
    { src: "pjiot.jpeg", caption: "Hasil Project IoT", rotate: "rotate-2" },
    { src: "pjiot1.jpeg", caption: "IoT", rotate: "-rotate-3" },
    { src: "presenzahi.jpeg", caption: "Za&Hi Beauty Care", rotate: "-rotate-1" },
    { src: "foto kelas.jpeg", caption: "TI E Vokasi UB 24", rotate: "rotate-2" },
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-slate-800 font-sans selection:bg-pink-200 selection:text-pink-900 scroll-smooth overflow-x-hidden">
      
      {/* CSS MARQUEE */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* HEADER STICKY */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 py-4 transition-all">
        <nav className="container mx-auto px-6 flex justify-between items-center max-w-5xl">
          <Link href="#hero" className="text-3xl font-serif font-style: italic text-pink-500 tracking-wider">
            Portfolio.
          </Link>
          <ul className="hidden md:flex space-x-6 text-xs uppercase tracking-widest font-semibold text-slate-500">
            <li><Link href="#about" className="hover:text-pink-400 transition-colors">About</Link></li>
            <li><Link href="#education" className="hover:text-blue-400 transition-colors">Education</Link></li>
            <li><Link href="#experience" className="hover:text-purple-400 transition-colors">Experience</Link></li>
            <li><Link href="#skills" className="hover:text-emerald-400 transition-colors">Skills</Link></li>
            <li><Link href="#portfolio" className="hover:text-amber-400 transition-colors">Portfolio</Link></li>
            <li><Link href="#contact" className="hover:text-pink-400 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 pt-28 pb-12 max-w-5xl">
        
        {/* HERO SECTION (RESPONSIF FLEXBOX) */}
        <section id="hero" className="py-12 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-serif text-slate-800 leading-tight mb-6">
              Transforming <span className="text-pink-400 italic">needs</span> into <br className="hidden md:block"/>
              functional digital solutions
            </h1>
            <div className="inline-block px-5 py-2 bg-pink-400 text-white rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
              ♡ D3 IT STUDENT & DEVELOPER
            </div>
            <p className="text-slate-500 leading-relaxed max-w-md mx-auto md:mx-0 text-sm md:text-base">
              Hello, I am Awalia Wahyu Destiana. I am a Diploma in Information Technology student at the Faculty of Vocational Studies, Brawijaya University.
            </p>
          </div>
          
          <div className="flex-1 w-full flex justify-center items-center relative my-6 md:my-0">
            <div className="absolute w-56 h-56 md:w-64 md:h-64 bg-pink-100 rounded-full blur-3xl opacity-50"></div>
            <div className="relative w-48 h-64 bg-white rounded-[3rem] -rotate-3 border-2 border-dashed border-pink-300 flex items-center justify-center p-2 shadow-xl overflow-hidden">
               <AutoSlideShow images={heroPhotos} containerStyle="w-full h-full rounded-[2.5rem]" />
               <div className="absolute top-4 right-4 text-2xl pointer-events-none">🌸</div>
               <div className="absolute bottom-4 left-4 text-2xl pointer-events-none">✨</div>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className="py-8 border-y border-pink-100 my-8">
          <div className="grid grid-cols-2 md:flex md:justify-around items-center text-center gap-6 md:gap-0">
            <div>
              <h3 className="text-3xl font-serif text-slate-700">Sem 5</h3>
              <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">Status Studi</p>
            </div>
            <div>
              <h3 className="text-3xl font-serif text-slate-700">6 Bulan</h3>
              <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">Target Magang</p>
            </div>
            <div>
              <h3 className="text-3xl font-serif text-slate-700">7+</h3>
              <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">Proyek Utama</p>
            </div>
            <div>
              <h3 className="text-3xl font-serif text-slate-700">100%</h3>
              <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">Dedikasi</p>
            </div>
          </div>
        </section>

        {/* ABOUT ME */}
        <section id="about" className="py-16 flex flex-col md:flex-row gap-12 items-center bg-pink-50/50 p-8 rounded-[3rem]">
          <div className="flex-1 relative w-full max-w-sm mx-auto">
            <div className="w-full aspect-square bg-white p-4 pb-12 shadow-md rotate-2 border border-slate-100 flex flex-col items-center">
               <div className="w-full h-full bg-slate-100 overflow-hidden relative">
                  <AutoSlideShow images={aboutPhotos} containerStyle="w-full h-full" />
               </div>
               <span className="font-serif italic text-slate-500 text-sm mt-3">Awalia Wahyu Destiana ☕✨</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-4 py-1 bg-pink-200 text-pink-700 rounded-full text-xs font-bold uppercase mb-4">
              ♡ About Me ♡
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800 leading-tight mb-6">
              Passionate about <span className="text-emerald-500 italic">system analysis</span> and application development.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              I am an Information Technology student passionate about system analysis and application development. I enjoy transforming user needs into structured and functional digital solutions.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              This portfolio highlights my projects in web development, system design, and Artificial Intelligence implementation.
            </p>
            <div className="flex justify-center md:justify-start gap-4 border-t border-pink-200 pt-6">
              <span className="text-xs font-bold text-slate-400 tracking-widest">♡ ANALYSIS</span>
              <span className="text-xs font-bold text-slate-400 tracking-widest">♡ CODE</span>
              <span className="text-xs font-bold text-slate-400 tracking-widest">♡ DESIGN</span>
            </div>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-16">
          <h2 className="text-2xl font-serif italic text-blue-500 mb-8 text-center">
            ✦ Education ✦
          </h2>
          <div className="bg-white p-6 md:p-12 rounded-[3rem] border border-blue-100 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl z-0"></div>
             
             <div className="w-28 h-28 md:w-32 md:h-32 bg-blue-50 rounded-[2rem] border-2 border-blue-200 flex items-center justify-center flex-shrink-0 rotate-3 hover:rotate-0 transition-transform z-10 overflow-hidden p-3">
                <img src="/logo ub.jpg" alt="Universitas Brawijaya" className="w-full h-full object-contain" />
             </div>

             <div className="text-center md:text-left z-10 w-full">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Current Student
                  </span>
                  <span className="text-xs font-bold text-slate-400 tracking-wider">
                    2024 — NOW
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">Universitas Brawijaya</h3>
                <p className="text-lg font-serif italic text-blue-600 mb-3">Fakultas Vokasi - D3 Teknologi Informasi</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Mahasiswa semester 5 Vokasi Teknologi Informasi Universitas Brawijaya. Memiliki fondasi akademik yang komprehensif di bidang 
                  pengembangan perangkat lunak (Web, Mobile, Framework), manajemen basis data, manajemen proyek, serta sistem cerdas berbasis IoT dan AI.
                </p>
             </div>
          </div>
        </section>

        {/* EXPERIENCE / PENGALAMAN MAGANG */}
        <section id="experience" className="py-16">
          <h2 className="text-2xl font-serif italic text-purple-500 mb-8 text-center">
            ✦ Experience ✦
          </h2>
          <div className="bg-white p-6 md:p-10 rounded-[3rem] border border-purple-100 shadow-sm max-w-4xl mx-auto relative overflow-hidden">
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-50 rounded-full blur-2xl z-0"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center bg-[#fdfbf7] p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                
                <div className="w-24 h-24 bg-purple-50 rounded-2xl border-2 border-purple-200 flex items-center justify-center flex-shrink-0 -rotate-3 hover:rotate-0 transition-transform overflow-hidden p-3 mx-auto md:mx-0">
                   <img src="/logo ip.png" alt="PLN Indonesia Power" className="w-full h-full object-contain" />
                </div>

                <div className="flex-1 w-full text-center md:text-left">
                   <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-2">
                     <h3 className="text-xl font-bold text-slate-800">Information Technology Intern</h3>
                     <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mx-auto md:mx-0">
                       Juli - September 2026
                     </span>
                   </div>
                   <p className="text-md font-serif italic text-purple-600 mb-3">Divisi Sistem Informasi — PLN Indonesia Power UBP Mrica</p>
                   <ul className="space-y-2 text-slate-600 text-sm text-left">
                     <li className="flex gap-3 items-start">
                       <span className="text-purple-400 font-bold">✦</span> 
                       <span>Merancang dan mengembangkan platform website <strong>Powercycle</strong> untuk digitalisasi manajemen operasional bank sampah menggunakan React, Next.js, dan Firebase.</span>
                     </li>
                     <li className="flex gap-3 items-start">
                       <span className="text-purple-400 font-bold">✦</span> 
                       <span>Mempelajari dan menangani konfigurasi perangkat keras (hardware) serta infrastruktur jaringan IT di lingkungan operasional perusahaan.</span>
                     </li>
                     <li className="flex gap-3 items-start">
                       <span className="text-purple-400 font-bold">✦</span> 
                       <span>Menjalani program magang industri selama 3 bulan yang mengintegrasikan pemahaman solusi perangkat lunak (software) dan fisik (hardware).</span>
                     </li>
                   </ul>
                </div>
             </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-16">
          <h2 className="text-2xl font-serif italic text-emerald-600 mb-8 flex items-center gap-2 justify-center">
            ✦ My Skills & Capabilities ✦
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50/80 p-8 rounded-[2rem] border border-emerald-200 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-emerald-900 mb-4 uppercase tracking-widest text-center border-b border-emerald-200 pb-4">System Analysis</h3>
              <ul className="space-y-3 text-emerald-800 text-sm font-medium">
                <li className="flex items-center gap-2">✦ Business Process Analysis</li>
                <li className="flex items-center gap-2">✦ System Requirement Analysis</li>
                <li className="flex items-center gap-2">✦ Database Design</li>
                <li className="flex items-center gap-2">✦ UML</li>
                <li className="flex items-center gap-2">✦ ERD</li>
                <li className="flex items-center gap-2">✦ DFD</li>
              </ul>
            </div>
            <div className="bg-pink-50/80 p-8 rounded-[2rem] border border-pink-200 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-pink-900 mb-4 uppercase tracking-widest text-center border-b border-pink-200 pb-4">Programming</h3>
              <ul className="space-y-3 text-pink-800 text-sm font-medium">
                <li className="flex items-center gap-2">✦ PHP (Laravel)</li>
                <li className="flex items-center gap-2">✦ SQL (MySQL)</li>
                <li className="flex items-center gap-2">✦ Java (OOP & Swing)</li>
                <li className="flex items-center gap-2">✦ Python</li>
                <li className="flex items-center gap-2">✦ HTML/CSS & JS</li>
                <li className="flex items-center gap-2">✦ React & Next.js</li>
                <li className="flex items-center gap-2">✦ Firebase</li>
              </ul>
            </div>
            <div className="bg-amber-50/80 p-8 rounded-[2rem] border border-amber-200 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-amber-900 mb-4 uppercase tracking-widest text-center border-b border-amber-200 pb-4">Soft Skills</h3>
              <ul className="space-y-3 text-amber-800 text-sm font-medium">
                <li className="flex items-center gap-2">✦ Analytical Thinking</li>
                <li className="flex items-center gap-2">✦ Problem Solving</li>
                <li className="flex items-center gap-2">✦ Systematic Thinking</li>
                <li className="flex items-center gap-2">✦ Communication</li>
                <li className="flex items-center gap-2">✦ Team Collaboration</li>
                <li className="flex items-center gap-2">✦ Time Management</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
             <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-6">Tools & Tech</h3>
             <div className="flex flex-wrap justify-center gap-4">
                {[
                  { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', rotate: 'rotate-1' },
                  { name: 'React', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', rotate: '-rotate-2' },
                  { name: 'Next.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', rotate: 'rotate-1' },
                  { name: 'Java', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', rotate: '-rotate-1' },
                  { name: 'Firebase', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', rotate: 'rotate-2' },
                  { name: 'VS Code', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', rotate: '-rotate-2' },
                  { name: 'phpMyAdmin', img: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/PhpMyAdmin_logo.svg', rotate: 'rotate-1' },
                  { name: 'Arduino', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg', rotate: '-rotate-1' },
                  { name: 'Figma', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', rotate: 'rotate-2' },
                  { name: 'Ubuntu', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg', rotate: '-rotate-2' },
                  { name: 'GitHub', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', rotate: 'rotate-1' },
                  { name: 'PHP', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', rotate: '-rotate-1' },
                  { name: 'TailwindCSS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', rotate: 'rotate-2' }
                ].map((tool, index) => (
                  <div key={index} className={`flex flex-col items-center justify-center bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform w-20 h-20 ${tool.rotate}`} title={tool.name}>
                    <img src={tool.img} alt={tool.name} className="w-10 h-10 object-contain" />
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-16">
          <h2 className="text-2xl font-serif italic text-pink-500 mb-8 text-center">
            ✦ Project & Academic Experience ✦
          </h2>
          <div className="bg-white p-8 rounded-[3rem] border border-pink-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsData.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </section>

        {/* BEHIND THE SCENES */}
        <section id="documentation" className="py-16 overflow-hidden">
          <h2 className="text-2xl font-serif italic text-emerald-500 mb-8 text-center">
            ✦ Behind the Scenes ✦
          </h2>
          <div className="relative w-full overflow-hidden pt-4 pb-10">
            <div className="animate-marquee flex gap-6 px-4">
              {[...docPhotos, ...docPhotos].map((photo, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white p-3 pb-8 rounded-lg shadow-md border border-slate-200 w-64 flex-shrink-0 transform ${photo.rotate} hover:rotate-0 hover:scale-105 hover:shadow-xl hover:z-20 transition-all duration-300 flex flex-col`}
                >
                  <div className="w-full aspect-square bg-slate-100 overflow-hidden mb-3 border border-slate-100">
                    <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover pointer-events-none" />
                  </div>
                  <p className="text-center font-serif text-slate-700 italic text-sm mt-auto">
                    {photo.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-16">
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border-2 border-dashed border-emerald-200 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-serif italic text-slate-800 mb-4">
                ✦ Get In Touch ✦
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Welcome to my portfolio contact section! I am an Information Technology student with experience in system analysis and web development. I enjoy creating structured digital solutions based on user needs. Feel free to contact me for collaboration or opportunities.
              </p>
              <a href="mailto:awaliawahyu02@gmail.com" className="inline-block px-10 py-4 bg-pink-400 hover:bg-pink-500 text-white text-sm font-bold tracking-widest uppercase rounded-full transition-colors shadow-md">
                Send an Email
              </a>
            </div>

            <div className="flex-1 bg-[#fdfbf7] p-8 rounded-[2rem] border border-slate-100 w-full text-sm">
              <div className="mb-4">
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Email Address</p>
                <a href="mailto:awaliawahyu02@gmail.com" className="font-serif text-slate-800 text-lg hover:text-pink-500 transition-colors">
                  awaliawahyu02@gmail.com
                </a>
              </div>
              <div className="mb-4">
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">WhatsApp</p>
                <a href="https://wa.me/6285337927610" target="_blank" rel="noopener noreferrer" className="font-serif text-slate-800 text-lg hover:text-emerald-600 transition-colors underline decoration-emerald-300">
                  +62 853-3792-7610
                </a>
              </div>
              <div className="mb-4">
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Github</p>
                <a href="https://github.com/awaliawd12" target="_blank" rel="noopener noreferrer" className="font-serif text-slate-800 text-lg underline decoration-pink-300">
                  awaliawd12
                </a>
              </div>
              <div className="flex gap-6 mt-6 pt-6 border-t border-slate-200">
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Instagram</p>
                  <a href="https://instagram.com/awdess" target="_blank" rel="noopener noreferrer" className="font-serif text-slate-800 hover:text-pink-500">@awdess</a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">LinkedIn</p>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="font-serif text-slate-800 hover:text-emerald-500 underline decoration-emerald-300">awaliawd</a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Bottom */}
      <footer className="w-full bg-pink-100/50 py-8 text-center mt-8">
        <h2 className="text-2xl font-serif text-pink-400 mb-2">Awalia Wahyu Destiana</h2>
        <p className="text-xs text-slate-400 uppercase tracking-widest">
          Terus belajar, berkarya, dan bertumbuh · © {new Date().getFullYear()}
        </p>
      </footer>

    </div>
  );
}