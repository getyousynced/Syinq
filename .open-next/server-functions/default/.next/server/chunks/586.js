exports.id=586,exports.ids=[586],exports.modules={133:(e,t,a)=>{let s={"662b94e4ffa5e1cbe811afb249a14cb506942a57":()=>Promise.resolve().then(a.bind(a,4844)).then(e=>e.$$ACTION_0),daafde080a1c8d4d2a3709b3cb23187dec31e331:()=>Promise.resolve().then(a.bind(a,4844)).then(e=>e.sendMail)};async function r(e,...t){return(await s[e]()).apply(null,t)}e.exports={"662b94e4ffa5e1cbe811afb249a14cb506942a57":r.bind(null,"662b94e4ffa5e1cbe811afb249a14cb506942a57"),daafde080a1c8d4d2a3709b3cb23187dec31e331:r.bind(null,"daafde080a1c8d4d2a3709b3cb23187dec31e331")}},2262:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,2994,23)),Promise.resolve().then(a.t.bind(a,6114,23)),Promise.resolve().then(a.t.bind(a,9727,23)),Promise.resolve().then(a.t.bind(a,9671,23)),Promise.resolve().then(a.t.bind(a,1868,23)),Promise.resolve().then(a.t.bind(a,4759,23))},9703:(e,t,a)=>{Promise.resolve().then(a.bind(a,1158)),Promise.resolve().then(a.bind(a,6887)),Promise.resolve().then(a.bind(a,5523)),Promise.resolve().then(a.bind(a,5272)),Promise.resolve().then(a.bind(a,990))},1158:(e,t,a)=>{"use strict";a.d(t,{default:()=>u});var s=a(326),r=a(7577);a(5424);var n=(0,a(6242).$)("daafde080a1c8d4d2a3709b3cb23187dec31e331"),i=a(6226),o=a(7461),l=a(7773),d=a(434),c=a(381);let u=()=>{let[e,t]=(0,r.useState)(""),a=async e=>{e.preventDefault();let a=e.currentTarget.elements.namedItem("user_email").value.trim();if(""===a){c.ZP.error("Please fill in your email.");return}try{await n({email:a}),t(""),c.ZP.success("Subscription successful!")}catch(e){e instanceof Error?c.ZP.error(`Failed to subscribe: ${e.message}`):c.ZP.error("Failed to subscribe due to an unexpected error.")}},u=[{icon:s.jsx(o.AgZ,{size:28}),href:"#"},{icon:s.jsx(l.lcJ,{size:32}),href:"#"},{icon:s.jsx(l.t1V,{size:32}),href:"#"},{icon:s.jsx(l.V2E,{size:36}),href:"#"}];return(0,s.jsxs)("footer",{className:"bg-white text-center text-gray-800 py-6 bottom-0 w-full overflow-hidden relative",children:[s.jsx("div",{className:"absolute inset-0 top-0 z-0",children:s.jsx(i.default,{src:"/Shape.svg",width:2400,height:2400,alt:"blue curve",priority:!0})}),s.jsx("div",{className:"relative z-10 max-w-7xl mx-auto px-4 -mt-6 md:mt-0",children:(0,s.jsxs)("div",{className:"flex flex-col items-center",children:[(0,s.jsxs)("div",{className:"border-2 rounded-xl bg-white flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-8 md:py-16 gap-4 mt-8 md:mt-16 shadow-xl w-full max-w-7xl mx-auto",children:[s.jsx("h2",{className:"text-xl md:text-3xl w-full text-nowrap font-thin",children:"Subscribe Newsletters"}),s.jsx("form",{onSubmit:a,className:"flex flex-col md:flex-row items-center space-y-4 md:space-x-4 max-w-2xl w-full",children:(0,s.jsxs)("div",{className:"relative w-full max-w-lg",children:[s.jsx("input",{type:"email",value:e,onChange:e=>t(e.target.value),name:"user_email",required:!0,placeholder:"Enter your email",className:"w-full p-4 md:p-6 pr-32 md:pr-60 text-sm md:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}),s.jsx("button",{type:"submit",className:"text-sm md:text-xl absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 md:px-8 py-2 md:py-4 rounded-md hover:bg-blue-600 transition duration-300",children:"Subscribe Now"})]})})]}),s.jsx("div",{className:"w-full py-6 md:py-12",children:(0,s.jsxs)("div",{className:"container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0",children:[s.jsx("div",{className:"flex justify-center space-x-10 md:space-x-20 text-[#434341]",children:[{name:"About us",href:"#"},{name:"Contact us",href:"#"},{name:"About",href:"#"},{name:"Blogs",href:"#"}].map((e,t)=>s.jsx(d.default,{href:e.href,className:"hover:text-black text-sm text-nowrap md:text-lg",children:e.name},t))}),s.jsx("div",{className:"flex justify-center space-x-6 md:space-x-8 text-[#434341]",children:u.map((e,t)=>s.jsx(d.default,{href:e.href,className:"hover:text-black",children:e.icon},t))})]})}),s.jsx("div",{className:"border w-full rounded-2xl bg-[#2B3D51] my-2 md:my-4"}),(0,s.jsxs)("div",{className:"text-gray-500 mt-6 md:mt-12 flex flex-col md:flex-row justify-between items-center w-full",children:[s.jsx("p",{className:"text-sm md:text-base",children:"\xa9 2024 SYNC | All Rights Reserved"}),(0,s.jsxs)("div",{className:"flex justify-center space-x-4 mt-4 md:mt-0",children:[s.jsx("a",{href:"#",className:"hover:underline text-sm",children:"Terms of Service"}),s.jsx("a",{href:"#",className:"hover:underline text-sm",children:"Privacy Policy"})]})]})]})})]})}},6887:(e,t,a)=>{"use strict";a.d(t,{default:()=>l});var s=a(326),r=a(7577),n=a(6226),i=a(434),o=a(7798);let l=()=>{let[e,t]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{let e=()=>{t(window.scrollY>50)};return window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}},[]),s.jsx("nav",{className:`hidden sm:block fixed top-0 left-0 right-0 transition-all ease-in-out duration-700 z-50 py-5 px-10 ${e?"w-[70%] shadow-lg bg-white/30 backdrop-blur-md rounded-3xl left-[15%] mt-4 py-1":"w-full bg-transparent"}`,children:(0,s.jsxs)("div",{className:"flex justify-between items-center max-w-7xl mx-auto",children:[s.jsx(i.default,{href:"/",children:s.jsx(n.default,{src:"/sync-logo.svg",width:80,height:80,alt:"Sync Logo",priority:!0})}),s.jsx("div",{className:"flex space-x-6",children:s.jsx("ul",{className:"flex gap-14 font-bold text-md",children:o.H9.map(({label:e,href:t})=>s.jsx("li",{children:s.jsx(i.default,{className:"How it works?"===e?"text-blue-500":"text-black",href:t,children:e})},t))})})]})})}},5523:(e,t,a)=>{"use strict";a.d(t,{default:()=>c});var s=a(326);a(7577);var r=a(6226),n=a(434),i=a(4019),o=a(748),l=a(5272);let d=[{label:"How it works?",href:"/how-it-works"},{label:"About",href:"/about"},{label:"Blog",href:"/blog"},{label:"Contact us",href:"/contact-us"}];function c(){let{isOpen:e,toggle:t,close:a}=(0,l.A)();return(0,s.jsxs)("div",{className:"md:hidden",children:[(0,s.jsxs)("div",{className:"flex items-center p-4 bg-white",children:[s.jsx("button",{className:"z-50",onClick:t,"aria-label":e?"Close menu":"Open menu",children:e?s.jsx(i.Z,{size:40}):s.jsx(o.Z,{size:40})}),s.jsx("div",{className:"flex-grow flex justify-center",children:s.jsx(n.default,{href:"/",children:s.jsx(r.default,{src:"/sync-logo.svg",width:100,height:100,alt:"Sync Logo",priority:!0})})})]}),s.jsx("div",{className:`fixed top-0 left-0 h-full w-full bg-white shadow-lg 
                    transform transition-transform duration-300 ease-in-out 
                    ${e?"translate-x-0":"-translate-x-full"}
                    z-50 
                `,children:(0,s.jsxs)("div",{className:"p-10",children:[s.jsx(n.default,{href:"/",className:"mb-10 flex justify-center",children:s.jsx(r.default,{src:"/sync-logo.svg",width:140,height:140,alt:"Sync Logo",priority:!0})}),s.jsx("nav",{children:s.jsx("ul",{className:"space-y-8",children:d.map(({label:e,href:t})=>s.jsx("li",{children:s.jsx(n.default,{href:t,className:"block py-4 px-6 text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in-out text-2xl font-semibold",onClick:a,children:e})},t))})})]})})]})}},5272:(e,t,a)=>{"use strict";a.d(t,{A:()=>o,SidebarProvider:()=>i});var s=a(326),r=a(7577);let n=(0,r.createContext)(void 0);function i({children:e}){let[t,a]=(0,r.useState)(!1);return s.jsx(n.Provider,{value:{isOpen:t,toggle:()=>a(!t),close:()=>a(!1)},children:e})}function o(){let e=(0,r.useContext)(n);if(void 0===e)throw Error("useSidebar must be used within a SidebarProvider");return e}},7798:(e,t,a)=>{"use strict";a.d(t,{H9:()=>s,_u:()=>n,lj:()=>r});let s=[{label:"How it works?",href:"/how-it-works"},{label:"About",href:"/about"},{label:"Blog",href:"/blog"},{label:"Contact us",href:"/contact-us"}],r=[{id:1,contName:"History",contHeading:"The History of Sync: From WhatsApp Group to Mobile App",contText:`Sync originated from the 'Bennett Carpooling' WhatsApp group at Bennett University, where students coordinated carpools, shared information, and bought and sold items. As the group's admin, you recognized the need for a more organized platform to enhance these interactions.

    Inspired by the group's success, you envisioned Sync as a mobile app that would streamline carpooling and incorporate marketplace and announcement features tailored to university students.

    With a dedicated team of developers, you set out to create an intuitive app that addresses the unique challenges faced by college students, providing a convenient, affordable, and sustainable transportation solution. Sync transformed from a simple WhatsApp group into an essential resource for the university community, showcasing the power of grassroots innovation.`},{id:2,contName:"Team",contHeading:"Meet the Team Behind Sync",contText:`The Sync team is a diverse group of talented individuals, each bringing a unique set of skills to the table. From developers and designers to project managers, everyone plays a vital role in turning Sync from an idea into a reality.

    Our developers worked tirelessly to build a user-friendly and efficient app that meets the needs of university students. The designers focused on creating a clean and modern interface that is easy to navigate.`},{id:3,contName:"Vision",contHeading:"Sync's Vision for the Future",contText:`At Sync, we believe in creating a connected community where students can seamlessly share resources, coordinate rides, and stay informed about campus life. Our vision extends beyond just carpooling — we aim to build a platform that fosters collaboration and sustainability.`}],n=[{id:1,img:"/cards_images/carLocation.svg",leftimg:"10%",top:"5%",left:"10%",content:"Find rides by location, destination, and time. Our smart algorithm matches you with a ride companion based on both location and preferences."},{id:2,img:"/cards_images/hand.svg",leftimg:"15%",top:"50%",left:"10%",content:"Make extra cash and help fellow students by offering rides you're already taking. Set your fare, manage your schedule, and choose who to connect with."},{id:3,img:"/cards_images/idea.svg",leftimg:"25%",top:"100%",left:"25%",content:"Get updates on your ride with push notifications and in-app messaging."},{id:4,img:"/cards_images/cash.svg",leftimg:"62%",top:"100%",left:"55%",content:"Share the ride, share the costs. Split gas and parking, reduce wear on your car, and save extra cash for other student essentials."},{id:5,img:"/cards_images/leaf.svg",leftimg:"77%",top:"50%",left:"70%",content:"Make extra cash and help fellow students by offering rides you're already taking. Set your fare, manage your schedule, and choose who to connect with."},{id:6,img:"/cards_images/people.svg",leftimg:"82%",top:"5%",left:"70%",content:"Link your Sync account to your social media to view mutual friends and build trust with potential ride partners."}]},990:(e,t,a)=>{"use strict";a.d(t,{default:()=>n});var s=a(326),r=a(381);let n=()=>s.jsx(r.x7,{})},4844:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$ACTION_0:()=>d,sendMail:()=>l});var s=a(7745);a(6461);var r=a(4168),n=a(5723);let i=new r.Ic({user:process.env.SMTP_MAIL,password:process.env.SMTP_PASSWORD,host:process.env.SMTP_HOST,ssl:!0}),o=()=>`
<!doctype html>
<html>
  <head>
    <title>Sync Comming Soon Mail</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style type="text/css">
      /* Base */
      body {
        margin: 0;
        padding: 0;
        min-width: 100%;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        background-color: #fafafa;
        color: #222222;
      }
      a {
        color: #000;
        text-decoration: none;
      }
      h1 {
        font-size: 24px;
        font-weight: 700;
        line-height: 1.25;
        margin-top: 0;
        margin-bottom: 15px;
        text-align: center;
      }
      p {
        margin-top: 0;
        margin-bottom: 24px;
      }
      table td {
        vertical-align: top;
      }
      /* Layout */
      .email-wrapper {
        max-width: 600px;
        margin: 0 auto;
      }
      .email-header {
        background-color: #0070f3;
        padding: 24px;
        color: #ffffff;
      }
      .email-body {
        padding: 24px;
        background-color: #ffffff;
      }
      .email-footer {
        background-color: #f6f6f6;
        padding: 24px;
      }
      /* Buttons */
      .button {
        display: inline-block;
        background-color: #0070f3;
        color: #ffffff;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 4px;
      }
      
      .heading{
        font-size:18px
      }

    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-header">
        <h1>You're in Sync!</h1>
      </div>
      <div class="email-body">
        <p class="heading">Hello Subscriber,</p>
        <p>
         Thanks for signing up for Sync! We're excited to have you join our community.
        </p>
        <p>
          As a thank you for your interest, we'll be sending you exclusive updates and offers as we get closer to launch.
        </p>
        <p>
         Stay tuned for more information on how Sync will revolutionize the way you commute on campus.
        </p>
      </div>
      <div class="email-footer">
        <p>

        </p>
        Best regards,
        <br/>
        Team Sync 😊
      </div>
    </div>
  </body>
</html>
`,l=(0,s.j)("662b94e4ffa5e1cbe811afb249a14cb506942a57",d);async function d({email:e}){let t={text:"",from:"getyousync@gmail.com",to:e,subject:"Thanks for Subscribing",attachment:[{data:o(),alternative:!0}]};try{await i.sendAsync(t)}catch(e){throw e}}(0,n.h)([l]),(0,s.j)("daafde080a1c8d4d2a3709b3cb23187dec31e331",l)},8577:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>p,metadata:()=>h});var s=a(9510),r=a(5326),n=a.n(r),i=a(1409),o=a.n(i);a(5023);var l=a(8570);let d=(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/components/Navbar.tsx#default`),c=(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/components/Sidebar.tsx#default`),u=(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/context/SidebarContext.tsx#SidebarProvider`);(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/context/SidebarContext.tsx#useSidebar`);let m=(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/components/Footer.tsx#default`),f=(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/providers/ToasterProvider.tsx#default`),h={title:"Sync",description:"Connecting dots..."};function p({children:e}){return s.jsx("html",{lang:"en",children:(0,s.jsxs)("body",{className:`${n().variable} ${o().variable} antialiased text-black`,children:[(0,s.jsxs)(u,{children:[s.jsx(f,{}),s.jsx(c,{}),s.jsx(d,{}),e]}),s.jsx(m,{})]})})}},5023:()=>{}};