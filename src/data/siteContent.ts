import { AreaItem, FAQItem, ServiceItem } from '../types';

export const BUSINESS_CONFIG = {
  name: 'Kedai Besi Buruk',
  taglineEn: 'Professional Scrap Collection, Buying & Recycling in Malaysia',
  taglineBm: 'Perkhidmatan Pengumpulan, Pembelian & Kitar Semula Besi Buruk Malaysia',
  phoneDisplay: '013-603 4825',
  phoneTel: '+60136034825',
  secondaryPhone: '013-603 4825',
  secondaryPhoneTel: '+60136034825',
  whatsappNumber: '60136034825',
  whatsappDisplay: '013-603 4825',
  email: 'inquiry@kedaibesiburuk.my',
  operatingHoursEn: 'Open 24/7 (24 Hours / 7 Days)',
  operatingHoursBm: 'Beroperasi 24/7 (24 Jam / 7 Hari)',
  address: 'Lot 1428, Jalan Subang Industrial Park, 47500 Subang Jaya, Selangor, Malaysia',
  lorryFleetEn: '1-Ton, 3-Ton, 5-Ton Lorries & 20ft RORO Bins Available',
  lorryFleetBm: 'Lori 1-Tan, 3-Tan, 5-Tan & Tong RORO 20 Kaki Disediakan',
};

