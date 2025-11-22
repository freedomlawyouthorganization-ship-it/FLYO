import { Member, CONSTANTS } from '../types';

export const getMembers = (): Member[] => {
  try {
    const data = localStorage.getItem(CONSTANTS.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading members", e);
    return [];
  }
};

export const saveMember = (member: Member): void => {
  const members = getMembers();
  const updatedMembers = [...members, member];
  localStorage.setItem(CONSTANTS.STORAGE_KEY, JSON.stringify(updatedMembers));
};

export const updateMember = (updatedMember: Member): void => {
  const members = getMembers();
  const index = members.findIndex(m => m.id === updatedMember.id);
  if (index !== -1) {
    members[index] = updatedMember;
    localStorage.setItem(CONSTANTS.STORAGE_KEY, JSON.stringify(members));
  }
};

export const deleteMember = (id: string): void => {
  const members = getMembers();
  const filtered = members.filter(m => m.id !== id);
  localStorage.setItem(CONSTANTS.STORAGE_KEY, JSON.stringify(filtered));
};

export const findMemberByMembershipId = (membershipId: string): Member | undefined => {
  const members = getMembers();
  return members.find(m => m.membershipId.trim().toLowerCase() === membershipId.trim().toLowerCase());
};