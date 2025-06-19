import { Card, CardContent } from "@/components/ui/card"; import { Badge } from "@/components/ui/badge"; import { Flame, Zap, HeartPulse } from "lucide-react";

export default function KunigamiTraining() { const training = [ { title: "พลัง (Strength)", icon: <Flame className="text-orange-500" />, exercises: [ "Squat 5x5 (หนัก)", "Deadlift 3x5", "Bench Press 4x6", "Push-Up 3x20", "Pull-Up 3x10" ] }, { title: "ความเร็ว & ระเบิดพลัง (Explosiveness)", icon: <Zap className="text-yellow-400" />, exercises: [ "Sprint 5x20 เมตร", "กระโดด Box Jump 3x10", "Burpees 3x15", "Agility Ladder Drills", "Side Shuffle Sprint" ] }, { title: "ความอึด (Endurance)", icon: <HeartPulse className="text-red-500" />, exercises: [ "วิ่ง 5 km", "Tabata 20/10 x 8", "Jump Rope 3 นาที", "Plank 1 นาที x 3", "Bike 15 นาที เร็ว" ] } ];

return ( <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white p-6"> <h1 className="text