export const servicesData: ServiceItem[] = [
  {
    id: 'scrap-collection',
    titleEn: 'On-Site Scrap Metal Collection',
    titleBm: 'Pengambilan Besi Buruk Di Lokasi',
    shortDescEn: 'Doorstep pickup service with our fleet of lorries. We weigh on-site and clear unwanted metal quickly.',
    shortDescBm: 'Servis kutipan terus ke pintu rumah, kedai atau tapak anda dengan lori dan penimbang mudah alih.',
    fullDescEn: 'Whether you have home renovation leftover metals, dismantled awnings, or workshop scrap piles, our mobile collection team brings portable weighing scales and handles heavy lifting directly at your premises.',
    fullDescBm: 'Sama ada sisa ubah suai rumah, awning lama yang dirobohkan, atau longgokan sisa bengkel, pasukan kami membawa penimbang dan menguruskan pengangkutan di lokasi anda.',
    iconName: 'Truck',
    badgeEn: 'Popular Choice',
    badgeBm: 'Pilihan Ramai',
    suitableForEn: ['Homeowners', 'Shops & Offices', 'Auto Workshops', 'Renovation Contractors'],
    suitableForBm: ['Pemilik Rumah', 'Kedai & Pejabat', 'Bengkel Kenderaan', 'Kontraktor Ubah Suai'],
  },
  {
    id: 'scrap-buying',
    titleEn: 'Scrap Buying & Direct Trade',
    titleBm: 'Pembelian Besi & Logam Terpakai',
    shortDescEn: 'Competitive market pricing for ferrous and non-ferrous metals with instant, transparent payment.',
    shortDescBm: 'Harga pasaran kompetitif untuk besi, tembaga, aluminium dan bayaran pantas serta telus.',
    fullDescEn: 'We purchase copper, brass, aluminium, stainless steel, lead batteries, and structural iron. Accurate calibrated digital scale weighing with instant cash or DuitNow bank transfer.',
    fullDescBm: 'Kami membeli tembaga, aluminium, stainless steel, bateri dan besi padu. Timbangan digital tepat dengan bayaran tunai segera atau pindahan bank DuitNow.',
    iconName: 'Coins',
    badgeEn: 'Instant Payout',
    badgeBm: 'Bayaran Segera',
    suitableForEn: ['Individual Sellers', 'Contractors', 'Scrap Collectors', 'Metal Fabricators'],
    suitableForBm: ['Penjual Individu', 'Kontraktor Binaan', 'Pengutip Besi', 'Bengkel Fabrikasi'],
  },
  {
    id: 'factory-clearance',
    titleEn: 'Factory & Warehouse Clearance',
    titleBm: 'Pembersihan Kilang & Gudang',
    shortDescEn: 'Full-scale industrial metal teardown, decommissioned machinery removal, and warehouse scrap disposal.',
    shortDescBm: 'Kerja perobohan struktur besi, pelupusan mesin terpakai dan pembersihan sisa gudang berskala besar.',
    fullDescEn: 'Specialized industrial clearing for factories undergoing upgrades, relocation, or shutdown. We dismantle obsolete heavy machinery, conveyor frames, metal racks, and industrial chillers safely with skilled labor.',
    fullDescBm: 'Penyelesaian industri untuk kilang yang ingin berpindah atau menutup operasi. Kami merombak mesin berat, rak gudang bertingkat dan chiller dengan tenaga kerja mahir dan peralatan keselamatan.',
    iconName: 'Building2',
    badgeEn: 'Industrial Grade',
    badgeBm: 'Skala Industri',
    suitableForEn: ['Manufacturing Plants', 'Logistics Warehouses', 'Heavy Industries', 'Property Developers'],
    suitableForBm: ['Kilang Pembuatan', 'Gudang Logistik', 'Industri Berat', 'Pemaju Hartanah'],
  },
  {
    id: 'roro-transport',
    titleEn: 'RORO Bin Rental & Scrap Transport',
    titleBm: 'Sewa Tong RORO & Pengangkutan Logam',
    shortDescEn: 'Heavy-duty roll-on/roll-off scrap bins delivered to your site and collected when full.',
    shortDescBm: 'Penghantaran tong RORO besi tahan lasak ke tapak projek dan kutipan apabila penuh.',
    fullDescEn: 'Perfect for long-term construction projects, factory waste management, and metal fabrication workshops that generate regular scrap steel and metal offcuts.',
    fullDescBm: 'Sangat sesuai untuk projek pembinaan berterusan, pengurusan sisa kilang harian dan bengkel kimpalan yang menghasilkan lebihan potongan besi secara berkala.',
    iconName: 'Container',
    suitableForEn: ['Construction Sites', 'Fabrication Yards', 'Demolition Sites', 'Long-term Projects'],
    suitableForBm: ['Tapak Pembinaan', 'Bengkel Besi & Kimpalan', 'Tapak Robohan', 'Projek Jangka Panjang'],
  },
  {
    id: 'ewaste-disposal',
    titleEn: 'E-Waste & Commercial Appliance Recycling',
    titleBm: 'Kitar Semula E-Sisa & Barangan Elektrik',
    shortDescEn: 'Eco-friendly bulk collection for old air conditioners, commercial fridges, server racks, and motors.',
    shortDescBm: 'Kutipan pukal mesra alam untuk penyaman udara terpakai, peti sejuk komersial, motor dan sisa IT.',
    fullDescEn: 'Safe recovery of precious metals and hazardous component segregation adhering to environmental recycling standards across Malaysia.',
    fullDescBm: 'Pemisahan komponen berbahaya dan pemulihan logam berharga secara selamat mengikut piawaian pengurusan alam sekitar di Malaysia.',
    iconName: 'Cpu',
    suitableForEn: ['Offices & Data Centers', 'HVAC Contractors', 'Hotels & Restaurants', 'Institutions'],
    suitableForBm: ['Pejabat & Pusat Data', 'Kontraktor Aircond', 'Hotel & Restoran', 'Institusi'],
  },
  {
    id: 'demolition-scrap',
    titleEn: 'Demolition & Dismantling Scrap Clearance',
    titleBm: 'Pembersihan Sisa Robohan & Binaan',
    shortDescEn: 'Cutting and clearing structural I-beams, steel trusses, metal roofing, and construction rebars.',
    shortDescBm: 'Kerja memotong dan mengangkut besi I-Beam, kekuda bumbung, zink dan besi Y tapak binaan.',
    fullDescEn: 'Gas-cutting equipment and heavy crane transport to clear tangled steel scrap, metal hoardings, and structural debris quickly so your site handover stays on schedule.',
    fullDescBm: 'Peralatan memotong gas (gas cutting) dan lori kren untuk mengalihkan struktur besi berat, pagar hoarding dan sisa rebar bagi melancarkan tapak projek anda.',
    iconName: 'Wrench',
    suitableForEn: ['Demolition Teams', 'Civil Engineering Contractors', 'Renovation Teams'],
    suitableForBm: ['Pasukan Robohan', 'Kontraktor Kejuruteraan Awam', 'Kontraktor Renovasi'],
  }
];

