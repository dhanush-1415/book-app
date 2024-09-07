import React from 'react';
import { Container, Typography } from '@mui/material';
import Header from '../components/Navbar/Header';
import MyCarousel from '../components/Homepage/carousel';

const PrivacyPolicy = () => {
  return (
    <>
        <Header/>
        <MyCarousel />
        <Container sx={{margin:'30px auto'}}>
        <Typography variant="h4" component="h1" gutterBottom>
            PRIVACY POLICY
        </Typography>
        <Typography className='typo6' gutterBottom>
            Last updated March 03, 2024
        </Typography>
        <Typography className='typo6' gutterBottom>
            This privacy notice for Top20UAE ("we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:
        </Typography>
        <ul>
            <li className='typo6'  >Download and use our mobile application (Top20), or any other application of ours that links to this privacy notice</li>
            <li className='typo6'  >Engage with us in other related ways, including any sales, marketing, or events</li>
        </ul>
        <Typography className='typo6' gutterBottom>
            Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at Top20ae@gmail.com.
        </Typography>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h2" gutterBottom>
            SUMMARY OF KEY POINTS
        </Typography>
        <Typography className='typo6' gutterBottom>
            This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
        </Typography>
        <ul>
            <li className='typo6'  >What personal information do we process? When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about personal information you disclose to us.</li>
            <li className='typo6'  >Do we process any sensitive personal information? We do not process sensitive personal information.</li>
            <li className='typo6'  >Do we receive any information from third parties? We do not receive any information from third parties.</li>
            <li className='typo6'  >How do we process your information? We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about how we process your information.</li>
            <li className='typo6'  >In what situations and with which parties do we share personal information? We may share information in specific situations and with specific third parties. Learn more about when and with whom we share your personal information.</li>
            <li className='typo6'  >How do we keep your information safe? We have organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about how we keep your information safe.</li>
            <li className='typo6'  >What are your rights? Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about your privacy rights.</li>
            <li className='typo6'  >How do you exercise your rights? The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</li>
        </ul>
        <Typography className='typo6' gutterBottom>
            Want to learn more about what we do with any information we collect? Review the privacy notice in full.
        </Typography>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h2" gutterBottom>
            TABLE OF CONTENTS
        </Typography>
        <ul>
            <li className='typo6'  >1. WHAT INFORMATION DO WE COLLECT?</li>
            <li className='typo6'  >2. HOW DO WE PROCESS YOUR INFORMATION?</li>
            <li className='typo6'  >3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</li>
            <li className='typo6'  >4. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</li>
            <li className='typo6'  >5. HOW LONG DO WE KEEP YOUR INFORMATION?</li>
            <li className='typo6'  >6. HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
            <li className='typo6'  >7. DO WE COLLECT INFORMATION FROM MINORS?</li>
            <li className='typo6'  >8. WHAT ARE YOUR PRIVACY RIGHTS?</li>
            <li className='typo6'  >9. CONTROLS FOR DO-NOT-TRACK FEATURES</li>
            <li className='typo6'  >10. DO WE MAKE UPDATES TO THIS NOTICE?</li>
            <li className='typo6'  >11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</li>
            <li className='typo6'  >12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</li>
        </ul>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h3" gutterBottom>
            1. WHAT INFORMATION DO WE COLLECT?
        </Typography>
        <Typography className='typo6' gutterBottom>
            Personal information you disclose to us
        </Typography>
        <Typography className='typo6' gutterBottom>
            In Short: We collect personal information that you provide to us.
        </Typography>
        <Typography className='typo6' gutterBottom>
            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
        </Typography>
        <Typography className='typo6' gutterBottom>
            Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
        </Typography>
        <ul>
            <li className='typo6'  >names</li>
            <li className='typo6'  >phone numbers</li>
            <li className='typo6'  >email addresses</li>
        </ul>
        <Typography className='typo6' gutterBottom>
            Sensitive Information. We do not process sensitive information.
        </Typography>
        <Typography className='typo6' gutterBottom>
            Application Data. If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
        </Typography>
        <ul>
            <li className='typo6'  >Geolocation Information. We may request access or permission to track location-based information from your mobile device, either continuously or while you are using our mobile application(s), to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device's settings.</li>
            <li className='typo6'  >Push Notifications. We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.</li>
        </ul>
        <Typography className='typo6' gutterBottom>
            This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.
        </Typography>
        <Typography className='typo6' gutterBottom>
            All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
        </Typography>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h3" gutterBottom>
            2. HOW DO WE PROCESS YOUR INFORMATION?
        </Typography>
        <Typography className='typo6' gutterBottom>
            In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
        </Typography>
        <Typography className='typo6' gutterBottom>
            We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
        </Typography>
        <ul>
            <li className='typo6'  >To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
            <li className='typo6'  >To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.</li>
            <li className='typo6'  >To respond to user inquiries/offer support to users. We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
            <li className='typo6'  >To evaluate and improve our Services, products, marketing, and your experience. We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.</li>
            <li className='typo6'  >To identify usage trends. We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
        </ul>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h3" gutterBottom>
            3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </Typography>
        <Typography className='typo6' gutterBottom>
            In Short: We may share information in specific situations described in this section and/or with the following third parties.
        </Typography>
        <Typography className='typo6' gutterBottom>
            We may need to share your personal information in the following situations:
        </Typography>
        <ul>
            <li className='typo6'  >Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li className='typo6'  >Affiliates. We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.</li>
            <li className='typo6'  >Business Partners. We may share your information with our business partners to offer you certain products, services, or promotions.</li>
        </ul>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h3" gutterBottom>
            4. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
        </Typography>
        <Typography className='typo6' gutterBottom>
            In Short: We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.
        </Typography>
        <Typography className='typo6' gutterBottom>
            The Services may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites, services, or applications. The inclusion of a link towards a third-party website, service, or application does not imply an endorsement by us. We cannot guarantee the safety and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this privacy notice. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services, or applications that may be linked to or from the Services. You should review the policies of such third parties and contact them directly to respond to your questions.
        </Typography>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h3" gutterBottom>
            5. HOW LONG DO WE KEEP YOUR INFORMATION?
        </Typography>
        <Typography className='typo6' gutterBottom>
            In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.
        </Typography>
        <Typography className='typo6' gutterBottom>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.
        </Typography>
        <Typography className='typo6' gutterBottom>
            When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
        </Typography>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h3" gutterBottom>
            6. HOW DO WE KEEP YOUR INFORMATION SAFE?
        </Typography>
        <Typography className='typo6' gutterBottom>
            In Short: We aim to protect your personal information through a system of organizational and technical security measures.
        </Typography>
        <Typography className='typo6' gutterBottom>
            We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
        </Typography>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h3" gutterBottom>
            7. DO WE COLLECT INFORMATION FROM MINORS?
        </Typography>
        <Typography className='typo6' gutterBottom>
            In Short: We do not knowingly collect data from or market to children under 18 years of age.
        </Typography>
        <Typography className='typo6' gutterBottom>
            We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at Top20ae@gmail.com.
        </Typography>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h3" gutterBottom>
            8. WHAT ARE YOUR PRIVACY RIGHTS?
        </Typography>
        <Typography className='typo6' gutterBottom>
            In Short: You may review, change, or terminate your account at any time.
        </Typography>
        <Typography className='typo6' gutterBottom>
            Withdrawing your consent: If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
        </Typography>
        <Typography className='typo6' gutterBottom>
            However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
        </Typography>
        <Typography className='typo6' gutterBottom>
            Account Information
        </Typography>
        <Typography className='typo6' gutterBottom>
            If you would at any time like to review or change the information in your account or terminate your account, you can:
        </Typography>
        <ul>
            <li className='typo6'  >Contact us using the contact information provided.</li>
        </ul>
        <Typography className='typo6' gutterBottom>
            Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
        </Typography>
        <Typography className='typo6' gutterBottom>
            If you have questions or comments about your privacy rights, you may email us at Top20ae@gmail.com.
        </Typography>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h3" gutterBottom>
            9. CONTROLS FOR DO-NOT-TRACK FEATURES
        </Typography>
        <Typography className='typo6' gutterBottom>
            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
        </Typography>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h3" gutterBottom>
            10. DO WE MAKE UPDATES TO THIS NOTICE?
        </Typography>
        <Typography className='typo6' gutterBottom>
            In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.
        </Typography>
        <Typography className='typo6' gutterBottom>
            We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
        </Typography>

        <Typography className='typo5' sx={{marginTop:'25px'}} component="h3" gutterBottom>
            11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
        </Typography>
        <Typography className='typo6' gutterBottom>
            If you have questions or comments about this notice, you may email us at Top20ae@gmail.com or contact us by post at:
        </Typography>
        <Typography className='typo6' gutterBottom>
            Top20UAE<br />
            __________<br />
            Abu Dhabi, Abu Dhabi<br />
            United Arab Emirates
        </Typography>
        </Container>
    </>
  );
};

export default PrivacyPolicy;
