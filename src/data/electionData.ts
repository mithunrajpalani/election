import { UserCheck, Building2, ShieldCheck, FileSignature, MonitorSmartphone, BarChart3 } from 'lucide-react';

export const DATA = {
  timeline: [
    {
      id: "announcement",
      title: "Announcement by ECI",
      date: "Months before Election",
      description: "The Election Commission of India (ECI) announces the election schedule, dates, and phases.",
      details: "The announcement officially kicks off the election process. It includes dates for nominations, polling days, and counting. The Model Code of Conduct (MCC) comes into effect immediately to ensure a level playing field."
    },
    {
      id: "voter-roll",
      title: "Voter Registration & Rolls",
      date: "Continuous until deadline",
      description: "Eligible citizens register to vote, and the ECI updates the official electoral rolls.",
      details: "Citizens aged 18+ can apply for their Electoral Photo Identity Card (EPIC). The voter list is continuously updated and scrutinized to add new voters and remove deceased or duplicate entries."
    },
    {
      id: "nomination",
      title: "Nominations & Scrutiny",
      date: "Weeks before polling",
      description: "Candidates file their nomination papers, which are then scrutinized for validity. Candidates may also withdraw.",
      details: "Candidates submit affidavits detailing their criminal records, assets, and liabilities. The Returning Officer scrutinizes the papers. Valid candidates are then assigned official election symbols."
    },
    {
      id: "campaigning",
      title: "Election Campaigning",
      date: "Until 48 hours before voting",
      description: "Political parties and candidates hold rallies, roadshows, and distribute manifestos.",
      details: "Campaigning involves intense public outreach. It officially ends 48 hours before the end of polling (known as the 'silence period') to allow voters a peaceful environment to decide."
    },
    {
      id: "voting",
      title: "Voting Day (Phased)",
      date: "Election Days",
      description: "Voters cast their vote at designated polling booths using EVMs and VVPATs.",
      details: "For general elections, voting is often conducted in multiple phases across different states due to the sheer scale, security, and logistical requirements of the world's largest democracy."
    },
    {
      id: "counting",
      title: "Vote Counting",
      date: "Designated Counting Day",
      description: "EVMs are opened, and votes are counted under strict supervision.",
      details: "Votes are tallied simultaneously across counting centers in the country. VVPAT slips are also tallied against EVM counts for a randomly selected subset of machines to ensure accuracy."
    },
    {
      id: "results",
      title: "Results & Government Formation",
      date: "Following Counting",
      description: "The ECI declares results. The President invites the majority party/coalition to form the government.",
      details: "To form the government at the center, a party or coalition needs a simple majority (at least 272 seats) in the Lok Sabha. The elected leader is formally invited to become the Prime Minister and take the Oath of Office."
    }
  ],
  explainers: [
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
  ],
  quiz: [
    {
      id: 1,
      question: "What is the minimum voting age in India?",
      options: ["16", "18", "21", "25"],
      correctAnswerIndex: 1,
      explanation: "In India, the minimum voting age was lowered from 21 to 18 years by the 61st Constitutional Amendment Act in 1988."
    },
    {
      id: 2,
      question: "Which body conducts general elections in India?",
      options: [
        "The Supreme Court of India",
        "The Election Commission of India",
        "The Parliament",
        "The State Election Commission"
      ],
      correctAnswerIndex: 1,
      explanation: "The Election Commission of India (ECI) is the autonomous constitutional authority responsible for conducting national and state elections in India."
    },
    {
      id: 3,
      question: "How many elected seats are there in the Lok Sabha?",
      options: [
        "250",
        "543",
        "545",
        "552"
      ],
      correctAnswerIndex: 1,
      explanation: "Currently, 543 members are directly elected to the Lok Sabha from single-member constituencies across the country."
    },
    {
      id: 4,
      question: "What does EVM stand for?",
      options: ["Election Voting Mechanism", "Electronic Voting Machine", "Electoral Verification Module", "Electronic Voter Method"],
      correctAnswerIndex: 1,
      explanation: "EVM stands for Electronic Voting Machine, which has been used extensively in Indian elections to securely record votes without paper ballots."
    },
    {
      id: 5,
      question: "How often are Lok Sabha elections held in India, assuming the house completes its full term?",
      options: ["Every 4 years", "Every 5 years", "Every 6 years", "Every 10 years"],
      correctAnswerIndex: 1,
      explanation: "Under normal circumstances, the Lok Sabha has a term of 5 years, after which general elections are held."
    }
  ]
};
