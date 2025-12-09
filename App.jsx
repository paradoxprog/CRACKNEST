import React, { useState, useEffect, useRef } from 'react';
import { 
  Rocket, 
  Brain, 
  FileText, 
  MessageSquare, 
  User, 
  CheckCircle, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Briefcase,
  ChevronRight,
  Menu,
  X,
  Send,
  Loader2,
  Mic,
  Save,
  RefreshCw,
  LogOut,
  Target
} from 'lucide-react';

/* CRACKNEST - All-in-One Interview Preparation Platform
  Powered by Gemini API
*/

const apiKey = ""; // API Key injected by environment

// --- API Helpers ---

const generateGeminiContent = async (prompt, systemInstruction = "") => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please try again.";
  }
};

// --- Components ---

const LandingPage = ({ onLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CrackNest
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-indigo-600 transition">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-indigo-600 transition">How it Works</a>
              <a href="#testimonials" className="text-slate-600 hover:text-indigo-600 transition">Success Stories</a>
              <button 
                onClick={onLogin}
                className="px-5 py-2.5 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
              >
                Login / Sign Up
              </button>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-4">
            <a href="#features" className="block text-slate-600">Features</a>
            <button onClick={onLogin} className="w-full py-2 bg-indigo-600 text-white rounded-lg">Login</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-medium text-sm mb-6 animate-fade-in-up">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            #1 AI-Powered Interview Prep Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
            Crack Every Interview <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              With Confidence.
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Master your dream job interviews with personalized AI roadmaps, mock interviews, 
            ATS-friendly resume building, and role-specific skill tests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onLogin}
              className="px-8 py-4 rounded-full bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Start For Free
            </button>
            <button className="px-8 py-4 rounded-full bg-white text-slate-700 border border-slate-200 font-bold text-lg hover:bg-slate-50 transition flex items-center justify-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-0.5"></div>
              </div>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-slate-600">Our AI-driven ecosystem covers every aspect of your preparation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "Smart Skill Test", desc: "Baseline assessment to identify your strengths and weaknesses." },
              { icon: Target, title: "Personalized Roadmap", desc: "Custom study plans tailored to your target role and current level." },
              { icon: MessageSquare, title: "AI Mock Interviews", desc: "Real-time voice/text simulations with instant feedback." },
              { icon: FileText, title: "Resume Builder", desc: "Create ATS-friendly resumes with AI content suggestions." },
              { icon: TrendingUp, title: "Performance Analytics", desc: "Track your progress with detailed charts and insights." },
              { icon: Award, title: "Certification", desc: "Earn certificates upon completing your training modules." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileSetup = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    year: '',
    targetField: 'IT',
    targetRole: 'Software Developer',
    experience: 'Fresher'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay for roadmap generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Setup Your Profile</h2>
          <p className="text-slate-600 mt-2">Help us personalize your CrackNest experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Degree / Stream</label>
              <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} placeholder="B.Tech CSE" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Field</label>
              <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.targetField} onChange={e => setFormData({...formData, targetField: e.target.value})}>
                <option>IT / Software</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>HR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Role</label>
              <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                value={formData.targetRole} onChange={e => setFormData({...formData, targetRole: e.target.value})} placeholder="e.g. Frontend Dev" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Experience Level</label>
              <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}>
                <option>Fresher</option>
                <option>1-3 Years</option>
                <option>3+ Years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Graduation Year</label>
              <input required type="number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="2024" />
            </div>
          </div>
          
          <button disabled={loading} type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : "Create My Roadmap"}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Main App Components ---

