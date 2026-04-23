import { UserCheck, Building2, ShieldCheck, FileSignature, MonitorSmartphone, BarChart3 } from 'lucide-react';

export const explainerData = [
  {
    id: "eligibility",
    title: "Voter Eligibility",
    icon: UserCheck,
    content: "To vote in India, you must be an Indian citizen, at least 18 years old on the qualifying date, and enrolled in the electoral roll. Upon registration, voters are issued an EPIC (Electors Photo Identity Card) commonly known as a Voter ID."
  },
  {
    id: "typesOfElections",
    title: "Types of Elections",
    icon: Building2,
    content: "India holds direct elections for the Lok Sabha (Lower House of Parliament) and Vidhan Sabha (State Legislative Assemblies), as well as indirect elections for the Rajya Sabha and local body elections for Panchayats and Municipalities."
  },
  {
    id: "eci",
    title: "Role of the ECI",
    icon: ShieldCheck,
    content: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India at national, state, and district levels, ensuring free and fair elections."
  },
  {
    id: "nomination",
    title: "Nomination & Symbols",
    icon: FileSignature,
    content: "Candidates file nomination papers with the Returning Officer. To help a largely diverse voting population, the ECI allots distinct Election Symbols to recognized political parties and independent candidates."
  },
  {
    id: "evm",
    title: "EVMs & VVPATs",
    icon: MonitorSmartphone,
    content: "Electronic Voting Machines (EVMs) record votes securely without networking. They are coupled with Voter Verifiable Paper Audit Trail (VVPAT) machines, which let voters visually verify that their vote was cast correctly."
  },
  {
    id: "counting",
    title: "Counting & Formation",
    icon: BarChart3,
    content: "India uses the First-Past-The-Post (FPTP) system. A party or coalition must secure the majority in the Lok Sabha (272+ seats) to form the central government. The President then invites the leader to take charge as Prime Minister."
  }
];