export const coverageAreasData: AreaItem[] = [
  {
    stateEn: 'Selangor',
    stateBm: 'Selangor',
    isPrimary: true,
    districts: [
      'Shah Alam', 'Petaling Jaya', 'Subang Jaya', 'Klang', 'Puchong',
      'Rawang', 'Sungai Buloh', 'Kajang', 'Semenyih', 'Bangi',
      'Seri Kembangan', 'Cyberjaya', 'Sepang', 'Banting', 'Kapar', 'Meru', 'Ampang'
    ]
  },
  {
    stateEn: 'Kuala Lumpur',
    stateBm: 'Kuala Lumpur',
    isPrimary: true,
    districts: [
      'Kepong', 'Cheras', 'Setapak', 'Segambut', 'Sentul',
      'Wangsa Maju', 'Batu Caves', 'Bukit Jalil', 'Old Klang Road',
      'Sri Petaling', 'Sungai Besi', 'Jinjang', 'Mont Kiara', 'Bangsar'
    ]
  },
  {
    stateEn: 'Negeri Sembilan',
    stateBm: 'Negeri Sembilan',
    isPrimary: false,
    districts: [
      'Seremban', 'Nilai', 'Senawang', 'Port Dickson', 'Bandar Enstek', 'Sendayan'
    ]
  },
  {
    stateEn: 'Johor (Industrial Bulk)',
    stateBm: 'Johor (Pukal Industri)',
    isPrimary: false,
    districts: [
      'Johor Bahru', 'Pasir Gudang', 'Kulai', 'Tebrau', 'Skudai', 'Batu Pahat'
    ]
  },
  {
    stateEn: 'Perak & Penang (Bulk Projects)',
    stateBm: 'Perak & Pulau Pinang (Projek Pukal)',
    isPrimary: false,
    districts: [
      'Ipoh', 'Taiping', 'Butterworth', 'Bayan Lepas', 'Bukit Minyak', 'Perai'
    ]
  }
];

