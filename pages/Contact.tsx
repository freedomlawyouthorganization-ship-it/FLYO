import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200">
        <div className="bg-flyo-navy p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
          <p className="text-slate-400">We are here to assist you with membership queries and general information.</p>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="grid gap-8">
            
            <a href="https://wa.me/923703291003" target="_blank" rel="noreferrer" className="flex items-start gap-6 p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-flyo-gold/50 hover:shadow-lg transition-all group">
              <div className="bg-green-500/10 p-4 rounded-full text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900 mb-1">WhatsApp / Phone</h3>
                <p className="text-slate-600 mb-2">Available 9:00 AM - 5:00 PM (PKT)</p>
                <span className="font-mono text-lg font-bold text-flyo-blue group-hover:underline flex items-center gap-2">
                  +92 370 3291003
                  <ExternalLink size={14} />
                </span>
              </div>
            </a>

            <a href="mailto:freedomlawyouthorganization@gmail.com" className="flex items-start gap-6 p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-flyo-gold/50 hover:shadow-lg transition-all group">
              <div className="bg-blue-500/10 p-4 rounded-full text-blue-600 group-hover:bg-flyo-blue group-hover:text-white transition-colors">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900 mb-1">Email Address</h3>
                <p className="text-slate-600 mb-2">For official correspondence and inquiries</p>
                <span className="font-medium text-lg text-flyo-blue break-all group-hover:underline flex items-center gap-2">
                  freedomlawyouthorganization@gmail.com
                  <ExternalLink size={14} />
                </span>
              </div>
            </a>

            <div className="flex items-start gap-6 p-6 rounded-xl bg-slate-50 border border-slate-200 opacity-80">
              <div className="bg-slate-200 p-4 rounded-full text-slate-600">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900 mb-1">Head Office</h3>
                <p className="text-slate-600">
                  Freedom Law Youth Organization<br/>
                  Islamabad, Pakistan
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;