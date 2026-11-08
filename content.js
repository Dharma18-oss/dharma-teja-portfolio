/* ============================================================
   content.js — ALL copy and data for the site. Edit here first.
   No animation logic lives in this file.
   ============================================================ */
const SITE = {
  name: "Dharma Teja",
  fullName: "Dharma Teja Surabattula",
  location: "Memphis, TN",

  /* Add your photo later: put the image in assets/ and set the path,
     e.g. photo: "assets/portrait.jpg". Leave "" to show the placeholder.
     A portrait around 1200×1500 with a dark background works best. */
  photo: "assets/portrait.jpg",

  nav: [
    { label: "Work", href: "#chapter-02" },
    { label: "About", href: "#about" },
    { label: "Case Files", href: "#works" },
    { label: "Lab", href: "#lab" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Let’s Talk", href: "#contact" },

  role: ["Data Center", "Engineer"],
  meta: ["Dell Technologies", "xAI data center"],
  sideTag: "MEM-DC",

  notification: {
    app: "iDRAC",
    time: "now",
    lead: "Data center engineer",
    message: "keeping production hardware healthy, one Plan of Action at a time.",
  },

  /* ---- Chapter 02 · big typography ---- */
  chapter2: {
    brand: ["Dharma", "Teja"],
    lines: [["WHERE"], ["HARDWARE", "MEETS"], ["THE", "NETWORK."]],
    sideLeft: [["Racked by", "Dharma"], ["Fixed to", "SLA."]],
    sideRight: [["Built on", "Hardware."], ["Driven by", "Uptime."]],
    rail: ["Detect", "Document", "Fix", "Validate", "Close"],
    chips: ["DELL.", "iDRAC.", "VLANs.", "FIBER.", "LINUX.", "OSPF."],
  },

  /* ---- Chapter 03 · About, three doors ---- */
  about: {
    eyebrow: "( 03 · About Me )",
    title: ["The person", "behind the rack."],
    doors: [
      {
        key: "who", no: "01", label: "Who I Am",
        teaser: "Data center engineer at Dell Technologies, network engineer in progress.",
        title: "Who I Am",
        body: "I’m a Data Center Engineer with Dell Technologies, working in the xAI data center in Memphis. Before that I was a Data Center Technician at FedEx, starting in October 2024. I hold an M.S. in Computer Science from Campbellsville University and a B.Tech in Electronics and Communication Engineering from JNTU Kakinada. My days are deployments, break/fix, and making sure every server goes back to production healthy and documented.",
        facts: [
          ["Now", "Data Center Engineer · Dell Technologies · xAI data center"],
          ["Before", "Data Center Technician · FedEx · from Oct 2024"],
          ["Learning", "Schneider Electric Data Center Certified Associate (DCCA) · in progress"],
          ["Based", "Memphis, TN"],
          ["M.S.", "Computer Science · Campbellsville University · 2024"],
          ["B.Tech", "Electronics & Communication · JNTU Kakinada · 2022"],
          ["Next hop", "Network Engineer"],
        ],
      },
      {
        key: "what", no: "02", label: "What I Do",
        teaser: "Open the case files →",
        opensWorks: true,
      },
      {
        key: "how", no: "03", label: "How I Think",
        teaser: "Every fault is a loop: detect, document, fix, validate, close.",
        title: "How I Think",
        body: "Production hardware rewards discipline. I work every case the same way, so nothing gets lost between shifts and nothing goes back into a rack unverified.",
        facts: [
          ["Detect", "Catch it in PRTG, SolarWinds, OpenManage or iDRAC before users do."],
          ["Document", "SupportAssist and iDRAC logs, ticket notes, old and new PPIDs."],
          ["Fix", "Follow the Dell L3 Plan of Action: reseat first, then replace."],
          ["Validate", "Diagnostics and health checks before handoff."],
          ["Close", "Clean closure notes in ServiceNow so the next shift has the full story."],
        ],
      },
    ],
  },

  /* ---- Case Files (hidden chapter, opened from "What I Do") ---- */
  works: {
    brand: "Case Files · Dharma Teja",
    projects: [
      { key: "breakfix", name: "Dell Break/Fix", cat: "Break/Fix · Dell L3", year: "2024–now", accent: "#FF9A1F", glyph: "drive",
        title: "Component-level repair under Dell L3 Plans of Action",
        body: "Triage with Dell Support, execute POAs from Domain Engineers and L3, reseat or replace failed parts, and validate the server before it returns to production.",
        tags: ["POA", "SupportAssist", "iDRAC", "PPID"] },
      { key: "deploy", name: "Server Deployments", cat: "Rack & Stack", year: "2024–now", accent: "#2F7DFF", glyph: "rack",
        title: "Racking, cabling and validating enterprise hardware",
        body: "Install, configure, rack, cable and validate Dell PowerEdge, HP ProLiant and Cisco UCS servers, switches and supporting hardware for on-time handoffs.",
        tags: ["PowerEdge", "ProLiant", "Cisco UCS", "Fiber / Copper"] },
      { key: "build", name: "Linux Auto-Build", cat: "Provisioning", year: "2024–now", accent: "#35D0E0", glyph: "term",
        title: "OS imaging, Kickstart and failed-build recovery",
        body: "Support OS imaging and Kickstart workflows, configure Linux, and troubleshoot failed auto-build processes to get servers provisioned consistently.",
        tags: ["Linux", "Kickstart", "Imaging", "Bash"] },
      { key: "monitor", name: "Proactive Monitoring", cat: "Monitoring", year: "2024–now", accent: "#7FB2FF", glyph: "graph",
        title: "Catching problems before production feels them",
        body: "Watch server, network, power and environmental health through PRTG, SolarWinds, Dell OpenManage and iDRAC, and act on emerging conditions early.",
        tags: ["PRTG", "SolarWinds", "OpenManage", "Nagios"] },
      { key: "power", name: "Power & Cooling", cat: "Resiliency", year: "2024–now", accent: "#FFC44D", glyph: "bolt",
        title: "Stable operations through every maintenance window",
        body: "Validate UPS/PDU power, HVAC and cooling, rack airflow, temperatures, PDU load distribution and scheduled backup completion.",
        tags: ["UPS / PDU", "HVAC", "Airflow", "Backups"] },
      { key: "parts", name: "Parts & Tickets", cat: "ITSM · Assets", year: "2024–now", accent: "#9AA7B5", glyph: "box",
        title: "Traceable parts, clean tickets, mentored techs",
        body: "Run parts lockers and spares, separate project stock from break/fix inventory, manage ServiceNow tickets and RMAs, and mentor junior and contract technicians.",
        tags: ["ServiceNow", "RMA", "CMDB", "Mentoring"] },
    ],
  },

  /* ---- Chapter 05 · the 3D floor ---- */
  floor: {
    labels: { left: "Data Center Engineer · Dell Technologies", right: "Hardware · Infrastructure · Network" },
    eyebrow: "( 05 · The Floor )",
    titleLines: ["I keep production", "running."],
    description: "Rack A07 is live. Move your cursor and it follows. One server is throwing an amber fault — click it.",
    ideas: [
      { no: "01", title: "Hardware & Break/Fix", description: "Component-level repair across Dell, HP, Cisco and IBM platforms.",
        tags: ["SSD / NVMe", "DIMM", "PSU", "NIC", "System board", "iDRAC · iLO"] },
      { no: "02", title: "Network & Cabling", description: "The part of the job I’m turning into a career.",
        tags: ["LC / SC fiber", "RJ-45", "Layer 2", "VLANs", "MAC / ARP", "TCP/IP"] },
      { no: "03", title: "Operations", description: "The process that keeps a data center trustworthy.",
        tags: ["ServiceNow", "Change mgmt", "SOPs", "Audit ready", "SLA"] },
    ],
  },

  /* ---- Chapter 06 · editorial ---- */
  editorial: {
    eyebrow: "( 06 · The Method )",
    statement: ["Hardware is my foundation.", "The network is my next hop."],
    note: "Every shift on the floor teaches me how packets actually get from one rack to another.",
    skills: {
      title: "I Work With",
      groups: [
        { name: "Servers", items: ["Dell PowerEdge", "HP ProLiant", "Cisco UCS", "IBM xSeries", "iDRAC · iLO · IPMI"] },
        { name: "Networking", items: ["Fiber LC / SC", "Structured cabling", "Layer 2 switching", "VLANs", "TCP/IP"] },
        { name: "Systems", items: ["Linux", "Windows Server", "KVM", "Kickstart", "Bash · Python"] },
        { name: "Monitoring", items: ["PRTG", "SolarWinds", "OpenManage", "Nagios"] },
        { name: "Operations", items: ["ServiceNow", "JIRA", "Remedy", "CMDB", "RMA"] },
      ],
    },
    mindset: { title: "Detect → Document → Fix → Validate", lines: ["I detect early.", "I document everything.", "I fix by the Plan of Action.", "And nothing goes back into a rack until it’s validated."] },
    exploring: { title: "Currently Exploring", items: ["Schneider Electric DCCA certification", "IPv4 subnetting & VLSM", "STP, trunking and EtherChannel", "OSPF routing", "Packet Tracer & GNS3 labs", "Python for network automation"] },
    ending: { lines: ["Still racking.", "Still learning.", "Still curious."], note: "Next hop: network engineer." },
  },

  /* ---- Chapter 07 · roadmap ---- */
  roadmap: {
    eyebrow: "( 07 · Next Hop )",
    title: ["Road to", "network engineer."],
    /* courses alongside the roadmap */
    learning: [
      { name: "Data Center Certified Associate (DCCA)", by: "Schneider Electric · on Coursera", status: "In progress",
        note: "Data center fundamentals from the power and cooling side: physical infrastructure, power, cooling, racks and efficiency. It rounds out the hardware work I do on the floor.",
        href: "https://www.coursera.org/partners/schneider-electric" },
    ],
    hops: [
      { name: "Physical layer & cabling", status: "done", topics: ["Fiber LC / SC", "RJ-45 & patch panels", "Structured cabling", "Link & port validation"], lab: "Daily work on the data center floor: running, labeling and validating fiber and copper runs." },
      { name: "Layer 2 switching", status: "done", topics: ["MAC / ARP", "VLANs", "Switch-port troubleshooting", "Switch wiping & provisioning"], lab: "Troubleshooting failed links and switch-port faults on production gear." },
      { name: "IP addressing & subnetting", status: "active", topics: ["IPv4 subnetting & VLSM", "IPv6 addressing", "TCP / UDP", "DHCP & DNS"], lab: "Daily subnetting drills (try the one below) and Packet Tracer labs." },
      { name: "Switching in depth", status: "planned", topics: ["802.1Q trunking", "STP / RSTP", "EtherChannel (LACP)", "Port security", "CDP / LLDP"], lab: "Multi-switch topologies in Packet Tracer, then real Cisco gear in a home lab." },
      { name: "Routing", status: "planned", topics: ["Static routes", "Inter-VLAN routing", "OSPFv2 single & multi-area", "HSRP"], lab: "GNS3 / EVE-NG labs building small campus and branch networks." },
      { name: "Services & security", status: "planned", topics: ["ACLs", "NAT / PAT", "NTP, SNMP, syslog", "AAA & SSH hardening", "VPN basics", "Wireless fundamentals"], lab: "Securing the lab network and tying monitoring back to PRTG / SolarWinds experience." },
      { name: "CCNA 200-301", status: "planned", topics: ["Exam blueprint review", "Timed practice exams", "Weak-area labs"], lab: "Target certification that ties every hop above together." },
      { name: "Automation & DC networking", status: "planned", topics: ["Python (Netmiko)", "Ansible", "REST APIs", "Leaf-spine", "VXLAN / EVPN basics"], lab: "Building on existing Bash and Python skills; data center fabrics connect back to the current role." },
      { name: "Network Engineer", status: "planned", topics: ["CCNP ENCOR (next)", "Change ownership", "Network design & on-call"], lab: "Destination: a network engineering role in enterprise or data center networks." },
    ],
  },

  /* ---- FOOTER ----
     Email and phone are intentionally not published. Add links to `social`. */
  footer: {
    eyebrow: "( 08 · Contact )",
    headline: ["Let’s keep it", "running."],
    line: "Open to data center operations, network support and junior network engineering roles.",
    social: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/dharma-teja-surabattula" }],
    columns: [
      { title: "Chapters", items: [["Hero", "#top"], ["Where Hardware Meets", "#chapter-02"], ["About", "#about"], ["Case Files", "#works"]] },
      { title: "Hands-on", items: [["The Floor", "#floor"], ["Break/Fix Lab", "#lab"], ["The Method", "#method"], ["Roadmap", "#roadmap"]] },
    ],
  },
};