export const faqsData: FAQItem[] = [
  // General Category
  {
    category: 'general',
    questionEn: 'How does your scrap metal collection and buying service work?',
    questionBm: 'Bagaimana servis kutipan dan pembelian besi buruk ini berfungsi?',
    answerEn: 'It is very simple: 1) WhatsApp us photos and your location. 2) We provide an immediate estimate. 3) Our lorry arrives at your doorstep or job site with calibrated digital scales. 4) We weigh, load, and pay you instantly on the spot via Cash or DuitNow transfer.',
    answerBm: 'Sangat mudah: 1) Hantar gambar dan lokasi anda di WhatsApp. 2) Kami berikan anggaran harga segera. 3) Lori kami tiba di lokasi anda bersama penimbang digital berkalibrasi. 4) Kami timbang, muat ke lori, dan bayar serta-merta secara Tunai atau pindahan DuitNow.'
  },
  {
    category: 'general',
    questionEn: 'What are your operating hours and collection coverage areas?',
    questionBm: 'Apakah waktu operasi dan kawasan liputan kutipan?',
    answerEn: 'We operate 24/7 (24 hours / 7 days a week) for customer inquiries, rapid scheduling, and emergency site clearances. Our fleet covers all districts across Selangor, Kuala Lumpur, and major bulk projects in Negeri Sembilan, Perak, Penang, and Johor.',
    answerBm: 'Kami beroperasi 24/7 (24 jam / 7 hari seminggu) untuk pertanyaan, jadual pantas, dan pembersihan tapak segera. Armada kami meliputi seluruh Selangor, Kuala Lumpur, serta projek pukal di Negeri Sembilan, Perak, Pulau Pinang, dan Johor.'
  },
  {
    category: 'general',
    questionEn: 'Are you a licensed scrap metal and recycling operator in Malaysia?',
    questionBm: 'Adakah perniagaan anda berlesen secara sah di Malaysia?',
    answerEn: 'Yes, we are a fully registered and licensed scrap metal trading, logistics, and recycling operator complying with all local council and environmental regulations in Malaysia.',
    answerBm: 'Ya, kami adalah syarikat pengumpulan, perdagangan besi buruk dan kitar semula yang berdaftar serta berlesen sah mengikut piawaian pihak berkuasa dan alam sekitar Malaysia.'
  },

  // Services & Collection Category
  {
    category: 'services',
    questionEn: 'Is there a minimum quantity required for on-site lorry collection?',
    questionBm: 'Adakah terdapat kuantiti minimum untuk servis kutipan lori di lokasi?',
    answerEn: 'For residential pickups, we recommend gathering at least a small load or high-value metals (e.g. copper, brass, airconds, batteries). For workshops, construction sites, and industrial factories, our fleet can handle any volume from 500kg up to multi-ton bulk loads.',
    answerBm: 'Untuk kediaman, disyorkan mengumpul sekurang-kurangnya muatan kecil atau logam bernilai tinggi (seperti tembaga, aircond, bateri). Bagi bengkel, tapak binaan dan kilang, kami menyediakan lori untuk sebarang muatan dari 500kg sehingga puluhan tan.'
  },
  {
    category: 'services',
    questionEn: 'How quickly can your lorry team arrive for scrap pickup?',
    questionBm: 'Berapa cepat pasukan lori boleh sampai untuk mengambil besi buruk?',
    answerEn: 'In most Klang Valley, Kuala Lumpur, and Selangor areas, we offer same-day or 24-hour fast pickup upon location confirmation on WhatsApp. Emergency clearances can also be arranged.',
    answerBm: 'Di kebanyakan kawasan Lembah Klang, Kuala Lumpur dan Selangor, kami menawarkan kutipan hari yang sama atau dalam masa 24 jam selepas pengesahan lokasi di WhatsApp. Pembersihan segera juga boleh diaturkan.'
  },
  {
    category: 'services',
    questionEn: 'Do you provide RORO bins for construction sites and factory waste?',
    questionBm: 'Adakah anda menyediakan tong RORO untuk sisa renovasi atau kilang berterusan?',
    answerEn: 'Yes! We supply heavy-duty 20ft metal RORO bins placed at your construction site, workshop, or manufacturing plant, with flexible on-call replacement or scheduled pickup once filled.',
    answerBm: 'Ya! Kami membekalkan tong RORO besi tahan lasak (termasuk saiz 20 kaki) di tapak pembinaan, bengkel atau kilang anda, dengan servis pertukaran tong berkala apabila penuh.'
  },
  {
    category: 'services',
    questionEn: 'Do you provide dismantling, machinery clearing, and gas cutting?',
    questionBm: 'Adakah anda menyediakan khidmat merombak struktur dan potong gas?',
    answerEn: 'Yes. Our specialized industrial team carries oxy-acetylene gas cutting equipment, hydraulic tools, and cranes to safely dismantle obsolete machinery, steel structures, storage racks, and awnings.',
    answerBm: 'Ya. Pasukan teknikal kami dilengkapi peralatan potong gas (gas cutting), kren dan jentera hidraulik untuk merombak mesin kilang terpakai, struktur bumbung, dan rak gudang dengan selamat.'
  },

  // Pricing & Payment Category
  {
    category: 'pricing',
    questionEn: 'How are scrap metal prices determined and how do I get paid?',
    questionBm: 'Bagaimana harga besi buruk ditentukan dan bagaimana pembayaran dibuat?',
    answerEn: 'Prices are based on prevailing market rates, material grade, and purity. We weigh transparently using certified digital scales at your site and pay instantly via Cash or instant DuitNow bank transfer.',
    answerBm: 'Harga ditentukan mengikut kadar pasaran semasa Malaysia, gred dan ketulenan logam. Kami menimbang secara telus menggunakan penimbang digital berkalibrasi di lokasi dan membayar serta-merta melalui Tunai atau DuitNow.'
  },
  {
    category: 'pricing',
    questionEn: 'Can I get a quick price quotation before booking a collection?',
    questionBm: 'Bolehkah saya dapatkan anggaran sebut harga sebelum menempah lori?',
    answerEn: 'Absolutely! Simply click our WhatsApp button, select your material types, and attach clear photos. Our team will provide an accurate preliminary price estimate within minutes.',
    answerBm: 'Sudah tentu! Klik butang WhatsApp kami, pilih jenis bahan, dan hantarkan gambar jelas. Pasukan kami akan memberikan anggaran harga pantas dalam beberapa minit.'
  },
  {
    category: 'pricing',
    questionEn: 'How do you ensure weighing accuracy and transparency?',
    questionBm: 'Bagaimana ketepatan dan ketelusan timbangan dijamin?',
    answerEn: 'We use calibrated portable electronic scales for non-ferrous metals (copper, brass, aluminium) and verified weighbridge / digital load scales for heavy structural iron loads right in front of you.',
    answerBm: 'Kami menggunakan penimbang elektronik mudah alih berkalibrasi untuk logam berharga (tembaga, aluminium) serta timbangan jambatan timbang / penimbang gantung digital tepat di hadapan anda.'
  },

  // Materials & E-Waste Category
  {
    category: 'materials',
    questionEn: 'Do you accept mixed metals or unsorted scrap piles?',
    questionBm: 'Adakah anda menerima besi bercampur atau sisa yang belum diasingkan?',
    answerEn: 'Yes! We accept mixed scrap piles. Our experienced crew will help sort ferrous metals (iron, steel) and high-value non-ferrous metals (copper, aluminium, brass) on-site to maximize your return.',
    answerBm: 'Ya! Kami menerima timbunan besi bercampur. Kru kami akan membantu mengasingkan besi biasa dan logam bernilai tinggi (tembaga, aluminium, tembaga kuning) di lokasi untuk memaksimumkan pulangan anda.'
  },
  {
    category: 'materials',
    questionEn: 'Do you accept broken electrical appliances, air conditioners, and e-waste?',
    questionBm: 'Adakah anda menerima barangan elektrik rosak, penyaman udara dan e-sisa?',
    answerEn: 'Yes, we accept commercial and residential air conditioners (indoor and outdoor compressor units), fridges, washing machines, electric motors, car batteries, copper cables, and computer server racks.',
    answerBm: 'Ya, kami menerima unit aircond (indoor dan kompresor outdoor), peti sejuk, mesin basuh, motor elektrik, bateri kenderaan, wayar tembaga, dan rak server komputer terpakai.'
  },
  {
    category: 'materials',
    questionEn: 'What materials are NOT accepted for scrap recycling?',
    questionBm: 'Apakah bahan yang TIDAK diterima untuk kitar semula?',
    answerEn: 'We do not accept hazardous chemical containers with toxic residue, pressurized gas cylinders that have not been decommissioned/cut, or non-recyclable general domestic trash (timber, plastic, concrete).',
    answerBm: 'Kami tidak menerima tong bahan kimia berbahaya dengan sisa toksik, silinder gas bertekanan yang belum dinyahaktifkan/dipotong, atau sampah domestik am (kayu, plastik, batu konkrit).'
  }
];

