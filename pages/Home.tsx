import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Download, CreditCard, Calendar, User, Briefcase, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import { findMemberByMembershipId } from '../services/storage';
import { Member } from '../types';

const Home: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState<Member | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setHasSearched(false);
    
    // Simulate network delay for premium feel
    setTimeout(() => {
      const member = findMemberByMembershipId(searchId);
      setResult(member || null);
      setHasSearched(true);
      setLoading(false);
    }, 800);
  };

  const handleDownload = () => {
    if (!result?.cardImage) return;
    const link = document.createElement('a');
    link.href = result.cardImage;
    link.download = `FLYO-Card-${result.membershipId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-flyo-navy mb-4">Membership Verification</h2>
        <p className="text-slate-600">Enter a unique Membership ID to verify details and view the official membership card.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-100 mb-8">
        <form onSubmit={handleSearch} className="flex gap-3 flex-col sm:flex-row">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-flyo-blue focus:border-flyo-blue sm:text-sm"
              placeholder="Enter Membership ID (e.g. FLYO-2024-001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          <Button type="submit" isLoading={loading} className="w-full sm:w-auto py-3">
            Verify Member
          </Button>
        </form>
      </div>

      {hasSearched && !result && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center animate-fade-in">
          <XCircle className="mx-auto h-12 w-12 text-red-500 mb-3" />
          <h3 className="text-lg font-bold text-red-800">No Member Found</h3>
          <p className="text-red-600">We could not find any active member with ID: <span className="font-mono font-bold">{searchId}</span>.</p>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in border border-slate-200">
          <div className="bg-flyo-navy px-6 py-4 border-b border-flyo-gold/30 flex justify-between items-center">
            <div className="flex items-center gap-2 text-flyo-gold">
              <ShieldCheck size={24} />
              <span className="font-bold uppercase tracking-wider text-sm">Verified Member</span>
            </div>
            <span className="text-white/60 text-xs font-mono">{result.id.slice(0,8)}</span>
          </div>
          
          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
            {/* Details Column */}
            <div className="space-y-6">
              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1 mb-1">
                  <User size={12} /> Full Name
                </label>
                <p className="text-xl font-bold text-slate-900">{result.fullName}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1 mb-1">
                    <Briefcase size={12} /> Designation
                  </label>
                  <p className="font-medium text-slate-800">{result.designation}</p>
                </div>
                <div>
                   <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1 mb-1">
                    <CreditCard size={12} /> Membership ID
                  </label>
                  <p className="font-mono font-medium text-flyo-blue bg-blue-50 inline-block px-2 py-0.5 rounded border border-blue-100">
                    {result.membershipId}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1 mb-1">
                    Wing
                  </label>
                  <p className="font-medium text-slate-800">{result.wing}</p>
                 </div>
                 <div>
                   <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1 mb-1">
                    <Calendar size={12} /> Expiry Date
                  </label>
                  <p className="font-medium text-red-600">{result.expiryDate}</p>
                 </div>
              </div>
            </div>

            {/* Card Preview Column */}
            <div className="flex flex-col items-center">
              <div className="w-full aspect-[1.586] bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative shadow-inner mb-4 group">
                {result.cardImage ? (
                  <img src={result.cardImage} alt="Membership Card" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center p-4 text-slate-400">
                    <CreditCard className="mx-auto h-12 w-12 mb-2 opacity-50" />
                    <p className="text-sm">No Card Preview Available</p>
                  </div>
                )}
              </div>
              
              {result.cardImage && (
                <Button onClick={handleDownload} variant="secondary" className="w-full gap-2">
                  <Download size={18} /> Download Card (PNG)
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;