const AIMockInterview = ({ profile }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hello ${profile.name}! I'm your AI Interviewer for the ${profile.targetRole} role. Would you like to start with a Technical question or an HR behavioral question?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const systemPrompt = `You are a professional interviewer conducting a mock interview for a ${profile.targetRole} position. 
    The candidate is a ${profile.experience}. 
    Keep responses concise (max 2-3 sentences). 
    If the user answers a question, evaluate it briefly (Good/Bad and why) and then ask the next relevant question. 
    Maintain a professional but encouraging tone.`;

    const prompt = `Conversation history: ${JSON.stringify(messages.slice(-5))}. User said: "${userMsg}". Respond as the interviewer.`;

    const reply = await generateGeminiContent(prompt, systemPrompt);
    
    setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[600px] flex flex-col">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-indigo-50 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <BotIcon className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">AI Interviewer</h3>
            <p className="text-xs text-slate-500">Mode: {profile.targetRole} Simulation</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-red-500" onClick={() => setMessages([])} title="Reset Chat">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : 'bg-slate-100 text-slate-800 rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-3 rounded-2xl rounded-bl-none flex gap-1">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="flex gap-2">
          <input 
            type="text" 
            className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50"
            placeholder="Type your answer..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ResumeBuilder = ({ profile }) => {
  const [content, setContent] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const optimizeResume = async () => {
    if (!content) return;
    setLoading(true);
    const prompt = `Optimize the following resume experience section for a ${profile.targetRole} role. 
    Make it ATS friendly, use action verbs, and quantify achievements where possible.
    Original Text: "${content}"`;
    
    const result = await generateGeminiContent(prompt);
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 h-full">
      <div className="space-y-4">
        <label className="block font-medium text-slate-700">Paste your Experience / Summary</label>
        <textarea 
          className="w-full h-64 p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-slate-50"
          placeholder="e.g. Worked as a web developer for 2 years. Built some websites using React..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button 
          onClick={optimizeResume}
          disabled={loading || !content}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><Brain className="w-4 h-4" /> AI Enhance with Gemini</>}
        </button>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 overflow-y-auto h-[400px]">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" /> 
          AI Suggestions
        </h3>
        {suggestion ? (
          <div className="prose prose-sm text-slate-600 whitespace-pre-line">
            {suggestion}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400 text-center">
            <FileText className="w-12 h-12 mb-2 opacity-50" />
            <p>Your optimized content will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SkillTest = ({ profile }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateTest = async () => {
    setLoading(true);
    const prompt = `Generate 3 multiple choice questions for a ${profile.targetRole} interview. 
    Format: JSON Array with objects {question, options (array), correctIndex}. Return ONLY JSON.`;
    
    // Fallback Mock Data in case JSON parsing fails or API hiccups (for stability)
    const mockQuestions = [
      {
        question: "What is the primary purpose of React's useEffect hook?",
        options: ["State management", "Side effects", "Routing", "Styling"],
        correctIndex: 1
      },
      {
        question: "Which data structure uses LIFO?",
        options: ["Queue", "Array", "Stack", "Linked List"],
        correctIndex: 2
      },
      {
        question: "In CSS, what does 'z-index' control?",
        options: ["Transparency", "Horizontal alignment", "Vertical stacking order", "Zoom level"],
        correctIndex: 2
      }
    ];

    try {
      const text = await generateGeminiContent(prompt);
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        setQuestions(JSON.parse(jsonMatch[0]));
      } else {
        setQuestions(mockQuestions);
      }
    } catch (e) {
      setQuestions(mockQuestions);
    }
    setLoading(false);
  };

  const submitTest = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) score++;
    });
    setResult({ score, total: questions.length });
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-indigo-600" /></div>;

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <Brain className="w-16 h-16 text-indigo-200 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Baseline Skill Assessment</h3>
        <p className="text-slate-600 mb-6">Take a quick AI-generated test for {profile.targetRole} to analyze your current level.</p>
        <button onClick={generateTest} className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
          Start Assessment
        </button>
      </div>
    );
  }

  if (result) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Award className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Test Complete!</h3>
        <p className="text-4xl font-extrabold text-indigo-600 mb-4">{result.score} / {result.total}</p>
        <p className="text-slate-600 mb-8">Great job! We've updated your roadmap based on these results.</p>
        <button onClick={() => {setQuestions([]); setResult(null);}} className="text-indigo-600 hover:underline">Take Another Test</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {questions.map((q, idx) => (
        <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <p className="font-semibold text-lg mb-4 text-slate-800">{idx + 1}. {q.question}</p>
          <div className="space-y-3">
            {q.options.map((opt, optIdx) => (
              <label key={optIdx} className={`flex items-center p-3 rounded-lg border cursor-pointer transition ${
                answers[idx] === optIdx ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'bg-white border-slate-200 hover:border-indigo-300'
              }`}>
                <input 
                  type="radio" 
                  name={`q-${idx}`} 
                  className="mr-3 w-4 h-4 text-indigo-600"
                  checked={answers[idx] === optIdx}
                  onChange={() => setAnswers({...answers, [idx]: optIdx})}
                />
                <span className="text-slate-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button 
        onClick={submitTest}
        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg"
      >
        Submit Answers
      </button>
    </div>
  );
};

const Roadmap = ({ profile }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Your Path to {profile.targetRole}</h3>
        <p className="opacity-90">Current Progress: 15%</p>
        <div className="w-full bg-white/30 h-2 rounded-full mt-4">
          <div className="bg-white h-2 rounded-full w-[15%]"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          { title: "Aptitude Fundamentals", status: "In Progress", color: "bg-blue-100 text-blue-700" },
          { title: "Core Technical Skills", status: "Locked", color: "bg-slate-100 text-slate-500" },
          { title: "Data Structures", status: "Locked", color: "bg-slate-100 text-slate-500" },
          { title: "Mock Interviews (HR)", status: "Pending", color: "bg-orange-100 text-orange-700" }
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center">
            <span className="font-semibold text-slate-800">{item.title}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.color}`}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = ({ profile, onLogout }) => {
  const [activeTab, setActiveTab] = useState('roadmap');

  const renderContent = () => {
    switch (activeTab) {
      case 'roadmap': return <Roadmap profile={profile} />;
      case 'test': return <SkillTest profile={profile} />;
      case 'interview': return <AIMockInterview profile={profile} />;
      case 'resume': return <ResumeBuilder profile={profile} />;
      default: return <Roadmap profile={profile} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-100">
           <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">CrackNest</span>
            </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'roadmap', icon: Target, label: 'My Roadmap' },
            { id: 'test', icon: Brain, label: 'Skill Tests' },
            { id: 'interview', icon: MessageSquare, label: 'Mock Interview' },
            { id: 'resume', icon: FileText, label: 'Resume Builder' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
             <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
               {profile.name[0]}
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-bold text-slate-800 truncate">{profile.name}</p>
               <p className="text-xs text-slate-500 truncate">{profile.targetRole}</p>
             </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition text-sm font-medium">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        <header className="flex justify-between items-center mb-8 md:hidden">
           <span className="text-xl font-bold text-indigo-600">CrackNest</span>
           <button onClick={onLogout}><LogOut className="w-5 h-5 text-slate-600" /></button>
        </header>
        
        <header className="mb-8">
           <h1 className="text-2xl font-bold text-slate-900">
             {activeTab === 'roadmap' && 'Dashboard'}
             {activeTab === 'test' && 'Skill Assessment'}
             {activeTab === 'interview' && 'AI Interview Room'}
             {activeTab === 'resume' && 'Resume Builder'}
           </h1>
           <p className="text-slate-500">Welcome back, let's crack your dream job.</p>
        </header>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 min-h-[500px]">
          {renderContent()}
        </div>
      </main>
      
      {/* Mobile Nav Bottom */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 flex justify-around p-3 z-50">
         {[
            { id: 'roadmap', icon: Target },
            { id: 'test', icon: Brain },
            { id: 'interview', icon: MessageSquare },
            { id: 'resume', icon: FileText },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-2 rounded-full ${activeTab === item.id ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400'}`}
            >
              <item.icon className="w-6 h-6" />
            </button>
          ))}
      </div>
    </div>
  );
};

// --- Bot Icon Component ---
const BotIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// --- Root App ---

export default function App() {
  const [view, setView] = useState('landing'); // landing, auth, profile, dashboard
  const [userProfile, setUserProfile] = useState(null);

  // Simple view router
  if (view === 'landing') {
    return <LandingPage onLogin={() => setView('auth')} />;
  }

  if (view === 'auth') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome to CrackNest</h2>
          <p className="text-slate-500 mb-8">Sign in to access your personalized prep.</p>
          <button 
            onClick={() => setView('profile')}
            className="w-full py-3 border border-slate-200 rounded-xl mb-3 flex items-center justify-center gap-2 hover:bg-slate-50 font-medium transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>
          <button 
            onClick={() => setView('profile')}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
          >
             Login with Email
          </button>
          <button onClick={() => setView('landing')} className="mt-6 text-sm text-slate-400 hover:text-slate-600">Back to Home</button>
        </div>
      </div>
    );
  }

  if (view === 'profile') {
    return <ProfileSetup onComplete={(data) => {
      setUserProfile(data);
      setView('dashboard');
    }} />;
  }

  if (view === 'dashboard' && userProfile) {
    return <Dashboard profile={userProfile} onLogout={() => setView('landing')} />;
  }

  return <div>Loading...</div>;
}
