import React from 'react';

const Info: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200">
      <div className="relative h-48 bg-flyo-navy flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
         <div className="text-center relative z-10 px-4">
           <h1 className="text-4xl font-bold text-white mb-2">About FLYO</h1>
           <p className="text-flyo-gold font-medium tracking-wider uppercase">Freedom Law Youth Organization</p>
         </div>
      </div>

      <div className="p-8 md:p-12 space-y-10 text-slate-700 leading-relaxed">
        
        <section>
          <h2 className="text-2xl font-bold text-flyo-navy mb-4 flex items-center gap-3">
            <span className="w-8 h-1 bg-flyo-gold rounded-full"></span>
            Introduction
          </h2>
          <p className="mb-4 text-lg">
            The Freedom Law Youth Organization (FLYO) is a premier body dedicated to empowering the next generation of legal minds and advocates for justice. Established to bridge the gap between academic legal education and practical advocacy, FLYO provides a platform for youth to engage with the rule of law, human rights, and social justice initiatives.
          </p>
          <p>
            Our members include law students, young practitioners, and social activists committed to upholding the principles of freedom and equity within our legal framework.
          </p>
        </section>

        <div className="h-px bg-slate-200"></div>

        <section>
          <h2 className="text-2xl font-bold text-flyo-navy mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-flyo-gold rounded-full"></span>
            Our Manifesto
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-flyo-blue mb-2">Justice & Equality</h3>
                <p className="text-sm">We strive to ensure that justice is accessible to all, regardless of socio-economic status, and we advocate fiercely against discrimination in all its forms.</p>
             </div>
             <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-flyo-blue mb-2">Legal Empowerment</h3>
                <p className="text-sm">To equip the youth with the knowledge of their constitutional rights and duties, fostering a society that respects the rule of law.</p>
             </div>
             <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-flyo-blue mb-2">Integrity & Ethics</h3>
                <p className="text-sm">Maintaining the highest standards of professional ethics and integrity in the legal profession, serving as role models for the community.</p>
             </div>
             <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-flyo-blue mb-2">Public Service</h3>
                <p className="text-sm">Dedication to public interest litigation and pro-bono services to assist the marginalized and voiceless sections of society.</p>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Info;