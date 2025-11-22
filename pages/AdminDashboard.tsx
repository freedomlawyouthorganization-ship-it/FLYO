import React, { useState, useEffect } from 'react';
import { UserPlus, Users, Trash2, Download, Upload, CreditCard, Search } from 'lucide-react';
import Button from '../components/Button';
import { Member } from '../types';
import { getMembers, saveMember, deleteMember } from '../services/storage';
import { v4 as uuidv4 } from 'uuid'; // We'll simulate UUID if package not available, but actually let's just use crypto.randomUUID()

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'list'>('list');
  const [members, setMembers] = useState<Member[]>([]);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Member>>({});
  const [cardFile, setCardFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    setMembers(getMembers());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'image/png') {
        alert('Only PNG files are allowed for card uploads.');
        return;
      }
      setCardFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.membershipId || !formData.expiryDate || !formData.designation) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const newMember: Member = {
        id: crypto.randomUUID(),
        fullName: formData.fullName,
        designation: formData.designation,
        membershipId: formData.membershipId,
        wing: formData.wing || 'General',
        expiryDate: formData.expiryDate,
        cardImage: previewUrl // Store Base64
      };

      saveMember(newMember);
      
      // Reset form
      setFormData({});
      setCardFile(null);
      setPreviewUrl('');
      alert('Member added successfully!');
      loadMembers();
      setActiveTab('list');
    } catch (error) {
      console.error(error);
      alert('Failed to save member. Image might be too large for local storage.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      deleteMember(id);
      loadMembers();
    }
  };

  const filteredMembers = members.filter(m => 
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.membershipId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-flyo-navy">Admin Dashboard</h2>
          <p className="text-slate-500 text-sm">Manage organization membership records</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'list' ? 'bg-flyo-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Users size={16} /> Member List
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'add' ? 'bg-flyo-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <UserPlus size={16} /> Add Member
          </button>
        </div>
      </div>

      {activeTab === 'add' && (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden max-w-4xl mx-auto animate-fade-in">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h3 className="font-bold text-lg text-slate-800">Add New Member</h3>
          </div>
          <form onSubmit={handleSubmit} className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input required type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-flyo-blue focus:border-flyo-blue"
                  value={formData.fullName || ''} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                <input required type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-flyo-blue focus:border-flyo-blue"
                  value={formData.designation || ''} onChange={e => setFormData({...formData, designation: e.target.value})} placeholder="e.g. Senior Advocate" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Membership ID</label>
                <input required type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-flyo-blue focus:border-flyo-blue"
                  value={formData.membershipId || ''} onChange={e => setFormData({...formData, membershipId: e.target.value})} placeholder="e.g. FLYO-24-005" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Wing</label>
                   <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-flyo-blue focus:border-flyo-blue"
                     value={formData.wing || ''} onChange={e => setFormData({...formData, wing: e.target.value})}>
                       <option value="">Select Wing</option>
                       <option value="Legal">Legal</option>
                       <option value="Youth">Youth</option>
                       <option value="Executive">Executive</option>
                       <option value="General">General</option>
                   </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                  <input required type="date" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-flyo-blue focus:border-flyo-blue"
                    value={formData.expiryDate || ''} onChange={e => setFormData({...formData, expiryDate: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Upload Card (PNG Only)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors relative">
                  <input type="file" accept="image/png" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="pointer-events-none">
                    <Upload className="mx-auto h-10 w-10 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-600">Click or drag PNG here</p>
                    {cardFile && <p className="text-xs text-green-600 font-bold mt-2">{cardFile.name}</p>}
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-100 rounded-lg p-4 flex items-center justify-center border border-slate-200 h-48">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                ) : (
                  <div className="text-slate-400 text-center">
                    <CreditCard className="mx-auto h-8 w-8 mb-1 opacity-50" />
                    <span className="text-xs">Card Preview</span>
                  </div>
                )}
              </div>

              <Button type="submit" isLoading={loading} className="w-full" disabled={!previewUrl}>
                Save Member Record
              </Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'list' && (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
            <h3 className="font-bold text-slate-800">Total Members: {members.length}</h3>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search name or ID..." 
                className="w-full pl-9 pr-4 py-2 rounded-md border border-slate-300 text-sm focus:ring-flyo-blue focus:border-flyo-blue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-700 uppercase bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Membership ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Designation</th>
                  <th className="px-6 py-3">Expiry</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMembers.length > 0 ? filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-flyo-blue font-mono">{member.membershipId}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{member.fullName}</td>
                    <td className="px-6 py-4">{member.designation}</td>
                    <td className="px-6 py-4 text-red-600">{member.expiryDate}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                       {member.cardImage && (
                         <a 
                           href={member.cardImage} 
                           download={`Card-${member.membershipId}.png`}
                           className="p-2 text-flyo-blue hover:bg-blue-50 rounded-full transition-colors"
                           title="Download Card"
                         >
                           <Download size={18} />
                         </a>
                       )}
                       <button 
                         onClick={() => handleDelete(member.id)}
                         className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                         title="Delete Member"
                       >
                         <Trash2 size={18} />
                       </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                      No members found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;