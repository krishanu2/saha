export const navLinks = [
  { label: "Courses", href: "#courses" },
  { label: "Coaches", href: "#coaches" },
  { label: "Gallery", href: "#gallery" },
] as const;

export const stats = [
  { value: 8, suffix: "+", label: "Years Training" },
  { value: 120, suffix: "+", label: "Clients Coached" },
  { value: 2, suffix: "x", label: "ICN Pro Card" },
  { value: 15, suffix: "+", label: "Competition Wins" },
] as const;

export const courses = [
  {
    badge: "COMPETITION PREP",
    title: "Competition Prep Coaching",
    description:
      "Full-cycle preparation from off-season to stage day — posing, peak week, and show-day execution.",
    duration: "12 Weeks",
    price: "₹45,000",
    size: "lg",
  },
  {
    badge: "ONLINE COACHING",
    title: "Online Transformation Coaching",
    description: "Science-backed training and nutrition for serious physique transformation. 100% natural.",
    duration: "8 Weeks",
    price: "₹18,000",
    size: "sm",
  },
  {
    badge: "POSING",
    title: "Posing Masterclass",
    description: "Learn stage-ready posing from an ICN Pro — Classic Physique and Men's Physique.",
    duration: "4 Sessions",
    price: "₹8,000",
    size: "sm",
  },
] as const;

const coachRoster = [
  {
    name: "Somnath Saha",
    role: "Head Coach & Founder",
    bio: "ICN Double Pro · NASM Certified · 8 years competing natural.",
    credentials: ["ICN Double Pro", "NASM Certified"],
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=560&h=640&fit=crop&crop=faces&q=80",
  },
  {
    name: "Arvind Rao",
    role: "Strength & Conditioning",
    bio: "Competition prep specialist. 5+ years coaching natural athletes.",
    credentials: ["5+ Years", "Strength"],
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=560&h=640&fit=crop&crop=faces&q=80",
  },
  {
    name: "Meera Iyer",
    role: "Nutrition Coach",
    bio: "Precision nutrition programming for natural physique athletes.",
    credentials: ["Nutrition", "Precision"],
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=560&h=640&fit=crop&crop=faces&q=80",
  },
  {
    name: "Karthik Menon",
    role: "Posing Coach",
    bio: "Stage presentation and posing mechanics for Classic & Men's Physique.",
    credentials: ["Posing", "Stage Ready"],
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=560&h=640&fit=crop&crop=faces&q=80",
  },
  {
    name: "Divya Nair",
    role: "Online Coach",
    bio: "Remote transformation specialist for busy, working professionals.",
    credentials: ["Remote", "Transformation"],
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=560&h=640&fit=crop&crop=faces&q=80",
  },
] as const;

export const coaches = [...coachRoster, ...coachRoster];

const galleryTrack1Base = [
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=380&fit=crop&q=80",
    label: "Training",
  },
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=380&fit=crop&q=80",
    label: "Off-Season",
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=380&fit=crop&q=80",
    label: "Training",
  },
  {
    src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=380&fit=crop&q=80",
    label: "Prep Camp",
  },
  {
    src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&h=380&fit=crop&q=80",
    label: "Training",
  },
] as const;

const galleryTrack2Base = [
  {
    src: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=500&h=380&fit=crop&q=80",
    label: "Stage 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=380&fit=crop&q=80",
    label: "Client Transformation",
  },
  {
    src: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=500&h=380&fit=crop&q=80",
    label: "Stage 2023",
  },
  {
    src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=380&fit=crop&q=80",
    label: "Client Transformation",
  },
  {
    src: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500&h=380&fit=crop&q=80",
    label: "Stage 2024",
  },
] as const;

export const galleryTrack1 = [...galleryTrack1Base, ...galleryTrack1Base];
export const galleryTrack2 = [...galleryTrack2Base, ...galleryTrack2Base];

export const testimonials = [
  {
    quote:
      "Som's prep coaching completely changed how I approach competition. Peak week execution was flawless. Placed 2nd at ICN Delhi.",
    name: "Rahul M.",
    result: "2nd Place — ICN Delhi 2024",
    role: "Competition Prep Client",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=96&h=96&fit=crop&crop=faces&q=80",
  },
  {
    quote:
      "Lost 14kg while building visible muscle in 16 weeks. The nutrition plan was precise and the check-ins kept me accountable.",
    name: "Priya S.",
    result: "-14kg in 16 Weeks",
    role: "Online Coaching Client",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=96&h=96&fit=crop&crop=faces&q=80",
  },
  {
    quote:
      "Posing coaching with Som gave me the confidence to actually look like I belong on stage. Night and day difference.",
    name: "Arjun K.",
    result: "Stage Ready",
    role: "Posing Client",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces&q=80",
  },
] as const;

export const goalOptions = [
  "Physique Transformation",
  "Competition Prep",
  "Posing Coaching",
  "Not sure yet",
] as const;

export const footerLinks = [
  { label: "Courses", href: "#courses" },
  { label: "Coaches", href: "#coaches" },
  { label: "Gallery", href: "#gallery" },
  { label: "Apply", href: "#apply" },
] as const;

export const sponsors = ["Wellcore", "Dynamite Preworkout", "Ripped Up Nutrition"] as const;
