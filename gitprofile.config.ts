// gitprofile.config.ts

import { CONTENT_WORK } from './content/work-manifest.ts';

const CONFIG = {
  github: {
    username: 'harmanjitkaur', // Your GitHub org/user name. (This is the only required config)
  },
  headline: 'PharmD | Clinical Research | Scientific Writing',
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/harmanjitkaur/harmanjitkaur.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/harmanjitkaur/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: false, // Display GitHub projects?
      header: 'GitHub Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'updated', // Sort projects by 'stars' or 'updated'
        limit: 6, // How many projects to display.
        exclude: {
          forks: true, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'Selected Research & Technical Work',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        ...CONTENT_WORK,
        {
          title: 'Clinical Research & Scientific Writing',
          category: 'Featured Online Work',
          description:
            'Supported research documentation, literature review, source documentation, and scientific communication in regulated clinical and healthcare settings.',
          link: 'https://1drv.ms/b/c/20df1b8d73d13a36/IQCUXAr80N7wSqjPikdG6CgLAfoclLc1FIqIcLEDxK59Urw',
        },
        {
          title: 'Research Documentation & Data Analysis',
          category: 'Featured Online Work',
          description:
            'Executed 96-well dose-response assays, serial dilution workflows, and EC50 analysis in GraphPad Prism and Excel while translating technical findings for scientific stakeholders.',
          link: 'https://www.coursera.org/account/accomplishments/specialization/9AMFBPH8IPHM?utm_source=email&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n',
        },
        {
          title: 'Scientific Literature & Evidence Review',
          category: 'Featured Online Work',
          description:
            'Synthesized peer-reviewed evidence and organized supporting materials into clear, presentation-ready documentation for pharmaceutical and clinical research work.',
          link: 'https://onedrive.live.com/?id=%2Fpersonal%2F20df1b8d73d13a36%2FDocuments%2FAttachments&listurl=%2Fpersonal%2F20df1b8d73d13a36%2FDocuments&redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy8yMGRmMWI4ZDczZDEzYTM2L0lRQ1VYQXI4ME43d1NxalBpa2RHNkNnTEFmb2NsTGMxRklxSWNMRUR4SzU5VXJ3&ga=1',
        },
      ],
    },
  },
  seo: {
    title: 'Harmanjit Kaur | PharmD, MS Pharmaceutical Sciences',
    description:
      'PharmD and MS Pharmaceutical Sciences professional specializing in clinical research, drug development, scientific writing, and regulatory documentation.',
    imageURL: '/logo.png',
  },
  social: {
    linkedin: 'harmanjit-kaur-pharmd-b93a34144',
    x: '',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '', // example: '1/jeff-atwood'
    discord: '',
    telegram: '',
    website: '',
    phone: '(425) 306-8721',
    email: 'kaurharmanjit@hotmail.com',
  },
  resume: {
    fileUrl: '/harmanjit-kaur-resume.docx', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Clinical Research',
    'Drug Development',
    'Regulatory Guidelines',
    'Scientific Writing',
    'Medical/Scientific Communication',
    'Literature Review',
    'Clinical Trial Design',
    'Data Analysis',
    'GraphPad Prism',
    'Excel',
    'Quality Assurance',
    'Source Documentation',
    'SOPs',
    'Healthcare Documentation',
    'Project Coordination',
  ],
  skillGroups: [
    {
      title: 'Clinical Research',
      skills: [
        'Clinical Research',
        'Drug Development',
        'Clinical Trial Design',
        'Literature Review',
      ],
    },
    {
      title: 'Scientific Communication',
      skills: [
        'Scientific Writing',
        'Medical/Scientific Communication',
        'Healthcare Documentation',
      ],
    },
    {
      title: 'Data & Analysis',
      skills: ['Data Analysis', 'GraphPad Prism', 'Excel'],
    },
    {
      title: 'Regulatory & Quality',
      skills: [
        'Regulatory Guidelines',
        'Quality Assurance',
        'Source Documentation',
        'SOPs',
      ],
    },
  ],
  experiences: [
    {
      company: 'Research Lab • Inpatient Health System',
      position: 'Pharmacist Intern / APPE Research and Clinical Rotations',
      from: '2024',
      to: '2025',
      companyLink:
        'https://www.linkedin.com/in/harmanjit-kaur-pharmd-b93a34144',
      description:
        'Supported inpatient clinical rotations and pharmaceutical sciences research through literature review, source documentation, and scientific analysis.',
    },
    {
      company: 'Retail, Hospital, and Centralized Pharmacy Settings',
      position: 'Pharmacy Technician',
      from: '2007',
      to: '2022',
      companyLink: '',
      description:
        'Supported medication workflows across retail, hospital, and centralized pharmacy settings while coordinating patient-facing service and daily operations.',
    },
  ],
  leadership: [
    {
      organization: 'APhA',
      position: 'Member',
      from: '2022',
      to: 'Present',
      organizationLink: 'https://aphanet.org/',
    },
    {
      organization: 'Kappa Psi',
      position: 'Chaplain',
      from: '2023',
      to: '2024',
      organizationLink: 'https://www.kappapsi.org/',
    },
    {
      organization: 'IPHO',
      position: 'Vice President',
      from: '2023',
      to: '2024',
      organizationLink: '',
    },
  ],
  certifications: [],
  educations: [
    {
      institution: 'Pacific University School of Pharmacy',
      degree: 'PharmD',
      from: '2021',
      to: '2025',
    },
    {
      institution: 'Pacific University School of Pharmacy',
      degree: 'MS Pharmaceutical Sciences',
      from: '2025',
      to: '2026',
    },
  ],
  publications: [],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: '', // medium | dev
    username: '', // to hide blog section, keep it empty
    limit: 2, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: { id: '', snippetVersion: 6 },
  themeConfig: {
    defaultTheme: 'lofi',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'caramellatte',
      'abyss',
      'silk',
      'procyon',
    ],
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `© 2025 Harmanjit Kaur • PharmD, MS Pharmaceutical Sciences`,

  enablePWA: true,
};

export default CONFIG;
