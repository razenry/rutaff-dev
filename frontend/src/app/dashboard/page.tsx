"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BookOpen, CalendarCheck, Users, TrendingUp, Bell, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 p-2"
    >
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-sky-600 bg-clip-text text-transparent">
            Ahlan wa Sahlan, {user?.name}
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Welcome to the RUTAF Super App. Here is your daily overview.
          </p>
        </div>
        <div className="flex gap-2">
           <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Bell className="h-6 w-6" />
           </div>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Students", value: "1,248", icon: Users, color: "text-blue-600", bg: "bg-blue-50", trend: "+12%" },
          { title: "Active Classes", value: "42", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50", trend: "Normal" },
          { title: "Attendance Rate", value: "98.2%", icon: CalendarCheck, color: "text-amber-600", bg: "bg-amber-50", trend: "+2.1%" },
          { title: "Trust Score", value: "9.8", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50", trend: "High" },
        ].map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="border-none shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className={`h-1 w-full ${stat.bg.replace('bg-', 'bg-')}`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</CardTitle>
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                <div className="flex items-center mt-1 text-xs font-medium text-emerald-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend} <span className="text-slate-400 ml-1 font-normal">from last week</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <motion.div variants={item} className="col-span-full lg:col-span-4">
          <Card className="border-none shadow-xl shadow-slate-200/50 h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Academic Analytics</CardTitle>
                  <CardDescription>Performance trends across RUTAF modules</CardDescription>
                </div>
                <select className="text-sm border rounded-md p-1 bg-slate-50">
                   <option>Last 30 Days</option>
                   <option>This Term</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-slate-50/50 rounded-b-xl mx-6 mb-6 border border-dashed border-slate-200">
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <Activity className="h-12 w-12 opacity-20" />
                <p className="font-medium">Interactive Chart Analytics Rendering...</p>
                <p className="text-xs">Connecting to Academic API</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item} className="col-span-full lg:col-span-3">
          <Card className="border-none shadow-xl shadow-slate-200/50">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
              <CardDescription>Real-time updates from institutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { user: "Ahmad Dahlan", action: "Marked attendance", module: "Rumah Tahfiz MAN 12", time: "2 mins ago" },
                  { user: "Siti Aminah", action: "Completed Murojaah", module: "TPQ Rutaf", time: "15 mins ago" },
                  { user: "System", action: "Syahriyah Invoice Sent", module: "Finance", time: "1 hour ago" },
                  { user: "Umar Khattab", action: "New student registration", module: "Academy", time: "2 hours ago" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-lg shadow-primary/20">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-semibold leading-none">{activity.user}</p>
                      <p className="text-xs text-slate-500">{activity.action} in <span className="text-primary font-medium">{activity.module}</span></p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors">
                View All Activity
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
