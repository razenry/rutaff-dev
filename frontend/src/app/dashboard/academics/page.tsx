"use client";

import { useAcademic } from "@/hooks/useAcademic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, School, Plus, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AcademicPage() {
  const { subjects, classes, isLoadingSubjects, isLoadingClasses } = useAcademic();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Academic Management</h2>
          <p className="text-muted-foreground">Manage subjects, classes, and academic schedules.</p>
        </div>
        <div className="flex gap-2">
           <Button size="sm" className="gap-2">
             <Plus className="h-4 w-4" />
             New Subject
           </Button>
           <Button size="sm" variant="outline" className="gap-2">
             <Plus className="h-4 w-4" />
             New Class
           </Button>
        </div>
      </div>

      <Tabs defaultValue="classes" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="classes" className="gap-2">
            <School className="h-4 w-4" />
            Classes
          </TabsTrigger>
          <TabsTrigger value="subjects" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Subjects
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="classes" className="mt-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search classes..."
                  className="pl-8"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {isLoadingClasses ? (
                Array(3).fill(0).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="h-24 bg-muted" />
                    <CardContent className="h-16 mt-4 bg-muted" />
                  </Card>
                ))
              ) : classes?.length > 0 ? (
                classes.map((cls: any) => (
                  <Card key={cls.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        {cls.name}
                        <span className="text-xs font-normal px-2 py-1 bg-primary/10 text-primary rounded-full">
                          Level {cls.level}
                        </span>
                      </CardTitle>
                      <CardDescription>Academic Year: {cls.academic_year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground flex flex-col gap-1">
                        <p>Institution: {cls.institution?.name || "N/A"}</p>
                        <p>Wali Kelas: {cls.teacher?.name || "Not assigned"}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-12 text-center bg-muted/20 rounded-xl border border-dashed">
                  <School className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                  <h3 className="font-semibold text-lg">No classes found</h3>
                  <p className="text-muted-foreground">Get started by creating your first academic class.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="mt-6">
           <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search subjects..."
                  className="pl-8"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {isLoadingSubjects ? (
                Array(3).fill(0).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="h-24 bg-muted" />
                    <CardContent className="h-16 mt-4 bg-muted" />
                  </Card>
                ))
              ) : subjects?.length > 0 ? (
                subjects.map((sub: any) => (
                  <Card key={sub.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center text-lg">
                        {sub.name}
                        <code className="text-xs font-mono px-2 py-1 bg-muted rounded">
                          {sub.code}
                        </code>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {sub.description || "No description provided."}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-12 text-center bg-muted/20 rounded-xl border border-dashed">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                  <h3 className="font-semibold text-lg">No subjects found</h3>
                  <p className="text-muted-foreground">Get started by creating your first academic subject.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
