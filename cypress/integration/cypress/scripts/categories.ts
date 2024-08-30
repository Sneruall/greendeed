import { jobCategoriesList } from '../../../../types/jobCategories';

// Function to map department name or job title to job category
export const mapDepartmentToCategory = (departmentOrTitle: string) => {
  const lowerCasedInput = departmentOrTitle.toLowerCase();

  // Keyword mapping for partial matches
  const keywordCategoryMap = [
    {
      keywords: ['accounting', 'finance', 'auditor', 'cpa', 'financial'],
      category: 'Accounting and Finance',
    },
    {
      keywords: [
        'administration',
        'office',
        'admin',
        'secretary',
        'clerk',
        'assistant',
      ],
      category: 'Administration and Office Support',
    },
    {
      keywords: [
        'advertising',
        'marketing',
        'brand',
        'seo',
        'content',
        'digital marketing',
        'ad',
      ],
      category: 'Advertising and Marketing',
    },
    {
      keywords: [
        'architecture',
        'engineer',
        'engineering',
        'civil',
        'mechanical',
        'structural',
        'architect',
      ],
      category: 'Architecture and Engineering',
    },
    {
      keywords: [
        'art',
        'fashion',
        'design',
        'creative',
        'designer',
        'illustrator',
      ],
      category: 'Art, Fashion, and Design',
    },
    {
      keywords: [
        'business',
        'operations',
        'management',
        'manager',
        'business operations',
        'strategy',
      ],
      category: 'Business Operations and Management',
    },
    {
      keywords: [
        'consulting',
        'project management',
        'consultant',
        'project manager',
        'pm',
      ],
      category: 'Consulting and Project Management',
    },
    {
      keywords: [
        'customer service',
        'support',
        'customer support',
        'helpdesk',
        'client service',
        'csr',
      ],
      category: 'Customer Service and Support',
    },
    {
      keywords: [
        'data',
        'science',
        'analytics',
        'data scientist',
        'analyst',
        'big data',
      ],
      category: 'Data Science and Analytics',
    },
    {
      keywords: [
        'education',
        'training',
        'teacher',
        'instructor',
        'educator',
        'trainer',
        'coach',
      ],
      category: 'Education and Training',
    },
    {
      keywords: [
        'environmental',
        'agriculture',
        'sustainability',
        'farming',
        'conservation',
        'ecology',
      ],
      category: 'Environmental and Agriculture',
    },
    {
      keywords: [
        'health',
        'wellness',
        'fitness',
        'nutrition',
        'healthcare',
        'dietitian',
        'coach',
      ],
      category: 'Health and Wellness',
    },
    {
      keywords: [
        'hospitality',
        'tourism',
        'hotel',
        'restaurant',
        'travel',
        'guest service',
      ],
      category: 'Hospitality and Tourism',
    },
    {
      keywords: [
        'human resources',
        'hr',
        'recruitment',
        'talent',
        'people operations',
      ],
      category: 'Human Resources',
    },
    {
      keywords: [
        'information technology',
        'it',
        'computer science',
        'tech',
        'networking',
        'system admin',
        'devops',
      ],
      category: 'Information Technology and Computer Science',
    },
    {
      keywords: [
        'legal',
        'lawyer',
        'attorney',
        'paralegal',
        'legal assistant',
        'litigation',
      ],
      category: 'Legal',
    },
    {
      keywords: [
        'logistics',
        'transportation',
        'supply chain',
        'shipping',
        'warehouse',
        'delivery',
      ],
      category: 'Logistics and Transportation',
    },
    {
      keywords: [
        'manufacturing',
        'production',
        'factory',
        'assembly',
        'plant',
        'manufacture',
      ],
      category: 'Manufacturing and Production',
    },
    {
      keywords: [
        'media',
        'communication',
        'journalism',
        'public relations',
        'pr',
        'reporter',
      ],
      category: 'Media and Communication',
    },
    {
      keywords: [
        'military',
        'government',
        'defense',
        'public service',
        'armed forces',
      ],
      category: 'Military and Government',
    },
    {
      keywords: [
        'nonprofit',
        'social services',
        'ngo',
        'charity',
        'community',
        'volunteer',
      ],
      category: 'Nonprofit and Social Services',
    },
    {
      keywords: [
        'nursing',
        'healthcare',
        'nurse',
        'patient care',
        'medical',
        'clinical',
      ],
      category: 'Nursing and Healthcare',
    },
    {
      keywords: [
        'photography',
        'video',
        'animation',
        'videographer',
        'editor',
        'photographer',
      ],
      category: 'Photography, Video, and Animation',
    },
    {
      keywords: [
        'real estate',
        'property management',
        'realtor',
        'broker',
        'property',
      ],
      category: 'Real Estate and Property Management',
    },
    {
      keywords: [
        'retail',
        'consumer goods',
        'sales associate',
        'store manager',
        'retail sales',
      ],
      category: 'Retail and Consumer Goods',
    },
    {
      keywords: [
        'sales',
        'marketing',
        'account executive',
        'sales manager',
        'sales rep',
      ],
      category: 'Sales and Marketing',
    },
    {
      keywords: [
        'science',
        'research',
        'scientist',
        'researcher',
        'lab',
        'laboratory',
      ],
      category: 'Science and Research',
    },
    {
      keywords: [
        'social media',
        'marketing',
        'social media manager',
        'content creator',
        'influencer',
      ],
      category: 'Social Media and Marketing',
    },
    {
      keywords: [
        'software',
        'development',
        'developer',
        'engineer',
        'programmer',
        'coder',
      ],
      category: 'Software Development',
    },
    {
      keywords: [
        'sports',
        'entertainment',
        'athlete',
        'coach',
        'trainer',
        'event manager',
      ],
      category: 'Sports and Entertainment',
    },
    {
      keywords: [
        'technical writing',
        'translation',
        'writer',
        'editor',
        'translator',
      ],
      category: 'Technical Writing and Translation',
    },
    {
      keywords: [
        'telecommunications',
        'networking',
        'telecom',
        'network engineer',
        'network admin',
      ],
      category: 'Telecommunications and Networking',
    },
    {
      keywords: [
        'travel',
        'hospitality',
        'tourism',
        'agent',
        'travel consultant',
      ],
      category: 'Travel and Hospitality',
    },
    {
      keywords: [
        'web development',
        'mobile development',
        'frontend',
        'backend',
        'fullstack',
        'developer',
      ],
      category: 'Web and Mobile Development',
    },
  ];

  // Step 1: Check for direct matches first
  const directMatch = jobCategoriesList.find((category) =>
    lowerCasedInput.includes(category.name.toLowerCase())
  );

  if (directMatch) {
    console.log(`Direct match found for: ${directMatch.name}`);

    return directMatch;
  }

  // Step 2: Check for keyword-based partial matches using word boundary regex
  for (const mapping of keywordCategoryMap) {
    for (const keyword of mapping.keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i'); // Word boundary regex, case insensitive

      if (regex.test(lowerCasedInput)) {
        console.log(
          `Partial match found for category: ${mapping.category}, keyword: ${keyword}`
        );
        return (
          jobCategoriesList.find(
            (category) => category.name === mapping.category
          ) || {
            id: 35,
            name: 'Other',
            slug: 'other',
          }
        );
      }
    }
  }

  // Step 3: Default to "Other" if no match is found
  console.log(`No match found, returning "Other".`);

  return {
    id: 35,
    name: 'Other',
    slug: 'other',
  };
};