export const targetAudiences = [
  {
    titleEn: 'Homeowners & Landlords',
    titleBm: 'Pemilik Rumah & Hartanah',
    descEn: 'Clear old renovation metal, metal gates, zinc sheets, broken appliances, and unwanted household steel.',
    descBm: 'Bersihkan sisa ubah suai, pagar besi lama, zink bumbung, barangan elektrik rosak dan sisa besi rumah.',
    icon: 'Home',
  },
  {
    titleEn: 'Auto & Repair Workshops',
    titleBm: 'Bengkel Kereta & Motosikal',
    descEn: 'Regular clearance of used car batteries, brake rotors, engine blocks, alloy rims, and spare parts scrap.',
    descBm: 'Kutipan berkala bateri terpakai, piring brek, blok enjin rosak, sport rim dan sisa alat ganti kenderaan.',
    icon: 'Car',
  },
  {
    titleEn: 'Factories & Manufacturing',
    titleBm: 'Kilang & Industri Pembuatan',
    descEn: 'Scheduled scrap bin management, metal stampings, swarf offcuts, decommissioned machines, and industrial cables.',
    descBm: 'Pengurusan tong scrap berkala, lebihan potongan logam kilang, mesin lama dan kabel industri berskala besar.',
    icon: 'Factory',
  },
  {
    titleEn: 'Construction & Demolition',
    titleBm: 'Kontraktor Binaan & Robohan',
    descEn: 'Clearing rebar offcuts, structural I-beams, scaffolding, metal hoardings, and dismantling heavy steel.',
    descBm: 'Kutipan lebihan besi rebar (Y-bar), kekuda besi, perancah scaffolding, pagar projek dan kerja potong gas.',
    icon: 'HardHat',
  },
  {
    titleEn: 'Shops & Commercial Offices',
    titleBm: 'Kedai & Pejabat Komersial',
    descEn: 'Office decommissioning, stainless steel restaurant kitchen clearing, metal shelving, and server racks.',
    descBm: 'Pelupusan perabot besi pejabat, sinki keluli kedai makan, rak besi dan perkakasan server IT terpakai.',
    icon: 'Store',
  }
];
