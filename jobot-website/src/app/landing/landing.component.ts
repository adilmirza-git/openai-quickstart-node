import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {


//hard coded the jobDescription and existingCV
  jobDescription: string = `The primary function of this role is to be responsible for understanding the business and how to apply/augment the IT application architecture to plan, design, build, and integrate state of the art web solutions for both internal and public-facing applications. 
  This role requires a strong understanding and experience with mobile enabled / responsive design web applications, 
  messaging buses, micro services, and relational database architecture. 
  We are seeking a Lead Software Engineer to join our IT Department in Charlotte, NC.`;


  existingCV: string = `Currently working for one of the largest software engineering companies in the world – 
  EPAM Systems as Digital Transformation Delivery Manager 
  – Responsible for both pre-sales activities and overall delivery. 
  Technology Practitioner with 18 years of experience - 
  Specialized in managing software engineering teams, 
  creating digital implementation roadmaps, defining agile operating models, 
  and managing end-to-end product delivery based on Agile, 
  MACH blueprint (Microservices-based, API First, Cloud-native, Headless), 
  and DevTestSecOps. Have experience working in a Start-Up environment.
  Managed program workstreams with cross-functional teams of 40+ People 
  – Scrum Masters, BA, PO, and Engineers. Have played a major role in 
  delivering the Digital Corporate Platform for an upcoming Neobank of UAE 
  – Zand Bank.Over 17+ years of experience working with the major banks in UAE 
  – Have successfully implemented major initiatives across various banking domains.
  Global Transaction Banking Solutions (Wholesale Banking): 
  Digital Corporate Onboarding and Account Opening, Digital Cash Management, Trade Finance Solutions, Supply Chain Finance, Corporate Products Billing 
  and Pricing Systems Regulatory and Payment Systems: - UAE Fund Transfer System, Wages Protection System, 
  Direct Debit System, Image Cheque Clearing System Enterprise Risk and Compliance Solutions: SafeWatch, 
  IMTF – Enterprise Fraud Prevention System, JurisTech – Credit Scoring System, Murex and Algo 
  – Limits Management System, FICO 
  – Blaze Advisor 
  – Customer Risk Scoring Human Resources Solutions: Recruitment and Employees HR Core Banking 
  and Lending Solutions: Intellect Core Banking System `;

  
  optimizationResult: string | null = null; // variable to store the text

  constructor(private http: HttpClient) {}

  isLoading = false;


  optimizeCV() {

    this.isLoading = true;

      const payload = {
          jobDescription: this.jobDescription,
          existingCV: this.existingCV
      };

// Mocking an API call or a loading process
setTimeout(() => {

      this.http.post('http://localhost:3091/generate-cv', payload).subscribe({
        next: (response: any) => {
          if (response && response.choices && response.choices.length > 0) {
            this.optimizationResult = response.choices[0].text;
          }
        },
        error: (error) => {
            console.error('Error:', error);
        }
    });


  this.isLoading = false;
  // Do something once loading is complete
}, 9000); // Adjust the timeout duration as needed


  }


  

  




}







