exports.id=951,exports.ids=[951],exports.modules={133:(e,t,s)=>{let r={"662b94e4ffa5e1cbe811afb249a14cb506942a57":()=>Promise.resolve().then(s.bind(s,4844)).then(e=>e.$$ACTION_0),daafde080a1c8d4d2a3709b3cb23187dec31e331:()=>Promise.resolve().then(s.bind(s,4844)).then(e=>e.sendMail)};async function n(e,...t){return(await r[e]()).apply(null,t)}e.exports={"662b94e4ffa5e1cbe811afb249a14cb506942a57":n.bind(null,"662b94e4ffa5e1cbe811afb249a14cb506942a57"),daafde080a1c8d4d2a3709b3cb23187dec31e331:n.bind(null,"daafde080a1c8d4d2a3709b3cb23187dec31e331")}},5192:(e,t,s)=>{Promise.resolve().then(s.bind(s,440)),Promise.resolve().then(s.bind(s,8958)),Promise.resolve().then(s.bind(s,7185)),Promise.resolve().then(s.bind(s,7267)),Promise.resolve().then(s.bind(s,4964)),Promise.resolve().then(s.bind(s,3078)),Promise.resolve().then(s.bind(s,7641)),Promise.resolve().then(s.bind(s,8623)),Promise.resolve().then(s.bind(s,6999)),Promise.resolve().then(s.bind(s,7131)),Promise.resolve().then(s.bind(s,1959)),Promise.resolve().then(s.bind(s,8407)),Promise.resolve().then(s.bind(s,9313)),Promise.resolve().then(s.bind(s,4947)),Promise.resolve().then(s.bind(s,173)),Promise.resolve().then(s.bind(s,6298)),Promise.resolve().then(s.bind(s,4997)),Promise.resolve().then(s.bind(s,2751)),Promise.resolve().then(s.bind(s,3605)),Promise.resolve().then(s.bind(s,2431)),Promise.resolve().then(s.bind(s,2467)),Promise.resolve().then(s.bind(s,9718)),Promise.resolve().then(s.bind(s,991)),Promise.resolve().then(s.bind(s,9666)),Promise.resolve().then(s.bind(s,6853)),Promise.resolve().then(s.bind(s,2241)),Promise.resolve().then(s.bind(s,5556)),Promise.resolve().then(s.bind(s,1158)),Promise.resolve().then(s.bind(s,6887)),Promise.resolve().then(s.bind(s,5523)),Promise.resolve().then(s.bind(s,5986)),Promise.resolve().then(s.bind(s,5272)),Promise.resolve().then(s.bind(s,990))},2262:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,2994,23)),Promise.resolve().then(s.t.bind(s,6114,23)),Promise.resolve().then(s.t.bind(s,9727,23)),Promise.resolve().then(s.t.bind(s,9671,23)),Promise.resolve().then(s.t.bind(s,1868,23)),Promise.resolve().then(s.t.bind(s,4759,23))},1158:(e,t,s)=>{"use strict";s.d(t,{default:()=>m});var r=s(326),n=s(7577);s(5424);var a=(0,s(6242).$)("daafde080a1c8d4d2a3709b3cb23187dec31e331"),i=s(6226),o=s(7461),l=s(7773),d=s(434),c=s(381);let m=()=>{let[e,t]=(0,n.useState)(""),s=async e=>{e.preventDefault();let s=e.currentTarget.elements.namedItem("user_email").value.trim();if(""===s){c.ZP.error("Please fill in your email.");return}try{await a({email:s}),t(""),c.ZP.success("Subscription successful!")}catch(e){e instanceof Error?c.ZP.error(`Failed to subscribe: ${e.message}`):c.ZP.error("Failed to subscribe due to an unexpected error.")}},m=[{icon:r.jsx(o.AgZ,{size:28}),href:"#"},{icon:r.jsx(l.lcJ,{size:32}),href:"#"},{icon:r.jsx(l.t1V,{size:32}),href:"#"},{icon:r.jsx(l.V2E,{size:36}),href:"#"}];return(0,r.jsxs)("footer",{className:" text-center text-gray-800 py-6 bottom-0 w-full overflow-hidden relative",children:[r.jsx("div",{className:"absolute inset-0 top-0 z-0",children:r.jsx(i.default,{src:"/Shape.svg",width:2400,height:2400,alt:"blue curve",priority:!0})}),r.jsx("div",{className:"relative z-10 max-w-7xl mx-auto px-4 -mt-6 md:mt-0",children:(0,r.jsxs)("div",{className:"flex flex-col items-center",children:[(0,r.jsxs)("div",{className:"border-2 rounded-xl bg-white flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-8 md:py-16 gap-4 mt-8 md:mt-16 shadow-xl w-full max-w-7xl mx-auto",children:[r.jsx("h2",{className:"text-xl md:text-3xl w-full text-nowrap font-thin",children:"Subscribe Newsletters"}),r.jsx("form",{onSubmit:s,className:"flex flex-col md:flex-row items-center space-y-4 md:space-x-4 max-w-2xl w-full",children:(0,r.jsxs)("div",{className:"relative w-full max-w-lg",children:[r.jsx("input",{type:"email",value:e,onChange:e=>t(e.target.value),name:"user_email",required:!0,placeholder:"Enter your email",className:"w-full p-4 md:p-6 pr-32 md:pr-60 text-sm md:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}),r.jsx("button",{type:"submit",className:"text-sm md:text-xl absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 md:px-8 py-2 md:py-4 rounded-md hover:bg-blue-600 transition duration-300",children:"Subscribe Now"})]})})]}),r.jsx("div",{className:"w-full py-6 md:py-12",children:(0,r.jsxs)("div",{className:"container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0",children:[r.jsx("div",{className:"flex justify-center space-x-10 md:space-x-20 text-[#434341]",children:[{name:"About us",href:"#"},{name:"Contact us",href:"#"},{name:"About",href:"#"},{name:"Blogs",href:"#"}].map((e,t)=>r.jsx(d.default,{href:e.href,className:"hover:text-black text-sm text-nowrap md:text-lg",children:e.name},t))}),r.jsx("div",{className:"flex justify-center space-x-6 md:space-x-8 text-[#434341]",children:m.map((e,t)=>r.jsx(d.default,{href:e.href,className:"hover:text-black",children:e.icon},t))})]})}),r.jsx("div",{className:"border w-full rounded-2xl bg-[#2B3D51] my-2 md:my-4"}),(0,r.jsxs)("div",{className:"text-gray-500 mt-6 md:mt-12 flex flex-col md:flex-row justify-between items-center w-full",children:[r.jsx("p",{className:"text-sm md:text-base",children:"\xa9 2024 SYNC | All Rights Reserved"}),(0,r.jsxs)("div",{className:"flex justify-center space-x-4 mt-4 md:mt-0",children:[r.jsx("a",{href:"#",className:"hover:underline text-sm",children:"Terms of Service"}),r.jsx("a",{href:"#",className:"hover:underline text-sm",children:"Privacy Policy"})]})]})]})})]})}},6887:(e,t,s)=>{"use strict";s.d(t,{default:()=>d});var r=s(326),n=s(7577),a=s(6226),i=s(434),o=s(7798),l=s(4831);let d=()=>{let[e,t]=(0,n.useState)(!1),{theme:s,resolvedTheme:d}=(0,l.F)();return(0,n.useEffect)(()=>{console.log("Current Theme:",s),console.log("Resolved Theme:",d);let e=()=>{t(window.scrollY>50)};return window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}},[]),(0,n.useEffect)(()=>{console.log("Current Theme:",s),console.log("Resolved Theme:",d)},[s,d]),r.jsx("nav",{className:`hidden sm:block fixed top-0 left-0 right-0 transition-all ease-in-out duration-700 z-50 py-5 px-10 ${e?"w-[70%] shadow-lg bg-white/30 backdrop-blur-md rounded-3xl left-[15%] mt-4 py-1":"w-full bg-transparent"}`,children:(0,r.jsxs)("div",{className:"flex justify-between items-center max-w-7xl mx-auto",children:[r.jsx(i.default,{href:"/",children:e&&"dark"!==s?r.jsx(a.default,{src:"/sync-logo.svg",width:80,height:80,alt:"Sync Logo",priority:!0}):r.jsx(a.default,{src:"/WhiteLogo.svg",width:80,height:80,alt:"Sync Logo",priority:!0})}),r.jsx("div",{className:"flex space-x-6",children:r.jsx("ul",{className:"flex gap-14 font-bold text-md",children:o.H9.map(({label:e,href:t})=>r.jsx("li",{children:r.jsx(i.default,{className:"How it works?"===e?"text-blue-500":"",href:t,children:e})},t))})})]})})}},5523:(e,t,s)=>{"use strict";s.d(t,{default:()=>c});var r=s(326);s(7577);var n=s(6226),a=s(434),i=s(4019),o=s(748),l=s(5272);let d=[{label:"How it works?",href:"/how-it-works"},{label:"About",href:"/about"},{label:"Blog",href:"/blog"},{label:"Contact us",href:"/contact-us"}];function c(){let{isOpen:e,toggle:t,close:s}=(0,l.A)();return(0,r.jsxs)("div",{className:"md:hidden",children:[(0,r.jsxs)("div",{className:"flex items-center p-4",children:[r.jsx("button",{className:"z-50",onClick:t,"aria-label":e?"Close menu":"Open menu",children:e?r.jsx(i.Z,{size:40}):r.jsx(o.Z,{size:40})}),r.jsx("div",{className:"flex-grow flex justify-center",children:r.jsx(a.default,{href:"/",children:r.jsx(n.default,{src:"/sync-logo.svg",width:100,height:100,alt:"Sync Logo",priority:!0})})})]}),r.jsx("div",{className:`fixed top-0 left-0 h-full w-full bg-white shadow-lg 
                    transform transition-transform duration-300 ease-in-out 
                    ${e?"translate-x-0":"-translate-x-full"}
                    z-50 
                `,children:(0,r.jsxs)("div",{className:"p-10",children:[r.jsx(a.default,{href:"/",className:"mb-10 flex justify-center",children:r.jsx(n.default,{src:"/sync-logo.svg",width:140,height:140,alt:"Sync Logo",priority:!0})}),r.jsx("nav",{children:r.jsx("ul",{className:"space-y-8",children:d.map(({label:e,href:t})=>r.jsx("li",{children:r.jsx(a.default,{href:t,className:"block py-4 px-6 text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in-out text-2xl font-semibold",onClick:s,children:e})},t))})})]})})]})}},5986:(e,t,s)=>{"use strict";s.d(t,{ThemeProvider:()=>a});var r=s(326);s(7577);var n=s(4831);function a({children:e,...t}){return r.jsx(n.f,{...t,children:e})}},5272:(e,t,s)=>{"use strict";s.d(t,{A:()=>o,SidebarProvider:()=>i});var r=s(326),n=s(7577);let a=(0,n.createContext)(void 0);function i({children:e}){let[t,s]=(0,n.useState)(!1);return r.jsx(a.Provider,{value:{isOpen:t,toggle:()=>s(!t),close:()=>s(!1)},children:e})}function o(){let e=(0,n.useContext)(a);if(void 0===e)throw Error("useSidebar must be used within a SidebarProvider");return e}},7798:(e,t,s)=>{"use strict";s.d(t,{H9:()=>r,lj:()=>n});let r=[{label:"How it works?",href:"/how-it-works"},{label:"About",href:"/about"},{label:"Blog",href:"/blog"},{label:"Contact us",href:"/contact-us"}],n=[{id:1,contName:"History",contHeading:"The History of Sync: From WhatsApp Group to Mobile App",contText:`Sync originated from the 'Bennett Carpooling' WhatsApp group at Bennett University, where students coordinated carpools, shared information, and bought and sold items. As the group's admin, you recognized the need for a more organized platform to enhance these interactions.

    Inspired by the group's success, you envisioned Sync as a mobile app that would streamline carpooling and incorporate marketplace and announcement features tailored to university students.

    With a dedicated team of developers, you set out to create an intuitive app that addresses the unique challenges faced by college students, providing a convenient, affordable, and sustainable transportation solution. Sync transformed from a simple WhatsApp group into an essential resource for the university community, showcasing the power of grassroots innovation.`},{id:2,contName:"Team",contHeading:"Meet the Team Behind Sync",contText:`The Sync team is a diverse group of talented individuals, each bringing a unique set of skills to the table. From developers and designers to project managers, everyone plays a vital role in turning Sync from an idea into a reality.

    Our developers worked tirelessly to build a user-friendly and efficient app that meets the needs of university students. The designers focused on creating a clean and modern interface that is easy to navigate.`},{id:3,contName:"Vision",contHeading:"Sync's Vision for the Future",contText:`At Sync, we believe in creating a connected community where students can seamlessly share resources, coordinate rides, and stay informed about campus life. Our vision extends beyond just carpooling — we aim to build a platform that fosters collaboration and sustainability.`}]},990:(e,t,s)=>{"use strict";s.d(t,{default:()=>a});var r=s(326),n=s(381);let a=()=>r.jsx(n.x7,{})},4844:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$ACTION_0:()=>d,sendMail:()=>l});var r=s(7745);s(6461);var n=s(4168),a=s(5723);let i=new n.Ic({user:process.env.SMTP_MAIL,password:process.env.SMTP_PASSWORD,host:process.env.SMTP_HOST,ssl:!0}),o=()=>`
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
`,l=(0,r.j)("662b94e4ffa5e1cbe811afb249a14cb506942a57",d);async function d({email:e}){let t={text:"",from:"getyousync@gmail.com",to:e,subject:"Thanks for Subscribing",attachment:[{data:o(),alternative:!0}]};try{await i.sendAsync(t)}catch(e){throw e}}(0,a.h)([l]),(0,r.j)("daafde080a1c8d4d2a3709b3cb23187dec31e331",l)},2406:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>v,metadata:()=>p});var r=s(9510),n=s(5326),a=s.n(n),i=s(1409),o=s.n(i);s(5023);var l=s(8570);let d=(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/components/Navbar.tsx#default`),c=(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/components/Sidebar.tsx#default`),m=(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/context/SidebarContext.tsx#SidebarProvider`);(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/context/SidebarContext.tsx#useSidebar`);let h=(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/components/Footer.tsx#default`),u=(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/providers/ToasterProvider.tsx#default`);s(1159);let f=(0,l.createProxy)(String.raw`/Users/rupeshshandilya/Developer/Sync/Website/src/app/components/theme-provider.tsx#ThemeProvider`);var x=s(4580);let b=({children:e})=>r.jsx(f,{attribute:"class",defaultTheme:"system",enableSystem:!0,disableTransitionOnChange:!0,children:r.jsx(x.Q2,{children:e})}),p={title:"Sync",description:"Connecting dots..."};function v({children:e}){return r.jsx("html",{lang:"en",children:(0,r.jsxs)("body",{className:`${a().variable} ${o().variable} antialiased`,children:[(0,r.jsxs)(m,{children:[r.jsx(u,{}),r.jsx(c,{}),r.jsx(d,{}),r.jsx(b,{children:e})]}),r.jsx(h,{})]})})}},5023:()=>{}};