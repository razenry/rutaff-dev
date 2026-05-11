"use client";

import { useState } from "react";
import { useTahfiz } from "@/hooks/useTahfiz";
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book, History, Plus, Loader2, Star } from "lucide-react";
import { toast } from "sonner";

export default function TahfizPage() {
  const { user } = useAuthStore();
  const isMusyrif = user?.roles?.includes("Musyrif") || user?.roles?.includes("Super Admin");
  
  const { progress, isLoading, recordProgress, isRecording } = useTahfiz();
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    student_id: "",
    surah: "",
    ayah_start: "",
    ayah_end: "",
    type: "hafalan" as "hafalan" | "murojaah",
    grade: "A",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordProgress(
      {
        ...formData,
        ayah_start: formData.ayah_start ? parseInt(formData.ayah_start) : undefined,
        ayah_end: formData.ayah_end ? parseInt(formData.ayah_end) : undefined,
      },
      {
        onSuccess: () => {
          toast.success("Tahfiz progress recorded!");
          setShowForm(false);
          setFormData({
            student_id: "",
            surah: "",
            ayah_start: "",
            ayah_end: "",
            type: "hafalan",
            grade: "A",
            notes: "",
          });
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to record progress");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tahfiz Management</h2>
          <p className="text-muted-foreground">Track and monitor Qur'an memorization progress.</p>
        </div>
        {isMusyrif && (
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : <><Plus className="mr-2 h-4 w-4" /> Add Record</>}
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="border-primary/50 shadow-md">
          <CardHeader>
            <CardTitle>Record Progress</CardTitle>
            <CardDescription>Enter the student's memorization or review details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="student_id">Student ID (UUID)</Label>
                <Input 
                  id="student_id" 
                  placeholder="Paste student UUID" 
                  value={formData.student_id}
                  onChange={(e) => setFormData({...formData, student_id: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(v: any) => setFormData({...formData, type: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hafalan">Hafalan (New)</SelectItem>
                    <SelectItem value="murojaah">Murojaah (Review)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="surah">Surah Name</Label>
                <Input 
                  id="surah" 
                  placeholder="e.g. Al-Baqarah" 
                  value={formData.surah}
                  onChange={(e) => setFormData({...formData, surah: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="ayah_start">Ayah Start</Label>
                  <Input 
                    id="ayah_start" 
                    type="number"
                    value={formData.ayah_start}
                    onChange={(e) => setFormData({...formData, ayah_start: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ayah_end">Ayah End</Label>
                  <Input 
                    id="ayah_end" 
                    type="number"
                    value={formData.ayah_end}
                    onChange={(e) => setFormData({...formData, ayah_end: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Select value={formData.grade} onValueChange={(v: any) => setFormData({...formData, grade: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Grade A (Mumtaz)</SelectItem>
                    <SelectItem value="B">Grade B (Jayyid Jiddan)</SelectItem>
                    <SelectItem value="C">Grade C (Jayyid)</SelectItem>
                    <SelectItem value="D">Grade D (Maqbul)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Input 
                  id="notes" 
                  placeholder="Optional feedback..." 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
              <Button type="submit" className="md:col-span-2" disabled={isRecording}>
                {isRecording && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Record
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-lg">Memorization History</h3>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : progress?.length > 0 ? (
          <div className="grid gap-4">
            {progress.map((item: any) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex">
                  <div className={`w-2 ${item.type === 'hafalan' ? 'bg-blue-500' : 'bg-green-500'}`} />
                  <CardContent className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg">{item.surah}</h4>
                          <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${item.type === 'hafalan' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ayah {item.ayah_start} - {item.ayah_end}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-bold text-lg">{item.grade}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {item.notes && (
                      <p className="mt-2 text-sm italic bg-muted/50 p-2 rounded">
                        "{item.notes}"
                      </p>
                    )}
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed">
            <Book className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No tahfiz records found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
