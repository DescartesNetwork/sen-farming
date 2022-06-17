"use strict";(globalThis.webpackChunksen_farming=globalThis.webpackChunksen_farming||[]).push([["src_os_providers_index_tsx-src_shared_util_ts"],{80039:(e,n,t)=>{t.r(n),t.d(n,{AccountProvider:()=>j,MintProvider:()=>G,PoolProvider:()=>f,UIProvider:()=>d,WalletProvider:()=>v,useAccount:()=>R,useMint:()=>Z,usePool:()=>x,useUI:()=>u,useWallet:()=>b,withAccount:()=>M,withMint:()=>Q,withPool:()=>g,withUI:()=>h,withWallet:()=>k});var s=t(92950),r=t(32659),o=t(87358),i=t(87482),a=t(45263);const l=(0,s.createContext)({}),d=e=>{let{children:n,appId:t,style:d={},antd:c=!1}=e;const h=(0,o.u5)(),{ui:u}=(0,o.Qy)((e=>e)),m=(0,s.useCallback)((async function(){return await h((0,i.AY)(...arguments)).unwrap()}),[h]),f=(0,s.useMemo)((()=>({ui:u,setBackground:m})),[u,m]),p=c?{getPopupContainer:()=>document.getElementById(t),..."object"===typeof c?c:{}}:void 0;return(0,a.jsx)(l.Provider,{value:f,children:(0,a.jsx)("section",{id:t,style:{backgroundColor:"transparent",...d},children:p?(0,a.jsx)(r.ConfigProvider,{...p,children:n}):n})})},c=e=>{let{children:n}=e;return(0,a.jsx)(l.Consumer,{children:e=>s.Children.map(n,(n=>(0,s.cloneElement)(n,{...e})))})},h=e=>{class n extends s.Component{render(){const{forwardedRef:n,...t}=this.props;return(0,a.jsx)(c,{children:(0,a.jsx)(e,{ref:n,...t})})}}return(0,s.forwardRef)(((e,t)=>(0,a.jsx)(n,{...e,ref:t})))},u=()=>(0,s.useContext)(l),m=(0,s.createContext)({}),f=e=>{let{children:n}=e;const{pools:t}=(0,o.Qy)((e=>e)),r=(0,s.useMemo)((()=>({pools:t})),[t]);return(0,a.jsx)(m.Provider,{value:r,children:n})},p=e=>{let{children:n}=e;return(0,a.jsx)(m.Consumer,{children:e=>s.Children.map(n,(n=>(0,s.cloneElement)(n,{...e})))})},g=e=>{class n extends s.Component{render(){const{forwardedRef:n,...t}=this.props;return(0,a.jsx)(p,{children:(0,a.jsx)(e,{ref:n,...t})})}}return(0,s.forwardRef)(((e,t)=>(0,a.jsx)(n,{...e,ref:t})))},x=()=>(0,s.useContext)(m),w=(0,s.createContext)({}),v=e=>{let{children:n}=e;const{wallet:t}=(0,o.Qy)((e=>e)),r=(0,s.useMemo)((()=>({wallet:t})),[t]);return(0,a.jsx)(w.Provider,{value:r,children:n})},C=e=>{let{children:n}=e;return(0,a.jsx)(w.Consumer,{children:e=>s.Children.map(n,(n=>(0,s.cloneElement)(n,{...e})))})},k=e=>{class n extends s.Component{render(){const{forwardedRef:n,...t}=this.props;return(0,a.jsx)(C,{children:(0,a.jsx)(e,{ref:n,...t})})}}return(0,s.forwardRef)(((e,t)=>(0,a.jsx)(n,{...e,ref:t})))},b=()=>(0,s.useContext)(w),y=(0,s.createContext)({}),j=e=>{let{children:n}=e;const{accounts:t}=(0,o.Qy)((e=>e)),r=(0,s.useMemo)((()=>({accounts:t})),[t]);return(0,a.jsx)(y.Provider,{value:r,children:n})},I=e=>{let{children:n}=e;return(0,a.jsx)(y.Consumer,{children:e=>s.Children.map(n,(n=>(0,s.cloneElement)(n,{...e})))})},M=e=>{class n extends s.Component{render(){const{forwardedRef:n,...t}=this.props;return(0,a.jsx)(I,{children:(0,a.jsx)(e,{ref:n,...t})})}}return(0,s.forwardRef)(((e,t)=>(0,a.jsx)(n,{...e,ref:t})))},R=()=>(0,s.useContext)(y);var P=t(95418),E=t(33015),U=t(94757),_=t.n(U),B=t(67845),q=t(63805);const S=e=>({symbol:"SOL",name:"Solana",address:"11111111111111111111111111111111",decimals:9,chainId:e,extensions:{coingeckoId:"solana"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"}),A=e=>({symbol:"SNTR",name:"Sentre",address:"5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ",decimals:9,chainId:e,extensions:{coingeckoId:"sentre"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M/logo.png"}),D=[S(103),A(103),{symbol:"wBTC",name:"Wrapped Bitcoin",address:"8jk4eJymMfNZV9mkRNxJEt2VJ3pRvdJvD5FE94GXGBPM",decimals:9,chainId:103,extensions:{coingeckoId:"bitcoin"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/qfnqNqs3nCAHjnyCgLRDbBtq4p2MtHZxw8YjSyYhPoL/logo.png"},{symbol:"wETH",name:"Ethereum",address:"27hdcZv7RtuMp75vupThR3T4KLsL61t476eosMdoec4c",decimals:9,chainId:103,extensions:{coingeckoId:"ethereum"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FeGn77dhg1KXRRFeSwwMiykZnZPw5JXW6naf2aQgZDQf/logo.png"},{symbol:"UNI",name:"Uniswap",address:"FVZFSXu3yn17YdcxLD72TFDUqkdE5xZvcW18EUpRQEbe",decimals:9,chainId:103,extensions:{coingeckoId:"uniswap"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3MVa4e32PaKmPxYUQ6n8vFkWtCma68Ld7e7fTktWDueQ/logo.png"},{symbol:"USDC",name:"USD Coin",address:"2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj",decimals:9,chainId:103,extensions:{coingeckoId:"usd-coin"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"}];console.log("Debug OS Isolation:","sen_farming");const L=new class{constructor(){var e=this;this.tokenMap=void 0,this.engine=void 0,this.chainId=void 0,this.cluster=void 0,this.loading=void 0,this.queue=void 0,this._init=async()=>this.tokenMap.size&&this.engine?[this.tokenMap,this.engine]:new Promise((async e=>{if(this.loading)return this.queue.push(e);this.loading=!0;let n=await(await(new B.DK).resolve()).filterByChainId(this.chainId).getList();for("devnet"===this.cluster&&(n=n.concat(D)),n="testnet"===this.cluster?n.concat([A(102),S(102)]):n.concat([S(101)]),n.forEach((e=>this.tokenMap.set(e.address,e))),this.engine=_()((function(){this.ref("address"),this.field("symbol"),this.field("name"),n.forEach((e=>this.add(e)))})),e([this.tokenMap,this.engine]);this.queue.length;)this.queue.shift()([this.tokenMap,this.engine]);this.loading=!1})),this.all=async()=>{const[e]=await this._init();return Array.from(e.values())},this.findByAddress=async e=>{const[n]=await this._init();return n.get(e)},this.find=async function(n){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;const[s,r]=await e._init();let o=[];if(!n)return[];const i=n+"~1";return r.search(i).forEach((e=>{let{ref:n}=e;if(o.findIndex((e=>{let{address:t}=e;return t===n}))<0){const e=s.get(n);e&&o.push(e)}})),0===t?o:o.slice(0,t)},this.tokenMap=new Map,this.engine=void 0,this.chainId=q.Bv,this.cluster=q.ef,this.loading=!1,this.queue=[],this._init()}},T=(0,s.createContext)({}),G=e=>{let{children:n}=e;const t=(0,o.u5)(),{mints:r,pools:i}=(0,o.Qy)((e=>e)),l=(0,s.useCallback)((async function(){return await t((0,E.ih)(...arguments)).unwrap()}),[t]),d=(0,s.useCallback)((async e=>{var n;if(!P.account.isAddress(e))throw new Error("Invalid mint address");const t=await L.findByAddress(e);if(void 0!==(null===t||void 0===t?void 0:t.decimals))return t.decimals;if(Object.values(i).findIndex((n=>{let{mint_lpt:t}=n;return t===e}))>=0)return 9;const s=await l({address:e});if(null!==(n=s[e])&&void 0!==n&&n.decimals)return s[e].decimals;throw new Error("Cannot find mint decimals")}),[l,i]),c=(0,s.useMemo)((()=>({mints:r,getMint:l,getDecimals:d,tokenProvider:L})),[r,l,d]);return(0,a.jsx)(T.Provider,{value:c,children:n})},F=e=>{let{children:n}=e;return(0,a.jsx)(T.Consumer,{children:e=>s.Children.map(n,(n=>(0,s.cloneElement)(n,{...e})))})},Q=e=>{class n extends s.Component{render(){const{forwardedRef:n,...t}=this.props;return(0,a.jsx)(F,{children:(0,a.jsx)(e,{ref:n,...t})})}}return(0,s.forwardRef)(((e,t)=>(0,a.jsx)(n,{...e,ref:t})))},Z=()=>(0,s.useContext)(T)},34559:(e,n,t)=>{t.d(n,{PG:()=>p,RB:()=>l,Xn:()=>c,kU:()=>h,l$:()=>f,p:()=>m,sA:()=>d,uR:()=>u});var s=t(95418),r=t(16200),o=t.n(r),i=t(63805),a=t(57452);const l=e=>window.open(e,"_blank"),d=e=>new Promise((n=>setTimeout(n,e))),c=function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"...";return e.substring(0,n)+t+e.substring(e.length-n,e.length)},h=e=>s.account.isAddress(e)?`https://solscan.io/account/${e}?cluster=${i.ef}`:`https://solscan.io/tx/${e}?cluster=${i.ef}`,u=e=>e?o()(e):o()("0"),m=(e,n)=>{let t=Math.floor(16777215*Math.random());if(e){t=0;for(let n=0;n<e.length;n++)t=e.charCodeAt(n)+((t<<5)-t)}var s=[0,0,0];for(let o=0;o<3;o++){var r=t>>8*o&255;s[o]=r}return`rgba(${s[0]}, 100, ${s[1]},${n||1})`},f=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return a.R.load("fetchCGK"+e,(()=>s.utils.parseCGK(e)))},p=e=>e[Math.floor(Math.random()*e.length)]}}]);
//# sourceMappingURL=src_os_providers_index_tsx-src_shared_util_ts.4c870ee3.chunk.js.map