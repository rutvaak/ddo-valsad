import RecentlyViewed from "~/components/pages/Home/RecentlyViewed";
import SchemeCard from "~/components/pages/Home/SchemeCard";
import TopBar from "~/components/pages/shared/TopBar";
import { SchemeInsert } from "~/server/db/schema";
import { api } from "~/trpc/server";

const scheme: SchemeInsert[] = [
  {
    name: "Mid-Day Meal Scheme",
    details:
      "A school meal program to improve the nutritional status of children.",
    benefits: "Free and nutritious meals to school children.",
    eligibility: "All students in government and government-aided schools.",
    lastDate: new Date(),
    applicationProcess:
      "Automatically enrolled for students in eligible schools.",
    requiredDocs: "None",
    portalLink: "https://mdm.nic.in/",
    gender: "ALL",
    maritalStatus: "Married",
    category: "SC",
    schemeImage:
      "https://schooleducation.mizoram.gov.in/uploads/attachments/16e79e148218c0afc8b81775c66cf2f1/png.png",
    residence: "Rural",
    isStudent: true,
    employmentStatus: "Employed",
    occupation: "Student",
  },
  {
    name: "Digital India",
    details:
      "A program to transform India into a digitally empowered society and knowledge economy.",
    benefits:
      "Improved access to digital services, infrastructure, and e-governance.",
    eligibility: "All Indian citizens and businesses.",
    lastDate: new Date(1625155200),
    applicationProcess:
      "Access digital services and contribute to the digital ecosystem.",
    requiredDocs: "None",
    portalLink: "https://digitalindia.gov.in/",
    gender: "ALL",
    maritalStatus: "Never Married",
    category: "OBC",
    schemeImage:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Digital_India_logo.svg/800px-Digital_India_logo.svg.png",
    residence: "Urban",
    isStudent: false,
    employmentStatus: "Unemployed",
    occupation: "Safai Karamchari",
  },
  {
    name: "National Rural Employment Guarantee Act (NREGA)",

    details:
      "A rural employment program that provides a legal guarantee of 100 days of wage employment.",
    benefits:
      "Guaranteed employment and livelihood opportunities for rural households.",
    eligibility: "Rural households in India.",
    lastDate: new Date(1590883200),
    applicationProcess: "Apply through local panchayats and Gram Sabhas.",
    requiredDocs: "Job card and identity proof.",
    portalLink: "https://nrega.nic.in/",
    gender: "Male",
    maritalStatus: "Divorced",
    category: "ST",
    schemeImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Burden_of_life.jpg/220px-Burden_of_life.jpg",
    residence: "Urban",
    isStudent: false,
    employmentStatus: "Unemployed",
    occupation: "Khadi Artisan",
  },

  {
    name: "Beti Bachao, Beti Padhao",
    details:
      "A campaign to promote the welfare of the girl child and address gender bias.",
    benefits: "Promotion of girl child education and gender equality.",
    eligibility: "All Indian citizens with a focus on gender equality.",
    lastDate: new Date(1541030400),
    applicationProcess:
      "Support gender equality and girls' education in society.",
    requiredDocs: "None",
    portalLink: "https://wcd.nic.in/bbbp-schemes",
    gender: "Female",
    maritalStatus: "Never Married",
    category: "all",
    schemeImage:
      "https://upload.wikimedia.org/wikipedia/en/8/8c/Beti_Bachao_Beti_Padhao_logo.jpg",
    residence: "Rural",
    isStudent: true,
    employmentStatus: "Self-Employed/ Entrepreneur",
    occupation: "Teacher / Faculty",
  },
  {
    name: "Pradhan Mantri Awas Yojana",
    details:
      "A housing scheme to provide affordable housing to all urban and rural poor.",
    benefits:
      "Subsidized home loans and affordable housing for eligible beneficiaries.",
    eligibility:
      "Economically weaker sections (EWS), lower-income groups (LIG), and others.",
    lastDate: new Date(),
    applicationProcess:
      "Apply through Common Service Centers or Housing societies.",
    requiredDocs: "Income proof, identity proof, and address proof.",
    portalLink: "https://pmaymis.gov.in/",
    gender: "Transgender",
    maritalStatus: "Widowed",
    category: "ST",
    schemeImage:
      "https://upload.wikimedia.org/wikipedia/en/6/6c/Pradhan_Mantri_Awas_Yojana-Urban_%28PMAY-U%29_logo.png",
    residence: "Urban",
    isStudent: true,
    employmentStatus: "Unemployed",
    occupation: "Ex Servicemen",
  },

  {
    name: "Swachh Bharat Abhiyan",
    details:
      "A sanitation and cleanliness program to make India open defecation free.",
    benefits:
      "Improved sanitation, health, and hygiene in rural and urban areas.",
    eligibility: "All Indian citizens and local governments.",
    lastDate: new Date(),
    applicationProcess:
      "Participate in cleanliness drives and promote sanitation.",
    requiredDocs: "None",
    portalLink: "https://swachhbharat.mygov.in/",
    gender: "Female",
    maritalStatus: "Separated",
    category: "ST",
    schemeImage:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/PM_Modi_launches_the_Swachh_Bharat_Abhiyaan_%281%29.jpg",
    residence: "Rural",
    isStudent: false,
    employmentStatus: "Employed",
    occupation: "Student",
  },
];

export default async function Home() {
  // const createScheme = api.scheme.create.useMutation({
  //   onSuccess(data, variables, context) {
  //     console.log(variables);
  //   },
  // });
  const schemes = await api.scheme.getAll.query();

  return (
    <div>
      <TopBar />
      {/* <MainCaraousal schemeData={schemes} /> */}
      <RecentlyViewed />
      {/* <Button
        onClick={() => {
          for (let i = 0; i < scheme.length; i++) {
            const element = scheme[i];
            if (!element) return;
            createScheme.mutate(element);
          }
        }}
      >
        Create Data
      </Button> */}
      <div className="container mt-3">
        <p className="text-lg font-bold">All Schemes</p>
        {schemes.map((scheme) => {
          return (
            <div className="mb-2">
              <SchemeCard schemeData={scheme} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
