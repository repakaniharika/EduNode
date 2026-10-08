export const TRANSLATIONS = {
  en: {
    // Navigation
    menu: 'Menu',
    dashboard: 'Dashboard',
    subjects: 'My Subjects',
    askTutor: 'Ask EduNode AI',
    misconceptionRadar: 'Misconception Radar',
    conceptMap: 'Concept Map',
    assignments: 'Assignments',
    calendar: 'Calendar',
    settings: 'Settings',
    studentBadge: 'Student',
    aiBadge: 'AI',
    adaptiveBadge: 'Adaptive',

    // Header & Controls
    searchPlaceholder: 'Search chapters, concepts, or ask a doubt...',
    selectCurriculum: 'Curriculum',
    selectClass: 'Class',
    selectLanguage: 'Language',
    notifications: 'Notifications',
    newBadge: 'New',
    allBoards: 'All Boards',

    // Hero / Welcome
    greeting: 'Good morning, {name}',
    heroSubtitle: 'EduNode is grounded in your {board} syllabus. Your learning path is dynamically personalized today.',
    quickDoubtPlaceholder: 'Type a doubt or concept to explore (e.g., Why is discriminant b² - 4ac important?)...',
    askButton: 'Ask Doubt',
    voiceButton: 'Voice',
    listeningVoice: 'Listening to your voice...',
    continueLearning: 'Continue Learning',
    syllabusActive: 'Curriculum Grounded',

    // Stats
    masteryLabel: 'Overall Mastery',
    streakLabel: 'Day Streak',
    clearedLabel: 'Misconceptions Cleared',
    enrolledLabel: 'Enrolled Subjects',

    // Subjects Grid
    mySubjectsTitle: 'My Subjects',
    enrolledCount: '5 Subjects Active',
    viewAllChapters: 'View Syllabus',
    mastery: 'Mastery',
    chapter: 'Chapter',
    activeTopic: 'Active Topic',
    clickToStudy: 'Explore Chapter',
    askSubjectDoubt: 'Ask Doubt',

    subjectNames: {
      math: 'Mathematics',
      science: 'Science',
      social: 'Social Science',
      english: 'English',
      hindi: 'Hindi',
      physics: 'Physics',
      chemistry: 'Chemistry',
      biology: 'Biology',
      cs: 'Computer Science',
      it: 'Information Technology',
      comp: 'Computer Studies',
      comp_app: 'Computer Applications',
    },

    // Subjects Data
    subjectsData: {
      math: {
        name: 'Mathematics',
        activeChapter: 'Quadratic Equations',
        chapterNumber: 'Chapter 4',
        recentTopic: 'Nature of Roots & Discriminant',
        misconceptionNote: 'Watch sign of (-b) when b is negative',
      },
      science: {
        name: 'Science',
        activeChapter: 'Life Processes',
        chapterNumber: 'Chapter 6',
        recentTopic: 'Nutrition & Photosynthesis',
        misconceptionNote: 'Respiration occurs 24/7 in plants, not just at night',
      },
      social: {
        name: 'Social Science',
        activeChapter: 'Nationalism in India',
        chapterNumber: 'History Ch 2',
        recentTopic: 'The Salt March & Civil Disobedience',
        misconceptionNote: 'Historical timeline verified with concept graph',
      },
      english: {
        name: 'English',
        activeChapter: 'First Flight',
        chapterNumber: 'Prose & Poetry',
        recentTopic: 'A Baker from Goa & Glimpses of India',
        misconceptionNote: 'Vocabulary and theme analysis on track',
      },
      hindi: {
        name: 'Hindi',
        activeChapter: 'Kshitij Part 2',
        chapterNumber: 'Kavya Khand',
        recentTopic: 'Surdas ke Pad — Bhavarth & Vyakaran',
        misconceptionNote: 'Metaphorical poetic nuances verified',
      },
    },

    // Misconceptions
    misconceptionRadarTitle: 'Misconception Radar',
    misconceptionRadarSubtitle: 'Targeted drills to eliminate common conceptual traps',
    activeDrillTitle: 'Active Focus Drill',
    practiceNow: 'Practice Drill',
    clearedMisconceptionsTitle: 'Cleared Misconceptions',
    caughtToday: 'Detected Today',
    drillQuickTitle: 'Quick Drill',
    drillSuccess: 'Brilliant! Misconception cleared and updated in your knowledge profile.',
    drillFailed: 'Not quite. Distance and real physical quantities cannot be negative.',
    resolved: 'Resolved',
    needsDrill: 'Needs Drill',

    activeMisconception: {
      subject: 'Mathematics',
      concept: 'Sign Reversal with Negative Coefficients',
      description: 'When b is already negative in ax² + bx + c = 0 (e.g. b = -6), calculating -b gives -(-6) = +6, not -6.',
      question: 'In 2x² - 6x + 3 = 0, what is the exact value of -b?',
      options: ['-6', '+6', '-3'],
      correct: '+6',
    },

    clearedList: [
      {
        concept: 'Heat vs. Temperature',
        subject: 'Science',
        description: 'Recognized that thermal energy depends on mass and phase changes, not solely temperature.',
        time: 'Yesterday',
      },
      {
        concept: 'Electric Current Direction',
        subject: 'Science',
        description: 'Understood the difference between conventional positive flow and physical electron drift.',
        time: '2 days ago',
      },
    ],

    // Recent Activity
    recentActivityTitle: 'Recent Learning Trail',
    recentActivitySubtitle: 'AI explanations and curriculum milestones',
    activities: [
      {
        title: 'Gemma explained Quadratic Roots',
        desc: 'Adapted step-by-step sign breakdown based on your doubt',
        time: '15m ago',
        tag: 'AI Tutor',
      },
      {
        title: 'Cleared Misconception in Science',
        desc: 'Latent heat during phase transition verified',
        time: '2h ago',
        tag: 'Misconception',
      },
      {
        title: 'Explored Concept Graph: Life Processes',
        desc: 'Connected Xylem, Phloem, and Stomatal transpiration',
        time: 'Yesterday',
        tag: 'Knowledge Graph',
      },
      {
        title: 'Scored 5/5 on Discriminant Practice',
        desc: 'Completed targeted 3-minute formula drill',
        time: '2d ago',
        tag: 'Practice',
      },
    ],

    // Modals
    askModalTitle: 'EduNode AI Tutor',
    askModalSubtitle: 'Multilingual • Grounded in {board} • Misconception-Aware',
    pipelineReady: 'Pipeline ready: Query -> Intent -> RAG -> Concept Graph -> Gemma -> Misconception Check',
    typeYourDoubt: 'Type your syllabus doubt...',
    send: 'Send',
    close: 'Close',
    conceptMapTitle: 'Knowledge Graph & Prerequisites',
    conceptMapSubtitle: 'Visualizing syllabus relationships and concept dependencies',
    prerequisites: 'Prerequisites',
    nextConcept: 'Next Concept',
    askAboutConcept: 'Ask EduNode about this Concept',
    syllabusChapters: 'Curriculum Chapters',
    currentFocusChapter: 'Current Focus Chapter',
    askDoubtChapter: 'Ask Doubt on Chapter',
  },

  ta: {
    // Navigation
    menu: 'பட்டியல்',
    dashboard: 'டாஷ்போர்டு',
    subjects: 'பாடங்கள்',
    askTutor: 'EduNode AI கேளுங்கள்',
    misconceptionRadar: 'தவறான புரிதல் ரேடார்',
    conceptMap: 'கருத்து வரைபடம்',
    assignments: 'பயிற்சிகள்',
    calendar: 'நாட்காட்டி',
    settings: 'அமைப்புகள்',
    studentBadge: 'மாணவர்',
    aiBadge: 'AI',
    adaptiveBadge: 'தனிப்பயன்',

    // Header & Controls
    searchPlaceholder: 'பாடங்கள், கருத்துகளைத் தேடுங்கள் அல்லது சந்தேகம் கேளுங்கள்...',
    selectCurriculum: 'பாடத்திட்டம்',
    selectClass: 'வகுப்பு',
    selectLanguage: 'மொழி',
    notifications: 'அறிவிப்புகள்',
    newBadge: 'புதியது',
    allBoards: 'அனைத்து வாரியங்கள்',

    // Hero / Welcome
    greeting: 'காலை வணக்கம், {name}',
    heroSubtitle: 'EduNode உங்கள் {board} பாடத்திட்டத்துடன் இணைக்கப்பட்டுள்ளது. கற்றல் பாதை இன்று உங்களுக்காக தனிப்பயனாக்கப்பட்டுள்ளது.',
    quickDoubtPlaceholder: 'உங்கள் சந்தேகத்தை தட்டச்சு செய்யுங்கள் (எ.கா. b² - 4ac ஏன் முக்கியமானது?)...',
    askButton: 'சந்தேகம் கேள்',
    voiceButton: 'குரல்',
    listeningVoice: 'உங்கள் குரலைக் கேட்கிறது...',
    continueLearning: 'தொடர்ந்து படி',
    syllabusActive: 'பாடத்திட்டம் செயலில்',

    // Stats
    masteryLabel: 'முழுமையான தேர்ச்சி',
    streakLabel: 'தொடர் நாட்கள்',
    clearedLabel: 'தீர்க்கப்பட்ட தவறுகள்',
    enrolledLabel: 'சேர்க்கப்பட்ட பாடங்கள்',

    // Subjects Grid
    mySubjectsTitle: 'என் பாடங்கள்',
    enrolledCount: '5 பாடங்கள் செயலில்',
    viewAllChapters: 'பாடத்திட்டத்தைப் பார்',
    mastery: 'தேர்ச்சி',
    chapter: 'அத்தியாயம்',
    activeTopic: 'செயலில் உள்ள தலைப்பு',
    clickToStudy: 'அத்தியாயத்தைப் படி',
    askSubjectDoubt: 'சந்தேகம் கேள்',

    subjectNames: {
      math: 'கணிதம்',
      science: 'அறிவியல்',
      social: 'சமூக அறிவியல்',
      english: 'ஆங்கிலம்',
      hindi: 'இந்தி',
      physics: 'இயற்பியல்',
      chemistry: 'வேதியியல்',
      biology: 'உயிரியல்',
      cs: 'கணினி அறிவியல்',
      it: 'தகவல் தொழில்நுட்பம்',
      comp: 'கணினி ஆய்வுகள்',
      comp_app: 'கணினி பயன்பாடுகள்',
    },

    // Subjects Data
    subjectsData: {
      math: {
        name: 'கணிதம்',
        activeChapter: 'இருபடி சமன்பாடுகள்',
        chapterNumber: 'அத்தியாயம் 4',
        recentTopic: 'மூலங்களின் தன்மை & விவேகி',
        misconceptionNote: 'b எதிர்மறையாக இருக்கும்போது (-b) குறியீட்டைக் கவனியுங்கள்',
      },
      science: {
        name: 'அறிவியல்',
        activeChapter: 'உயிர் செயல்முறைகள்',
        chapterNumber: 'அத்தியாயம் 6',
        recentTopic: 'ஊட்டச்சத்து & ஒளிச்சேர்க்கை',
        misconceptionNote: 'தாவரங்களில் சுவாசம் இரவில் மட்டுமல்ல, 24 மணி நேரமும் நிகழ்கிறது',
      },
      social: {
        name: 'சமூக அறிவியல்',
        activeChapter: 'இந்தியாவில் தேசியம்',
        chapterNumber: 'வரலாறு அத்தியாயம் 2',
        recentTopic: 'உப்புச் சத்தியாகிரகம் & சட்டமறுப்பு இயக்கம்',
        misconceptionNote: 'வரலாற்று காலவரிசை கருத்து வரைபடத்துடன் சரிபார்க்கப்பட்டது',
      },
      english: {
        name: 'ஆங்கிலம்',
        activeChapter: 'முதல் பறப்பு (First Flight)',
        chapterNumber: 'உரைநடை & கவிதை',
        recentTopic: 'கோவாவின் ரொட்டி தயாரிப்பாளர்',
        misconceptionNote: 'சொற்களஞ்சியம் மற்றும் கருப்பொருள் பகுப்பாய்வு முன்னேறுகிறது',
      },
      hindi: {
        name: 'இந்தி',
        activeChapter: 'க்ஷிதிஜ் பகுதி 2',
        chapterNumber: 'காவிய காண்டம்',
        recentTopic: 'சூர்தாஸின் பாடல்கள் — பாவார்த்தம்',
        misconceptionNote: 'கவிதை உருவகங்கள் வெற்றிகரமாகப் புரிந்து கொள்ளப்பட்டன',
      },
    },

    // Misconceptions
    misconceptionRadarTitle: 'தவறான புரிதல் ரேடார்',
    misconceptionRadarSubtitle: 'பொதுவான தவறுகளைக் கண்டறிந்து திருத்தும் சிறப்புப் பயிற்சிகள்',
    activeDrillTitle: 'செயலில் உள்ள பயிற்சி',
    practiceNow: 'பயிற்சி செய்',
    clearedMisconceptionsTitle: 'தீர்க்கப்பட்ட தவறான புரிதல்கள்',
    caughtToday: 'இன்று கண்டறியப்பட்டது',
    drillQuickTitle: 'விரைவுப் பயிற்சி',
    drillSuccess: 'அற்புதம்! தவறான புரிதல் நீக்கப்பட்டு உங்கள் சுயவிவரத்தில் புதுப்பிக்கப்பட்டது.',
    drillFailed: 'தவறு. நீளம் அல்லது தூரம் எதிர்மறை எண்ணாக இருக்க முடியாது.',
    resolved: 'தீர்க்கப்பட்டது',
    needsDrill: 'பயிற்சி தேவை',

    activeMisconception: {
      subject: 'கணிதம்',
      concept: 'எதிர்மறை எண்களுக்கான குறி மாற்றம்',
      description: 'ax² + bx + c = 0 சமன்பாட்டில் b ஏற்கெனவே எதிர்மறையாக இருந்தால் (எ.கா. b = -6), -b என்பது -(-6) = +6 ஆகும், -6 அல்ல.',
      question: '2x² - 6x + 3 = 0 சமன்பாட்டில், -b இன் சரியான மதிப்பு என்ன?',
      options: ['-6', '+6', '-3'],
      correct: '+6',
    },

    clearedList: [
      {
        concept: 'வெப்பம் vs வெப்பநிலை',
        subject: 'அறிவியல்',
        description: 'வெப்ப ஆற்றல் என்பது வெப்பநிலையை மட்டுமல்ல, பொருளின் நிறையைச் சார்ந்தது என்பது தெளிவுபடுத்தப்பட்டது.',
        time: 'நேற்று',
      },
      {
        concept: 'மின்னோட்டத்தின் திசை',
        subject: 'அறிவியல்',
        description: 'மரபு மின்னோட்டம் மற்றும் எலக்ட்ரான் நகர்வு திசைக்கான வேறுபாடு புரிந்துகொள்ளப்பட்டது.',
        time: '2 நாட்களுக்கு முன்',
      },
    ],

    // Recent Activity
    recentActivityTitle: 'சமீபத்திய கற்றல் பதிவு',
    recentActivitySubtitle: 'AI விளக்கங்கள் மற்றும் பாடத்திட்ட மைல்கற்கள்',
    activities: [
      {
        title: 'இருபடி மூலங்களை விளக்கிய Gemma',
        desc: 'உங்கள் சந்தேகத்திற்கு ஏற்ப படிபடியான குறி விளக்கம் வழங்கப்பட்டது',
        time: '15 நிமிடங்களுக்கு முன்',
        tag: 'AI ஆசிரியர்',
      },
      {
        title: 'அறிவியலில் தவறான புரிதல் நீக்கப்பட்டது',
        desc: 'நிலை மாற்றத்தின் போது உள்ள மறைவெப்பம் சரிபார்க்கப்பட்டது',
        time: '2 மணி நேரத்திற்கு முன்',
        tag: 'புரிதல் சரி',
      },
      {
        title: 'உயிர் செயல்முறைகள் கருத்து வரைபடம் ஆய்வு',
        desc: 'சைலம், புளோயம் மற்றும் இலைத்துளை சுவாசம் இணைக்கப்பட்டது',
        time: 'நேற்று',
        tag: 'அறிவு வரைபடம்',
      },
      {
        title: 'விவேகி பயிற்சியில் 5/5 மதிப்பெண்',
        desc: '3 நிமிட சூத்திரப் பயிற்சி வெற்றிகரமாக முடிக்கப்பட்டது',
        time: '2 நாட்களுக்கு முன்',
        tag: 'பயிற்சி',
      },
    ],

    // Modals
    askModalTitle: 'EduNode AI ஆசிரியர்',
    askModalSubtitle: 'பன்மொழி • {board} பாடத்திட்டம் • தவறுகளைக் கண்டறியும் திறன்',
    pipelineReady: 'செயல்முறை தயார்: கேள்வி -> நோக்கம் -> RAG -> கருத்து வரைபடம் -> Gemma -> சரிபார்ப்பு',
    typeYourDoubt: 'உங்கள் பாட சந்தேகத்தை உள்ளிடவும்...',
    send: 'அனுப்பு',
    close: 'மூடு',
    conceptMapTitle: 'அறிவு வரைபடம் & முன்நிபந்தனைகள்',
    conceptMapSubtitle: 'பாடக் கருத்துக்களின் தொடர்புகள் மற்றும் முன்னரே தேவையான அடிப்படைகள்',
    prerequisites: 'முன்நிபந்தனைகள்',
    nextConcept: 'அடுத்த கருத்து',
    askAboutConcept: 'இந்தக் கருத்தைப் பற்றி EduNode இடம் கேளுங்கள்',
    syllabusChapters: 'பாடத்திட்ட அத்தியாயங்கள்',
    currentFocusChapter: 'தற்போதைய முக்கிய அத்தியாயம்',
    askDoubtChapter: 'இந்த அத்தியாயத்தில் சந்தேகம் கேள்',
  },

  te: {
    // Navigation
    menu: 'మెనూ',
    dashboard: 'డ్యాష్‌బోర్డ్',
    subjects: 'నా సబ్జెక్టులు',
    askTutor: 'EduNode AI ని అడగండి',
    misconceptionRadar: 'అపోహల రాడార్',
    conceptMap: 'భావన పటం',
    assignments: 'అసైన్‌మెంట్లు',
    calendar: 'క్యాలెండర్',
    settings: 'సెట్టింగ్‌లు',
    studentBadge: 'విద్యార్థి',
    aiBadge: 'AI',
    adaptiveBadge: 'అనుకూల',

    // Header & Controls
    searchPlaceholder: 'పాఠాలు, భావనలను శోధించండి లేదా సందేహం అడగండి...',
    selectCurriculum: 'పాఠ్యప్రణాళిక',
    selectClass: 'తరగతి',
    selectLanguage: 'భాష',
    notifications: 'నోటిఫికేషన్లు',
    newBadge: 'కొత్తది',
    allBoards: 'అన్ని బోర్డులు',

    // Hero / Welcome
    greeting: 'శుభోదయం, {name}',
    heroSubtitle: 'EduNode మీ {board} సిలబస్‌తో అనుసంధానించబడింది. మీ అభ్యాస ప్రక్రియ నేడు వ్యక్తిగతీకరించబడింది.',
    quickDoubtPlaceholder: 'మీ సందేహాన్ని టైప్ చేయండి (ఉదా: విచక్షణ b² - 4ac ఎందుకు ముఖ్యం?)...',
    askButton: 'సందేహం అడుగు',
    voiceButton: 'వాయిస్',
    listeningVoice: 'మీ వాయిస్ వింటోంది...',
    continueLearning: 'చదువు కొనసాగించండి',
    syllabusActive: 'సిలబస్ యాక్టివ్',

    // Stats
    masteryLabel: 'మొత్తం నైపుణ్యం',
    streakLabel: 'నిరంతర రోజులు',
    clearedLabel: 'పరిష్కరించిన అపోహలు',
    enrolledLabel: 'సబ్జెక్టులు',

    // Subjects Grid
    mySubjectsTitle: 'నా సబ్జెక్టులు',
    enrolledCount: '5 సబ్జెక్టులు యాక్టివ్',
    viewAllChapters: 'సిలబస్ చూడండి',
    mastery: 'నైపుణ్యం',
    chapter: 'అధ్యాయం',
    activeTopic: 'ప్రస్తుత అంశం',
    clickToStudy: 'అధ్యాయం చదవండి',
    askSubjectDoubt: 'సందేహం అడుగు',

    subjectNames: {
      math: 'గణితం',
      science: 'సైన్స్',
      social: 'సాంఘిక శాస్త్రం',
      english: 'ఇంగ్లీష్',
      hindi: 'హిందీ',
      physics: 'భౌతిక శాస్త్రం',
      chemistry: 'రసాయన శాస్త్రం',
      biology: 'జీవశాస్త్రం',
      cs: 'కంప్యూటర్ సైన్స్',
      it: 'సమాచార సాంకేతికత',
      comp: 'కంప్యూటర్ అధ్యయనాలు',
      comp_app: 'కంప్యూటర్ అప్లికేషన్స్',
    },

    // Subjects Data
    subjectsData: {
      math: {
        name: 'గణితం',
        activeChapter: 'వర్గ సమీకరణాలు',
        chapterNumber: 'అధ్యాయం 4',
        recentTopic: 'మూలాల స్వభావం & విచక్షణ',
        misconceptionNote: 'b రుణాత్మకమైనప్పుడు (-b) గుర్తును గమనించండి',
      },
      science: {
        name: 'సైన్స్',
        activeChapter: 'జీవ క్రియలు',
        chapterNumber: 'అధ్యాయం 6',
        recentTopic: 'పోషణ & కిరణజన్య సంయోగక్రియ',
        misconceptionNote: 'మొక్కలలో శ్వాసక్రియ రాత్రి మాత్రమే కాక 24 గంటలూ జరుగుతుంది',
      },
      social: {
        name: 'సాంఘిక శాస్త్రం',
        activeChapter: 'భారతదేశంలో జాతీయవాదం',
        chapterNumber: 'చరిత్ర అధ్యాయం 2',
        recentTopic: 'ఉప్పు సత్యాగ్రహం & శాసనోల్లంఘన',
        misconceptionNote: 'చారిత్రక కాలక్రమం కాన్సెప్ట్ గ్రాఫ్‌తో ధృవీకరించబడింది',
      },
      english: {
        name: 'ఇంగ్లీష్',
        activeChapter: 'ఫస్ట్ ఫ్లైట్',
        chapterNumber: 'గద్యం & పద్యం',
        recentTopic: 'గోవా బేకర్ కథ',
        misconceptionNote: 'పదజాలం మరియు నేపథ్య విశ్లేషణ పురోగతిలో ఉంది',
      },
      hindi: {
        name: 'హిందీ',
        activeChapter: 'క్షితిజ్ పార్ట్ 2',
        chapterNumber: 'కావ్య ఖండం',
        recentTopic: 'సూర్దాస్ పదాలు — భావార్థం',
        misconceptionNote: 'రూపక కవితా అర్థాలు సరిగ్గా గ్రహించబడ్డాయి',
      },
    },

    // Misconceptions
    misconceptionRadarTitle: 'అపోహల రాడార్',
    misconceptionRadarSubtitle: 'సాధారణ తప్పులను గుర్తించి సరిదిద్దే ప్రత్యక సాధన',
    activeDrillTitle: 'ప్రస్తుత సాధన డ్రిల్',
    practiceNow: 'సాధన చేయండి',
    clearedMisconceptionsTitle: 'పరిష్కరించబడిన అపోహలు',
    caughtToday: 'నేడు గుర్తించబడింది',
    drillQuickTitle: 'త్వరిత సాధన',
    drillSuccess: 'అద్భుతం! అపోహ సరిదిద్దబడింది మరియు మీ ప్రొఫైల్‌లో అప్‌డేట్ చేయబడింది.',
    drillFailed: 'సరికాదు. దూరం లేదా కొలత రుణాత్మకంగా ఉండదు.',
    resolved: 'పరిష్కరించబడింది',
    needsDrill: 'సాధన అవసరం',

    activeMisconception: {
      subject: 'గణితం',
      concept: 'రుణ సంఖ్యలతో గుర్తు మార్పు',
      description: 'ax² + bx + c = 0 లో b ముందే రుణాత్మకమైతే (ఉదా: b = -6), -b విలువ -(-6) = +6 అవుతుంది, -6 కాదు.',
      question: '2x² - 6x + 3 = 0 లో, -b యొక్క ఖచ్చితమైన విలువ ఎంత?',
      options: ['-6', '+6', '-3'],
      correct: '+6',
    },

    clearedList: [
      {
        concept: 'ఉష్ణం vs ఉష్ణోగ్రత',
        subject: 'సైన్స్',
        description: 'ఉష్ణ శక్తి ద్రవ్యరాశి మరియు స్థితి మార్పుపై ఆధారపడి ఉంటుందని స్పష్టమైంది.',
        time: 'నిన్న',
      },
      {
        concept: 'విద్యుత్ ప్రవాహ దిశ',
        subject: 'సైన్స్',
        description: 'సాంప్రదాయ ప్రవాహం మరియు ఎలక్ట్రాన్ కదలికల మధ్య తేడా అర్థమైంది.',
        time: '2 రోజుల క్రితం',
      },
    ],

    // Recent Activity
    recentActivityTitle: 'ఇటీవలి అభ్యాస చరిత్ర',
    recentActivitySubtitle: 'AI వివరణలు మరియు మైలురాళ్లు',
    activities: [
      {
        title: 'వర్గ మూలాలను వివరించిన Gemma',
        desc: 'మీ సందేహానికి అనుగుణంగా దశలవారీ గుర్తు వివరణ అందించబడింది',
        time: '15 నిమిషాల క్రితం',
        tag: 'AI ట్యూటర్',
      },
      {
        title: 'సైన్స్‌లో అపోహ తొలగించబడింది',
        desc: 'స్థితి మార్పు సమయంలో గుప్త ఉష్ణం ధృవీకరించబడింది',
        time: '2 గంటల క్రితం',
        tag: 'పరిష్కారం',
      },
      {
        title: 'జీవ క్రియల కాన్సెప్ట్ గ్రాఫ్ పరిశీలన',
        desc: 'జైలమ్, ఫ్లోయమ్ మరియు బాష్పోత్సేకం అనుసంధానించబడ్డాయి',
        time: 'నిన్న',
        tag: 'నాలెడ్జ్ గ్రాఫ్',
      },
      {
        title: 'విచక్షణ సాధనలో 5/5 స్కోరు',
        desc: '3 నిమిషాల సూత్రాల డ్రిల్ విజయవంతంగా ముగిసింది',
        time: '2 రోజుల క్రితం',
        tag: 'సాధన',
      },
    ],

    // Modals
    askModalTitle: 'EduNode AI ట్యూటర్',
    askModalSubtitle: 'బహుభాషా • {board} సిలబస్ • అపోహల గుర్తింపు',
    pipelineReady: 'పైప్‌లైన్ సిద్ధం: ప్రశ్న -> ఉద్దేశం -> RAG -> కాన్సెప్ట్ గ్రాఫ్ -> Gemma -> తనిఖీ',
    typeYourDoubt: 'మీ సందేహాన్ని ఇక్కడ రాయండి...',
    send: 'పంపు',
    close: 'మూసివేయి',
    conceptMapTitle: 'నాలెడ్జ్ గ్రాఫ్ & ముందస్తు భావనలు',
    conceptMapSubtitle: 'సిలబస్ భావనల మధ్య పరస్పర సంబంధాలు',
    prerequisites: 'ముందస్తు అవసరాలు',
    nextConcept: 'తదుపరి భావన',
    askAboutConcept: 'ఈ భావన గురించి EduNode ని అడగండి',
    syllabusChapters: 'సిలబస్ అధ్యాయాలు',
    currentFocusChapter: 'ప్రస్తుత ముఖ్య అధ్యాయం',
    askDoubtChapter: 'ఈ అధ్యాయంలో సందేహం అడగండి',
  },

  ml: {
    // Navigation
    menu: 'മെനു',
    dashboard: 'ഡാഷ്‌ബോർഡ്',
    subjects: 'വിഷയങ്ങൾ',
    askTutor: 'EduNode AI ചോദിക്കൂ',
    misconceptionRadar: 'തെറ്റിദ്ധാരണ റഡാർ',
    conceptMap: 'ആശയ ഭൂപടം',
    assignments: 'പഠനപ്രവർത്തനങ്ങൾ',
    calendar: 'കലണ്ടർ',
    settings: 'ക്രമീകരണങ്ങൾ',
    studentBadge: 'വിദ്യാർത്ഥി',
    aiBadge: 'AI',
    adaptiveBadge: 'വ്യക്തിഗത',

    // Header & Controls
    searchPlaceholder: 'പാഠഭാഗങ്ങൾ, ആശയങ്ങൾ തിരയുക അല്ലെങ്കിൽ സംശയം ചോദിക്കുക...',
    selectCurriculum: 'പാഠ്യപദ്ധതി',
    selectClass: 'ക്ലാസ്സ്',
    selectLanguage: 'ഭാഷ',
    notifications: 'അറിയിപ്പുകൾ',
    newBadge: 'പുതിയത്',
    allBoards: 'എല്ലാ ബോർഡുകളും',

    // Hero / Welcome
    greeting: 'സുപ്രഭാതം, {name}',
    heroSubtitle: 'EduNode നിങ്ങളുടെ {board} സിലബസുമായി ബന്ധിപ്പിച്ചിരിക്കുന്നു. നിങ്ങളുടെ പഠനക്രമം ഇന്ന് വ്യക്തിഗതമാക്കിയിരിക്കുന്നു.',
    quickDoubtPlaceholder: 'സംശയം ടൈപ്പ് ചെയ്യുക (ഉദാ: ഡിസ്ക്രിമിനന്റ് b² - 4ac എന്തുകൊണ്ട് പ്രധാനം?)...',
    askButton: 'സംശയം ചോദിക്കൂ',
    voiceButton: 'ശബ്ദം',
    listeningVoice: 'നിങ്ങളുടെ ശബ്ദം കേൾക്കുന്നു...',
    continueLearning: 'പഠനം തുടരുക',
    syllabusActive: 'സിലബസ് സജീവം',

    // Stats
    masteryLabel: 'ആകെ പ്രാവീണ്യം',
    streakLabel: 'തുടർച്ചയായ ദിവസങ്ങൾ',
    clearedLabel: 'പരിഹരിച്ച തെറ്റുകൾ',
    enrolledLabel: 'വിഷയങ്ങൾ',

    // Subjects Grid
    mySubjectsTitle: 'എന്റെ വിഷയങ്ങൾ',
    enrolledCount: '5 വിഷയങ്ങൾ സജീവം',
    viewAllChapters: 'സിലബസ് കാണുക',
    mastery: 'പ്രാവീണ്യം',
    chapter: 'അധ്യായം',
    activeTopic: 'ഇപ്പോഴത്തെ വിഷയം',
    clickToStudy: 'അധ്യായം പഠിക്കുക',
    askSubjectDoubt: 'സംശയം ചോദിക്കൂ',

    subjectNames: {
      math: 'ഗണിതം',
      science: 'ശാസ്ത്രം',
      social: 'സോഷ്യൽ സയൻസ്',
      english: 'ഇംഗ്ലീഷ്',
      hindi: 'ഹിന്ദി',
      physics: 'ഫിസിക്സ്',
      chemistry: 'രസതന്ത്രം',
      biology: 'ബയോളജി',
      cs: 'കമ്പ്യൂട്ടർ സയൻസ്',
      it: 'ഇൻഫർമേഷൻ ടെക്നോളജി',
      comp: 'കമ്പ്യൂട്ടർ പഠനം',
      comp_app: 'കമ്പ്യൂട്ടർ ആപ്ലിക്കേഷനുകൾ',
    },

    // Subjects Data
    subjectsData: {
      math: {
        name: 'ഗണിതം',
        activeChapter: 'രണ്ടാം കൃതി സമവാക്യങ്ങൾ',
        chapterNumber: 'അധ്യായം 4',
        recentTopic: 'മൂലങ്ങളുടെ സ്വഭാവവും വിവേചകവും',
        misconceptionNote: 'b നെഗറ്റീവ് ആകുമ്പോൾ (-b) അടയാളം ശ്രദ്ധിക്കുക',
      },
      science: {
        name: 'ശാസ്ത്രം',
        activeChapter: 'ജീവൻറെ പ്രക്രിയകൾ',
        chapterNumber: 'അധ്യായം 6',
        recentTopic: 'പോഷണവും പ്രകാശസംശ്ലേഷണവും',
        misconceptionNote: 'സസ്യങ്ങളിൽ ശ്വസനം രാത്രിയിൽ മാത്രമല്ല, 24 മണിക്കൂറും നടക്കുന്നു',
      },
      social: {
        name: 'സാമൂഹ്യശാസ്ത്രം',
        activeChapter: 'ഇന്ത്യയിലെ ദേശീയത',
        chapterNumber: 'ചരിത്രം അധ്യായം 2',
        recentTopic: 'ഉപ്പുസത്യാഗ്രഹവും നിയമലംഘനവും',
        misconceptionNote: 'ചരിത്ര കാലക്രമം കൺസെപ്റ്റ് ഗ്രാഫുമായി പരിശോധിച്ചു',
      },
      english: {
        name: 'ഇംഗ്ലീഷ്',
        activeChapter: 'ഫസ്റ്റ് ഫ്ലൈറ്റ്',
        chapterNumber: 'ഗദ്യവും പദ്യവും',
        recentTopic: 'ഗോവൻ ബേക്കർ',
        misconceptionNote: 'വാക്യസമ്പത്തും ആശയ വിശകലനവും പുരോഗമിക്കുന്നു',
      },
      hindi: {
        name: 'ഹിന്ദി',
        activeChapter: 'ക്ഷിതിജ് ഭാഗം 2',
        chapterNumber: 'കാവ്യ ഖണ്ഡം',
        recentTopic: 'സൂർദാസ് പദങ്ങൾ — ഭാവം',
        misconceptionNote: 'കവിതാ സങ്കല്പങ്ങൾ ശരിയായി മനസ്സിലാക്കി',
      },
    },

    // Misconceptions
    misconceptionRadarTitle: 'തെറ്റിദ്ധാരണ റഡാർ',
    misconceptionRadarSubtitle: 'സാധാരണ തെറ്റുകൾ കണ്ടെത്തി തിരുത്തുന്ന പ്രത്യേക പരിശീലനം',
    activeDrillTitle: 'ശ്രദ്ധ കേന്ദ്രീകരിക്കേണ്ട പരിശീലനം',
    practiceNow: 'പരിശീലിക്കുക',
    clearedMisconceptionsTitle: 'പരിഹരിച്ച തെറ്റിദ്ധാരണകൾ',
    caughtToday: 'ഇന്ന് കണ്ടെത്തിയത്',
    drillQuickTitle: 'ദ്രുത പരിശീലനം',
    drillSuccess: 'മികച്ചത്! തെറ്റിദ്ധാരണ പരിഹരിച്ച് പ്രൊഫൈലിൽ അപ്‌ഡേറ്റ് ചെയ്തു.',
    drillFailed: 'ശരിയല്ല. ദൂരമോ നീളമോ നെഗറ്റീവ് സംഖ്യയാകാൻ കഴിയില്ല.',
    resolved: 'പരിഹരിച്ചു',
    needsDrill: 'പരിശീലനം വേണം',

    activeMisconception: {
      subject: 'ഗണിതം',
      concept: 'നെഗറ്റീവ് സംഖ്യകളിലെ അടയാള മാറ്റം',
      description: 'ax² + bx + c = 0 ൽ b ഇതിനകം നെഗറ്റീവ് ആണെങ്കിൽ (ഉദാ: b = -6), -b എന്നത് -(-6) = +6 ആണ്, -6 അല്ല.',
      question: '2x² - 6x + 3 = 0 ൽ, -b യുടെ ശരിയായ മൂല്യം എത്ര?',
      options: ['-6', '+6', '-3'],
      correct: '+6',
    },

    clearedList: [
      {
        concept: 'താപം vs താപനില',
        subject: 'ശാസ്ത്രം',
        description: 'താപോർജ്ജം വസ്തുവിന്റെ പിണ്ഡത്തെയും അവസ്ഥാ മാറ്റത്തെയും ആശ്രയിച്ചിരിക്കുന്നുവെന്ന് മനസ്സിലാക്കി.',
        time: 'ഇന്നലെ',
      },
      {
        concept: 'വൈദ്യുത പ്രവാഹ ദിശ',
        subject: 'ശാസ്ത്രം',
        description: 'പരമ്പരാഗത പ്രവാഹവും ഇലക്ട്രോൺ പ്രവാഹവും തമ്മിലുള്ള വ്യത്യാസം മനസ്സിലാക്കി.',
        time: '2 ദിവസം മുമ്പ്',
      },
    ],

    // Recent Activity
    recentActivityTitle: 'സമീപകാല പഠന രേഖകൾ',
    recentActivitySubtitle: 'AI വിശദീകരണങ്ങളും പാഠ്യപദ്ധതി മുന്നേറ്റങ്ങളും',
    activities: [
      {
        title: 'രണ്ടാം കൃതി സമവാക്യങ്ങൾ വിശദീകരിച്ച് Gemma',
        desc: 'നിങ്ങളുടെ സംശയത്തിന് അനുയോജ്യമായ അടയാള വിശദീകരണം നൽകി',
        time: '15 മിനിറ്റ് മുമ്പ്',
        tag: 'AI ട്യൂട്ടർ',
      },
      {
        title: 'ശാസ്ത്രത്തിലെ തെറ്റിദ്ധാരണ തിരുത്തി',
        desc: 'അവസ്ഥാ മാറ്റത്തിലെ ലീനതാപം ശരിയായി മനസ്സിലാക്കി',
        time: '2 മണിക്കൂർ മുമ്പ്',
        tag: 'പരിഹരിച്ചു',
      },
      {
        title: 'ജീവൻറെ പ്രക്രിയകൾ ആശയ ഭൂപടം പരിശോധിച്ചു',
        desc: 'സൈലം, ഫ്ലോയം, ബാഷ്പോത്സർജ്ജനം എന്നിവ ബന്ധിപ്പിച്ചു',
        time: 'ഇന്നലെ',
        tag: 'നോളജ് ഗ്രാഫ്',
      },
      {
        title: 'വിവേചക പരിശീലനത്തിൽ 5/5 മാർക്ക്',
        desc: '3 മിനിറ്റ് സൂത്രവാക്യ പരിശീലനം വിജയകരമായി പൂർത്തിയാക്കി',
        time: '2 ദിവസം മുമ്പ്',
        tag: 'പരിശീലനം',
      },
    ],

    // Modals
    askModalTitle: 'EduNode AI ട്യൂട്ടർ',
    askModalSubtitle: 'ബഹുഭാഷാ • {board} സിലബസ് • തെറ്റിദ്ധാരണാ തിരിച്ചറിയൽ',
    pipelineReady: 'പൈപ്പ്‌ലൈൻ സജ്ജം: ചോദ്യം -> ഉദ്ദേശ്യം -> RAG -> കൺസെപ്റ്റ് ഗ്രാഫ് -> Gemma -> പരിശോധന',
    typeYourDoubt: 'നിങ്ങളുടെ സംശയം ഇവിടെ എഴുതുക...',
    send: 'അയക്കുക',
    close: 'അടയ്ക്കുക',
    conceptMapTitle: 'നോളജ് ഗ്രാഫും മുൻവ്യവസ്ഥകളും',
    conceptMapSubtitle: 'സിലബസ് ആശയങ്ങളുടെ പരസ്പര ബന്ധങ്ങൾ',
    prerequisites: 'മുൻവ്യവസ്ഥകൾ',
    nextConcept: 'അടുത്ത ആശയം',
    askAboutConcept: 'ഈ ആശയത്തെക്കുറിച്ച് EduNode-നോട് ചോദിക്കൂ',
    syllabusChapters: 'പാഠപുസ്തക അധ്യായങ്ങൾ',
    currentFocusChapter: 'ഇപ്പോഴത്തെ പ്രധാന അധ്യായം',
    askDoubtChapter: 'ഈ അധ്യായത്തിൽ സംശയം ചോദിക്കൂ',
  },

  hi: {
    // Navigation
    menu: 'मेनू',
    dashboard: 'डैशबोर्ड',
    subjects: 'मेरे विषय',
    askTutor: 'EduNode AI से पूछें',
    misconceptionRadar: 'भ्रांति रडार',
    conceptMap: 'अवधारणा मानचित्र',
    assignments: 'असाइनमेंट',
    calendar: 'कैलेंडर',
    settings: 'सेटिंग्स',
    studentBadge: 'विद्यार्थी',
    aiBadge: 'AI',
    adaptiveBadge: 'अनुकूली',

    // Header & Controls
    searchPlaceholder: 'अध्याय, अवधारणाएं खोजें या शंका पूछें...',
    selectCurriculum: 'पाठ्यक्रम',
    selectClass: 'कक्षा',
    selectLanguage: 'भाषा',
    notifications: 'सूचनाएं',
    newBadge: 'नया',
    allBoards: 'सभी बोर्ड',

    // Hero / Welcome
    greeting: 'शुभ प्रभात, {name}',
    heroSubtitle: 'EduNode आपके {board} पाठ्यक्रम से पूरी तरह जुड़ा है। आपकी सीखने की यात्रा आज व्यक्तिगत रूप से अनुकूलित है।',
    quickDoubtPlaceholder: 'अपनी शंका लिखें (उदा: विविक्तकर b² - 4ac क्यों महत्वपूर्ण है?)...',
    askButton: 'शंका पूछें',
    voiceButton: 'आवाज़',
    listeningVoice: 'आपकी आवाज़ सुन रहा है...',
    continueLearning: 'पढ़ाई जारी रखें',
    syllabusActive: 'पाठ्यक्रम सक्रिय',

    // Stats
    masteryLabel: 'समग्र निपुणता',
    streakLabel: 'लगातार दिन',
    clearedLabel: 'दूर की गई भ्रांतियां',
    enrolledLabel: 'नामांकित विषय',

    // Subjects Grid
    mySubjectsTitle: 'मेरे विषय',
    enrolledCount: '5 विषय सक्रिय',
    viewAllChapters: 'पाठ्यक्रम देखें',
    mastery: 'निपुणता',
    chapter: 'अध्याय',
    activeTopic: 'सक्रिय विषय',
    clickToStudy: 'अध्याय पढ़ें',
    askSubjectDoubt: 'शंका पूछें',

    subjectNames: {
      math: 'गणित',
      science: 'विज्ञान',
      social: 'सामाजिक विज्ञान',
      english: 'अंग्रेजी',
      hindi: 'हिंदी',
      physics: 'भौतिक विज्ञान',
      chemistry: 'रसायन विज्ञान',
      biology: 'जीव विज्ञान',
      cs: 'कंप्यूटर साइंस',
      it: 'सूचना प्रौद्योगिकी',
      comp: 'कंप्यूटर अध्ययन',
      comp_app: 'कंप्यूटर अनुप्रयोग',
    },

    // Subjects Data
    subjectsData: {
      math: {
        name: 'गणित',
        activeChapter: 'द्विघात समीकरण',
        chapterNumber: 'अध्याय 4',
        recentTopic: 'मूलों की प्रकृति एवं विविक्तकर',
        misconceptionNote: 'जब b ऋणात्मक हो तो (-b) के चिह्न पर विशेष ध्यान दें',
      },
      science: {
        name: 'विज्ञान',
        activeChapter: 'जैव प्रक्रम',
        chapterNumber: 'अध्याय 6',
        recentTopic: 'पोषण एवं प्रकाश संश्लेषण',
        misconceptionNote: 'पौधों में श्वसन केवल रात में नहीं, 24 घंटे लगातार होता है',
      },
      social: {
        name: 'सामाजिक विज्ञान',
        activeChapter: 'भारत में राष्ट्रवाद',
        chapterNumber: 'इतिहास अध्याय 2',
        recentTopic: 'नमक सत्याग्रह एवं सविनय अवज्ञा',
        misconceptionNote: 'ऐतिहासिक कालक्रम अवधारणा ग्राफ से सत्यापित',
      },
      english: {
        name: 'अंग्रेजी',
        activeChapter: 'फर्स्ट फ्लाइट',
        chapterNumber: 'गद्य एवं पद्य',
        recentTopic: 'गोवा के बेकर की झलक',
        misconceptionNote: 'शब्दावली एवं विषयगत विश्लेषण प्रगति पर है',
      },
      hindi: {
        name: 'हिंदी',
        activeChapter: 'क्षितिज भाग 2',
        chapterNumber: 'काव्य खंड',
        recentTopic: 'सूरदास के पद — भावार्थ एवं व्याकरण',
        misconceptionNote: 'काव्य के रूपक भाव सफलतापूर्वक समझे गए',
      },
    },

    // Misconceptions
    misconceptionRadarTitle: 'भ्रांति रडार',
    misconceptionRadarSubtitle: 'सामान्य वैचारिक गलतियों को पकड़कर दूर करने वाले विशेष अभ्यास',
    activeDrillTitle: 'सक्रिय अभ्यास ड्रिल',
    practiceNow: 'अभ्यास करें',
    clearedMisconceptionsTitle: 'दूर की गई भ्रांतियां',
    caughtToday: 'आज पहचानी गई',
    drillQuickTitle: 'त्वरित ड्रिल',
    drillSuccess: 'शानदार! भ्रांति दूर हो गई और आपकी प्रोफ़ाइल अपडेट कर दी गई।',
    drillFailed: 'गलत उत्तर। दूरी या वास्तविक भौतिक माप ऋणात्मक नहीं हो सकते।',
    resolved: 'हल किया गया',
    needsDrill: 'अभ्यास आवश्यक',

    activeMisconception: {
      subject: 'गणित',
      concept: 'ऋणात्मक गुणांकों के साथ चिह्न परिवर्तन',
      description: 'ax² + bx + c = 0 में यदि b पहले से ऋणात्मक हो (उदा: b = -6), तो -b का मान -(-6) = +6 होता है, -6 नहीं।',
      question: '2x² - 6x + 3 = 0 में, -b का सटीक मान क्या है?',
      options: ['-6', '+6', '-3'],
      correct: '+6',
    },

    clearedList: [
      {
        concept: 'ऊष्मा बनाम तापमान',
        subject: 'विज्ञान',
        description: 'समझा गया कि ऊष्मीय ऊर्जा केवल तापमान पर नहीं बल्कि द्रव्यमान और अवस्था परिवर्तन पर निर्भर करती है।',
        time: 'कल',
      },
      {
        concept: 'विद्युत धारा की दिशा',
        subject: 'विज्ञान',
        description: 'पारंपरिक धारा प्रवाह और इलेक्ट्रॉन गति के बीच का अंतर स्पष्ट हुआ।',
        time: '2 दिन पहले',
      },
    ],

    // Recent Activity
    recentActivityTitle: 'हालिया सीखने की गतिविधि',
    recentActivitySubtitle: 'AI स्पष्टीकरण और पाठ्यक्रम उपलब्धियां',
    activities: [
      {
        title: 'Gemma ने द्विघात मूलों को समझाया',
        desc: 'आपकी शंका के अनुसार चरणबद्ध चिह्न नियम का विवरण दिया गया',
        time: '15 मिनट पहले',
        tag: 'AI ट्यूटर',
      },
      {
        title: 'विज्ञान में भ्रांति दूर की गई',
        desc: 'अवस्था परिवर्तन के दौरान गुप्त ऊष्मा का नियम स्पष्ट हुआ',
        time: '2 घंटे पहले',
        tag: 'भ्रांति मुक्त',
      },
      {
        title: 'जैव प्रक्रम अवधारणा मानचित्र देखा',
        desc: 'जाइलम, फ्लोएम और रंध्रीय वाष्पोत्सर्जन को जोड़ा गया',
        time: 'कल',
        tag: 'ज्ञान ग्राफ',
      },
      {
        title: 'विविक्तकर अभ्यास में 5/5 अंक',
        desc: '3 मिनट की सूत्र ड्रिल सफलतापूर्वक पूरी की गई',
        time: '2 दिन पहले',
        tag: 'अभ्यास',
      },
    ],

    // Modals
    askModalTitle: 'EduNode AI शिक्षक',
    askModalSubtitle: 'बहुभाषी • {board} पाठ्यक्रम • भ्रांति-जागरूक AI',
    pipelineReady: 'पाइपलाइन तैयार: प्रश्न -> उद्देश्य -> RAG -> अवधारणा ग्राफ -> Gemma -> भ्रांति जांच',
    typeYourDoubt: 'अपनी शंका यहां लिखें...',
    send: 'भेजें',
    close: 'बंद करें',
    conceptMapTitle: 'ज्ञान ग्राफ एवं पूर्व-आवश्यकताएं',
    conceptMapSubtitle: 'पाठ्यक्रम अवधारणाओं के आपसी संबंध एवं पूर्वापेक्षाएं',
    prerequisites: 'पूर्व-आवश्यकताएं',
    nextConcept: 'अगली अवधारणा',
    askAboutConcept: 'EduNode से इस अवधारणा के बारे में पूछें',
    syllabusChapters: 'पाठ्यपुस्तक अध्याय',
    currentFocusChapter: 'वर्तमान मुख्य अध्याय',
    askDoubtChapter: 'इस अध्याय पर शंका पूछें',
  },
};

export function getTranslation(lang = 'en') {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
