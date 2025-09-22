import { BASE_URL } from '../lib/constant';

export interface Module {
  week: number;
  title: string;
  duration: string;
  description: string;
  topics: string[];
}

export interface Course {
  title: string;
  description: string;
  duration: string;
  level: string;
  nextStart: string;
  skills: {
    icon: string;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    description: string;
  }[];
  price: string;
  rating: number;
  students: number;
  image: string;
  tags: string[];
  highlights: string[];
  modules: Module[];
}

export const courseData: Record<string, Course> = {
  'spring-boot-micro-ai': {
    title: 'Spring Boot Microservices with AI',
    description:
      'Build scalable microservices using Spring Boot, integrating AI-driven solutions for intelligent applications.',
    duration: '7 weeks',
    level: 'Intermediate',
    nextStart: '1 June, 2025',
    price: {
      original: '₹19,999',
      offer: '₹12,999',
    },
    rating: 4.8,
    skills: [
      {
        icon: 'server',
        name: 'Microservices Architecture',
        level: 'Advanced',
        description:
          'Design, develop, and deploy microservices with Spring Boot',
      },
      {
        icon: 'deployment',
        name: 'Deployments',
        level: 'Intermediate',
        description: 'Leverage docker and kubernetes for deployments',
      },
      {
        icon: 'programming',
        name: 'Spring Boot',
        level: 'Advanced',
        description: 'Work with Spring Boot annotations',
      },
    ],
    students: 250,
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    tags: ['Spring Boot', 'Microservices', 'AI', 'docker', 'Kubernetes'],
    highlights: [
      'Develop AI-powered microservices',
      'Implement event-driven architecture',
      'Secure microservices with OAuth and JWT',
      'Deploy applications using Kubernetes',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Microservices and Spring Boot',
        duration: '1 week',
        description:
          'Understanding microservices architecture and setting up a Spring Boot project.',
        topics: [
          'Monolithic vs Microservices Architecture',
          'Introduction to Spring Boot',
          'Setting up a Spring Boot Application',
          'Dependency Management with Spring Boot Starter Packs',
          'Building a Simple REST API',
        ],
      },
      {
        week: 2,
        title: 'Building RESTful APIs with Spring Boot',
        duration: '1 week',
        description:
          'Developing RESTful APIs using Spring Boot and handling data persistence.',
        topics: [
          'Spring Boot Controllers and Services',
          'CRUD Operations with Spring Data JPA',
          'Database Connectivity (MySQL/PostgreSQL)',
          'Exception Handling in Spring Boot',
          'Testing REST APIs with Postman',
        ],
      },
      {
        week: 3,
        title: 'Microservices Communication and Service Discovery',
        duration: '1 week',
        description:
          'Implementing inter-service communication and service discovery in microservices.',
        topics: [
          'Introduction to Service Discovery',
          'Eureka Server and Eureka Clients',
          'Inter-Service Communication using Feign Clients and RestTemplate',
          'Spring Cloud Config for Centralized Configuration',
          'Resilience with Circuit Breaker (Resilience4J)',
        ],
      },
      {
        week: 4,
        title: 'API Gateway, Security, and Monitoring',
        duration: '1 week',
        description:
          'Implementing API Gateway, securing microservices, and monitoring applications.',
        topics: [
          'Spring Cloud Gateway for API Management',
          'JWT Authentication and Authorization',
          'OAuth2 and Role-Based Access Control',
          'Spring Boot Actuator for Monitoring',
          'Logging and Tracing with Sleuth and Zipkin',
        ],
      },
      {
        week: 5,
        title: 'Integrating AI into Microservices',
        duration: '1 week',
        description: 'Enhancing microservices with AI-driven capabilities.',
        topics: [
          'Introduction to AI and Machine Learning in Microservices',
          'Integrating AI Models using TensorFlow and PyTorch',
          'Using OpenAI APIs for Natural Language Processing',
          'AI-driven Recommendation Systems',
          'Real-time AI Decision Making in Microservices',
        ],
      },
      {
        week: 6,
        title: 'Event-Driven Microservices and Message Queues',
        duration: '1 week',
        description:
          'Implementing asynchronous communication with message brokers.',
        topics: [
          'Introduction to Event-Driven Architecture',
          'Using Kafka and RabbitMQ for Messaging',
          'Event Sourcing and CQRS Pattern',
          'Spring Cloud Stream for Event Processing',
          'Handling Failures and Retry Mechanisms',
        ],
      },
      {
        week: 7,
        title: 'Deployment, Scaling, and CI/CD for Microservices',
        duration: '1 week',
        description:
          'Deploying microservices on cloud platforms and implementing CI/CD pipelines.',
        topics: [
          'Dockerizing Spring Boot Microservices',
          'Kubernetes for Microservices Orchestration',
          'CI/CD Pipelines with Jenkins/GitHub Actions',
          'Deploying Microservices on AWS/GCP/Azure',
          'Scaling and Load Balancing with Kubernetes',
        ],
      },
    ],
  },
  'spring-boot-mvc': {
    title: 'Spring Boot MVC Applications with Hibernate',
    description:
      'Learn to develop enterprise-level web applications using Spring Boot, MVC, and Hibernate for data persistence.',
    duration: '5 weeks',
    level: 'Intermediate',
    nextStart: '1 June, 2025',
    price: {
      original: '₹15,499',
      offer: '₹8,999',
    },
    rating: 4.7,
    skills: [
      {
        icon: 'server',
        name: 'Spring MVC',
        level: 'Intermediate',
        description: 'Develop web applications with Spring Boot MVC',
      },
      {
        icon: 'database',
        name: 'Hibernate ORM',
        level: 'Intermediate',
        description: 'Master database management with Hibernate and JPA',
      },
      {
        icon: 'security',
        name: 'Web Security',
        level: 'Beginner',
        description:
          'Implement authentication and authorization using Spring Security',
      },
    ],
    students: 190,
    image: `${BASE_URL}courses/spring-boot-mvc-applications-with-hibernate.jpg`,
    tags: ['Spring Boot', 'Hibernate', 'MVC'],
    highlights: [
      'Develop web apps using Spring Boot and MVC',
      'Manage databases with Hibernate and JPA',
      'Implement authentication and role-based access',
      'Deploy applications on cloud platforms',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Spring Boot and MVC Architecture',
        duration: '1 week',
        description:
          'Understanding the fundamentals of Spring Boot and the Model-View-Controller (MVC) architecture.',
        topics: [
          'Introduction to Spring Boot',
          'Understanding MVC Design Pattern',
          'Setting Up a Spring Boot MVC Project',
          'Handling Requests with Spring Controllers',
          'Thymeleaf for Server-Side Rendering',
        ],
      },
      {
        week: 2,
        title: 'Data Handling with Spring Boot and Hibernate',
        duration: '1 week',
        description:
          'Integrating Hibernate for Object-Relational Mapping (ORM) and handling data persistence.',
        topics: [
          'Introduction to Hibernate and JPA',
          'Configuring Spring Boot with Hibernate',
          'Entity Mapping and Annotations',
          'CRUD Operations with Spring Data JPA',
          'Handling Relationships (One-to-One, One-to-Many, Many-to-Many)',
        ],
      },
      {
        week: 3,
        title: 'Spring Boot Form Handling and Validation',
        duration: '1 week',
        description:
          'Managing user input with forms, validation, and exception handling.',
        topics: [
          'Form Handling in Spring Boot MVC',
          'Binding Request Data with Model Attributes',
          'Spring Boot Form Validation (JSR-303)',
          'Custom Validation Constraints',
          'Exception Handling in Spring Boot',
        ],
      },
      {
        week: 4,
        title: 'Security, Authentication, and Authorization',
        duration: '1 week',
        description:
          'Implementing authentication, role-based authorization, and securing MVC applications.',
        topics: [
          'Spring Security Basics',
          'User Authentication with Spring Security',
          'Role-Based Authorization',
          'JWT Authentication for APIs',
          'CSRF Protection and Secure Session Management',
        ],
      },
      {
        week: 5,
        title: 'Deployment, Testing, and Performance Optimization',
        duration: '1 week',
        description:
          'Deploying applications, writing tests, and optimizing performance.',
        topics: [
          'Unit Testing with JUnit and Mockito',
          'Integration Testing for Spring Boot MVC',
          'Performance Optimization Techniques',
          'Deploying Spring Boot Applications on AWS/GCP',
          'Containerizing Applications with Docker',
        ],
      },
    ],
  },
  'problem-solving': {
    title: 'Problem Solving, Data Structure and Algorithms',
    description:
      'Enhance problem-solving skills with in-depth knowledge of data structures and algorithms, crucial for coding interviews.',
    duration: '5 weeks',
    level: 'Advanced',
    nextStart: '1 June, 2025',
    price: {
      original: '₹17,499',
      offer: '₹7,999',
    },
    rating: 4.9,
    skills: [
      {
        icon: 'code',
        name: 'Algorithms',
        level: 'Advanced',
        description:
          'Master sorting, searching, graph algorithms, and dynamic programming',
      },
      {
        icon: 'layers',
        name: 'Data Structures',
        level: 'Advanced',
        description: 'Work with linked lists, trees, heaps, and graphs',
      },
      {
        icon: 'terminal',
        name: 'Competitive Coding',
        level: 'Intermediate',
        description: 'Solve problems efficiently with optimized solutions',
      },
    ],
    students: 320,
    image:
      'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?auto=format&fit=crop&w=800&q=80',
    tags: ['DSA', 'Algorithms', 'Coding'],
    highlights: [
      'Solve real-world coding challenges',
      'Prepare for FAANG interviews',
      'Optimize time and space complexity',
      'Master recursion and dynamic programming',
    ],
    modules: [
      {
        week: 1,
        title: 'Fundamentals of Problem Solving and Complexity Analysis',
        duration: '1 week',
        description:
          'Understanding problem-solving approaches, time and space complexity, and basic programming constructs.',
        topics: [
          'Introduction to Problem Solving Techniques',
          'Big O Notation and Complexity Analysis',
          'Recursion and Backtracking',
          'Brute Force vs Optimized Approaches',
          'Solving Basic Coding Problems (Patterns, Math, and Bit Manipulation)',
        ],
      },
      {
        week: 2,
        title: 'Arrays, Strings, and Linked Lists',
        duration: '1 week',
        description:
          'Mastering essential linear data structures used in competitive programming and interviews.',
        topics: [
          'Arrays: Searching, Sorting, Two-Pointer, Sliding Window',
          'Strings: Manipulation, Pattern Matching (KMP, Rabin-Karp)',
          'Linked Lists: Singly, Doubly, Circular, Reversal',
          'Stack and Queue Implementation using Linked Lists',
          'Solving Problems on Arrays, Strings, and Linked Lists',
        ],
      },
      {
        week: 3,
        title: 'Stacks, Queues, and Hashing',
        duration: '1 week',
        description:
          'Exploring non-linear data structures for efficient data handling.',
        topics: [
          'Stack: LIFO, Monotonic Stack, Expression Evaluation',
          'Queue: FIFO, Circular Queue, Priority Queue',
          'Deque and its Applications',
          'Hashing: Hash Maps, Hash Sets, Collision Handling',
          'Solving Problems on Stacks, Queues, and Hashing',
        ],
      },
      {
        week: 4,
        title: 'Trees, Graphs, and Advanced Algorithms',
        duration: '1 week',
        description:
          'Understanding hierarchical and network-based data structures with traversal techniques.',
        topics: [
          'Binary Trees and Binary Search Trees (BST)',
          'Tree Traversals: DFS, BFS, Inorder, Preorder, Postorder',
          'Graph Representations: Adjacency Matrix & List',
          'Graph Algorithms: BFS, DFS, Dijkstra, Floyd-Warshall',
          'Solving Problems on Trees and Graphs',
        ],
      },
      {
        week: 5,
        title: 'Dynamic Programming and Greedy Algorithms',
        duration: '1 week',
        description:
          'Mastering advanced problem-solving techniques to optimize solutions.',
        topics: [
          'Introduction to Dynamic Programming (DP)',
          'Top-Down vs Bottom-Up DP',
          'Knapsack, Fibonacci, Longest Common Subsequence (LCS)',
          'Greedy Algorithms and Their Applications',
          'Solving Advanced Problems using DP and Greedy Techniques',
        ],
      },
    ],
  },
  'java-beginners': {
    title: 'Java for Beginners',
    description:
      'Get started with Java programming, covering core concepts, OOP principles, and hands-on coding.',
    duration: '7 weeks',
    level: 'Beginner',
    nextStart: '1 June, 2025',
    price: {
      original: '₹13,999',
      offer: '₹5,999',
    },
    rating: 4.6,
    skills: [
      {
        icon: 'code',
        name: 'Java Fundamentals',
        level: 'Beginner',
        description: 'Learn Java syntax, data types, and control structures',
      },
      {
        icon: 'object-group',
        name: 'OOP Concepts',
        level: 'Beginner',
        description:
          'Understand encapsulation, inheritance, polymorphism, and abstraction',
      },
      {
        icon: 'terminal',
        name: 'Hands-on Coding',
        level: 'Beginner',
        description: 'Practice Java programming with real-world exercises',
      },
    ],
    students: 280,
    image: `${BASE_URL}courses/java-for-beginners.jpg`,
    tags: ['Java', 'OOP', 'Programming'],
    highlights: [
      'Start coding in Java from scratch',
      'Understand object-oriented programming',
      'Build small Java applications',
      'Practice hands-on coding challenges',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Java and Basic Syntax',
        duration: '1 week',
        description:
          'Understanding Java fundamentals, setting up the environment, and writing basic programs.',
        topics: [
          'Introduction to Java and Its Features',
          'Setting Up Java Development Environment (JDK, IDEs)',
          'Basic Syntax: Variables, Data Types, Operators',
          'Input/Output Handling in Java',
          'Writing and Running Simple Java Programs',
        ],
      },
      {
        week: 2,
        title: 'Control Flow and Loops',
        duration: '1 week',
        description:
          'Mastering decision-making statements and loops for structured programming.',
        topics: [
          'Conditional Statements (if-else, switch-case)',
          'Loops (for, while, do-while)',
          'Break and Continue Statements',
          'Nested Loops and Patterns',
          'Solving Problems using Loops and Conditions',
        ],
      },
      {
        week: 3,
        title: 'Functions and Arrays',
        duration: '1 week',
        description:
          'Understanding modular programming with functions and handling arrays efficiently.',
        topics: [
          'Methods in Java: Defining and Calling Methods',
          'Method Overloading and Recursion',
          'Arrays: One-Dimensional and Multi-Dimensional',
          'Array Operations: Sorting, Searching',
          'Solving Problems using Functions and Arrays',
        ],
      },
      {
        week: 4,
        title: 'Object-Oriented Programming (OOP) - Part 1',
        duration: '1 week',
        description:
          'Learning the fundamental OOP concepts for building scalable applications.',
        topics: [
          'Classes and Objects in Java',
          'Constructors and this Keyword',
          'Encapsulation and Data Hiding',
          'Static Variables and Methods',
          'Solving Problems using OOP Concepts',
        ],
      },
      {
        week: 5,
        title: 'Object-Oriented Programming (OOP) - Part 2',
        duration: '1 week',
        description:
          'Deep diving into inheritance, polymorphism, and abstraction for robust application design.',
        topics: [
          'Inheritance and Method Overriding',
          'Polymorphism: Compile-time and Runtime',
          'Abstract Classes and Interfaces',
          'Super and Final Keywords',
          'Hands-on Project Implementing OOP Concepts',
        ],
      },
      {
        week: 6,
        title: 'Exception Handling and File Handling',
        duration: '1 week',
        description:
          'Understanding how to handle runtime errors and work with file input/output.',
        topics: [
          'Exception Handling: try-catch, throw, throws, finally',
          'Custom Exceptions in Java',
          'Working with Files in Java (File Handling)',
          'Reading and Writing Data using File I/O',
          'Solving Problems involving Exception and File Handling',
        ],
      },
      {
        week: 7,
        title: 'Java Collections and Final Project',
        duration: '1 week',
        description:
          'Exploring the Java Collections Framework and building a mini project.',
        topics: [
          'Collections Framework: List, Set, Map',
          'ArrayList vs LinkedList',
          'HashMap and HashSet',
          'Building a Mini Project using Java',
          'Final Review and Q&A',
        ],
      },
    ],
  },
  'data-analytics-excel': {
    title: 'Data Analytics using Excel',
    description:
      'Master data analysis and visualization techniques using Excel, including pivot tables, functions, and automation.',
    duration: '7 weeks',
    level: 'Beginner',
    nextStart: '1 June, 2025',
    price: {
      original: '₹14,999',
      offer: '₹7,999',
    },
    rating: 4.5,
    skills: [
      {
        icon: 'bar-chart',
        name: 'Data Visualization',
        level: 'Beginner',
        description: 'Create interactive dashboards and charts in Excel',
      },
      {
        icon: 'table',
        name: 'Data Analysis',
        level: 'Intermediate',
        description: 'Use Excel functions and pivot tables for analysis',
      },
      {
        icon: 'cog',
        name: 'Excel Automation',
        level: 'Beginner',
        description: 'Automate tasks using formulas and macros',
      },
    ],
    students: 220,
    image: `${BASE_URL}courses/data-analytics-using-excel.jpg`,
    tags: ['Excel', 'Data Analytics', 'Visualization'],
    highlights: [
      'Analyze data using pivot tables',
      'Work with advanced Excel functions',
      'Automate reports with macros',
      'Build dashboards for business insights',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Excel for Data Analytics',
        duration: '1 week',
        description:
          'Understanding the basics of Excel, navigating the interface, and working with datasets.',
        topics: [
          'Overview of Excel for Data Analytics',
          'Excel Interface, Shortcuts, and Navigation',
          'Basic Data Entry, Formatting, and Cell Referencing',
          'Introduction to Formulas and Functions',
          'Hands-on Exercises with Basic Data Handling',
        ],
      },
      {
        week: 2,
        title: 'Data Cleaning and Preparation',
        duration: '1 week',
        description:
          'Learning essential techniques to clean and prepare raw data for analysis.',
        topics: [
          'Removing Duplicates and Handling Missing Data',
          'Text Functions (LEFT, RIGHT, MID, CONCATENATE, TRIM)',
          'Using Find & Replace, Flash Fill, and Data Validation',
          'Working with Conditional Formatting',
          'Practical Data Cleaning Case Studies',
        ],
      },
      {
        week: 3,
        title: 'Advanced Formulas and Functions',
        duration: '1 week',
        description:
          'Mastering powerful Excel functions for data analysis and automation.',
        topics: [
          'Mathematical and Statistical Functions (SUMIFS, COUNTIFS, AVERAGEIFS)',
          'Lookup Functions (VLOOKUP, HLOOKUP, INDEX-MATCH)',
          'Logical Functions (IF, AND, OR, IFERROR)',
          'Date and Time Functions',
          'Hands-on Exercises with Advanced Functions',
        ],
      },
      {
        week: 4,
        title: 'Data Visualization with Charts and Graphs',
        duration: '1 week',
        description:
          'Creating impactful data visualizations using Excel’s charting tools.',
        topics: [
          'Introduction to Data Visualization Principles',
          'Creating Bar, Line, Pie, and Scatter Charts',
          'Customizing Charts with Labels, Legends, and Formatting',
          'Using Sparklines for Quick Visual Insights',
          'Case Studies: Creating Effective Business Dashboards',
        ],
      },
      {
        week: 5,
        title: 'Pivot Tables and Data Analysis Tools',
        duration: '1 week',
        description:
          'Using Pivot Tables and advanced Excel tools for efficient data analysis.',
        topics: [
          'Creating and Customizing Pivot Tables',
          'Pivot Charts for Interactive Analysis',
          'Using Slicers and Filters for Dynamic Reports',
          'Goal Seek, Solver, and Scenario Manager',
          'Case Study: Real-World Data Analysis Using Pivot Tables',
        ],
      },
      {
        week: 6,
        title: 'Power Query and Automation with Macros',
        duration: '1 week',
        description:
          'Learning Power Query for data transformation and automating tasks with Macros.',
        topics: [
          'Introduction to Power Query and Data Transformation',
          'Merging, Appending, and Cleaning Data in Power Query',
          'Recording and Running Macros',
          'Introduction to VBA for Basic Automation',
          'Automating Data Cleaning and Reporting Tasks',
        ],
      },
      {
        week: 7,
        title: 'Case Study and Final Project',
        duration: '1 week',
        description:
          'Applying all learned concepts in a real-world data analysis project.',
        topics: [
          'Reviewing Key Concepts and Best Practices',
          'Working on a Business Data Analytics Case Study',
          'Building an Interactive Excel Dashboard',
          'Presenting Insights from the Data',
          'Final Q&A and Certification Assessment',
        ],
      },
    ],
  },
  'data-analytics-python': {
    title: 'Data Analytics using Python',
    description:
      'Learn data analysis and visualization using Python libraries like Pandas, NumPy, and Matplotlib.',
    duration: '9 weeks',
    level: 'Intermediate',
    nextStart: '1 June, 2025',
    price: {
      original: '₹11,499',
      offer: '₹7,999',
    },
    rating: 4.7,
    skills: [
      {
        icon: 'code',
        name: 'Python for Data Analysis',
        level: 'Intermediate',
        description: 'Use Pandas and NumPy for efficient data manipulation',
      },
      {
        icon: 'chart-pie',
        name: 'Data Visualization',
        level: 'Intermediate',
        description: 'Create visualizations with Matplotlib and Seaborn',
      },
      {
        icon: 'database',
        name: 'Data Handling',
        level: 'Intermediate',
        description: 'Work with large datasets and preprocess data',
      },
    ],
    students: 270,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'Data Analysis', 'Visualization'],
    highlights: [
      'Analyze real-world datasets',
      'Create visualizations for insights',
      'Learn statistical analysis techniques',
      'Use Python for business intelligence',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Python for Data Analytics',
        duration: '1 week',
        description:
          'Understanding Python basics and setting up the data analytics environment.',
        topics: [
          'Introduction to Python and Jupyter Notebook',
          'Python Data Types and Variables',
          'Control Flow (Loops and Conditional Statements)',
          'Functions and Modules in Python',
          'Installing and Using Pandas, NumPy, and Matplotlib',
        ],
      },
      {
        week: 2,
        title: 'Data Manipulation with Pandas',
        duration: '1 week',
        description:
          'Exploring, cleaning, and preparing datasets using Pandas.',
        topics: [
          'Understanding DataFrames and Series',
          'Importing and Exporting Data (CSV, Excel, JSON)',
          'Filtering, Sorting, and Aggregating Data',
          'Handling Missing Data and Duplicates',
          'Merging, Joining, and Concatenating DataFrames',
        ],
      },
      {
        week: 3,
        title: 'Numerical Computing with NumPy',
        duration: '1 week',
        description:
          'Using NumPy for numerical computations and data processing.',
        topics: [
          'Introduction to NumPy Arrays',
          'Array Operations and Broadcasting',
          'Indexing, Slicing, and Reshaping Arrays',
          'Mathematical and Statistical Functions',
          'Working with Large Datasets Efficiently',
        ],
      },
      {
        week: 4,
        title: 'Data Visualization with Matplotlib and Seaborn',
        duration: '1 week',
        description:
          'Creating insightful visualizations using Python libraries.',
        topics: [
          'Introduction to Data Visualization Principles',
          'Basic Plots with Matplotlib (Line, Bar, Scatter)',
          'Advanced Visualizations with Seaborn',
          'Customizing Plots and Adding Annotations',
          'Building Dashboards with Multiple Charts',
        ],
      },
      {
        week: 5,
        title: 'Exploratory Data Analysis (EDA)',
        duration: '1 week',
        description: 'Analyzing datasets to extract meaningful insights.',
        topics: [
          'Understanding Data Distributions',
          'Detecting Outliers and Anomalies',
          'Feature Engineering and Data Transformation',
          'Correlation and Covariance Analysis',
          'Hands-on EDA with a Real Dataset',
        ],
      },
      {
        week: 6,
        title: 'Working with Databases and SQL in Python',
        duration: '1 week',
        description: 'Integrating SQL databases with Python for data analysis.',
        topics: [
          'Introduction to Relational Databases',
          'Connecting Python with SQLite and MySQL',
          'Executing SQL Queries using Pandas',
          'Data Extraction and Transformation with SQL',
          'Optimizing Queries for Performance',
        ],
      },
      {
        week: 7,
        title: 'Time Series Analysis',
        duration: '1 week',
        description: 'Analyzing time-dependent data using Python.',
        topics: [
          'Introduction to Time Series Data',
          'Handling Date and Time Data in Pandas',
          'Time Series Decomposition and Smoothing',
          'Rolling Windows and Moving Averages',
          'Forecasting with Basic Time Series Models',
        ],
      },
      {
        week: 8,
        title: 'Machine Learning Basics for Data Analytics',
        duration: '1 week',
        description:
          'Applying basic ML techniques to analyze and predict data trends.',
        topics: [
          'Introduction to Machine Learning for Analytics',
          'Supervised vs. Unsupervised Learning',
          'Building a Regression Model with Scikit-Learn',
          'Clustering and Classification Techniques',
          'Evaluating Model Performance',
        ],
      },
      {
        week: 9,
        title: 'Final Project and Case Study',
        duration: '1 week',
        description:
          'Applying all learned skills in a real-world analytics project.',
        topics: [
          'Reviewing Key Concepts and Techniques',
          'Choosing a Dataset for Analysis',
          'Building an End-to-End Data Analytics Pipeline',
          'Presenting Insights and Data Storytelling',
          'Final Q&A and Certification Assessment',
        ],
      },
    ],
  },
  'cloud-azure': {
    title: 'Master Cloud Technology with Azure',
    description:
      'Gain expertise in Microsoft Azure services, cloud computing, and DevOps deployment strategies.',
    duration: '9 weeks',
    level: 'Advanced',
    nextStart: '1 June, 2025',
    price: {
      original: '₹16,999',
      offer: '₹11,999',
    },
    rating: 4.8,
    skills: [
      {
        icon: 'cloud',
        name: 'Azure Cloud Services',
        level: 'Advanced',
        description:
          'Deploy applications using Azure Virtual Machines, Functions, and Kubernetes',
      },
      {
        icon: 'database',
        name: 'Cloud Storage',
        level: 'Intermediate',
        description: 'Work with Azure Blob Storage and Cosmos DB',
      },
      {
        icon: 'tools',
        name: 'DevOps',
        level: 'Intermediate',
        description: 'Implement CI/CD pipelines and automation in Azure',
      },
    ],
    students: 200,
    image: `${BASE_URL}courses/master-cloud-technology-with-azure.jpg`,
    tags: ['Azure', 'Cloud Computing', 'DevOps'],
    highlights: [
      'Deploy scalable cloud applications',
      'Use Azure services for computing and storage',
      'Implement security best practices in cloud',
      'Automate deployments with Azure DevOps',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Cloud Computing and Azure',
        duration: '1 week',
        description:
          'Understanding cloud computing fundamentals and Azure services.',
        topics: [
          'What is Cloud Computing?',
          'Cloud Service Models (IaaS, PaaS, SaaS)',
          'Azure Overview and Key Features',
          'Setting Up an Azure Account',
          'Azure Portal and Resource Management',
        ],
      },
      {
        week: 2,
        title: 'Azure Virtual Machines and Compute Services',
        duration: '1 week',
        description:
          'Deploying and managing virtual machines and compute services on Azure.',
        topics: [
          'Introduction to Azure Virtual Machines',
          'Creating and Configuring VMs',
          'Azure App Services and Serverless Computing',
          'Azure Kubernetes Service (AKS)',
          'Scaling and Managing Compute Resources',
        ],
      },
      {
        week: 3,
        title: 'Azure Storage Solutions',
        duration: '1 week',
        description: 'Exploring Azure storage options and best practices.',
        topics: [
          'Azure Storage Accounts and Blobs',
          'File, Queue, and Table Storage',
          'Azure Data Lake and Data Management',
          'Storage Security and Access Control',
          'Backup and Disaster Recovery Strategies',
        ],
      },
      {
        week: 4,
        title: 'Networking in Azure',
        duration: '1 week',
        description:
          'Understanding Azure networking services and configurations.',
        topics: [
          'Azure Virtual Networks (VNet)',
          'Subnets, Network Security Groups (NSG)',
          'VPN Gateway and ExpressRoute',
          'Load Balancers and Traffic Management',
          'Azure DNS and Firewall Security',
        ],
      },
      {
        week: 5,
        title: 'Azure Databases and Data Services',
        duration: '1 week',
        description: 'Working with databases and data services in Azure.',
        topics: [
          'Introduction to Azure SQL Database',
          'Cosmos DB for NoSQL Applications',
          'Azure Data Factory for ETL Pipelines',
          'Managing and Scaling Databases',
          'Security and Backup Strategies',
        ],
      },
      {
        week: 6,
        title: 'Identity and Access Management with Azure AD',
        duration: '1 week',
        description:
          'Configuring identity management and security with Azure Active Directory.',
        topics: [
          'Understanding Azure Active Directory',
          'User and Role Management',
          'Multi-Factor Authentication (MFA)',
          'Single Sign-On (SSO) and OAuth',
          'Azure Policy and Compliance Management',
        ],
      },
      {
        week: 7,
        title: 'Monitoring and Security in Azure',
        duration: '1 week',
        description:
          'Implementing security best practices and monitoring solutions in Azure.',
        topics: [
          'Azure Security Center and Threat Protection',
          'Azure Sentinel for Security Analytics',
          'Monitoring with Azure Monitor and Log Analytics',
          'Setting Up Alerts and Performance Metrics',
          'Compliance and Governance in Azure',
        ],
      },
      {
        week: 8,
        title: 'DevOps and Automation in Azure',
        duration: '1 week',
        description:
          'Implementing DevOps and automation techniques for cloud deployments.',
        topics: [
          'Introduction to Azure DevOps',
          'Continuous Integration and Continuous Deployment (CI/CD)',
          'Infrastructure as Code with ARM Templates and Terraform',
          'Azure Functions and Logic Apps',
          'Automating Workflows and Cost Optimization',
        ],
      },
      {
        week: 9,
        title: 'Final Project and Case Study',
        duration: '1 week',
        description: 'Applying all learned concepts in a hands-on project.',
        topics: [
          'Review of Key Azure Services',
          'Designing a Cloud Architecture',
          'Deploying and Managing an Application in Azure',
          'Best Practices for Cloud Optimization',
          'Final Q&A and Certification Readiness',
        ],
      },
    ],
  },
  'cloud-aws': {
    title: 'Master Cloud Technology with AWS',
    description:
      'Gain expertise in AWS, cloud computing, and DevOps deployment strategies.',
    duration: '9 weeks',
    level: 'Advanced',
    nextStart: '1 June, 2025',
    price: {
      original: '₹16,999',
      offer: '₹9,999',
    },
    rating: 4.8,
    skills: [
      {
        icon: 'cloud',
        name: 'Amazon Cloud Services',
        level: 'Advanced',
        description: 'Deploy applications using Amazon EC2, S3, and RDS',
      },
      {
        icon: 'database',
        name: 'Cloud Storage',
        level: 'Intermediate',
        description: 'Work with Amazon S3 and RDS',
      },
      {
        icon: 'tools',
        name: 'DevOps',
        level: 'Intermediate',
        description: 'Implement CI/CD pipelines and automation in Amazon',
      },
    ],
    students: 200,
    image: `${BASE_URL}courses/master-cloud-technology-with-aws.jpg`,
    tags: ['AWS', 'Cloud Computing', 'DevOps'],
    highlights: [
      'Deploy scalable cloud applications',
      'Use AWS services for computing and storage',
      'Implement security best practices in cloud',
      'Automate deployments with AWS DevOps',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Cloud Computing and AWS',
        duration: '1 week',
        description:
          'Understanding cloud computing fundamentals and AWS services.',
        topics: [
          'What is Cloud Computing?',
          'AWS Global Infrastructure Overview',
          'AWS Management Console and CLI',
          'Identity and Access Management (IAM)',
          'AWS Free Tier and Billing Management',
        ],
      },
      {
        week: 2,
        title: 'AWS Compute Services',
        duration: '1 week',
        description:
          'Deploying and managing virtual machines and compute services on AWS.',
        topics: [
          'Introduction to Amazon EC2',
          'Launching and Configuring EC2 Instances',
          'Auto Scaling and Load Balancing with ELB',
          'AWS Lambda for Serverless Computing',
          'Amazon ECS and Kubernetes on AWS',
        ],
      },
      {
        week: 3,
        title: 'AWS Storage Solutions',
        duration: '1 week',
        description: 'Exploring AWS storage options and best practices.',
        topics: [
          'Amazon S3 (Simple Storage Service)',
          'EBS (Elastic Block Store) and EFS (Elastic File System)',
          'S3 Lifecycle Policies and Versioning',
          'AWS Backup and Disaster Recovery',
          'Glacier for Archival Storage',
        ],
      },
      {
        week: 4,
        title: 'Networking in AWS',
        duration: '1 week',
        description:
          'Understanding AWS networking services and configurations.',
        topics: [
          'Introduction to Amazon VPC (Virtual Private Cloud)',
          'Subnetting, Route Tables, and Security Groups',
          'AWS Direct Connect and VPN',
          'Elastic Load Balancing (ELB) and Route 53',
          'AWS CloudFront and CDN Solutions',
        ],
      },
      {
        week: 5,
        title: 'AWS Databases and Analytics',
        duration: '1 week',
        description: 'Working with databases and data services in AWS.',
        topics: [
          'Amazon RDS (Relational Database Service)',
          'Amazon DynamoDB for NoSQL',
          'Amazon Redshift for Data Warehousing',
          'AWS Glue and Data Pipeline',
          'Monitoring and Performance Optimization',
        ],
      },
      {
        week: 6,
        title: 'Security and Identity Management in AWS',
        duration: '1 week',
        description: 'Configuring identity management and security with AWS.',
        topics: [
          'AWS Identity and Access Management (IAM)',
          'Security Best Practices in AWS',
          'AWS Shield and WAF (Web Application Firewall)',
          'AWS Organizations and Control Tower',
          'AWS Security Hub and Compliance',
        ],
      },
      {
        week: 7,
        title: 'AWS Monitoring and Logging',
        duration: '1 week',
        description:
          'Implementing security best practices and monitoring solutions in AWS.',
        topics: [
          'AWS CloudWatch for Monitoring',
          'AWS CloudTrail for Auditing',
          'Amazon Config for Compliance Management',
          'AWS Trusted Advisor for Cost Optimization',
          'Setting Up Alerts and Performance Metrics',
        ],
      },
      {
        week: 8,
        title: 'DevOps and Automation with AWS',
        duration: '1 week',
        description:
          'Implementing DevOps and automation techniques for cloud deployments.',
        topics: [
          'AWS CodePipeline and CodeDeploy',
          'Infrastructure as Code with CloudFormation and Terraform',
          'AWS Lambda and Event-Driven Automation',
          'AWS Step Functions and Serverless Architectures',
          'Continuous Integration and Continuous Deployment (CI/CD)',
        ],
      },
      {
        week: 9,
        title: 'Final Project and Case Study',
        duration: '1 week',
        description: 'Applying all learned concepts in a hands-on project.',
        topics: [
          'Review of Key AWS Services',
          'Designing a Cloud Architecture on AWS',
          'Deploying and Managing an Application on AWS',
          'Best Practices for Cost and Performance Optimization',
          'Final Q&A and Certification Readiness',
        ],
      },
    ],
  },
  'react-crash-course': {
    title: 'React and React Native Crash Course',
    description:
      'A fast-paced, hands-on course to master React for web and React Native for mobile development.',
    duration: '5 weeks',
    level: 'Intermediate',
    nextStart: '1 June, 2025',
    price: {
      original: '₹9,999',
      offer: '₹4,999',
    },
    rating: 4.7,
    skills: [
      {
        icon: 'code',
        name: 'React.js',
        level: 'Intermediate',
        description:
          'Build interactive and dynamic web applications using React.js',
      },
      {
        icon: 'mobile',
        name: 'React Native',
        level: 'Intermediate',
        description: 'Develop cross-platform mobile apps using React Native',
      },
      {
        icon: 'cloud',
        name: 'API Integration',
        level: 'Intermediate',
        description: 'Fetch and manage data using REST APIs and GraphQL',
      },
    ],
    students: 250,
    image: `${BASE_URL}courses/react-and-react-native-crash-course.jpg`,
    tags: ['React', 'React Native', 'JavaScript', 'Frontend'],
    highlights: [
      'Master React for frontend web development',
      'Learn React Native for building mobile apps',
      'Work with hooks, context API, and state management',
      'Deploy projects for web and mobile platforms',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to React and React Native',
        duration: '1 week',
        description:
          'Understanding the fundamentals of React and React Native and setting up the development environment.',
        topics: [
          'Introduction to React and React Native',
          'Differences Between React and React Native',
          'Setting Up the Development Environment (Node.js, npm, Expo)',
          'Understanding JSX and Component-Based Architecture',
          'First React and React Native App',
        ],
      },
      {
        week: 2,
        title: 'React and React Native Core Concepts',
        duration: '1 week',
        description:
          'Exploring React’s core concepts and state management in React Native.',
        topics: [
          'React Components and Props',
          'State and Lifecycle Methods',
          'Handling User Inputs and Forms',
          'React Hooks (useState, useEffect, useContext)',
          'Navigation in React Native (React Navigation)',
        ],
      },
      {
        week: 3,
        title: 'Building UI and Handling API Requests',
        duration: '1 week',
        description:
          'Understanding UI components, styling, and integrating APIs.',
        topics: [
          'Styling in React and React Native (CSS, Styled Components, Flexbox)',
          'Working with Lists and Forms',
          'Fetching Data using Fetch API and Axios',
          'Handling Async Storage in React Native',
          'Error Handling and Debugging',
        ],
      },
      {
        week: 4,
        title: 'State Management and Performance Optimization',
        duration: '1 week',
        description:
          'Implementing state management and optimizing performance.',
        topics: [
          'State Management with Redux Toolkit',
          'Context API vs Redux for Global State Management',
          'Optimizing React and React Native Apps (Memoization, Lazy Loading)',
          'Handling Authentication with Firebase',
          'Testing and Debugging (Jest, React Testing Library)',
        ],
      },
      {
        week: 5,
        title: 'Deployment and Final Project',
        duration: '1 week',
        description:
          'Deploying React and React Native applications and completing a hands-on project.',
        topics: [
          'Deploying React Apps with Vercel/Netlify',
          'Publishing React Native Apps to Play Store and App Store',
          'Performance Optimization and Debugging',
          'Final Hands-on Project: Build a React Native Mobile App',
          'Q&A and Course Wrap-Up',
        ],
      },
    ],
  },
  'product-management': {
    title: 'Product Management',
    description:
      'Understand product lifecycle, agile methodologies, and how to manage successful digital products.',
    duration: '5 weeks',
    level: 'Intermediate',
    nextStart: '1 June, 2025',
    price: {
      original: '₹12,999',
      offer: '₹6,999',
    },
    rating: 4.6,
    skills: [
      {
        icon: 'lightbulb',
        name: 'Product Strategy',
        level: 'Intermediate',
        description: 'Develop product roadmaps and strategies',
      },
      {
        icon: 'cogs',
        name: 'Agile & Scrum',
        level: 'Intermediate',
        description:
          'Implement Agile and Scrum methodologies for product management',
      },
      {
        icon: 'chart-line',
        name: 'Market Analysis',
        level: 'Intermediate',
        description: 'Analyze competition and market needs for product success',
      },
    ],
    students: 180,
    image:
      'https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=800&q=80',
    tags: ['Product Management', 'Agile', 'Scrum'],
    highlights: [
      'Learn Agile frameworks for product development',
      'Define product vision and go-to-market strategy',
      'Understand user research and A/B testing',
      'Manage digital products from ideation to launch',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Product Management',
        duration: '1 week',
        description:
          'Understanding the role of a product manager, product lifecycle, and key frameworks.',
        topics: [
          'What is Product Management?',
          'Roles and Responsibilities of a Product Manager',
          'Product Lifecycle and Roadmap Planning',
          'Understanding Business, User, and Market Needs',
          'Introduction to Agile and Scrum Methodologies',
        ],
      },
      {
        week: 2,
        title: 'User Research and Market Analysis',
        duration: '1 week',
        description:
          'Exploring user research methods, competitive analysis, and data-driven decision-making.',
        topics: [
          'Understanding Customer Needs and Pain Points',
          'Market Research and Competitive Analysis',
          'Building User Personas and Customer Journeys',
          'Product-Market Fit and Value Proposition',
          'Data-Driven Decision Making in Product Management',
        ],
      },
      {
        week: 3,
        title: 'Product Design and Development Process',
        duration: '1 week',
        description:
          'Collaborating with engineering and design teams to build products effectively.',
        topics: [
          'Working with UX/UI Teams and Wireframing',
          'Writing Effective Product Requirements (PRD, MRD)',
          'MVP Development and Prioritization Techniques',
          'Managing Product Backlog and User Stories',
          'Collaboration with Engineering and Design Teams',
        ],
      },
      {
        week: 4,
        title: 'Go-to-Market Strategy and Metrics',
        duration: '1 week',
        description:
          'Planning product launches, setting KPIs, and driving growth.',
        topics: [
          'Go-to-Market (GTM) Strategy and Execution',
          'Pricing Strategies and Revenue Models',
          'Key Product Metrics (Retention, Churn, DAU/MAU, NPS)',
          'Growth Hacking and Product-Led Growth Strategies',
          'Stakeholder Communication and Product Storytelling',
        ],
      },
      {
        week: 5,
        title: 'Scaling, Leadership, and Case Studies',
        duration: '1 week',
        description:
          'Managing and scaling products while learning from real-world case studies.',
        topics: [
          'Scaling and Managing Products in Growth Stage',
          'Leadership and Decision-Making in Product Management',
          'Handling Crisis and Managing Risks',
          'Real-World Product Management Case Studies',
          'Final Project: Developing a Product Roadmap',
        ],
      },
    ],
  },
  'data-engineering-pipeline': {
    title: 'Data Engineering and Data Pipeline',
    description:
      'Build robust data pipelines and master data engineering concepts using modern tools and frameworks.',
    duration: '5 weeks',
    level: 'Advanced',
    nextStart: '1 June, 2025',
    price: {
      original: '₹17,999',
      offer: '₹11,999',
    },
    rating: 4.9,
    skills: [
      {
        icon: 'database',
        name: 'Data Warehousing',
        level: 'Advanced',
        description: 'Design and manage large-scale data warehouses',
      },
      {
        icon: 'code',
        name: 'Data Pipelines',
        level: 'Advanced',
        description:
          'Build ETL and ELT pipelines with Apache Airflow and Spark',
      },
      {
        icon: 'cloud',
        name: 'Cloud Data Engineering',
        level: 'Intermediate',
        description: 'Process big data using cloud services like AWS and GCP',
      },
    ],
    students: 260,
    image: `${BASE_URL}courses/data-engineering-and-data-pipeline.jpg`,
    tags: ['Data Engineering', 'ETL', 'Big Data'],
    highlights: [
      'Design and optimize data pipelines',
      'Work with structured and unstructured data',
      'Use Apache Kafka for real-time data processing',
      'Implement scalable ETL workflows',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Data Engineering',
        duration: '1 week',
        description:
          'Understanding the fundamentals of data engineering, its role, and key concepts.',
        topics: [
          'What is Data Engineering? Role and Responsibilities',
          'Data Engineering vs Data Science vs Data Analytics',
          'Understanding Structured, Semi-Structured, and Unstructured Data',
          'Introduction to Databases (SQL vs NoSQL)',
          'Setting Up a Local and Cloud-Based Data Environment',
        ],
      },
      {
        week: 2,
        title: 'ETL (Extract, Transform, Load) and Data Ingestion',
        duration: '1 week',
        description:
          'Learning how to collect, transform, and load data efficiently.',
        topics: [
          'Understanding ETL and ELT Processes',
          'Batch vs Streaming Data Processing',
          'Data Ingestion Techniques (APIs, Web Scraping, Log Processing)',
          'Working with ETL Tools (Apache Nifi, Talend, Airflow)',
          'Building an ETL Pipeline with Python and SQL',
        ],
      },
      {
        week: 3,
        title: 'Data Storage and Processing',
        duration: '1 week',
        description:
          'Exploring storage solutions, distributed computing, and big data processing.',
        topics: [
          'Relational Databases (PostgreSQL, MySQL) vs NoSQL (MongoDB, Cassandra)',
          'Data Warehousing Concepts (Snowflake, BigQuery, Redshift)',
          'Introduction to Distributed Computing (Hadoop, Spark)',
          'Data Partitioning, Indexing, and Performance Optimization',
          'Hands-on: Storing and Processing Large Datasets',
        ],
      },
      {
        week: 4,
        title: 'Building Scalable Data Pipelines',
        duration: '1 week',
        description:
          'Designing and implementing scalable, fault-tolerant data pipelines.',
        topics: [
          'Introduction to Data Pipeline Orchestration (Apache Airflow, Prefect)',
          'Building Data Pipelines with Kafka and Spark Streaming',
          'Handling Data Quality, Validation, and Schema Evolution',
          'Cloud-Based Data Pipelines (AWS Glue, Azure Data Factory, GCP Dataflow)',
          'Hands-on: Creating a Real-Time Data Pipeline',
        ],
      },
      {
        week: 5,
        title: 'Data Governance, Security, and Final Project',
        duration: '1 week',
        description:
          'Ensuring data security, compliance, and completing a real-world data pipeline project.',
        topics: [
          'Data Governance, Compliance (GDPR, CCPA), and Best Practices',
          'Data Security (Encryption, Access Control, Masking)',
          'Monitoring and Logging in Data Pipelines',
          'Scaling Data Infrastructure for High-Volume Workloads',
          'Final Project: End-to-End Data Pipeline Implementation',
        ],
      },
    ],
  },
  'full-stack-development': {
    title: 'Full Stack Development',
    description:
      'Learn to build scalable full-stack applications using modern frameworks and tools.',
    duration: '7 weeks',
    level: 'Intermediate',
    nextStart: '1 June, 2025',
    price: {
      original: '₹17,499',
      offer: '₹11,599',
    },
    rating: 4.8,
    skills: [
      {
        icon: 'code',
        name: 'Frontend Development',
        level: 'Intermediate',
        description: 'Build interactive UIs using React and Angular',
      },
      {
        icon: 'server',
        name: 'Backend Development',
        level: 'Intermediate',
        description:
          'Create robust APIs with Node.js, Express, and Spring Boot',
      },
      {
        icon: 'database',
        name: 'Database Management',
        level: 'Intermediate',
        description:
          'Work with SQL and NoSQL databases like PostgreSQL and MongoDB',
      },
    ],
    students: 300,
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    tags: ['Full Stack', 'React', 'Node.js', 'Java'],
    highlights: [
      'Build real-world web applications',
      'Master both frontend and backend technologies',
      'Deploy projects using cloud platforms',
      'Work with REST and GraphQL APIs',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Full Stack Development',
        duration: '1 week',
        description:
          'Understanding the fundamentals of full-stack development, setting up the environment, and learning version control.',
        topics: [
          'What is Full Stack Development?',
          'Frontend vs Backend vs Database',
          'Setting Up Development Environment (VS Code, Node.js, Git)',
          'Introduction to HTML, CSS, and JavaScript',
          'Version Control with Git and GitHub',
        ],
      },
      {
        week: 2,
        title: 'Frontend Development with React',
        duration: '1 week',
        description:
          'Building interactive user interfaces using React and modern frontend frameworks.',
        topics: [
          'Introduction to React and Component-Based Architecture',
          'State Management (useState, useEffect, Context API)',
          'React Router and Navigation',
          'Styling in React (CSS Modules, Styled Components, Tailwind CSS)',
          'Building a Simple React Application',
        ],
      },
      {
        week: 3,
        title: 'Backend Development with Node.js and Express',
        duration: '1 week',
        description:
          'Understanding server-side development using Node.js and Express.',
        topics: [
          'Introduction to Node.js and Express.js',
          'REST API Development and Routing',
          'Middleware and Authentication (JWT, OAuth)',
          'Connecting Backend with Frontend',
          'Building a Simple API with Express',
        ],
      },
      {
        week: 4,
        title: 'Database Management with SQL and NoSQL',
        duration: '1 week',
        description:
          'Learning about database design, queries, and integration with backend.',
        topics: [
          'SQL vs NoSQL Databases',
          'Introduction to PostgreSQL / MySQL',
          'Introduction to MongoDB',
          'Performing CRUD Operations with Databases',
          'Integrating Database with Express API',
        ],
      },
      {
        week: 5,
        title: 'Authentication, Security, and Deployment',
        duration: '1 week',
        description:
          'Implementing user authentication, security best practices, and deploying applications.',
        topics: [
          'User Authentication (JWT, OAuth, Firebase Auth)',
          'Security Best Practices in Web Development',
          'Environment Variables and Configurations',
          'Introduction to Docker and Containerization',
          'Deploying Applications (Vercel, Netlify, Heroku, AWS)',
        ],
      },
      {
        week: 6,
        title: 'Advanced Topics and State Management',
        duration: '1 week',
        description:
          'Exploring advanced full-stack topics such as Redux, GraphQL, and performance optimization.',
        topics: [
          'Introduction to Redux for State Management',
          'GraphQL vs REST APIs',
          'Serverless Functions and Microservices',
          'Performance Optimization Techniques',
          'Real-Time Communication with WebSockets',
        ],
      },
      {
        week: 7,
        title: 'Capstone Project and Final Review',
        duration: '1 week',
        description:
          'Building a full-stack project and applying all learned concepts.',
        topics: [
          'Defining the Project Scope and Features',
          'Building the Frontend and Backend',
          'Database Integration and Deployment',
          'Testing and Debugging the Application',
          'Final Project Presentation and Feedback',
        ],
      },
    ],
  },
  'generative-ai': {
    title: 'Generative AI',
    description:
      'Understand the fundamentals of Generative AI and build AI-powered applications.',
    duration: '5 weeks',
    level: 'Advanced',
    nextStart: '1 June, 2025',
    price: {
      original: '₹18,999',
      offer: '₹11,299',
    },
    rating: 4.9,
    skills: [
      {
        icon: 'brain',
        name: 'AI Models',
        level: 'Advanced',
        description: 'Learn about GPT, DALL-E, and Stable Diffusion',
      },
      {
        icon: 'cogs',
        name: 'AI Development',
        level: 'Intermediate',
        description: 'Build AI-powered applications with Python and TensorFlow',
      },
      {
        icon: 'database',
        name: 'Data Processing',
        level: 'Intermediate',
        description:
          'Preprocess and fine-tune AI models for better performance',
      },
    ],
    students: 220,
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    tags: ['AI', 'Machine Learning', 'Deep Learning'],
    highlights: [
      'Explore real-world AI applications',
      'Work with OpenAI APIs and fine-tune AI models',
      'Generate text, images, and code with AI',
      'Develop AI-powered chatbots and content generators',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Generative AI',
        duration: '1 week',
        description:
          'Understanding the fundamentals of Generative AI, its applications, and setting up the required environment.',
        topics: [
          'What is Generative AI?',
          'Applications and Use Cases (Chatbots, Image Generation, Music, Code, etc.)',
          'Overview of Deep Learning and Neural Networks',
          'Introduction to Transformer Models (GPT, BERT, etc.)',
          'Setting Up Python, Jupyter Notebook, and AI Frameworks (TensorFlow, PyTorch)',
        ],
      },
      {
        week: 2,
        title: 'Building Blocks of Generative AI',
        duration: '1 week',
        description:
          'Exploring the core components of Generative AI models and their working mechanisms.',
        topics: [
          'Understanding Autoencoders and GANs (Generative Adversarial Networks)',
          'Introduction to Variational Autoencoders (VAEs)',
          'Exploring NLP-Based Generative Models (GPT, BART, T5)',
          'Data Preprocessing for AI Models',
          'Fine-Tuning Pre-Trained AI Models',
        ],
      },
      {
        week: 3,
        title: 'Hands-on with Text and Image Generation',
        duration: '1 week',
        description:
          'Developing AI models to generate text and images using state-of-the-art techniques.',
        topics: [
          'Text Generation with GPT-3/GPT-4',
          'Building AI-Based Chatbots',
          'Introduction to Image Generation Models (Stable Diffusion, DALL·E, MidJourney)',
          'Implementing Style Transfer and Image Augmentation',
          'Fine-Tuning AI Models for Custom Data',
        ],
      },
      {
        week: 4,
        title: 'Advanced AI Techniques and Ethical Considerations',
        duration: '1 week',
        description:
          'Diving deeper into AI model improvements and addressing challenges like bias and ethics.',
        topics: [
          'Reinforcement Learning with Human Feedback (RLHF)',
          'Optimization and Hyperparameter Tuning',
          'AI Bias and Ethical Considerations',
          'Explainability and Interpretability of AI Models',
          'AI Safety and Regulatory Compliance',
        ],
      },
      {
        week: 5,
        title: 'Capstone Project and Deployment',
        duration: '1 week',
        description:
          'Applying all learned concepts in a real-world AI project and deploying the model.',
        topics: [
          'Defining the Capstone Project',
          'Developing a Generative AI Solution (Text, Image, or Code Generation)',
          'Optimizing and Fine-Tuning the Model',
          'Deploying AI Models using Cloud Services (AWS, Azure, Google AI)',
          'Final Project Presentation and Review',
        ],
      },
    ],
  },
  'rad-react-supabase': {
    title: 'Rapid Web Application Development using React and Supabase',
    description:
      'Build modern web applications rapidly using React and Supabase as a backend.',
    duration: '3 weeks',
    level: 'Intermediate',
    nextStart: '1 June, 2025',
    price: {
      original: '₹15,499',
      offer: '₹8,999',
    },
    rating: 4.6,
    skills: [
      {
        icon: 'code',
        name: 'React Development',
        level: 'Intermediate',
        description: 'Create dynamic UIs with React and Tailwind CSS',
      },
      {
        icon: 'database',
        name: 'Supabase Backend',
        level: 'Intermediate',
        description:
          'Use Supabase as a scalable backend alternative to Firebase',
      },
      {
        icon: 'cloud',
        name: 'Serverless Architecture',
        level: 'Intermediate',
        description:
          'Deploy and manage apps with Supabase authentication and storage',
      },
    ],
    students: 180,
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Supabase', 'Serverless'],
    highlights: [
      'Build and deploy full-stack apps quickly',
      'Integrate authentication and database with Supabase',
      'Use Tailwind CSS for rapid UI development',
      'Deploy to cloud platforms effortlessly',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to React and Supabase',
        duration: '1 week',
        description:
          'Setting up the development environment and understanding the fundamentals of React and Supabase.',
        topics: [
          'Introduction to Rapid Web Development',
          'Overview of React and Supabase',
          'Setting Up the Development Environment',
          'Creating a New React Project with Vite',
          'Understanding Supabase: Authentication, Database, and Storage',
          'Building a Simple CRUD App with Supabase and React',
        ],
      },
      {
        week: 2,
        title: 'Building and Integrating Features',
        duration: '1 week',
        description:
          'Enhancing the application with authentication, real-time updates, and advanced Supabase features.',
        topics: [
          'User Authentication with Supabase Auth',
          'Role-Based Access Control (RBAC) and Authorization',
          'Using Supabase Storage for File Uploads',
          'Real-Time Data Synchronization with Supabase',
          'Implementing Advanced Queries and Database Relationships',
          'Optimizing API Calls and Performance',
        ],
      },
      {
        week: 3,
        title: 'Deployment and Best Practices',
        duration: '1 week',
        description:
          'Deploying the application and following best practices for scalability and maintainability.',
        topics: [
          'Integrating Third-Party Libraries (Tailwind CSS, Zustand, etc.)',
          'Implementing Security Best Practices',
          'Performance Optimization Techniques',
          'Deploying the Application (Vercel, Netlify, Supabase Hosting)',
          'Monitoring and Debugging in Production',
          'Final Project: Developing a Fully Functional Web App',
        ],
      },
    ],
  },
  'mobile-application-development': {
    title: 'Mobile Application Development',
    description:
      'Master mobile app development using React Native and Flutter.',
    duration: '5 weeks',
    level: 'Intermediate',
    nextStart: '1 June, 2025',
    price: {
      original: '₹16,999',
      offer: '₹11,299',
    },
    rating: 4.7,
    skills: [
      {
        icon: 'mobile',
        name: 'React Native',
        level: 'Intermediate',
        description: 'Build cross-platform mobile apps using React Native',
      },
      {
        icon: 'code',
        name: 'Flutter',
        level: 'Intermediate',
        description: 'Develop hybrid applications with Dart and Flutter',
      },
      {
        icon: 'cloud',
        name: 'Backend Integration',
        level: 'Intermediate',
        description: 'Connect mobile apps to Firebase, Supabase, and APIs',
      },
    ],
    students: 210,
    image:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    tags: ['Mobile Development', 'React Native', 'Flutter'],
    highlights: [
      'Create mobile apps for iOS and Android',
      'Use Firebase for real-time database and authentication',
      'Work with RESTful APIs and cloud storage',
      'Deploy apps to Google Play Store and Apple App Store',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Mobile Development',
        duration: '1 week',
        description:
          'Understanding mobile app development fundamentals, platforms, and setting up the development environment.',
        topics: [
          'Overview of Mobile Development (Native, Hybrid, Cross-Platform)',
          'Choosing the Right Tech Stack (React Native, Flutter, Swift, Kotlin)',
          'Setting Up the Development Environment',
          'Understanding Mobile UI/UX Best Practices',
          'Building Your First Mobile App (Hello World)',
        ],
      },
      {
        week: 2,
        title: 'Frontend Development and UI Components',
        duration: '1 week',
        description:
          'Exploring mobile UI components, navigation, and state management.',
        topics: [
          'Building UI with Components (Buttons, Forms, Lists, Modals)',
          'Navigation and Routing (React Navigation, Flutter Navigator, Android Activities)',
          'State Management (Redux, Context API, Provider, Riverpod)',
          'Handling User Input and Forms',
          'Responsive and Adaptive UI Design',
        ],
      },
      {
        week: 3,
        title: 'Backend Integration and Data Management',
        duration: '1 week',
        description:
          'Connecting mobile apps to databases and APIs for dynamic functionality.',
        topics: [
          'Introduction to REST and GraphQL APIs',
          'Fetching Data from APIs and Handling Responses',
          'Working with Local Storage (SQLite, AsyncStorage, Hive)',
          'Authentication and User Management (Firebase, OAuth, JWT)',
          'Handling Push Notifications',
        ],
      },
      {
        week: 4,
        title: 'Performance Optimization and Security',
        duration: '1 week',
        description:
          'Enhancing mobile app performance, debugging, and securing applications.',
        topics: [
          'Optimizing Performance (Lazy Loading, Code Splitting, Caching)',
          'Debugging and Testing (Unit Testing, Integration Testing)',
          'Security Best Practices (Data Encryption, Secure API Calls)',
          'Handling Offline Mode and Data Sync',
          'Crash Reporting and App Monitoring',
        ],
      },
      {
        week: 5,
        title: 'Deployment and Publishing',
        duration: '1 week',
        description:
          'Preparing the app for release, publishing it on app stores, and final project.',
        topics: [
          'Preparing the App for Release (Versioning, Code Signing)',
          'Publishing on Google Play Store and Apple App Store',
          'App Store Guidelines and Approval Process',
          'Continuous Integration & Deployment (CI/CD) for Mobile Apps',
          'Final Project: Building and Deploying a Complete Mobile App',
        ],
      },
    ],
  },
  'microsoft-bot-framework': {
    title: 'BOT Development using Microsoft BOT Framework',
    description:
      "Learn how to develop and deploy intelligent chatbots using Microsoft's BOT Framework.",
    duration: '5 weeks',
    level: 'Intermediate',
    nextStart: '1 June, 2025',
    price: {
      original: '₹17,499',
      offer: '₹11,299',
    },
    rating: 4.7,
    skills: [
      {
        icon: 'robot',
        name: 'Chatbot Development',
        level: 'Intermediate',
        description: 'Build chatbots with Microsoft BOT Framework and Azure AI',
      },
      {
        icon: 'cloud',
        name: 'Natural Language Processing',
        level: 'Intermediate',
        description: 'Use LUIS and Dialogflow for conversational AI',
      },
      {
        icon: 'code',
        name: 'Integration',
        level: 'Intermediate',
        description:
          'Deploy bots on MS Teams, Facebook Messenger, and WhatsApp',
      },
    ],
    students: 180,
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tags: ['Chatbot', 'AI', 'Microsoft BOT Framework'],
    highlights: [
      'Develop AI-powered chatbots',
      'Integrate bots with Azure Cognitive Services',
      'Deploy bots across multiple platforms',
      'Use NLP techniques for chatbot intelligence',
    ],
    modules: [
      {
        week: 1,
        title: 'Introduction to Chatbot Development',
        duration: '1 week',
        description:
          'Understanding chatbots, their use cases, and setting up the Microsoft Bot Framework environment.',
        topics: [
          'Introduction to Chatbots and Conversational AI',
          'Overview of Microsoft Bot Framework',
          'Setting Up the Development Environment',
          'Understanding Bot Architecture and Components',
          'Creating a Basic Bot with Bot Framework SDK',
        ],
      },
      {
        week: 2,
        title: 'Building Intelligent Conversational Bots',
        duration: '1 week',
        description:
          'Enhancing chatbot capabilities with AI, dialogs, and natural language processing.',
        topics: [
          'Understanding Dialogs and Conversation Flow',
          'Implementing QnA Maker for FAQ Bots',
          'Integrating Language Understanding (LUIS) for NLP',
          'Handling User Inputs and Context Management',
          'Implementing Multi-Turn Conversations',
        ],
      },
      {
        week: 3,
        title: 'Integrating Bots with External Services',
        duration: '1 week',
        description:
          'Connecting chatbots with APIs, databases, and cloud services.',
        topics: [
          'Connecting Bots to External APIs and Databases',
          'Integrating with Azure Services (Storage, Cosmos DB)',
          'Using Adaptive Cards and Rich Media Responses',
          'Implementing Authentication in Bots (OAuth, JWT)',
          'Deploying Bots to Azure Bot Service',
        ],
      },
      {
        week: 4,
        title: 'Publishing and Deploying Chatbots',
        duration: '1 week',
        description:
          'Deploying bots on multiple platforms and ensuring scalability.',
        topics: [
          'Publishing Bots on Microsoft Teams, Web, and Mobile',
          'Integrating Bots with WhatsApp, Facebook Messenger, Slack',
          'Monitoring and Logging with Application Insights',
          'Scaling Bots for High Traffic',
          'Implementing Best Practices for Bot Security and Compliance',
        ],
      },
      {
        week: 5,
        title: 'Advanced Features and Final Project',
        duration: '1 week',
        description:
          'Exploring advanced bot development features and building a real-world chatbot.',
        topics: [
          'Implementing Proactive Messaging and Notifications',
          'Voice and Speech Integration with Azure Speech Services',
          'Testing and Debugging Bots using Emulator and Dev Tools',
          'Final Project: Developing and Deploying an AI-Powered Chatbot',
          'Course Wrap-up and Best Practices',
        ],
      },
    ],
  },
  'prompt-development': {
    title: 'Prompt Development',
    description:
      'Master prompt engineering techniques to enhance AI model outputs.',
    duration: '1 weeks',
    level: 'Beginner',
    nextStart: '1 June, 2025',
    price: {
      original: '₹13,999',
      offer: '₹4,999',
    },
    rating: 4.5,
    skills: [
      {
        icon: 'edit',
        name: 'Prompt Engineering',
        level: 'Beginner',
        description: 'Write effective prompts for ChatGPT and AI models',
      },
      {
        icon: 'brain',
        name: 'AI Optimization',
        level: 'Beginner',
        description: 'Improve AI-generated responses using structured prompts',
      },
      {
        icon: 'code',
        name: 'Use Cases',
        level: 'Beginner',
        description:
          'Create prompts for content writing, coding, and automation',
      },
    ],
    students: 150,
    image:
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80',
    tags: ['AI', 'Prompt Engineering', 'ChatGPT'],
    highlights: [
      'Write effective AI prompts',
      'Enhance AI-generated outputs',
      'Use prompts for automation and content creation',
      'Master ChatGPT, Bard, and Claude AI models',
    ],
    modules: [
      {
        week: 1,
        title: 'Mastering Prompt Engineering',
        duration: '1 week',
        description:
          'Understanding the fundamentals of prompt engineering and optimizing prompts for AI models.',
        topics: [
          'Introduction to Prompt Engineering',
          'Understanding AI Model Behavior (GPT, LLaMA, Claude, etc.)',
          'Types of Prompts: Direct, Zero-Shot, Few-Shot, Chain-of-Thought',
          'Crafting Effective Prompts for Text Generation, Coding, and Data Analysis',
          'Optimizing Prompts for Accuracy, Creativity, and Consistency',
          'Handling Bias, Ethics, and Limitations in AI-Generated Responses',
          'Practical Hands-on: Experimenting with OpenAI, Google, and Hugging Face Models',
        ],
      },
    ],
  },
};
