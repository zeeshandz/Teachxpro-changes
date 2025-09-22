import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  Wrench,
  Rocket,
  Heart,
  Mail,
  Phone,
  MapPin,
  LucideIcon
} from 'lucide-react';

interface PDFPreviewProps {
  resumeData?: any;
}

type SectionType = 'Summary' | 'Education' | 'Experience' | 'Certifications' | 'Skills' | 'Projects' | 'Interests';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: '40 60',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'column',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  contactInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  contactInfo: {
    fontSize: 11,
    color: '#333333',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginBottom: 25,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingBottom: 8,
  },
  sectionIcon: {
    marginRight: 10,
    color: '#2563eb', // Blue color for icons
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  experienceItem: {
    marginBottom: 15,
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 4,
  },
  locationDate: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 15,
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#2563eb',
    marginRight: 8,
    marginTop: 5,
  },
  description: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#4B5563',
    flex: 1,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  skillItem: {
    fontSize: 11,
    padding: '6 12',
    backgroundColor: '#F3F4F6',
    borderRadius: 15,
    color: '#111827',
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    color: '#00000008',
    fontSize: 100,
    opacity: 0.5,
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#4B5563',
    textAlign: 'justify',
  },
  certificationItem: {
    marginBottom: 12,
  },
  certificationTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  certificationDetails: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
    fontStyle: 'italic',
  }
});

// Section icons mapping
const SectionIcons: Record<SectionType, LucideIcon> = {
  Summary: User,
  Education: GraduationCap,
  Experience: Briefcase,
  Certifications: Award,
  Skills: Wrench,
  Projects: Rocket,
  Interests: Heart
};

// Updated dummy data
const dummyResumeData = {
  contact: [{
    fields: {
      fullName: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA"
    }
  }],
  summary: [{
    content: "Highly motivated and result-oriented Software Engineer with over 5 years of experience in full-stack development. Proven track record of delivering scalable solutions and leading development teams to success."
  }],
  education: [
    {
      institution: "Stanford University",
      typeOfStudy: "Master's Degree",
      areaOfStudy: "Computer Science",
      location: "Stanford, CA",
      startDate: "2018",
      endDate: "2020",
      isPresent: false
    }
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      isPresent: true,
      summary: "Led development of cloud-native applications\nManaged team of 5 developers\nImplemented CI/CD pipeline\nReduced deployment time by 50%"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      summary: "Expertise in designing and implementing scalable systems on AWS cloud platform"
    },
    {
      name: "Professional Scrum Master",
      issuer: "Scrum.org",
      date: "2022",
      summary: "Advanced knowledge of Agile methodologies and Scrum framework"
    }
  ],
  skills: [
    { id: 1, name: "Python programming" },
    { id: 2, name: "Data analysis" },
    { id: 3, name: "Machine learning" },
    { id: 4, name: "Statistical modeling" },
    { id: 5, name: "Problem-solving" },
    { id: 6, name: "Critical thinking" },
    { id: 7, name: "Communication skills" },
    { id: 8, name: "Time management" },
    { id: 9, name: "Teamwork" },
    { id: 10, name: "Attention to detail" }
  ],
  projects: [
    {
      name: "AI-Powered Analytics Platform",
      description: "Developed machine learning models for predictive analytics\nImplemented real-time data processing pipeline\nCreated interactive visualization dashboard\nReduced analysis time by 60%"
    }
  ],
  interests: [{
    content: "Software Architecture, Cloud Computing, Machine Learning, Open Source Development, Technical Writing, Hiking, Photography, Chess"
  }]
};

// Helper function to strip HTML tags
const stripHtml = (html: string) => {
  return html?.replace(/<[^>]*>/g, '') || '';
};

const PDFPreview: React.FC<PDFPreviewProps> = ({ resumeData }) => {
  const data = resumeData || dummyResumeData;

  const renderSectionHeader = (title: SectionType) => (
    <View style={styles.sectionHeader}>
      {React.createElement(SectionIcons[title], {
        size: 20,
        className: "text-blue-600",
        style: styles.sectionIcon
      })}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <PDFViewer style={{ width: '100%', height: '80vh' }} showToolbar={false}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{data.contact?.[0]?.fields?.fullName}</Text>
            <View style={styles.contactInfoContainer}>
              <View style={styles.contactInfoItem}>
                <Mail size={12} className="text-gray-600" />
                <Text style={styles.contactInfo}>{data.contact?.[0]?.fields?.email}</Text>
              </View>
              <View style={styles.contactInfoItem}>
                <Phone size={12} className="text-gray-600" />
                <Text style={styles.contactInfo}>{data.contact?.[0]?.fields?.phone}</Text>
              </View>
              <View style={styles.contactInfoItem}>
                <MapPin size={12} className="text-gray-600" />
                <Text style={styles.contactInfo}>{data.contact?.[0]?.fields?.location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Summary */}
          {data.summary?.[0]?.content && (
            <View style={styles.section}>
              {renderSectionHeader('Summary')}
              <Text style={styles.summaryText}>{stripHtml(data.summary[0].content)}</Text>
            </View>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <View style={styles.section}>
              {renderSectionHeader('Education')}
              {data.education.map((edu: any, index: number) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.companyName}>{edu.institution}</Text>
                  <Text style={styles.jobTitle}>
                    {edu.typeOfStudy} in {edu.areaOfStudy}
                  </Text>
                  <Text style={styles.locationDate}>
                    {edu.startDate} - {edu.isPresent ? 'Present' : edu.endDate}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <View style={styles.section}>
              {renderSectionHeader('Experience')}
              {data.experience.map((exp: any, index: number) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.locationDate}>
                    {exp.startDate} - {exp.isPresent ? 'Present' : exp.endDate}
                  </Text>
                  {exp.summary.split('\n').map((bullet: string, i: number) => (
                    <View key={i} style={styles.bulletPoint}>
                      <View style={styles.bullet} />
                      <Text style={styles.description}>{stripHtml(bullet)}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {data.certifications?.length > 0 && (
            <View style={styles.section}>
              {renderSectionHeader('Certifications')}
              {data.certifications.map((cert: any, index: number) => (
                <View key={index} style={styles.certificationItem}>
                  <Text style={styles.certificationTitle}>{cert.name}</Text>
                  <Text style={styles.certificationDetails}>
                    {cert.issuer} • {cert.date}
                  </Text>
                  <Text style={styles.description}>{stripHtml(cert.summary)}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <View style={styles.section}>
              {renderSectionHeader('Skills')}
              <View style={styles.skillsContainer}>
                {data.skills.map((skill: any) => (
                  <Text key={skill.id} style={styles.skillItem}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <View style={styles.section}>
              {renderSectionHeader('Projects')}
              {data.projects.map((project: any, index: number) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.companyName}>{project.name}</Text>
                  {project.description.split('\n').map((bullet: string, i: number) => (
                    <View key={i} style={styles.bulletPoint}>
                      <View style={styles.bullet} />
                      <Text style={styles.description}>{stripHtml(bullet)}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Interests */}
          {data.interests?.[0]?.content && (
            <View style={styles.section}>
              {renderSectionHeader('Interests')}
              <Text style={styles.description}>{stripHtml(data.interests[0].content)}</Text>
            </View>
          )}

          {/* Watermark */}
          {/* <Text style={styles.watermark}>teachXpro</Text> */}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFPreview;