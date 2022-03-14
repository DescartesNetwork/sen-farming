(globalThis.webpackChunksen_farming=globalThis.webpackChunksen_farming||[]).push([[707],{11495:(e,t,s)=>{"use strict";s.d(t,{Z:()=>u});var a=s(63805);const n={spltAddress:"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",splataAddress:"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"},r={devnet:{...n,node:"https://api.devnet.solana.com",chainId:103,sntrAddress:"5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ",sntrPoolAddress:"3EUPL7YQLbU6DNU5LZeQeHPXTf1MigJ2yASXA9rH5Ku4",swapAddress:"4erFSLP7oBFSVC1t35jdxmbfxEhYCKfoM6XdG2BLR3UF",taxmanAddress:"8UaZw2jDhJzv5V53569JbCd3bD4BnyCfBH3sjwgajGS9"},testnet:{...n,node:"https://api.testnet.solana.com",chainId:102,sntrAddress:"",sntrPoolAddress:"",swapAddress:"",taxmanAddress:""},mainnet:{...n,node:"https://api.google.mainnet-beta.solana.com",chainId:101,sntrAddress:"SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M",sntrPoolAddress:"Aa3WZX7Xunfebp2MuAcz9CNw8TYTDL7mVrmb11rjyVm6",swapAddress:"SSW7ooZ1EbEognq5GosbygA3uWW1Hq1NsFq6TsftCFV",taxmanAddress:"9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e"}};const i="sen_farming",d={[i]:{url:"https://descartesnetwork.github.io/sen-farming/index.js",appId:i,name:"Sen Farming",author:{name:"Sentre",email:"hi@sentre.io"},supportedViews:"page,widget".split(",").map((e=>e.trim())).filter((e=>["page","widget"].includes(e))),tags:"solana,dapps,liquidity".split(",").map((e=>e.trim())),description:"Stake your LP tokens to earn more profit",verified:!1}},c={development:{defaultAppId:i,extra:d,senreg:"https://descartesnetwork.github.io/senreg/register.json"},staging:{defaultAppId:i,extra:d,senreg:"https://descartesnetwork.github.io/senreg/register.json"},production:{defaultAppId:i,extra:{},senreg:"https://descartesnetwork.github.io/senreg/register.json"}},o={development:{base:`${window.location.origin}/dashboard?referrer=`},staging:{base:"https://hub.sentre.io/dashboard?referrer="},production:{base:"https://hub.sentre.io/dashboard?referrer="}},l={devnet:{baseURL:"https://stat-dev.sentre.io"},testnet:{baseURL:"https://stat-dev.sentre.io"},mainnet:{baseURL:"https://stat.sentre.io"}},u={sol:r[a.ef],register:c[a.OB],referral:o[a.OB],stat:l[a.ef]}},63845:(e,t,s)=>{"use strict";s.d(t,{Tz:()=>a,Ki:()=>n,ZP:()=>r});const a=e=>({symbol:"SOL",name:"Solana",address:"11111111111111111111111111111111",decimals:9,chainId:e,extensions:{coingeckoId:"solana"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"}),n=e=>({symbol:"SNTR",name:"Sentre",address:"5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ",decimals:9,chainId:e,extensions:{coingeckoId:"sentre"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M/logo.png"}),r=[a(103),n(103),{symbol:"wBTC",name:"Wrapped Bitcoin",address:"8jk4eJymMfNZV9mkRNxJEt2VJ3pRvdJvD5FE94GXGBPM",decimals:9,chainId:103,extensions:{coingeckoId:"bitcoin"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/qfnqNqs3nCAHjnyCgLRDbBtq4p2MtHZxw8YjSyYhPoL/logo.png"},{symbol:"wETH",name:"Ethereum",address:"27hdcZv7RtuMp75vupThR3T4KLsL61t476eosMdoec4c",decimals:9,chainId:103,extensions:{coingeckoId:"ethereum"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FeGn77dhg1KXRRFeSwwMiykZnZPw5JXW6naf2aQgZDQf/logo.png"},{symbol:"UNI",name:"Uniswap",address:"FVZFSXu3yn17YdcxLD72TFDUqkdE5xZvcW18EUpRQEbe",decimals:9,chainId:103,extensions:{coingeckoId:"uniswap"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3MVa4e32PaKmPxYUQ6n8vFkWtCma68Ld7e7fTktWDueQ/logo.png"},{symbol:"USDC",name:"USD Coin",address:"2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj",decimals:9,chainId:103,extensions:{coingeckoId:"usd-coin"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"}]},65090:(e,t,s)=>{"use strict";s.d(t,{T8:()=>i,E5:()=>c,ZP:()=>l});var a=s(19289),n=s(95418);const r="accounts",i=(0,a.createAsyncThunk)(`${r}/getAccounts`,(async e=>{let{owner:t}=e;if(!n.account.isAddress(t))throw new Error("Invalid owner/wallet address");const{splt:s}=window.sentre,a=n.account.fromAddress(t),{value:r}=await s.connection.getTokenAccountsByOwner(a,{programId:s.spltProgramId});let i={};return r.forEach((e=>{let{pubkey:t,account:{data:a}}=e;const n=t.toBase58(),r=s.parseAccountData(a);return i[n]=r})),i})),d=(0,a.createAsyncThunk)(`${r}/getAccount`,(async(e,t)=>{let{address:s}=e,{getState:a}=t;if(!n.account.isAddress(s))throw new Error("Invalid account address");const{accounts:{[s]:r}}=a();if(r)return{[s]:r};const{splt:i}=window.sentre;return{[s]:await i.getAccountData(s)}})),c=(0,a.createAsyncThunk)(`${r}/upsetAccount`,(async e=>{let{address:t,data:s}=e;if(!n.account.isAddress(t))throw new Error("Invalid address");if(!s)throw new Error("Data is empty");return{[t]:s}})),o=(0,a.createAsyncThunk)(`${r}/deleteAccount`,(async e=>{let{address:t}=e;if(!n.account.isAddress(t))throw new Error("Invalid address");return{address:t}})),l=(0,a.createSlice)({name:r,initialState:{},reducers:{},extraReducers:e=>{e.addCase(i.fulfilled,((e,t)=>{let{payload:s}=t;return s})).addCase(d.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(c.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(o.fulfilled,((e,t)=>{let{payload:s}=t;delete e[s.address]}))}}).reducer},5105:(e,t,s)=>{"use strict";s.d(t,{fL:()=>d,Z9:()=>c,Ny:()=>o,ZP:()=>u});var a=s(19289),n=s(95418),r=s(3007);const i="flags",d=(0,a.createAsyncThunk)("flags/loadVisited",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet");const i=new r.Z(a).createInstance("sentre");return{visited:await i.getItem("visited")||!1}})),c=(0,a.createAsyncThunk)("flags/updateVisited",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet");const i=new r.Z(a).createInstance("sentre");return await i.setItem("visited",e),{visited:e}})),o=(0,a.createAsyncThunk)("flags/loadReferred",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet");const i=new r.Z(a).createInstance("sentre");return{referred:await i.getItem("referred")||!1}})),l=(0,a.createAsyncThunk)("flags/updateReferred",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet");const i=new r.Z(a).createInstance("sentre");return await i.setItem("referred",e),{referred:e}})),u=(0,a.createSlice)({name:i,initialState:{visited:!0,referred:!1},reducers:{},extraReducers:e=>{e.addCase(d.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(c.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(o.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(l.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},87358:(e,t,s)=>{"use strict";s.d(t,{u5:()=>f,Qy:()=>y,ZP:()=>I});var a=s(55754),n=s(19289),r=s(73938),i=s(85912),d=s(87482),c=s(5105),o=s(58851),l=s(21028),u=s(65090),h=s(33015),p=s(92871),g=s(33361),w=s(51865);(0,a.createStoreHook)(r.RootContext);const f=(0,a.createDispatchHook)(r.RootContext),y=(0,a.createSelectorHook)(r.RootContext),m=(0,n.configureStore)({middleware:e=>e(i.h),devTools:(0,i.$)("sentre"),reducer:{ui:d.ZP,flags:c.ZP,page:o.ZP,wallet:l.ZP,accounts:u.ZP,mints:h.ZP,pools:p.ZP,search:g.ZP,walkthrough:w.ZP}}),I=179==s.j?m:null},33015:(e,t,s)=>{"use strict";s.d(t,{ih:()=>i,ZP:()=>o});var a=s(19289),n=s(95418);const r="mints",i=(0,a.createAsyncThunk)("mints/getMint",(async(e,t)=>{let{address:s,force:a=!1}=e,{getState:r}=t;if(!n.account.isAddress(s))throw new Error("Invalid mint address");if(!a){const{accounts:{[s]:e}}=r();if(e)return{[s]:e}}const{splt:i}=window.sentre;return{[s]:await i.getMintData(s)}})),d=(0,a.createAsyncThunk)("mints/upsetMint",(async e=>{let{address:t,data:s}=e;if(!n.account.isAddress(t))throw new Error("Invalid address");if(!s)throw new Error("Data is empty");return{[t]:s}})),c=(0,a.createAsyncThunk)("mints/deleteMint",(async e=>{let{address:t}=e;if(!n.account.isAddress(t))throw new Error("Invalid address");return{address:t}})),o=(0,a.createSlice)({name:r,initialState:{},reducers:{},extraReducers:e=>{e.addCase(i.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(d.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(c.fulfilled,((e,t)=>{let{payload:s}=t;delete e[s.address]}))}}).reducer},58851:(e,t,s)=>{"use strict";s.d(t,{Xg:()=>h,mw:()=>p,ij:()=>g,T$:()=>w,eI:()=>f,qS:()=>y,Y:()=>m,H8:()=>I,tQ:()=>b,ZP:()=>A});var a=s(19289),n=s(95418),r=s(3007),i=s(11495);const{register:{senreg:d,extra:c}}=i.Z,o=(e,t)=>t&&Array.isArray(t)?t.filter((t=>e[t])):[],l="page",u={register:{},appIds:[],widgetIds:[]},h=(0,a.createAsyncThunk)("page/loadRegister",(async()=>({register:{...await(async()=>{try{const e=await fetch(d);return await e.json()}catch(e){return{}}})(),...c}}))),p=(0,a.createAsyncThunk)("page/installManifest",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a},page:{appIds:r,widgetIds:i,register:d}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet.");if(r.includes(e.appId))throw new Error("Cannot run sandbox for an installed application.");const c=[...r];c.push(e.appId);const o=[...i];e.supportedViews.includes("widget")&&o.push(e.appId);const l={...d};return l[e.appId]=e,{appIds:c,widgetIds:o,register:l}})),g=(0,a.createAsyncThunk)("page/loadPage",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a},page:{register:i}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet.");const d=new r.Z(a).createInstance("sentre");return{appIds:o(i,await d.getItem("appIds")||u.appIds),widgetIds:o(i,await d.getItem("widgetIds")||u.widgetIds)}})),w=(0,a.createAsyncThunk)("page/updatePage",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a},page:{register:i}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet.");e=o(i,e);const d=new r.Z(a).createInstance("sentre");return await d.setItem("appIds",e),{appIds:e}})),f=(0,a.createAsyncThunk)("page/installApp",(async(e,t)=>{var s,a;let{getState:i}=t;const{wallet:{address:d},page:{register:c,appIds:o,widgetIds:l}}=i();if(!n.account.isAddress(d))throw new Error("Wallet is not connected yet.");if(o.includes(e))return{};const u=[...o];u.push(e);const h=null!==(s=c[e])&&void 0!==s&&null!==(a=s.supportedViews)&&void 0!==a&&a.includes("widget")?[...l,e]:[...l],p=new r.Z(d).createInstance("sentre");return await p.setItem("appIds",u),await p.setItem("widgetIds",h),{appIds:u,widgetIds:h}})),y=(0,a.createAsyncThunk)("page/uninstallApp",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a},page:{appIds:i,widgetIds:d}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet.");if(!i.includes(e))return{};const c=i.filter((t=>t!==e)),o=d.filter((t=>t!==e)),l=new r.Z(a),u=l.createInstance("sentre");return await u.setItem("appIds",c),await u.setItem("widgetIds",o),await l.dropInstance(e),{appIds:c,widgetIds:o}})),m=(0,a.createAsyncThunk)("page/updateDashboard",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet.");const i=new r.Z(a).createInstance("sentre");return await i.setItem("widgetIds",e),{widgetIds:e}})),I=(0,a.createAsyncThunk)("page/addWidgets",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a},page:{widgetIds:i}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet");const d=[...i,...e],c=new r.Z(a).createInstance("sentre");return await c.setItem("widgetIds",d),{widgetIds:d}})),b=(0,a.createAsyncThunk)("page/removeWidget",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a},page:{widgetIds:i}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet.");if(!i.includes(e))return{};const d=i.filter((t=>t!==e)),c=new r.Z(a).createInstance("sentre");return await c.setItem("widgetIds",d),{widgetIds:d}})),A=(0,a.createSlice)({name:l,initialState:u,reducers:{},extraReducers:e=>{e.addCase(h.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(p.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(g.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(w.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(f.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(y.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(m.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(I.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(b.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},92871:(e,t,s)=>{"use strict";s.d(t,{d2:()=>c,E6:()=>l,ZP:()=>u});var a=s(19289),n=s(95418),r=s(11495);const{sol:{taxmanAddress:i}}=r.Z,d="pools",c=(0,a.createAsyncThunk)("pools/getPools",(async()=>{const{swap:e}=window.sentre,t=await e.connection.getProgramAccounts(e.swapProgramId,{filters:[{dataSize:257},{memcmp:{bytes:i,offset:65}}]});let s={};return t.forEach((t=>{let{pubkey:a,account:{data:n}}=t;const r=a.toBase58(),i=e.parsePoolData(n);s[r]=i})),s})),o=(0,a.createAsyncThunk)("pools/getPool",(async(e,t)=>{let{address:s}=e,{getState:a}=t;if(!n.account.isAddress(s))throw new Error("Invalid pool address");const{pools:{[s]:r}}=a();if(r)return{[s]:r};const{swap:i}=window.sentre;return{[s]:await i.getPoolData(s)}})),l=(0,a.createAsyncThunk)("pools/upsetPool",(async e=>{let{address:t,data:s}=e;if(!n.account.isAddress(t))throw new Error("Invalid pool address");if(!s)throw new Error("Data is empty");return{[t]:s}})),u=(0,a.createSlice)({name:d,initialState:{},reducers:{},extraReducers:e=>{e.addCase(c.fulfilled,((e,t)=>{let{payload:s}=t;return s})).addCase(o.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(l.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},33361:(e,t,s)=>{"use strict";s.d(t,{sO:()=>r,K4:()=>i,ZP:()=>c});var a=s(19289);const n="search",r=(0,a.createAsyncThunk)("search/setValue",(async e=>({value:e}))),i=(0,a.createAsyncThunk)("search/setLoading",(async e=>({loading:e}))),d=(0,a.createAsyncThunk)("search/setDisabled",(async e=>({disabled:e}))),c=(0,a.createSlice)({name:n,initialState:{value:"",loading:!1,disabled:!1},reducers:{},extraReducers:e=>{e.addCase(r.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(i.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(d.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},87482:(e,t,s)=>{"use strict";s.d(t,{Dc:()=>d,SI:()=>c,zi:()=>o,TK:()=>l,ZP:()=>u});var a=s(19289);const n=()=>{const e=window.innerWidth;return e<576?"xs":e<768?"sm":e<992?"md":e<1200?"lg":e<1400?"xl":"xxl"},r="ui",i={theme:window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark",width:window.innerWidth,infix:n(),touchable:"ontouchstart"in window||navigator.maxTouchPoints>0,visibleActionCenter:!1,visibleInstaller:!1},d=(0,a.createAsyncThunk)("ui/setTheme",(async e=>({theme:e}))),c=(0,a.createAsyncThunk)("ui/resize",(async()=>({width:window.innerWidth,infix:n()}))),o=(0,a.createAsyncThunk)("ui/setVisibleActionCenter",(async e=>({visibleActionCenter:e}))),l=(0,a.createAsyncThunk)("ui/setVisibleInstaller",(async e=>({visibleInstaller:e}))),u=(0,a.createSlice)({name:r,initialState:i,reducers:{},extraReducers:e=>{e.addCase(d.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(c.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(o.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(l.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},51865:(e,t,s)=>{"use strict";s.d(t,{Gm:()=>n,Rw:()=>d,ZP:()=>c});var a=s(19289);let n;!function(e){e[e.Default=0]="Default",e[e.NewComer=1]="NewComer",e[e.Referral=2]="Referral"}(n||(n={}));const r="walkthrough",i={type:n.Default,run:!1,step:0},d=(0,a.createAsyncThunk)(`${r}/setWalkthrough`,(async e=>({...e}))),c=(0,a.createSlice)({name:r,initialState:i,reducers:{},extraReducers:e=>{e.addCase(d.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},21028:(e,t,s)=>{"use strict";s.d(t,{Wh:()=>o,Dx:()=>l,UP:()=>u,K8:()=>h,co:()=>p,ZP:()=>g});var a=s(19289),n=s(95418),r=s(11495);const i=async e=>{const{sol:{node:t,spltAddress:s,splataAddress:a,swapAddress:i}}=r.Z;window.sentre={wallet:e,lamports:new n.Lamports(t),splt:new n.SPLT(s,a,t),swap:new n.Swap(i,s,a,t)}},d="wallet",c={visible:!1,address:"",lamports:BigInt(0)},o=(0,a.createAsyncThunk)("wallet/openWallet",(async()=>({visible:!0}))),l=(0,a.createAsyncThunk)("wallet/closeWallet",(async()=>({visible:!1}))),u=(0,a.createAsyncThunk)("wallet/connectWallet",(async e=>{if(!e)throw new Error("Invalid wallet instance");await i(e);const t=await e.getAddress(),s=await window.sentre.lamports.getLamports(t);return{address:t,lamports:BigInt(s),visible:!1}})),h=(0,a.createAsyncThunk)("wallet/updateWallet",(async e=>{let{lamports:t}=e;return{lamports:t}})),p=(0,a.createAsyncThunk)("wallet/disconnectWallet",(async()=>{await(async()=>{var e;null!==(e=window.sentre)&&void 0!==e&&e.wallet&&window.sentre.wallet.disconnect(),await i(void 0)})(),window.location.reload()})),g=(0,a.createSlice)({name:d,initialState:c,reducers:{},extraReducers:e=>{e.addCase(o.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(l.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(u.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(h.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(p.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},57452:(e,t,s)=>{"use strict";s.d(t,{R:()=>d});const a={ttl:3e4},n={limit:{calls:10,time:1e3},cache:a};class r{constructor(e){this.key="",this.resolveQueue=[],this.rejectQueue=[],this.key=e}add(e,t){this.resolveQueue.push(e),this.rejectQueue.push(t)}resolves(e){for(;this.resolveQueue.length>0;){this.resolveQueue.shift()(e)}}rejects(e){for(;this.rejectQueue.length>0;){this.rejectQueue.shift()(e)}}}class i{static set(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a;this.mapCache.set(e,t),setTimeout((()=>{this.mapCache.delete(e)}),s.ttl)}static get(e){return this.mapCache.get(e)}}i.mapCache=new Map;class d{static getSingleFlight(e){const t=JSON.stringify(e);if(this.mapInstance.has(t)){const e=this.mapInstance.get(t);if(e)return e}let s=new c(e);return this.mapInstance.set(t,s),s}static async load(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};"object"===typeof e&&(e=JSON.stringify(e));let a=d.getSingleFlight(s);d.mapInstance.set(e,a);const n=new r(e);return a.load(n,t)}}d.mapInstance=new Map;class c{constructor(e){this.config=void 0,this.intervalRequest=void 0,this.timeLogs=[],this.mapRequestCalling=new Map,this.requestQueue=[],this.config=Object.assign(n,e)}async load(e,t){const s=i.get(e.key);if(s)return Promise.resolve(s);let a=!1,n=this.mapRequestCalling.get(e.key);return n||(n=e,a=!0,this.mapRequestCalling.set(n.key,n)),new Promise(((e,s)=>{if(!n)return s("Not found request!");n.add(e,s),a&&this.fetch(n,t)}))}fetch(e,t){if(!this.validateLimit())return this.addRequestQueue(e,t);this.createTimeLogs(),t().then((t=>{i.set(e.key,t,this.config.cache),e.resolves(t)})).catch((t=>{e.rejects(t)})).finally((()=>{this.mapRequestCalling.delete(e.key),this.fetchRequestQueue(t)}))}fetchRequestQueue(e){if(!this.validateLimit())return;const t=this.requestQueue.shift();t&&this.load(t,e),0===this.requestQueue.length&&this.intervalRequest&&clearInterval(this.intervalRequest)}addRequestQueue(e,t){var s;this.requestQueue.push(e),this.intervalRequest=setInterval((()=>{this.fetchRequestQueue(t)}),null===(s=this.config.limit)||void 0===s?void 0:s.time)}validateLimit(){return!0}createTimeLogs(){var e;if(!this.config.limit)return;const t=(new Date).getTime();this.timeLogs.push(t),this.timeLogs.length>(null===(e=this.config.limit)||void 0===e?void 0:e.calls)&&this.timeLogs.shift()}}},85912:(e,t,s)=>{"use strict";s.d(t,{$:()=>a,h:()=>n});const a=e=>!1;BigInt.prototype.toJSON=function(){return this.toString()};const n={serializableCheck:{isSerializable:e=>"undefined"===typeof e||null===e||"string"===typeof e||"boolean"===typeof e||"number"===typeof e||Array.isArray(e)||(e=>{if(null===e)return!1;const t=Object.getPrototypeOf(e);return null!==t&&null===Object.getPrototypeOf(t)})(e)||"bigint"===typeof e}}},3007:(e,t,s)=>{"use strict";s.d(t,{Z:()=>c});var a=s(15454),n=s.n(a),r=s(95418),i=s(83868);class d{constructor(e){if(this.dbName=void 0,this.driver=void 0,this.ipfs=void 0,this.createInstance=e=>n().createInstance({driver:this.driver,name:this.dbName,storeName:e}),this.dropInstance=async e=>{const t=this.createInstance(e);return await t.clear(),await n().dropInstance({name:this.dbName,storeName:e})},this.all=async()=>{let e={};const t=(await this.createInstance("sentre").getItem("appIds")||[]).flat().concat(["sentre"]);for(const s of t){e[s]={};const t=this.createInstance(s);await t.iterate(((t,a)=>{e[s][a]=t}))}return e},this.fetch=async e=>await this.ipfs.get(e),this.backup=async()=>{const e=await this.all();return await this.ipfs.set(e)},this.restore=async e=>{const t=await this.fetch(e);for(const s in t){const e=await this.createInstance(s);for(const a in t[s]){const n=t[s][a];await e.setItem(a,n)}}return t},!r.account.isAddress(e))throw new Error("Invalid address");this.dbName=e,this.driver=[n().WEBSQL,n().LOCALSTORAGE],this.ipfs=new i.Z}}const c=d},83868:(e,t,s)=>{"use strict";s.d(t,{Z:()=>d});var a=s(28486),n=s(34559),r=s(97429).Buffer;class i{constructor(){this._ipfs=async()=>{try{return window.ipfs||(window.ipfs=await(0,a.Ue)()),window.ipfs}catch(e){return await(0,n.sA)(500),await this._ipfs()}},this.get=async e=>{if(!i.isCID(e))throw new Error("Invalid CID");const t=await this._ipfs(),s=await t.cat(e);let a="";for await(const n of s)a+=r.from(n).toString();return JSON.parse(a)},this.set=async e=>{if(!e)throw new Error("Empty data");const t=JSON.stringify(e),s=await this._ipfs(),{path:a}=await s.add(t);return a}}}i.isCID=e=>{try{return!!e&&a.bf.multihash(e)}catch(t){return!1}};const d=i},53933:(e,t,s)=>{"use strict";s.d(t,{Z:()=>d});const a="sentre",n=window.localStorage,r=e=>{try{return e?JSON.parse(e):null}catch(t){return null}},i={set:(e,t)=>{let s=r(n.getItem(a));s&&"object"===typeof s||(s={}),s[e]=t,n.setItem(a,JSON.stringify(s))},get:e=>{let t=r(n.getItem(a));return t&&"object"===typeof t?t[e]:null},clear:e=>{i.set(e,null)}},d=i},35883:()=>{},46601:()=>{},89214:()=>{},5696:()=>{},85568:()=>{},64009:()=>{},42611:()=>{},88795:()=>{},89408:()=>{},57600:()=>{},21724:()=>{},62678:()=>{},25819:()=>{},52361:()=>{},94616:()=>{},55024:()=>{}}]);
//# sourceMappingURL=707.68a93d58.chunk.js.map