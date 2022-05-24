export type Job = {
  organizationName: string;
  organizationId: string;
  organizationDescription: string;
  jobTitle: string;
  tag1: string;
  tags: string;
  jobDescription: string;
  jobType: string;
  salary: string;
  location: string;
  link: string;
  email: string;
  timestamp: number;
  id: string;
  price: number;
  paid: boolean;
  hidden: boolean;
};

// Todo Use the type below
// Make these shorter (name, id and description), and adjust in hiring.tsx and maybe other pages
export type Organization = {
  organizationName: string;
  organizationId: string;
  organizationDescription: string;
};
